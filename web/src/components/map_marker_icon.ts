import L from "leaflet";
import CustomMarkerIconSvg from "../../assets/images/glyph-marker-icon-custom.svg";
import CustomMarkerIconGlyph from "../../assets/images/marker-glyph-custom.svg";

export class CategoryMarkerIcon {
    private readonly _html: string
    private readonly _htmlWithoutTitle: string
    private readonly _divIcon: L.DivIcon
    constructor(title: string, baseIcon: any, iconGlyph: any) {
        this._html = this.createCategoryMarkerIconHtml(baseIcon, iconGlyph, title)
        this._htmlWithoutTitle = this.createCategoryMarkerIconHtml(baseIcon, iconGlyph)

        let markerIcon = L.divIcon({
            html: this._html,
            className: '',
            iconSize: [100,56],
            iconAnchor:  [50, 56],
            popupAnchor: [0,-56]
        })

        this._divIcon = markerIcon
    }
    private createCategoryMarkerIconHtml(baseIcon: any, iconGlyph: string, title?: string): string {
        let markerIconHtml = ''

        if(title !== undefined){
            markerIconHtml =
                `<div class="officemap-marker-icon">
                <div class="officemap-marker-icon-title">${title}</div>
                <div class="officemap-marker-icon-pin" style="background-image:  url(${baseIcon})">
                    <span class="officemap-marker-icon-glyph material-symbols-rounded officemap-symbol-base">${iconGlyph}</span>
                </div>
            </div>`
        } else {
            markerIconHtml =
                `<div class="officemap-marker-icon">
                <div class="officemap-marker-icon-pin" style="background-image:  url(${baseIcon})">
                    <span class="officemap-marker-icon-glyph material-symbols-rounded officemap-symbol-base">${iconGlyph}</span>
                </div>
            </div>`
        }

        return markerIconHtml;
    }

    public html(){
        return this._html
    }

    public htmlWithoutTitle(){
        return this._htmlWithoutTitle
    }

    public divIcon(){
        return this._divIcon
    }
}

export class CustomMarkerIcon {
    private readonly _html: string
    private readonly _divIcon: L.DivIcon
    constructor() {
        this._html = this.createCustomMarkerIconHtml()

        let markerIcon = L.divIcon({
            html: this._html,
            className: '',
            iconSize: [25,41],
            iconAnchor:  [12, 41],
            popupAnchor: [0,-41]
        })

        this._divIcon = markerIcon
    }
    private createCustomMarkerIconHtml(): string {
        let markerIconHtml =
            `<div class="officemap-marker-icon">
                <div class="officemap-marker-icon-pin" style="background-image:  url(${CustomMarkerIconSvg})">
                    <span class="officemap-marker-icon-glyph material-symbols-rounded officemap-symbol-base">flag</span>
                </div>
            </div>`
        return markerIconHtml;
    }

    public html(){
        return this._html
    }

    public divIcon(){
        return this._divIcon
    }
}