import { fetchRoom, Room } from '@/app/api/api';
import React from 'react'
import FilterGroup from '../filtergroup/FilterGroup';


const RoomFilter = async () => {
  const rooms:Room[] = await fetchRoom();
  const types:string[] = Array.from(new Set<string>(rooms?.map(room => room.type)));

  return <div></div>
  // return (<FilterGroup name='Room' groups={types}/>);
}

export default RoomFilter

