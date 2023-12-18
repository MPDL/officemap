import L, {LatLng, LatLngBounds} from 'leaflet';
import {Employee, Printer, Room} from "@/app/api/api";
import {InfoPanel} from "@/app/components/LeafletMap/info_panel";
import {MarkerFactory} from "@/app/components/LeafletMap/map_marker_factory";
import {MapEntityType} from "@/app/components/LeafletMap/map_entity";
import {PolygonFactory} from "@/app/components/LeafletMap/map_polygon";
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import {FilterGroupState} from "@/app/components/PageContent/State";

export class LeafletMapController {
    private readonly map: L.Map
    private readonly bounds :LatLngBounds
    private readonly markerFactory: MarkerFactory
    private readonly polygonFactory: PolygonFactory
    private readonly infoPanel: InfoPanel | undefined
    private employee_markers : L.MarkerClusterGroup | undefined;
    private room_markers: L.LayerGroup | undefined;
    private printer_markers: L.LayerGroup | undefined;
    private searchMarker: L.Marker | undefined
    private customMarker: L.Marker | undefined
    private customMarkerInfoText:  L.Marker | undefined
    private isBackgroundImageSet: boolean = false;
    constructor(domNode: HTMLElement, rooms: Room[], employees: Employee[], printers: Printer[], groundfloorImageObjectUrl: string | undefined, installation_mode: boolean) {
        this.map = L.map("officemap-map", {
            attributionControl: false,
            crs: L.CRS.Simple,
            maxZoom: 0,
            minZoom: -2,
            zoomSnap: 0.25,
            zoom: -1,
            zoomDelta: 0.25,
            wheelPxPerZoomLevel: 400
        });
        this.bounds = new LatLngBounds([[0,0], [2718, 3930]]);
        if(groundfloorImageObjectUrl !== undefined){
            L.imageOverlay(groundfloorImageObjectUrl, this.bounds).addTo(this.map);
            this.isBackgroundImageSet = true
        }
        this.map.fitBounds(this.bounds);

        // modify leaflet html for print feature
        let leaflet_mapview = document.getElementsByClassName('leaflet-pane leaflet-map-pane')
        if(leaflet_mapview.length === 1) {
            leaflet_mapview[0].classList.add('officemap-print-map-section')
        }

        // create components
        if(!installation_mode) {
            this.infoPanel = new InfoPanel()
        }
        this.markerFactory = new MarkerFactory(this.infoPanel, installation_mode)
        this.polygonFactory = new PolygonFactory(this.infoPanel, installation_mode)

        let thisMap = this
        // add info panel
        if(!installation_mode && thisMap.infoPanel) {
            let infoPanelControl: L.Control = new L.Control({position: 'bottomleft'});
            infoPanelControl.onAdd = function (map) {
                return thisMap.infoPanel!.getHtml();
            };
            infoPanelControl.addTo(this.map);
        }

        // create custom marker and info text
        if(!installation_mode) {
            let customMarkerTextIcon = new L.DivIcon({
                html: `<div style="font-family: 'OfficeMapBold', sans-serif; opacity: 0.4; text-align: center; width: 200px">You can drag and drop me for a custom location.</div>`,
                className: '',
                iconSize: [200,36],
                iconAnchor:  [100, 0]
            })
            this.customMarkerInfoText = new L.Marker([1370,1100], {icon: customMarkerTextIcon, interactive: false})
            this.customMarkerInfoText.addTo(this.map)
            this.customMarker = this.markerFactory.createCustomMarker([1408,1100], true, 'Custom location')
            this.makeRecreatingCustomMarker()
            this.customMarker.addTo(this.map)

        } else {
            this.markerFactory.createCustomMarker([975, 3651], false, 'Your location').addTo(this.map)
        }

    }

    public setBackgroundImageOnce(groundfloorImageObjectUrl: string | undefined) {
        if (!this.isBackgroundImageSet && groundfloorImageObjectUrl !== undefined){
            L.imageOverlay(groundfloorImageObjectUrl, this.bounds).addTo(this.map);
            this.isBackgroundImageSet = true
        }
    }

    public printMap(){
        window.print()
    }

    public fitMapToWindow(){
        this.map.fitBounds(this.bounds);
    }

