"use client"

import {useEffect, useRef} from "react";
import {LeafletMapController} from "@/app/components/LeafletMap/LeafletMapController";
import {useEmployees, useGroundfloorImage, usePrinters, useRooms} from "@/app/api/api";
import 'leaflet.markercluster/dist/leaflet.markercluster.js'

// followed instructions at https://react.dev/reference/react/useEffect#controlling-a-non-react-widget
export default function LeafletMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMapController | null>(null);
    const { rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRooms()
    const { employees, isLoading: isEmployeesLoading, isError: isEmployeesError } = useEmployees()
    const { printers, isLoading: isPrintersLoading, isError: isPrintersError } = usePrinters()
    const { groundfloorImageObjectUrl, isLoading: isImageLoading, isError: isImageError } = useGroundfloorImage()

    useEffect(() => {
        if (mapRef.current === null && containerRef.current !== null) {
            mapRef.current = new LeafletMapController(containerRef.current,rooms,employees,printers, groundfloorImageObjectUrl);
        }

        const map = mapRef.current;
        if (map != null){
            map.setBackgroundImageOnce(groundfloorImageObjectUrl)
            map.markAllEmployees(employees)
        }
    }, [rooms,employees,printers, groundfloorImageObjectUrl]);

    return (
        <div id="officemap-map"
            style={{ height: "100vh" }}
            ref={containerRef}
        />
    );
}
