export class ActionButton {
    constructor(parent: Element, action_btn_fn: () => void, icon: string, top: string) {
        let root = document.createElement('div')
        root.setAttribute('class', 'officemap-action-button')
        root.setAttribute('style', 'top: ' + top)

        let button_icon = document.createElement('span')
        button_icon.setAttribute('class', 'officemap-action-button-icon material-symbols-rounded officemap-symbol-base')
        button_icon.innerHTML = icon

        root.append(button_icon)

        parent.append(root)

        root.addEventListener('click', () => action_btn_fn())
    }
}