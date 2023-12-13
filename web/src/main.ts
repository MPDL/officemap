import {Search} from "./components/search";
import {LeafletMap, MapEntityType} from "./components/leaflet_map";
import './style/normalize.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/images/layers.png'
import 'leaflet/dist/images/layers-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// import last so that it overwrites all other css
import './style/font.css';
import './style/badge.css';
import './style/button.css';
import './style/infopanel.css';
import './style/leaflet_overwrite.css';
import './style/legend.css';
import './style/map.css';
import './style/marker.css';
import './style/popup.css';
import './style/search.css';
import './style/toggle.css';
import './style/print.css';
import './style/officemap_normalize.css';
import {Api, Employee, Printer, Room} from "./api/api";
import {ActionButton} from "./components/action_button";
import {OfficeMapSettings} from "./configuration/officemap_settings";
import {environmentVariables} from "./configuration/environment";

main();

function main(){
    document.body.appendChild(component());

    const app = document.querySelector('#app');
    if(app !== null) {
        // load settings
        let settings = new OfficeMapSettings();
        let settings_data = settings.settings_data

        let api = new Api(environmentVariables.api_base_url, environmentVariables.api_url_path, environmentVariables.api_port)
        let search = new Search(app, api)
        let map = new LeafletMap(app, api, search, settings_data)
        if(!settings_data.installation_mode) {
            new ActionButton(app, () => map.printMap(), 'print', '114px')
        }
        new ActionButton(app, () => map.fitMapToWindow(), 'fullscreen', '174px')
        search.setSearchEntityFunction((object: Employee | Room | Printer, mapEntityType: MapEntityType) => map.markEntityOnMap(object,mapEntityType))
    }
}

function component() {
    const element = document.createElement('div');
    element.setAttribute("id", "app");

    return element;
}