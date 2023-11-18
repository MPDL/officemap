import { fetchEmployee, Employee } from '@/app/api/api';
import React from 'react'
import FilterGroup from '../filtergroup/FilterGroup';


const EmployeeFilter = async () => {
  const employees:Employee[] = await fetchEmployee();
  const types:string[] = Array.from(new Set<string>(employees?.map(employee => employee.department)));

  // return <div></div>
  return (<FilterGroup name='Employee' groups={types}/>);
}

export default EmployeeFilter

