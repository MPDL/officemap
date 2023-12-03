"use client"

import React, {Dispatch, SetStateAction, useState} from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'
import {Room, Employee, Printer, useEmployees, useEmployee, usePrinter, useRoom} from '@/app/api/api'
import FilterGroup from '../FilterGroup/FilterGroup'
import {useEmployeeFilterState, useRoomFilterState, usePrinterFilterState} from './State'
import Search from '../Search/Search'
import {useSearchParams} from "next/navigation";
import {LatLng} from "leaflet";

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
    const employeeSearchEntityParameter: string | null = searchParams.get('employee')
    const roomSearchEntityParameter: string | null = searchParams.get('room')
    const printerSearchEntityParameter: string | null = searchParams.get('printer')
    const customSearchEntityParameter: string | null = searchParams.get('custom')

    let employeeSearchEntity: any
    if(employeeSearchEntityParameter){
        employeeSearchEntity = useEmployee(employeeSearchEntityParameter)
    }
    let roomSearchEntity: any
    if(roomSearchEntityParameter){
        roomSearchEntity = useRoom(roomSearchEntityParameter)
    }
    let printerSearchEntity: any
    if(printerSearchEntityParameter){
        printerSearchEntity = usePrinter(printerSearchEntityParameter)
    }
    let customSearchEntity: LatLng | undefined
    if(customSearchEntityParameter){
        let latlng = customSearchEntityParameter.split(',')
        if(latlng !== undefined && latlng.length === 2){
            let convertedLat = Number(latlng[0])
            let convertedLng = Number(latlng[1])
            if(!isNaN(convertedLat) && !isNaN(convertedLng)) {
                customSearchEntity = new LatLng(convertedLat,convertedLng)
            }
        }
    }

    const setUrlSearchParameter = (employee: Employee | null, room: Room | null, printer: Printer | null, custom: LatLng | undefined) => {
        employeeSearchEntity = employee
        roomSearchEntity = room
        printerSearchEntity = printer
        customSearchEntity = custom

        updateUrlParameter()
    }

    const updateUrlParameter = () => {
        let urlParameter = "?"
        if(installation_mode){
            urlParameter += "&installation"
        }
        if(employeeSearchEntity){
            urlParameter += `&employee=${employeeSearchEntityParameter}`
        }
        if(roomSearchEntity){
            urlParameter += `&room=${roomSearchEntityParameter}`
        }
        if(printerSearchEntity){
            urlParameter += `&printer=${printerSearchEntityParameter}`
        }
        if(customSearchEntity){
            urlParameter += `&custom=${customSearchEntityParameter}`
        }

        if(urlParameter.length === 1){
            urlParameter = ''
        }
        window.history.pushState(`url state: ${urlParameter}`, "", `${location.pathname}${urlParameter}`);
    }

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
            <DynamicLeafletMap installation_mode={installation_mode} roomFilter={roomFilterState}
                               employeeFilter={employeeFilterState} printerFilter={printerFilterState}
                               employeeSearchEntity={employeeSearchEntity} roomSearchEntity={roomSearchEntity}
                               printerSearchEntity={printerSearchEntity} customSearchEntity={customSearchEntity}
                               setUrlSearchParameter={setUrlSearchParameter}/>
        </div>
    )
}

export default PageContent

