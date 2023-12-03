"use client"
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

export function useEmployee(stringId: string) {
    const { data, error, isLoading } = useSWR(`${url}/employee/${stringId}`, fetcher)
    return {
        employee: data as Employee,
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

export function useRoom(stringId: string) {
    const { data, error, isLoading } = useSWR(`${url}/room/${stringId}`, fetcher)
    return {
        room: data as Room,
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

export function usePrinter(stringId: string) {
    const { data, error, isLoading } = useSWR(`${url}/printer/${stringId}`, fetcher)
    return {
        printer: data as Printer,
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

export function useSearch(query: string) {
  const {data, error, isLoading } = useSWR(`${url}/search?input=${query}`)
  return {
    results: data as SearchResultItem[],
    isLoading,
    isError: error
  }
}

export async function fetchSearch(query: string) : Promise<SearchResultItem[]> {
      return await fetch(`${url}/search?input=${query}`).then(res => res.json()) as SearchResultItem[]
}

export interface SearchResultItem {
    type: string,
    data: string,
    keywords: string[],
    priority: number,
}

export interface Employee {
    id: number,
    stringId: string,
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
    stringId: string,
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
