import React, { useState, useMemo } from 'react';
import './GroupList.css';
import { getGroups } from '../../../utils/getGroups';
import groupServerData from  '../../../server/groups.json';
import { Group } from '../../../types/types';
import GroupCard from '../../GroupCard/GroupCard';

function GroupList() {

    async function GetGroupsResponse() {
      try {
        let data = getGroups(groupServerData);
        if(data.result = 1) {
          return data;
        } else {
          throw new Error();
        }
      } catch {
        console.log('Произошла ошибка');
      }
    }

    const [groupData, setGroupData] = useState<Group[] | null | undefined>(null);
    const [filteredGroup, filterGroup] = useState<Group[] | null | undefined>(null);

    const avatarColors = Array.from(new Set(groupData?.map(item => item.avatar_color).filter(item => item !== undefined )));

    useMemo(() => {
        setTimeout(async() => {
           let res = await GetGroupsResponse();
           setGroupData(res?.data);
        }, 1000)
    }, [])

    useMemo(() => {
      filterGroup(groupData);
    }
    , [groupData])

    // Обработка значений из формы

    const [values, setValues] = React.useState({closed: 'default', avatar_color: 'default', friends: 'default'});

    function handleChange(event:any) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      setValues({...values, [name]: value});
    }

    // фильтры

    function filterPrivate(data: Group[] | null | undefined) {
      if(values.closed === 'default') {
         return data?.filter((item) => item);
      }
      if(values.closed === 'private') {
         return data?.filter((item) => item.closed === true);
      }
      if(values.closed === 'public') {
         return data?.filter((item) => item.closed === false);
      }
    }

    function filterColor (data: Group[] | null | undefined) {
      if(values.avatar_color === 'default') {
        return data?.filter(item => item);
      }
      return data?.filter(item => item.avatar_color === values.avatar_color);
    }

    function filterFriends (data: Group[] | null | undefined) {
      if(values.friends === 'default') {
        return data?.filter(item => item);
      }
      if(values.friends === 'isSubscribe') {
        return data?.filter(item => item.friends);
      }
      if(values.friends === 'isNotSubscribe') {
        return data?.filter(item => !item.friends);
      }
    }

    // Собрал фильтры вместе

    function filterGroups() {
      const data = filterPrivate(groupData);
      const data2 = filterColor(data);
      const data3 = filterFriends(data2);
      filterGroup(data3);
    }

    useMemo(() => {
      filterGroups();
    }, [values])

  return (
    <fieldset>
      <form className='group-list_menu'
        onChange={handleChange}
      >
        <select className='select' name='closed'>
          <option value={'default'} >По типу приватности</option>
          <option value={'public'}>Открытые</option>
          <option value={'private'}>Приватные</option>
        </select>

        <select className='select' name='avatar_color'>
          <option value={'default'}>По цвету аватара</option>
          {avatarColors.map(color => <option key={color} value={color}>{color}</option>)}
        </select>

        <select className='select' name='friends'>
          <option value={'default'}>Подписаны ли друзья</option>
          <option value={'isSubscribe'}>Друзья подписаны</option>
          <option value={'isNotSubscribe'}>Друзья не подписаны</option>
        </select>

      </form>
      <ul className="group-list list-style">
        {filteredGroup?.map(group => (<GroupCard group = {group} key={group.id} />))}
      </ul>
    </fieldset>
  );
}

export default GroupList;
