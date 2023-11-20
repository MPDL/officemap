export class InfoPanel {
    private title: string = 'title'
    private data: Map<string, string> = new Map([["key", "value"]]);
    private markerHtml: string = ''
    private readonly root:  HTMLDivElement;
    private readonly infoPanelCss = "rounded-[20px] bg-officemap-white w-fit p-5 mb-[26px] ml-[26px] font-officemap shadow-[0_2px_5px_1px_rgba(64,60,67,0.16)]"

    constructor() {
        this.root = document.createElement('div')
        this.root.setAttribute('class', `hidden ${this.infoPanelCss}`)
    }

    public setData(title: string, data: Map<string, string>, markerHtml: string){
        this.title = title
        this.data = data
        this.markerHtml = markerHtml
        this.renderHtml()
    }

    public show(show: boolean){
        if(show){
            this.root.setAttribute('class', `block ${this.infoPanelCss}`)
        } else {
            this.root.setAttribute('class', `hidden ${this.infoPanelCss}`)
        }
    }

    public renderDataHtml(): string{
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

    private renderHtml(){
        let renderedHtml = `
            <div class="flex">
                <div class="my-auto mx-0 pr-3">${this.markerHtml}</div>
                <div class="flex flex-col">
                    <div class="text-base font-bold pb-1">${this.title}</div>
                    ${this.renderDataHtml()}
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