export class Api {
    private readonly base_url: string;
    private readonly port: string;
    private readonly full_url: string;
    private readonly search_endpoint_path: string = "/search"
    private readonly employees_endpoint_path: string = "/employees"
    private readonly employee_endpoint_path: string = "/employee/"
    private readonly rooms_endpoint_path: string = "/rooms"
    private readonly room_endpoint_path: string = "/room/"
    private readonly printers_endpoint_path: string = "/printers"
    private readonly printer_endpoint_path: string = "/printer/"
    private readonly groundfloor_image_path: string = "/groundfloor.png"

    constructor(base_url: string, path_url:string, port: string) {
        this.base_url = base_url
        this.port = port
        this.full_url = base_url + ":" + port + path_url
    }

    public async Search(input: string){
        let data = await fetch(this.full_url + this.search_endpoint_path + '?input=' + input)
        let searchResultItems = await data.json() as SearchResultItem[]
        return searchResultItems
    }

    async FetchEmployees(){
        let data = await fetch(this.full_url + this.employees_endpoint_path)
        let employees = await data.json() as Employee[]
        return employees
    }

    async FetchEmployee(stringId: string){
        let data = await fetch(this.full_url + this.employee_endpoint_path + stringId)
        let employee = await data.json() as Employee
        return employee
    }

    async FetchRooms(){
        let data = await fetch(this.full_url + this.rooms_endpoint_path)
        let rooms = await data.json() as Room[]
        return rooms
    }

    async FetchRoom(stringId: string){
        let data = await fetch(this.full_url + this.room_endpoint_path + stringId)
        let room = await data.json() as Room
        return room
    }

    async FetchPrinters(){
        let data = await fetch(this.full_url + this.printers_endpoint_path)
        let printers = await data.json() as Printer[]
        return printers
    }

    async FetchPrinter(id: number){
        let data = await fetch(this.full_url + this.printer_endpoint_path + id)
        let printer = await data.json() as Printer
        return printer
    }

    async FetchGroundfloorImage(){
        let response = await fetch(this.full_url + this.groundfloor_image_path)
        return response.blob()
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