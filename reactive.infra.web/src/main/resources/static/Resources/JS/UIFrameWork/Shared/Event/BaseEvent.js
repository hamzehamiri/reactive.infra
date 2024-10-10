export default class BaseEvent {
    constructor(source) {
        this.source = source;
        this.dataMap = new Map();
    }

    getSource() {
        return this.source;
    }

    setDataKey(key, data) {
        this.dataMap.set(key, data);
    }

    getDataKey() {
        return this.dataMap;
    }
}