import L, {LatLngExpression} from "leaflet";
import {CategoryMarkerIcon, CustomMarkerIcon} from "./map_marker_icon";
import {PopupContent} from "./popup_content";
import {Employee, Printer, Room} from "../api/api";
import MarkerIconEmployee from "../../assets/images/glyph-marker-icon-employee.svg"
import MarkerIconRoom from "../../assets/images/glyph-marker-icon-room.svg"
import MarkerIconPrinter from "../../assets/images/glyph-marker-icon-printer.svg"
import {InfoPanel} from "./info_panel";
import {MapEntityType} from "./leaflet_map";
import {SettingsData} from "../configuration/officemap_settings";

export class MarkerFactory{
    private infoPanel: InfoPanel | undefined
    private settings_data: SettingsData

    constructor(infoPanel: InfoPanel | undefined, settings_data: SettingsData) {
        this.infoPanel = infoPanel
        this.settings_data = settings_data
    }
    public createEmployeeMarker(employee: Employee){
        let title = employee.firstname + ' ' + employee.lastname
        let dataMap = new Map<string,string>([
            ['Email', employee.email],
            ['Department', employee.department],
            ['Phone', employee.phone],
        ]);

        let marker = this.createCategoryMarker(title,title,dataMap,title,dataMap,employee.marker.lat,
            employee.marker.lng,MarkerIconEmployee, 'person', employee.stringId, MapEntityType.Employee)

        return marker
    }

    public createRoomMarker(room: Room){
        let title = room.name
        let dataMap = new Map<string,string>([
            ['Identifier', room.stringId],
            ['Type', room.type],
            ['Details', room.details],
        ])

        let marker = this.createCategoryMarker(title,title,dataMap,title,dataMap,room.marker.lat,
            room.marker.lng,MarkerIconRoom, 'meeting_room', room.stringId, MapEntityType.Room)

        return marker
    }

    public createPrinterMarker(printer: Printer){
        let title = printer.name
        let dataMap = new Map<string,string>([
            ['Model', printer.model]
        ])

        let marker = this.createCategoryMarker(title,title,dataMap,title,dataMap,
            printer.marker.lat,printer.marker.lng,MarkerIconPrinter, 'print', printer.id.toString(), MapEntityType.Printer)

        return marker
    }

    public createCustomMarker(latlng: LatLngExpression, draggable: boolean, title: string){
        let draggingState = false;

        let customMarkerIcon = new CustomMarkerIcon()
        let customMarker = new L.Marker(latlng, {
            icon: customMarkerIcon.divIcon(),
            draggable: draggable
        })

        let popupContent = new PopupContent(title,
            new Map<string, string>([['x',  customMarker.getLatLng().lng.toString()],
                ['y',  customMarker.getLatLng().lat.toString()]]),
            customMarkerIcon.html(),'', !this.settings_data.installation_mode, MapEntityType.Custom, customMarker.getLatLng().lat.toString(), customMarker.getLatLng().lng.toString())
        customMarker.bindPopup(popupContent.getHtml())

        if(this.infoPanel){
            customMarker.on('mouseover', (as) =>{
                if(!draggingState){
                    this.infoPanel!.setData('Custom location', new Map<string, string>([['x',  customMarker.getLatLng().lng.toString()],
                        ['y',  customMarker.getLatLng().lat.toString()]]), customMarkerIcon.html())
                    this.infoPanel!.show(true)
                }
            })
            customMarker.on('mouseout', () =>{
                if(!draggingState){
                    this.infoPanel!.show(false)
                }
            })
            customMarker.on('dragstart', () => {
                this.infoPanel!.show(false)
                draggingState = true
            })
            customMarker.on('dragend', () => {
                this.infoPanel!.show(false)
                draggingState = false
            })
        }

        return customMarker
    }


    private createCategoryMarker(markerTitle:string, popupTitle: string, popupDataMap: Map<string,string>, infoPanelTitle: string, infoPanelDataMap: Map<string,string>,
                          markerLat: number, markerLng: number, markerBaseIcon: any, markerIconGlyph: any, entityId: string, entityType: MapEntityType ): L.Marker{
        let markerIcon = new CategoryMarkerIcon(markerTitle, markerBaseIcon, markerIconGlyph)

        let marker = L.marker([markerLat, markerLng],
            {icon: markerIcon.divIcon()})
            .bindPopup(new PopupContent(popupTitle, popupDataMap, markerIcon.htmlWithoutTitle(),entityId, !this.settings_data.installation_mode, entityType).getHtml())

        marker.on('mouseover', () =>{
            this.infoPanel?.setData(infoPanelTitle, infoPanelDataMap, markerIcon.htmlWithoutTitle())
            this.infoPanel?.show(true)
        })
        marker.on('mouseout', () => {
            this.infoPanel?.show(false)
        })

        return marker;
    }
}

