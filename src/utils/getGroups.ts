import { Group, GetGroupsResponse } from '../types/types';

export const getGroups = (data: Group[]):GetGroupsResponse => {
    if(data) {
        return {
            data,
            result:1
        }
    } else {
        return { result:0 }
    }
}