    private makeRecreatingCustomMarker(){
        if(this.customMarker){
            this.customMarker.on('dragend', (sd) => {
                // TODO> only dev
                //navigator.clipboard.writeText(`{"lat": ${this.customMarker.getLatLng().lat},"lng": ${this.customMarker.getLatLng().lng}}`)
                let newCustomMarker = this.markerFactory.createCustomMarker([this.customMarker!.getLatLng().lat, this.customMarker!.getLatLng().lng], true, 'Custom location')
                this.customMarker!.remove()
                this.customMarker = newCustomMarker
                this.makeRecreatingCustomMarker()
                this.customMarker.addTo(this.map)
                this.customMarkerInfoText?.remove()
            })
            this.customMarker.on('dragstart', (_) => {
                // delete search marker by triggering the 'close pop up event'
                this.searchMarker?.closePopup()
            })
        }
    }

    public markEntityOnMap(employee: Employee, room: Room, printer: Printer, custom: LatLng | undefined,
                           setUrlSearchParameter: (employee: Employee | null, room: Room | null, printer: Printer | null, custom: LatLng | undefined) => void){
        if(!employee && !room && !printer && !custom){
            return;
        }

        // if there was a previous search marker then delete it by triggering the 'close pop up' event
        if(this.searchMarker !== undefined){
            this.searchMarker.closePopup()
        }
        setUrlSearchParameter(employee, room, printer, custom)
        let markers = document.getElementsByClassName("leaflet-marker-icon");
        for (let i = 0; i <markers.length; i++) {
            let marker = markers.item(i)
            marker?.classList.add("officemap-hide-markers")
        }

        const registerPopUp = () => {
            if(this.searchMarker !== undefined){
                this.searchMarker.on('popupclose', () => {
                    let markers = document.getElementsByClassName("officemap-hide-markers");
                    while (markers.length) {
                        markers[0].classList.remove("officemap-hide-markers")
                    }

                    this.searchMarker?.remove()
                    this.searchMarker = undefined
                    setUrlSearchParameter(null, null, null, undefined)
                })
            }
        }

        if(employee){
            this.searchMarker = this.markerFactory.createEmployeeMarker(employee)
            this.searchMarker?.addTo(this.map)
            this.searchMarker?.openPopup()
            registerPopUp()
            return
        }
        if(room){
            this.searchMarker = this.markerFactory.createRoomMarker(room)
            this.searchMarker?.addTo(this.map)
            this.searchMarker?.openPopup()
            registerPopUp()
            return
        }
        if(printer){
            this.searchMarker = this.markerFactory.createPrinterMarker(printer)
            this.searchMarker?.addTo(this.map)
            this.searchMarker?.openPopup()
            registerPopUp()
            return
        }
        if(custom){
            this.searchMarker = this.markerFactory.createCustomMarker(custom, false, 'Custom location')
            this.searchMarker?.addTo(this.map)
            this.searchMarker?.openPopup()
            registerPopUp()
            return
        }
    }

    public filterEmployees(employees: Employee[], employeeFilter: FilterGroupState){
        this.employee_markers?.removeFrom(this.map)
        this.employee_markers = L.markerClusterGroup({
            maxClusterRadius: 20,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });
        this.map.addLayer(this.employee_markers)
        employees.filter(employee => employeeFilter.toggles.get(employee.department)).forEach(
            employee => this.employee_markers?.addLayer(this.markerFactory.createEmployeeMarker(employee)))
    }

    public filterRooms(rooms: Room[], roomFilter: FilterGroupState){
        this.room_markers?.removeFrom(this.map)
        this.room_markers = L.layerGroup()
        this.map.addLayer(this.room_markers)
        rooms.filter(room => roomFilter.toggles.get(room.type)).forEach(
            room => this.room_markers?.addLayer(this.polygonFactory.createRoomPolygon(room, roomFilter.colors.get(room.type) || "hsl(146, 50%, 40%)")))
    }

    public filterPrinter(printers: Printer[], printerFilter: FilterGroupState){
        this.printer_markers?.removeFrom(this.map)
        this.printer_markers = L.layerGroup()
        this.map.addLayer(this.printer_markers)
        printers.filter(printer => printerFilter.mainToggle.state).forEach(
            printer => this.printer_markers?.addLayer(this.markerFactory.createPrinterMarker(printer)))
    }
}
