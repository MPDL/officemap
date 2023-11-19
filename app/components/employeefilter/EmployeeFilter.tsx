"use client"

import React from 'react'
import FilterGroup from '../filtergroup/FilterGroup';
import {useEmployees} from "@/app/api/api";


const EmployeeFilter = () => {
  const { employees, isLoading, isError } = useEmployees();
  const types:string[] = Array.from(new Set<string>(employees?.map(employee => employee.department)));

  return (<FilterGroup name='Employee' groups={types}/>);
}

export default EmployeeFilter

