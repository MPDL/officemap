"use client"

import {useEffect, useRef} from "react";
import {useEmployees, useGroundfloorImage, usePrinters, useRooms} from "@/app/api/api";
import {LeafletMapController} from "@/app/components/LeafletMap/LeafletMapController";
import {FilterGroupState} from "@/app/components/PageContent/State";

// followed instructions at https://react.dev/reference/react/useEffect#controlling-a-non-react-widget
export default function LeafletMap({installation_mode, roomFilter, employeeFilter, printerFilter}:{installation_mode: boolean, roomFilter: FilterGroupState,
    employeeFilter: FilterGroupState, printerFilter: FilterGroupState}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMapController | null>(null);
    const { rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRooms()
    const { employees, isLoading: isEmployeesLoading, isError: isEmployeesError } = useEmployees()
    const { printers, isLoading: isPrintersLoading, isError: isPrintersError } = usePrinters()
    const { groundfloorImageObjectUrl, isLoading: isImageLoading, isError: isImageError } = useGroundfloorImage()

    useEffect(() => {
        if (mapRef.current === null && containerRef.current !== null) {
            mapRef.current = new LeafletMapController(containerRef.current,rooms,employees,printers, groundfloorImageObjectUrl,installation_mode);
        }

        const map = mapRef.current;
        // will be called after every render. A render is triggered if one of the dependencies in the useEffect array is changed.
        if (map != null){
            // cant call this in the init function because the groundfloor may not have loaded completely at that time point
            map.setBackgroundImageOnce(groundfloorImageObjectUrl)

            map.filterEmployees(employees, employeeFilter)
            map.filterRooms(rooms, roomFilter)
            map.filterPrinter(printers, printerFilter)
        }
    }, [rooms,employees,printers, groundfloorImageObjectUrl, employeeFilter, roomFilter, printerFilter, installation_mode]);

    return (
        <div id="officemap-map"
            style={{ height: "100vh" }}
            ref={containerRef}
        />
    );
}
