import {Api, Employee, Printer, Room, SearchResultItem} from "../api/api";
import CancelIcon from "../../../assets/images/close.svg"
import {MapEntityType} from "./leaflet_map";

export class Search {
    private readonly api: Api;
    private searchEntityFunction: ((object: Employee | Room | Printer, mapEntityType: MapEntityType) => void) | undefined
    private readonly searchResultList: HTMLUListElement
    private blockFocusOutEvent: boolean = false
    private readonly root: HTMLDivElement;
    constructor(parent: Element, api: Api) {
        this.api = api

        // create elements
        let root = document.createElement('div')
        root.setAttribute('class', 'officemap-searchbox')
        this.root = root

        let searchInputContainer = document.createElement('div')
        searchInputContainer.setAttribute('class', 'officemap-searchbox-input-container')

        let searchInputIcon = document.createElement('span')
        searchInputIcon.setAttribute('class', 'officemap-searchbox-input-icon material-symbols-rounded officemap-symbol-base')
        searchInputIcon.innerHTML = 'search'

        let searchInputCancel = document.createElement('span')
        searchInputCancel.setAttribute('class', 'officemap-searchbox-input-cancel material-symbols-rounded officemap-symbol-base')
        searchInputCancel.innerHTML = 'close'

        let searchInput = document.createElement('input')
        searchInput.setAttribute('class', 'officemap-searchbox-input')
        searchInput.setAttribute('placeholder', 'search for employees, rooms, printers ...')

        let searchResultBox = document.createElement('div')
        searchResultBox.setAttribute('class', 'officemap-searchresultbox')

        let searchResultContainerTop = document.createElement('div')
        searchResultContainerTop.setAttribute('class', 'officemap-searchresult-container-top')

        let searchResultContainer = document.createElement('div')
        searchResultContainer.setAttribute('class', 'officemap-searchresult-container')

        let searchResultContainerBottom = document.createElement('div')
        searchResultContainerBottom.setAttribute('class', 'officemap-searchresult-container-bottom')

        let searchResultBottomMore = document.createElement('div')
        searchResultBottomMore.setAttribute('class', 'officemap-searchresult-bottom-more')

        let searchResultBottomText = document.createElement('div')
        searchResultBottomText.setAttribute('class', 'officemap-searchresult-bottom-text')
        searchResultBottomText.textContent = 'Datenquelle:'

        let searchResultBottomLink = document.createElement('a')
        searchResultBottomLink.setAttribute('class', 'officemap-searchresult-bottom-link')
        searchResultBottomLink.href = 'https://mimir.int.mpdl.mpg.de'
        searchResultBottomLink.textContent = 'mimir.int.mpdl.mpg.de'
        searchResultBottomLink.target = '_blank'

        let searchResultList = document.createElement('ul')
        searchResultList.setAttribute('class', 'officemap-searchresult-list')
        this.searchResultList = searchResultList

        let thisSearch = this;

        // add javascript
        searchInput.addEventListener("focusin", async function (e: Event) {
            root.setAttribute('class', 'officemap-searchbox active')
            await thisSearch.search(searchInput.value, root, searchResultList, searchResultBottomMore)
        });
        searchInput.addEventListener("focusout", async function (e: Event) {
            if(!thisSearch.blockFocusOutEvent){
                thisSearch.closeSearchResult()
            }
        });

        searchInput.addEventListener("input", async function (e: Event) {
            const input = (e.target as HTMLInputElement).value
            if(input.length > 0) {
                searchInputCancel.setAttribute('class', 'officemap-searchbox-input-cancel material-symbols-rounded officemap-symbol-base show')
            } else {
                searchInputCancel.setAttribute('class', 'officemap-searchbox-input-cancel material-symbols-rounded officemap-symbol-base')
            }
            await thisSearch.search(input, root, searchResultList, searchResultBottomMore)
        });

        searchInputCancel.addEventListener("click", async function (e: Event) {
            searchInput.value = ""
            searchResultList.innerHTML = '';
            searchInputCancel.setAttribute('class', 'officemap-searchbox-input-cancel material-symbols-rounded officemap-symbol-base')
            await thisSearch.search("", root, searchResultList, searchResultBottomMore)
        });

        searchResultBox.addEventListener('mouseover', (_) =>{
            this.blockFocusOutEvent = true;
        })

        searchResultBox.addEventListener('mouseleave', (_) =>{
            this.blockFocusOutEvent = false;
        })

        // build html elements together, bottom up
        // searchResultContainer
        searchResultContainer.append(searchResultList)

        // searchresultbox bottom
        searchResultContainerBottom.append(searchResultBottomMore)
        searchResultContainerBottom.append(searchResultBottomText)
        searchResultContainerBottom.append(searchResultBottomLink)

        // searchresultbox
        searchResultBox.append(searchResultContainerTop)
        searchResultBox.append(searchResultContainer)
        searchResultBox.append(searchResultContainerBottom)

        // input container
        searchInputContainer.append(searchInputIcon)
        searchInputContainer.append(searchInput)
        searchInputContainer.append(searchInputCancel)

        // searchbox
        root.append(searchInputContainer)
        root.append(searchResultBox)

        // root
        parent.append(root)
    }

