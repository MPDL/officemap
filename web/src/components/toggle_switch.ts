export class ToggleSwitch {
    private readonly root;
    private readonly input: HTMLInputElement;
    private readonly action: (checked: boolean) => void

    constructor(toggleFn: (checked: boolean) => void, cssClassName: string = '', withIcon?: string) {
        this.action = toggleFn
        let btnSwitch = document.createElement('label')
        btnSwitch.setAttribute('class', `switch`)
        let switchInput = document.createElement('input')
        switchInput.setAttribute('type', 'checkbox')
        let slider = document.createElement('slider')
        slider.setAttribute('class', `slider round ${cssClassName}`)
        let sliderIcon = document.createElement('span')
        sliderIcon.setAttribute('class', `officemap-toggle-icon material-symbols-rounded officemap-symbol-base`)
        sliderIcon.innerHTML = withIcon ?? ''

        let thisSwitch = this;
        switchInput.addEventListener('change', function() {
            // input checked state will be changed by the browser
            thisSwitch._switch(this.checked)
        });

        this.input = switchInput

        btnSwitch.append(switchInput)
        slider.append(sliderIcon)
        btnSwitch.append(slider)

        this.root = btnSwitch
    }

    public html(){
        return this.root
    }

    // used when executing switch via code
    public switch(checked: boolean) {
        this.input.checked = checked
        this._switch(checked)
    }

    private _switch(checked: boolean) {
        this.action(checked)
    }
}