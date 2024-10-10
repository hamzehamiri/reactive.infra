export default class ResourceStateModel {

    constructor(url, nameOfComponent, type) {
        this.url = url;
        this._nameOfComponent = nameOfComponent;
        this._type = type;
    }

    isLoaded() {
        return this.loaded;
    }

    setLoaded(loaded) {
        this.loaded = loaded;
    }

    setTimeLoaded(timeLoaded) {
        this.timeLoaded = timeLoaded;
    }

    getTimeLoaded() {
        return this.timeLoaded;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }


    getNameOfComponent() {
        return this._nameOfComponent;
    }

    setNameOfComponent(value) {
        this._nameOfComponent = value;
    }


    getType() {
        return this._type;
    }

    setType(value) {
        this._type = value;
    }
}