    private closeSearchResult(){
        this.root.setAttribute('class', 'officemap-searchbox')
        this.searchResultList.innerHTML = '';
    }

    private createSearchResult(resultList: HTMLUListElement, searchResultItems: SearchResultItem[]){
        resultList.innerHTML = '';
        if(searchResultItems === null) {
            return
        }

        let maxSearchItems = 10;
        let searchItemNumber = 0;
        for (const searchResultItem of searchResultItems) {
            if(searchItemNumber >= maxSearchItems){
                break;
            }
            let searchResultListItem = document.createElement('li')
            searchResultListItem.setAttribute('class', 'officemap-searchresult-list-item')

            let searchResultListItemContainer = document.createElement('div')
            searchResultListItemContainer.setAttribute('class', 'officemap-searchresult-list-item-container')

            let searchResultListItemIcon = document.createElement('span')
            searchResultListItemIcon.setAttribute('class', 'officemap-searchresult-list-item-icon material-symbols-rounded officemap-symbol-base')

            let searchResultListItemText = document.createElement('div')
            searchResultListItemText.setAttribute('class', 'officemap-searchresult-list-item-text')

            let searchResultListItemBadge = document.createElement('div')

            let mapEntityType: MapEntityType;
            let object: Employee | Room | Printer;

            switch (searchResultItem.type) {
                case 'employee':
                    const employee = JSON.parse(searchResultItem.data) as Employee;
                    mapEntityType = MapEntityType.Employee
                    object = employee
                    let displayStringEmployee = employee.firstname + ', ' + employee.lastname
                    for (const keyword of searchResultItem.keywords) {
                        displayStringEmployee = displayStringEmployee.replace(new RegExp('(' + keyword + ')', 'gi'), '<b>$1</b>')
                    }

                    searchResultListItemText.innerHTML = displayStringEmployee
                    searchResultListItemIcon.innerHTML = 'person'
                    searchResultListItemBadge.setAttribute('class', 'officemap-badge employee')
                    searchResultListItemBadge.textContent = employee.department
                    break;
                case 'room':
                    const room = JSON.parse(searchResultItem.data) as Room;
                    mapEntityType = MapEntityType.Room
                    object = room
                    let displayStringRoom = room.name + ', ' + room.type
                    for (const keyword of searchResultItem.keywords) {
                        displayStringRoom = displayStringRoom.replace(new RegExp('(' + keyword + ')', 'gi'), '<b>$1</b>')
                    }

                    searchResultListItemText.innerHTML = displayStringRoom
                    searchResultListItemIcon.innerHTML = 'meeting_room'
                    searchResultListItemBadge.setAttribute('class', 'officemap-badge room')
                    searchResultListItemBadge.textContent = room.type
                    break;
                case 'printer':
                    const printer = JSON.parse(searchResultItem.data) as Printer;
                    mapEntityType = MapEntityType.Printer
                    object = printer
                    let displayStringPrinter = printer.name
                    for (const keyword of searchResultItem.keywords) {
                        displayStringPrinter = displayStringPrinter.replace(new RegExp('(' + keyword + ')', 'gi'), '<b>$1</b>')
                    }

                    searchResultListItemText.innerHTML = displayStringPrinter
                    searchResultListItemIcon.innerHTML = 'print'
                    searchResultListItemBadge.setAttribute('class', 'officemap-badge printer')
                    searchResultListItemBadge.textContent = printer.model
                    break;
                default:
                    console.log('no matching search type found.')
                    break;
            }

            searchResultListItemContainer.append(searchResultListItemIcon)
            searchResultListItemContainer.append(searchResultListItemText)
            searchResultListItemContainer.append(searchResultListItemBadge)
            searchResultListItem.append(searchResultListItemContainer)
            resultList.append(searchResultListItem)

            searchResultListItem.addEventListener('click', (_) =>{
                if (this.searchEntityFunction !== undefined) {
                    this.closeSearchResult()
                    this.blockFocusOutEvent = false
                    this.searchEntityFunction(object, mapEntityType)
                }
            });

            searchItemNumber++;
        }
    }

    private async search(queryString: string, searchBox: HTMLDivElement, searchResultList: HTMLUListElement, searchResultBottomMore: HTMLDivElement){
        let searchResult  = await this.api.Search(queryString)

        if (searchResult.length > 0) {
            searchBox.setAttribute('class', 'officemap-searchbox active has-results')

            this.createSearchResult(searchResultList, searchResult)
        } else {
            searchBox.setAttribute('class', 'officemap-searchbox active')
            searchResultList.innerHTML = '';
        }

        if (searchResult.length > 10) {
            searchResultBottomMore.textContent = '... and ' + (searchResult.length - 10) + ' more. Be more specific!'
            searchResultBottomMore.setAttribute('class', 'officemap-searchresult-bottom-more show')
        } else {
            searchResultBottomMore.setAttribute('class', 'officemap-searchresult-bottom-more')
        }
    }

    public htmlString(){
        return this.root.outerHTML
    }

    public html(){
        return this.root
    }

    public setSearchEntityFunction(searchEntityFunction: (object: Employee | Room | Printer, mapEntityType: MapEntityType) => void) {
        this.searchEntityFunction = searchEntityFunction
    }
}