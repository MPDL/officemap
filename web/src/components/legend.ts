import {Employee, Printer, Room} from "../api/api";
import L from "leaflet";
import {MarkerFactory} from "./map_marker";
import {PolygonFactory} from "./map_polygon";
import {LegendEmployeeSection} from "./legend_employee_section";
import {LegendRoomSection} from "./legend_room_section";
import {LegendPrinterSection} from "./legend_printer_section";

export class Legend {
    private readonly leaflet_map: L.Map
    private readonly root: HTMLDivElement;
    private readonly employees: Employee[];
    private readonly rooms: Room[];
    private readonly printers: Printer[];
    private readonly markerFactory: MarkerFactory;
    private readonly polygonFactory: PolygonFactory;
    private readonly employeeSection: LegendEmployeeSection;
    private readonly roomsSection:  LegendRoomSection;
    private readonly printersSection: LegendPrinterSection;
    private collapsed: boolean;

    constructor(parent: Element, leaflet_map: L.Map ,legendEmployees: Employee[], legendRooms: Room[], legendPrinters: Printer[],
                markerFactory: MarkerFactory, polygonFactory: PolygonFactory) {
        this.markerFactory = markerFactory;
        this.polygonFactory = polygonFactory;
        this.leaflet_map = leaflet_map
        this.employees = legendEmployees;
        this.rooms = legendRooms
        this.printers = legendPrinters
        this.collapsed = false

        this.root = document.createElement('div')
        this.root.setAttribute('class', 'officemap-legend')

        let legendContent = document.createElement('div')
        legendContent.setAttribute('class', 'officemap-legend-content')

        let legendToggle = document.createElement('div')
        legendToggle.setAttribute('class', 'officemap-legend-toggle')
        legendToggle.innerHTML = '<span class="material-symbols-rounded officemap-symbol-base">close</span>'

        let legendTitle = document.createElement('div')
        legendTitle.setAttribute('class', 'officemap-legent-title')
        legendTitle.textContent = 'Filter'

        let legendSections = document.createElement('div')
        legendSections.setAttribute('class', 'officemap-legend-sections')

        this.employeeSection = new LegendEmployeeSection(this.leaflet_map, this.markerFactory, this.employees)

        this.roomsSection = new LegendRoomSection(this.leaflet_map, this.polygonFactory, this.rooms)

        this.printersSection = new LegendPrinterSection(this.leaflet_map, this.markerFactory, this.printers)

        legendSections.append(this.employeeSection.html())
        legendSections.append(this.roomsSection.html())
        legendSections.append(this.printersSection.html())
        legendContent.append(legendTitle)
        legendContent.append(legendSections)

        this.root.append(legendToggle)
        this.root.append(legendContent)

        parent.append(this.root)

        legendToggle.addEventListener('click', () => {
            if(this.collapsed) {
                legendToggle.innerHTML = '<span class="material-symbols-rounded officemap-symbol-base">close</span>'
                this.root.setAttribute('class', 'officemap-legend')
                this.collapsed = false
            } else {
                legendToggle.innerHTML = '<span class="material-symbols-rounded officemap-symbol-base">tune</span>'
                this.root.setAttribute('class', 'officemap-legend collapsed')
                this.collapsed = true
            }

        })

        this.employeeSection.activateAll()
        this.roomsSection.activateAll()
        this.printersSection.activate()
    }


    public getHtml(): HTMLDivElement{
        return this.root;
    }

    public remove(): void {
        this.employeeSection.remove()
        this.roomsSection.remove()
        this.printersSection.remove()
        this.root.remove()
    }
}