"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'
import { Room, Employee, Printer } from '@/app/api/api'
import FilterGroup from '../FilterGroup/FilterGroup'
import { createEmployeeFilterState, createRoomFilterState, createPrinterFilterState } from './State'



const DynamicLeafletMap = dynamic(() => import('../LeafletMap/LeafletMap'), {
    ssr: false,
    loading: () => <div>Loading map...</div>,
})

interface Props {
  rooms: Room[],
  printers: Printer[],
  employees: Employee[],
}


const PageContent = ({rooms, printers, employees} : Props ) => {
  const roomFilterState = createRoomFilterState(rooms);
  const employeeFilterState = createEmployeeFilterState(employees);
  const printerFilterState = createPrinterFilterState(printers);
  console.log(rooms)

  return (
    <div>
      <Filter>
        <FilterGroup state={roomFilterState}/>
        <FilterGroup state={employeeFilterState}/>
        <FilterGroup state={printerFilterState}/>
      </Filter>
      <DynamicLeafletMap/>
    </div>
  )
}

export default PageContent

