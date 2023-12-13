import {ToggleSwitch} from "./toggle_switch";

export class MainToggle{
    private readonly root;
    private readonly toggleSwitch: ToggleSwitch

    constructor(toggleFn: (checked: boolean) => void, title: string, cssClassName: string = '', withIcon: string) {
        let toggleContainer = document.createElement('div')
        toggleContainer.setAttribute('class', 'officemap-toggle-container')

        let toggleTitle = document.createElement('div')
        toggleTitle.setAttribute('class', 'officemap-toggle-title')
        toggleTitle.textContent = title

        this.toggleSwitch = new ToggleSwitch(toggleFn,cssClassName, withIcon)
        toggleContainer.append(this.toggleSwitch.html())
        toggleContainer.append(toggleTitle)

        this.root = toggleContainer
    }

    public withColor(gradientString: string, boxShadowColorString: string, className: string) {
        this.createCssClassForMainToggle(gradientString, boxShadowColorString, className)
        return this
    }

    public switch(checked: boolean){
        this.toggleSwitch.switch(checked)
    }

    public html(){
        return this.root
    }

    private createCssClassForMainToggle(gradientString: string, boxShadowColorString: string, className: string){
        let styles = `input:checked + .slider.${className} {background: ${gradientString};}`+
            `input:focus + .slider.${className}  {box-shadow: 0 0 1px ${boxShadowColorString};}`

        let styleSheet = document.createElement("style")
        styleSheet.innerText = styles
        document.head.appendChild(styleSheet)
    }
}