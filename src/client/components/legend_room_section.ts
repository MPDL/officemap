import L from "leaflet";
import { Room} from "../api/api";
import {PolygonFactory} from "./map_polygon";
import {SubToggle} from "./sub_toggle";
import {MainToggle} from "./main_toggle";

export class LegendRoomSection {
    private readonly root;
    private readonly subToggles: Map<string,SubToggle>;
    private readonly mainToggle: MainToggle;
    private readonly roomShapes: Map<string, L.LayerGroup>;
    private readonly roomShapeColors: Map<string, string>;
    private readonly leaflet_map: L.Map
    private readonly polygonFactory: PolygonFactory;

    constructor(leaflet_map: L.Map, polygonFactory: PolygonFactory, rooms: Room[]) {
        this.roomShapes = new Map<string, L.LayerGroup>();
        this.polygonFactory = polygonFactory
        this.roomShapeColors = new Map<string, string>();
        this.leaflet_map = leaflet_map
        this.subToggles = new Map<string,SubToggle>();
        let legendSection = document.createElement('div')
        legendSection.setAttribute('class', 'officemap-legend-section')

        let partialRoomColor = 'hsl(146, 50%, '
        let startLightness = 40
        let toggleBackgroundColor = 'linear-gradient(to left,'

        rooms.forEach((room, index) => {
            if(index === rooms.length-1) {
                toggleBackgroundColor += partialRoomColor+startLightness+'%))'
            } else {
                toggleBackgroundColor += partialRoomColor+startLightness+'%),'
            }
            startLightness += 10
        })
        let mainToggleClassName = 'officemap-room-main-toggle'

        this.mainToggle = new MainToggle((checked) => this.toggleMainToggle(checked),
            'Rooms', mainToggleClassName,'meeting_room').withColor(toggleBackgroundColor, partialRoomColor+40+'%)', mainToggleClassName)
        legendSection.append(this.mainToggle.html())

        startLightness = 40
        for (const room of rooms) {
            let roomType = this.roomShapes.get(room.type)

            if(roomType === undefined) {
                let colorString = partialRoomColor+startLightness+'%)'
                let shape = this.polygonFactory.createRoomPolygon(room, colorString)
                let layerGroup = L.layerGroup()
                layerGroup.addLayer(shape)
                this.roomShapes.set(room.type, layerGroup)
                this.roomShapeColors.set(room.type, colorString)
                let cssClassName = 'officemap-room-color-' + startLightness
                this.createCssClass(colorString, cssClassName)
                let subToggle = new SubToggle((checked) => {
                    this.toggleLayerGroup(checked, layerGroup)
                }, room.type, cssClassName, 'meeting_room')
                this.subToggles.set(subToggle.getTitle(), subToggle)
                startLightness += 10
                legendSection.append(subToggle.html())
            } else {
                let roomColor = this.roomShapeColors.get(room.type)
                if(roomColor !== undefined){
                    let shape = this.polygonFactory.createRoomPolygon(room, roomColor)
                    roomType.addLayer(shape)
                }
            }
        }

        this.root = legendSection
    }

    public deactivateSubToggle(label: string){
        this.subToggles.get(label)?.switch(false)
    }

    public activateAll(){
        return this.mainToggle.switch(true)
    }

    private toggleMainToggle(checked: boolean){
        for (const toggle of this.subToggles.values()) {
            toggle.switch(checked)
        }
    }

    private toggleLayerGroup(checked: boolean, layer: L.LayerGroup){
        if (checked){
            this.leaflet_map.addLayer(layer);
        } else {
            this.leaflet_map.removeLayer(layer);
        }
    }

    public html():HTMLDivElement{
        return this.root
    }

    private createCssClass(colorString: string, className: string){
        let styles = `input:checked + .slider.${className} {background-color: ${colorString};}`
            +`input:focus + .slider.${className}  {box-shadow: 0 0 1px ${colorString};}`

        let styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)
    }

}