import useSWR from "swr";

const url = "http://127.0.0.1:8080";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const imageFetcher = (url: string) => fetch(url).then((res) => res.blob());

export function useEmployees() {
    const { data, error, isLoading } = useSWR(`${url}/employees`, fetcher)
    return {
        employees: data as Employee[],
        isLoading,
        isError: error
    }
}

export function useRooms() {
    const { data, error, isLoading } = useSWR(`${url}/rooms`, fetcher)
    return {
        rooms: data as Room[],
        isLoading,
        isError: error
    }
}

export function usePrinters() {
    const { data, error, isLoading } = useSWR(`${url}/printers`, fetcher)
    return {
        printers: data as Printer[],
        isLoading,
        isError: error
    }
}

export function useGroundfloorImage() {
    const { data, error, isLoading } = useSWR(`${url}/groundfloor.png`, imageFetcher)
    return {
        groundfloorImageObjectUrl: data ? URL.createObjectURL(data) : undefined,
        isLoading,
        isError: error
    }
}

export interface SearchResultItem {
    type: string,
    data: string,
    keywords: string[],
    priority: number,
}

export interface Employee {
    id: number,
    firstname: string,
    lastname: string,
    department: string,
    room: string,
    phone: string,
    email: string,
    marker: ApiLeafletLatLng
}

export interface Room {
    id: number,
    name: string,
    details: string,
    type: string,
    shape: ApiLeafletPolygon,
    marker: ApiLeafletLatLng,
}

export interface Printer {
    id: number,
    name: string,
    address: string
    model: string,
    marker: ApiLeafletLatLng
}

export interface ApiLeafletPolygon {
    coordinates: ApiLeafletLatLng[]
}

export interface ApiLeafletLatLng {
    lat: number,
    lng: number,
}
