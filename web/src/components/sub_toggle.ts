import {ToggleSwitch} from "./toggle_switch";

export class SubToggle{
    private readonly root;
    private readonly toggleSwitch: ToggleSwitch
    private readonly title: string

    constructor(toggleFn: (checked: boolean) => void, title: string, cssClassName: string = '', withIcon?: string) {
        this.title = title
        let toggleContainer = document.createElement('div')
        toggleContainer.setAttribute('class', 'officemap-subtoggle-container')

        let toggleTitle = document.createElement('div')
        toggleTitle.setAttribute('class', 'officemap-subtoggle-title')
        toggleTitle.textContent = title

        let toggleIcon;
        if(withIcon){
            let toggleIcon = document.createElement('i')
            toggleIcon.setAttribute('class', 'officemap-room-type-legend')
        }

        this.toggleSwitch = new ToggleSwitch(toggleFn, cssClassName, withIcon)
        toggleContainer.append(this.toggleSwitch .html())
        toggleContainer.append(toggleTitle)

        if(toggleIcon !== undefined){
            toggleContainer.append(toggleIcon)
        }

        this.root = toggleContainer
    }

    public getTitle(){
        return this.title
    }

    public switch(checked: boolean){
        this.toggleSwitch.switch(checked)
    }

    public html(){
        return this.root
    }
}