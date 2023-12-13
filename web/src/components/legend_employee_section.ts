import L from "leaflet";
import {Employee} from "../api/api";
import {MarkerFactory} from "./map_marker";
import {SubToggle} from "./sub_toggle";
import {MainToggle} from "./main_toggle";

export class LegendEmployeeSection {
    private readonly root;
    private readonly subToggles: Map<string,SubToggle>;
    private readonly mainToggle: MainToggle;
    private readonly markers: Map<string,  L.Marker<any>[]>;
    private readonly marker_cluster:  L.MarkerClusterGroup
    private readonly leaflet_map: L.Map

    constructor(leaflet_map: L.Map, markerFactory: MarkerFactory, employees: Employee[]) {
        this.markers = new Map<string, L.Marker<any>[]>()
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

        this.marker_cluster = L.markerClusterGroup({
            maxClusterRadius: 20,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });
        this.leaflet_map.addLayer(this.marker_cluster)
        for (const employee of employees) {
            let department_markers = this.markers.get(employee.department)
            let marker = markerFactory.createEmployeeMarker(employee)

            if(department_markers === undefined) {
                this.marker_cluster.addLayer(marker)
                this.markers.set(employee.department, [marker])
                // create sub toggle
                let subToggleClassName = 'officemap-employee-sub-toggle'
                let subToggle = new SubToggle((checked) => {
                    this.toggleLayerGroup(checked, employee.department)
                }, employee.department, subToggleClassName, 'person')
                this.subToggles.set(employee.department, subToggle)
                legendSection.append(subToggle.html())
            } else {
                this.marker_cluster.addLayer(marker)
                department_markers.push(marker)
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

    private toggleLayerGroup(checked: boolean, department: string){
        let markers = this.markers.get(department)
        if(markers !== undefined){
            if (checked){
                for (const marker of markers) {
                    this.marker_cluster.addLayer(marker)
                }
            } else {
                for (const marker of markers) {
                    this.marker_cluster.removeLayer(marker)
                }
            }
        }
    }

    public remove(){
        this.leaflet_map.removeLayer(this.marker_cluster)
    }

    public html():HTMLDivElement{
        return this.root
    }

}