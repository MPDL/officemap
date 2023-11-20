import L from "leaflet";
import CustomMarkerIconSvg from "@/public/images/glyph-marker-icon-custom.svg";

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
            markerIconHtml = createMarkerIcon(iconGlyph,baseIcon, title)
        } else {
            markerIconHtml = createMarkerIcon(iconGlyph,baseIcon)
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
        return createMarkerIcon('flag', CustomMarkerIconSvg.src);
    }

    public html(){
        return this._html
    }

    public divIcon(){
        return this._divIcon
    }
}

function createMarkerIcon(icon: string, iconSvgSrc: string, title?: string){
    let titleHtml = '';
    if(title){
        titleHtml = `<div class="text-[10px] w-[100px] text-center whitespace-nowrap overflow-hidden overflow-ellipsis font-officemap text-officemap-black" style="text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">${title}</div>`
    }

    return `<div class="flex flex-col items-center">
                ${titleHtml}
                <div class="bg-no-repeat bg-contain bg-center min-h-[41px] min-w-[25px] text-center" style="background-image:  url(${iconSvgSrc})">
                    <span class="font-officemap-icon mt-1 text-officemap-white text-base">${icon}</span>
                </div>
            </div>`
}