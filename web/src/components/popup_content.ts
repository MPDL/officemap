import {MapEntityType} from "./leaflet_map";
export class PopupContent {
    private readonly title: string = 'title'
    private readonly entityId: string = ''
    private readonly entityType: MapEntityType;
    private readonly data: Map<string, string> = new Map([["key", "value"]]);
    private readonly markerHtml: string = ''
    private readonly root:  HTMLDivElement;
    private readonly withButton: boolean;
    private readonly lat:  string | undefined;
    private readonly lng:  string | undefined;
    private button:  HTMLButtonElement | undefined;

    constructor(title: string, data: Map<string, string>, markerHtml: string, entityId: string, withButton: boolean, entityType: MapEntityType, lat?: string, lng?:string) {
        this.root = document.createElement('div')
        this.root.setAttribute('class', 'officemap-popup')
        this.entityType = entityType
        this.title = title
        this.data = data
        this.withButton = withButton
        this.entityId = entityId
        this.lat = lat
        this.lng = lng
        this.markerHtml = markerHtml
        this.renderHtml()
    }

    private renderDataHtml(): string{
        let dataDiv = document.createElement('div')
        dataDiv.setAttribute('class', 'officemap-popup-data')

        for (let [key, value] of this.data) {
            let dataPairDiv = document.createElement('div')
            let dataPairKeySpan = document.createElement('span')
            dataPairKeySpan.setAttribute('style', 'font-weight: bold;')
            dataPairKeySpan.textContent = key + ': '
            let dataPairValueSpan = document.createElement('span')
            dataPairValueSpan.textContent = value

            dataPairDiv.append(dataPairKeySpan)
            dataPairDiv.append(dataPairValueSpan)
            dataDiv.append(dataPairDiv)
        }

        return dataDiv.outerHTML
    }

    private renderButton(){
        if(!this.withButton){
            return ''
        }

        let btn = document.createElement('button')
        btn.setAttribute('class', 'officemap-btn')

        let mapEntityAsString;
        let param = ''
        switch (this.entityType) {
            case MapEntityType.Employee:
                mapEntityAsString = 'employee'
                param = this.entityId
                break;
            case MapEntityType.Room:
                mapEntityAsString = 'room'
                param = this.entityId
                break;
            case MapEntityType.Printer:
                mapEntityAsString = 'printer'
                param = this.entityId
                break;
            case MapEntityType.Custom:
                mapEntityAsString = 'custom'
                param = `${this.lat},${this.lng}`
                break;
        }
        if(mapEntityAsString !== undefined){
            // otherwise there is no way to add the event listener after the op up is rendered
            // adding event listener would need to be called after the pop up content is added to the DOM, otherwise this event listener will not trigger
            btn.setAttribute('onclick', `navigator.clipboard.writeText(location.protocol + '//' + location.host + location.pathname + '?${mapEntityAsString}=${param}')`)
        }

        btn.innerHTML = `<span class="officemap-btn-icon material-symbols-rounded officemap-symbol-base">pin_drop</span> Copy location link`

        this.button = btn
        return `<div class="officemap-popup-btn-container">${btn.outerHTML}</div>`
    }

    private renderHtml(){
        let renderedHtml = `
            <div class="officemap-popup-container">
                <div class="officemap-popup-container-marker">${this.markerHtml}</div>
                <div class="officemap-popup-container-content">
                    <div class="officemap-popup-title">${this.title}</div>
                    ${this.renderDataHtml()}
                    ${this.renderButton()}
                </div>
            </div>
        `
        this.root.innerHTML = renderedHtml
    }

    getHtml(): HTMLDivElement{
        this.renderHtml();
        return this.root
    }
}