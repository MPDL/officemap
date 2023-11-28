"use client"

import React, {Dispatch, SetStateAction, useState} from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'
import {Room, Employee, Printer} from '@/app/api/api'
import FilterGroup from '../FilterGroup/FilterGroup'
import {useEmployeeFilterState, useRoomFilterState, usePrinterFilterState} from './State'
import Search from '../Search/Search'
import {useSearchParams} from "next/navigation";

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

const PageContent = ({rooms, printers, employees}: Props) => {
    const roomFilterState = useRoomFilterState(rooms);
    const employeeFilterState = useEmployeeFilterState(employees);
    const printerFilterState = usePrinterFilterState(printers);
    const searchParams = useSearchParams()
    const installation_mode: boolean = searchParams.get('installation') !== null

    return (
        <div>
            <Filter>
                <FilterGroup state={roomFilterState}/>
                <FilterGroup state={employeeFilterState}/>
                <FilterGroup state={printerFilterState}/>
            </Filter>
            <Search/>
            {!installation_mode ? (
                <div className={"action button print absolute"}></div>
            ): (
                <></>
            )}
            <DynamicLeafletMap installation_mode={installation_mode} roomFilter={roomFilterState} employeeFilter={employeeFilterState} printerFilter={printerFilterState}/>
        </div>
    )
}

export default PageContent

