import L, {LatLngBounds} from 'leaflet';
import {Employee, Printer, Room} from "@/app/api/api";

export class LeafletMapController {
    private readonly map: L.Map
    private readonly bounds :LatLngBounds
    private isBackgroundImageSet: boolean = false;
    constructor(domNode: HTMLElement, rooms: Room[], employees: Employee[], printers: Printer[], groundfloorImageObjectUrl: string | undefined) {
        this.map = L.map(domNode, {
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
    }

    public setBackgroundImageOnce(groundfloorImageObjectUrl: string | undefined) {
        if (!this.isBackgroundImageSet && groundfloorImageObjectUrl !== undefined){
            L.imageOverlay(groundfloorImageObjectUrl, this.bounds).addTo(this.map);
            this.isBackgroundImageSet = true
        }
    }
}