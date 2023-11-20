export class InfoPanel {
    private title: string = 'title'
    private data: Map<string, string> = new Map([["key", "value"]]);
    private markerHtml: string = ''
    private readonly root:  HTMLDivElement;

    constructor() {
        this.root = document.createElement('div')
        this.root.setAttribute('class', 'officemap-infopanel')
    }

    public setData(title: string, data: Map<string, string>, markerHtml: string){
        this.title = title
        this.data = data
        this.markerHtml = markerHtml
        this.renderHtml()
    }

    public show(show: boolean){
        if(show){
            this.root.setAttribute('class', 'officemap-infopanel show')
        } else {
            this.root.setAttribute('class', 'officemap-infopanel')
        }
    }

    public renderDataHtml(): string{
        let dataDiv = document.createElement('div')
        dataDiv.setAttribute('class', 'officemap-infopanel-data')

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
            <div class="officemap-infopanel-container">
                <div class="officemap-infopanel-container-marker">${this.markerHtml}</div>
                <div class="officemap-infopanel-container-content">
                    <div class="officemap-infopanel-title">${this.title}</div>
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