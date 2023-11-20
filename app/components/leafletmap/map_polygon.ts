import {InfoPanel} from "./info_panel";
import {CategoryMarkerIcon} from "./map_marker_icon";
import MarkerIconRoom from "@/public/images/glyph-marker-icon-room.svg";
import L from "leaflet";
import {PopupContent} from "./popup_content";
import {MapEntityType} from "@/app/components/leafletmap/map_entity";
import {ApiLeafletLatLng, Room} from "@/app/api/api";

export class PolygonFactory {
    private infoPanel: InfoPanel

    constructor(infoPanel: InfoPanel) {
        this.infoPanel = infoPanel
    }

    public createRoomPolygon(room: Room, colorString: string){
        let dataMap = new Map<string,string>([
            ['Type', room.type],
            ['Details', room.details],
        ])
        let polygon = this.createCategoryPolygon(room.shape.coordinates, room.name,room.name,room.name, dataMap, dataMap,
            colorString, MarkerIconRoom.src, 'meeting_room', room.id.toString(),MapEntityType.Room)

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
                .bindPopup(new PopupContent(popupTitle, popupDataMap, markerIcon.htmlWithoutTitle(),entityId,entityType).getHtml())
        firstShape.on('mouseover', () =>{
            firstShape.setStyle({
                stroke:true,
                weight: 3,
            })
            this.infoPanel.setData(infoPanelTitle, infoPanelDataMap, markerIcon.htmlWithoutTitle())
            this.infoPanel.show(true)
        })
        firstShape.on('mouseout', () =>{
            firstShape.setStyle({
                stroke:false
            })
            this.infoPanel.show(false)
        })

        return firstShape
    }
}