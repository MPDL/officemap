"use client"

import {useEmployees} from '@/app/api/api';
import React from 'react'
import FilterGroup from '../FilterGroup/FilterGroup';


const FilterEmployee = () => {
  const { employees, isLoading: isRoomsLoading, isError: isRoomsError } = useEmployees()
  const types:string[] = Array.from(new Set<string>(employees?.map(employee => employee.department)));

  return (<FilterGroup name='Employee' groups={types}/>);
}

export default FilterEmployee

