export class OfficeMapSettings {
    private readonly _settings_data: SettingsData

    public get settings_data() : SettingsData{
        return this._settings_data
    }
    constructor() {
        this._settings_data = {
            installation_mode: false
        }

        this.loadUrlParameters()
    }

    private loadUrlParameters() {
        // get URL search parameters
        let browser_url = new URL(window.location.href);
        let url_search_parameters = browser_url.searchParams

        if(url_search_parameters.has("installation")){
            this._settings_data.installation_mode = true;
        }

    }
}

export interface SettingsData{
    installation_mode: boolean,
}