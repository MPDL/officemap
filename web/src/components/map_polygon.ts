import {InfoPanel} from "./info_panel";
import {ApiLeafletLatLng, Room} from "../api/api";
import {CategoryMarkerIcon} from "./map_marker_icon";
import MarkerIconRoom from "../../assets/images/glyph-marker-icon-room.svg";
import L from "leaflet";
import {PopupContent} from "./popup_content";
import {MapEntityType} from "./leaflet_map";
import {SettingsData} from "../configuration/officemap_settings";

export class PolygonFactory {
    private infoPanel: InfoPanel | undefined
    private settings_data: SettingsData

    constructor(infoPanel: InfoPanel | undefined, settings_data: SettingsData) {
        this.infoPanel = infoPanel
        this.settings_data = settings_data
    }

    public createRoomPolygon(room: Room, colorString: string){
        let dataMap = new Map<string,string>([
            ['Identifier', room.stringId],
            ['Type', room.type],
            ['Details', room.details],
        ])
        let polygon = this.createCategoryPolygon(room.shape.coordinates, room.name,room.name,room.name, dataMap, dataMap,
            colorString, MarkerIconRoom, 'meeting_room', room.stringId ,MapEntityType.Room)

        return polygon
    }

    private createCategoryPolygon(coordinates: ApiLeafletLatLng[],infoPanelTitle: string, popupTitle: string,
                                 markerTitle: string, popupDataMap: Map<string,string>, infoPanelDataMap: Map<string,string>,
                                 colorString: string, markerIconRoom: any , markerGlyphRoom: any,
                                  entityId: string, entityType: MapEntityType){
        let markerIcon = new CategoryMarkerIcon(markerTitle, markerIconRoom, markerGlyphRoom)
        let firstShape =
            L.polygon([coordinates.map(coordinate => L.latLng(coordinate.lat, coordinate.lng))], {
                fillColor: colorString,
                color: colorString,
                fillOpacity: 0.5,
                stroke: false
            })
                .bindPopup(new PopupContent(popupTitle, popupDataMap, markerIcon.htmlWithoutTitle(),entityId, !this.settings_data.installation_mode, entityType).getHtml())
        firstShape.on('mouseover', () =>{
            firstShape.setStyle({
                stroke:true,
                weight: 3,
            })
            this.infoPanel?.setData(infoPanelTitle, infoPanelDataMap, markerIcon.htmlWithoutTitle())
            this.infoPanel?.show(true)
        })
        firstShape.on('mouseout', () =>{
            firstShape.setStyle({
                stroke:false
            })
            this.infoPanel?.show(false)
        })

        return firstShape
    }
}