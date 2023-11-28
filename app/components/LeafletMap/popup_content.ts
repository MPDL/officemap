import {MapEntityType} from "@/app/components/LeafletMap/map_entity";

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

    constructor(title: string, data: Map<string, string>, markerHtml: string, entityId: string, withButton: boolean, entityType: MapEntityType, lat?: string, lng?:string) {
        this.root = document.createElement('div')
        this.entityType = entityType
        this.title = title
        this.data = data
        this.entityId = entityId
        this.lat = lat
        this.withButton = withButton
        this.lng = lng
        this.markerHtml = markerHtml
        this.renderHtml()
    }

    private renderDataHtml(): string{
        let dataDiv = document.createElement('div')

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

        // otherwise there is no way to add the event listener after the op up is rendered
        // adding event listener would need to be called after the pop up content is added to the DOM, otherwise this event listener will not trigger
        let onClickScript = `navigator.clipboard.writeText(location.protocol + '//' + location.host + location.pathname + '?${mapEntityAsString}=${param}')`

        return `<div class="pt-3"><button class="bg-officemap-blue-400 hover:bg-officemap-blue-700 border-none text-officemap-white py-3 px-4 text-base cursor-pointer rounded-xl leading-[1.15]" onclick=${onClickScript})>
                <span class="font-officemap-icon inline-block relative text-officemap-white text-lg align-bottom leading-none">pin_drop</span> Copy location link
            </button></div>`
    }

    private renderHtml(){
        let renderedHtml = `
            <div class="flex">
                <div class="my-auto mx-0 pr-3">${this.markerHtml}</div>
                <div class="flex flex-col">
                    <div class="text-base font-bold pb-1">${this.title}</div>
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
