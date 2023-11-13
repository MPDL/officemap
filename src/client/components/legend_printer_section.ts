import L from "leaflet";
import {Printer} from "../api/api";
import {MarkerFactory} from "./map_marker";
import {MainToggle} from "./main_toggle";

export class LegendPrinterSection {
    private readonly root;
    private readonly mainToggle: MainToggle
    private readonly leaflet_map: L.Map
    private readonly layerGroupPrinter: L.LayerGroup;

    constructor(leaflet_map: L.Map, markerFactory: MarkerFactory, printers: Printer[]) {
        this.leaflet_map = leaflet_map
        let legendSection = document.createElement('div')
        legendSection.setAttribute('class', 'officemap-legend-section')

        this.layerGroupPrinter = L.layerGroup()

        for (const printer of printers) {
            let printerMarker = markerFactory.createPrinterMarker(printer)
            this.layerGroupPrinter.addLayer(printerMarker)
        }

        let mainToggleClassName = 'officemap-printer-main-toggle'
        let toggleColor = '#c46512'
        this.mainToggle = new MainToggle((checked) => {
            this.toggleLayerGroup(checked, this.layerGroupPrinter)
        }, 'Printer', mainToggleClassName, 'print').withColor(toggleColor, toggleColor, mainToggleClassName)
        legendSection.append(this.mainToggle.html())

        this.root = legendSection
    }

    private toggleLayerGroup(checked: boolean, layer: L.LayerGroup){
        if (checked){
            this.leaflet_map.addLayer(layer);
        } else {
            this.leaflet_map.removeLayer(layer);
        }
    }

    public activate(){
        return this.mainToggle.switch(true)
    }

    public html():HTMLDivElement{
        return this.root
    }

}