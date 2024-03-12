import React, {useEffect, useState} from 'react';
import { User } from '../../types/types';
import './GroupCard.css';

function GroupCard({ group }: any) {
    const [isOpen, setIsOpen] = useState(false);

    function openFriendsList() {
      setIsOpen(!isOpen);
    }

  return (
    <li className={`group-card`}>
    <div
      className={`group-card_avatar`}
      style={{ backgroundColor: `${group.avatar_color}` }}
    ></div>
    {group.name}
    {<p>{group.closed ? 'Закрытая' : 'Открытая'}</p>}
    {<p>{`Подписчики: ${group.members_count}`}</p>}
    {group.friends !== undefined && (
      <button
        onClick={openFriendsList}
        className={`group-card_friends-button`}
      >{`Друзья: ${group.friends.length}`}</button>
    )}
    {isOpen && 
    <ul className='list-style'>
      { group.friends.map((friend:User, index:number) => {
        return (<li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>)}) }
    </ul>
    }
  </li>
  );
}

export default GroupCard;
