
const url = "http://127.0.0.1:8080/";


export async function fetchEmployee() {
  const res = await fetch(url + "employees");
  const data = await res.json() as Employee[];
  return data
}

export async function fetchRoom() {
  const res = await fetch(url + "rooms");
  const data = await res.json() as Room[];
  return data
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
