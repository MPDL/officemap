"use client"

import {useRooms} from '@/app/api/api';
import React from 'react'
import FilterGroup from '../filtergroup/FilterGroup';


const RoomFilter = () => {
  const { rooms, isLoading, isError } = useRooms();
  const types:string[] = Array.from(new Set<string>(rooms?.map(room => room.type)));

  return (<FilterGroup name='Room' groups={types}/>);
}

export default RoomFilter

