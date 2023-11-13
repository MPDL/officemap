import L, {LatLng, LatLngBounds, LeafletMouseEvent, ZoomAnimEvent} from "leaflet";
import floorPlan from "../../../assets/images/groundfloor.png";
import {Api, Employee, Printer, Room} from "../api/api";
import {environmentVariables} from "../environment";
import {Legend} from "./legend";
import {InfoPanel} from "./info_panel";
import {MarkerFactory} from "./map_marker";
import {PolygonFactory} from "./map_polygon";
import {Search} from "./search";

export class LeafletMap {
    private readonly api: Api
    private readonly leaflet_map: L.Map
    private readonly markerFactory: MarkerFactory
    private readonly polygonFactory: PolygonFactory
    private readonly infoPanel: InfoPanel
    private readonly bounds :LatLngBounds
    private legend: Legend | undefined
    private searchMarker: L.Marker | undefined
    private customMarker: L.Marker
    private customMarkerInfoText:  L.Marker | undefined
    constructor(parent: Element, api: Api, search: Search) {
        this.api = api

        const root = document.createElement('div');
        root.setAttribute('id', 'map')
        // needs to be added to the DOM before the leaflet library inits
        parent.append(root)

        // init leafletjs
        this.leaflet_map = L.map('map', {
            attributionControl: false,
            crs: L.CRS.Simple,
            maxZoom: 0,
            minZoom: -2,
            zoomSnap: 0.25,
            zoom: -2,
        });
        this.bounds = new LatLngBounds([[0,0], [2676, 3834]]);
        L.imageOverlay(floorPlan, this.bounds).addTo(this.leaflet_map);
        this.leaflet_map.fitBounds(this.bounds);

        // modify leaflet html for print feature
        let leaflet_mapview = document.getElementsByClassName('leaflet-pane leaflet-map-pane')
        if(leaflet_mapview.length === 1) {
            leaflet_mapview[0].classList.add('officemap-print-map-section')
        }

        // create components
        this.infoPanel = new InfoPanel()
        this.markerFactory = new MarkerFactory(this.infoPanel )
        this.polygonFactory = new PolygonFactory(this.infoPanel )

        // get url parameters
        let searchParameter = this.loadSearchUrlParameter()

        // fetch data
        let thisMap = this
        this.fetchData(searchParameter).then(
            (data) => {
                this.legend = new Legend(parent, this.leaflet_map, data[0] as Employee[], data[1] as Room[],
                    data[2] as Printer[], this.markerFactory, this.polygonFactory)

                let searchedEntity = data[3]
                if(searchedEntity !== undefined){
                    this.markEntityOnMap(searchedEntity[0] as Employee | Room | Printer | LatLng, searchedEntity[1] as MapEntityType)
                }
            }
        )

        // create info panel
        let infoPanelControl: L.Control = new L.Control({position: 'bottomleft'});
        infoPanelControl.onAdd = function (map) {
            return thisMap.infoPanel.getHtml();
        };
        infoPanelControl.addTo(this.leaflet_map);

        // create custom marker and info text
        let customMarkerTextIcon = new L.DivIcon({
            html: `<div style="font-family: 'OfficeMapBold', sans-serif; opacity: 0.4; text-align: center; width: 200px">You can drag and drop me for a custom location.</div>`,
            className: '',
            iconSize: [200,36],
            iconAnchor:  [100, 0]
        })
        this.customMarkerInfoText = new L.Marker([1370,1100], {icon: customMarkerTextIcon, interactive: false})
        this.customMarkerInfoText.addTo(this.leaflet_map)
        this.customMarker = this.markerFactory.createCustomMarker([1408,1100])
        this.makeRecreatingCustomMarker()
        this.customMarker.addTo(this.leaflet_map)

        this.constructMap(parent)
    }

    private makeRecreatingCustomMarker(){
        this.customMarker.on('dragend', (_) => {
            let newCustomMarker = this.markerFactory.createCustomMarker([this.customMarker.getLatLng().lat, this.customMarker.getLatLng().lng])
            this.customMarker.remove()
            this.customMarker = newCustomMarker
            this.makeRecreatingCustomMarker()
            this.customMarker.addTo(this.leaflet_map)
            this.customMarkerInfoText?.remove()
        })
        this.customMarker.on('dragstart', (_) => {
            // delete search marker by triggering the 'close pop up event'
            this.searchMarker?.closePopup()
        })

    }

    public printMap(){
        window.print()
    }

    public fitMapToWindow(){
        this.leaflet_map.fitBounds(this.bounds);
    }

