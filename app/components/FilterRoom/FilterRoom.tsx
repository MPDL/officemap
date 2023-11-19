"use client"

import {useRooms} from '@/app/api/api';
import React from 'react'
import FilterGroup from '../FilterGroup/FilterGroup';


const FilterRoom = () => {
  const { rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRooms()
  const types:string[] = Array.from(new Set<string>(rooms?.map(room => room.type)));

  return (<FilterGroup name='Room' groups={types}/>);
}

export default FilterRoom
