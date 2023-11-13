import L from "leaflet";
import {Employee} from "../api/api";
import {MarkerFactory} from "./map_marker";
import {SubToggle} from "./sub_toggle";
import {MainToggle} from "./main_toggle";

export class LegendEmployeeSection {
    private readonly root;
    private readonly subToggles: Map<string,SubToggle>;
    private readonly mainToggle: MainToggle;
    private readonly markers: Map<string, L.MarkerClusterGroup>;
    private readonly leaflet_map: L.Map

    constructor(leaflet_map: L.Map, markerFactory: MarkerFactory, employees: Employee[]) {
        this.markers = new Map<string, L.MarkerClusterGroup>()
        this.leaflet_map = leaflet_map
        this.subToggles = new Map<string,SubToggle>();
        let legendSection = document.createElement('div')
        legendSection.setAttribute('class', 'officemap-legend-section')

        let mainToggleClassName = 'officemap-employee-main-toggle'

        this.mainToggle = new MainToggle(
            (checked) => this.toggleMainToggle(checked),
            'Employees',
            mainToggleClassName, 'person')
        legendSection.append(this.mainToggle.html())

        for (const employee of employees) {
            let department = this.markers.get(employee.department)
            let marker = markerFactory.createEmployeeMarker(employee)

            if(department === undefined) {
                let markerClusterGroup = L.markerClusterGroup();
                markerClusterGroup.addLayer(marker)
                this.markers.set(employee.department, markerClusterGroup)
                // create sub toggle
                let subToggleClassName = 'officemap-employee-sub-toggle'
                let subToggle = new SubToggle((checked) => {
                    this.toggleLayerGroup(checked, markerClusterGroup)
                }, employee.department, subToggleClassName, 'person')
                this.subToggles.set(employee.department, subToggle)
                legendSection.append(subToggle.html())
            } else {
                department.addLayer(marker)
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

}