    public async fetchData(searchParameter: [MapEntityType, string] | [MapEntityType, L.LatLng] | undefined){
        let employees = await this.api.FetchEmployees()
        let rooms = await this.api.FetchRooms()
        let printers = await this.api.FetchPrinters()

        if(searchParameter === undefined) {
            return [employees, rooms, printers, undefined]
        }

        let mapEntityType = searchParameter[0]
        let queryParam = searchParameter[1]
        let object: Employee | Room | Printer | LatLng | undefined
        if(searchParameter !== undefined) {
            switch (mapEntityType) {
                case MapEntityType.Employee:
                    object = await this.api.FetchEmployee(Number(queryParam as string))
                    break;
                case MapEntityType.Room:
                    object = await this.api.FetchRoom(Number(queryParam as string))
                    break;
                case MapEntityType.Printer:
                    object = await this.api.FetchPrinter(Number(queryParam as string))
                    break;
                case MapEntityType.Custom:
                    object = queryParam as LatLng
                    break;
            }
        }

        if (object !== undefined){
            return [employees, rooms, printers, [object, mapEntityType]]
        } else {
            return [employees, rooms, printers, undefined]
        }
    }

    public markEntityOnMap(object: Employee | Room | Printer| LatLng, mapEntityType: MapEntityType){
        // if there was a previous search marker then delete it by triggering the 'close pop up' event
        if(this.searchMarker !== undefined){
            this.searchMarker.closePopup()
        }

        let markers = document.getElementsByClassName("leaflet-marker-icon");
        for (let i = 0; i <markers.length; i++) {
            let marker = markers.item(i)
            marker?.classList.add("officemap-hide-markers")
        }

        switch (mapEntityType) {
            case MapEntityType.Employee:
                let employee = object as Employee
                this.searchMarker = this.markerFactory.createEmployeeMarker(employee)
                this.searchMarker?.addTo(this.leaflet_map)
                this.searchMarker?.openPopup()
                break;
            case MapEntityType.Room:
                let room = object as Room
                this.searchMarker = this.markerFactory.createRoomMarker(room)
                this.searchMarker?.addTo(this.leaflet_map)
                this.searchMarker?.openPopup()
                break;
            case MapEntityType.Printer:
                let printer = object as Printer
                this.searchMarker = this.markerFactory.createPrinterMarker(printer)
                this.searchMarker?.addTo(this.leaflet_map)
                this.searchMarker?.openPopup()
                break;
            case MapEntityType.Custom:
                let latlng = object as LatLng
                this.searchMarker = this.markerFactory.createCustomMarker(latlng)
                this.searchMarker?.addTo(this.leaflet_map)
                this.searchMarker?.openPopup()
                break;
        }

        if(this.searchMarker !== undefined){
            this.searchMarker.on('popupclose', () => {
                let markers = document.getElementsByClassName("officemap-hide-markers");
                while (markers.length) {
                    markers[0].classList.remove("officemap-hide-markers")
                }

                this.searchMarker?.remove()
                this.searchMarker = undefined
            })
        }
    }

    private async constructMap(parent: Element){
        let thisMap = this

        // develop popup to create the polygon and marker coordinates for the rooms printers, and employees
        if (environmentVariables.webpack_mode === 'development') {
            // var popup = L.popup();
            //
            // function onMapClick(e: LeafletMouseEvent) {
            //     popup
            //         .setLatLng(e.latlng)
            //         .setContent("You clicked the map at " + e.latlng.toString())
            //         .openOn(thisMap.leaflet_map);
            // }
            //
            // this.leaflet_map.on('click', onMapClick);
        }
        function onZoom(e: any) {

            console.log(thisMap.leaflet_map.getZoom())
        }
        this.leaflet_map.on('zoom', onZoom);
    }

    private loadSearchUrlParameter(): [MapEntityType, string] | [MapEntityType, LatLng] | undefined {
        // get URL search parameters
        let browser_url = new URL(window.location.href);
        let url_search_parameters = browser_url.searchParams

        let mapEntityType: MapEntityType | undefined;
        let id: number | undefined;
        if(url_search_parameters.has("employee")){
            mapEntityType = MapEntityType.Employee
            id = Number(url_search_parameters.get("employee"))
            return [mapEntityType, id.toString()]
        }

        if(url_search_parameters.has("room")){
            mapEntityType = MapEntityType.Room
            id = Number(url_search_parameters.get("room"))
            return [mapEntityType, id.toString()]
        }

        if(url_search_parameters.has("printer")){
            mapEntityType = MapEntityType.Printer
            id = Number(url_search_parameters.get("printer"))
            return [mapEntityType, id.toString()]
        }

        if(url_search_parameters.has("custom")){
            mapEntityType = MapEntityType.Custom
            let latlng = url_search_parameters.get("custom")?.split(',')
            if(latlng !== undefined && latlng.length === 2){
                let convertedLat = Number(latlng[0])
                let convertedLng = Number(latlng[1])
                if(!isNaN(convertedLat) && !isNaN(convertedLng)) {
                    return [mapEntityType, new LatLng(convertedLat,convertedLng)]
                }
            }
        }

        return undefined
    }
}

export enum MapEntityType {
    Employee,
    Room,
    Printer,
    Custom
}