"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'
import { Room, Employee, Printer } from '@/app/api/api'
import FilterGroup from '../FilterGroup/FilterGroup'
import { useEmployeeFilterState, useRoomFilterState, usePrinterFilterState } from './State'



// Followed instructions at https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
// In import('path/to/component'), the path must be explicitly written. It can't be a template string nor a variable.
// This is needed otherwise LeafletMap will be rendered server side which does not work because leaflet relies on the
// 'window' object.
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
  const roomFilterState = useRoomFilterState(rooms);
  const employeeFilterState = useEmployeeFilterState(employees);
  const printerFilterState = usePrinterFilterState(printers);
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

