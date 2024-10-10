export default class JsonEventFunctionCallBack {
    constructor(eventName, functionCallBack) {
        this.setEventName(eventName);
        this.setFunctionCallBack(functionCallBack);
    }

    setEventName(eventName) {
        this.eventName = eventName;
    }

    getEventName() {
        return this.eventName;
    }

    setFunctionCallBack(functionCallBack) {
        this.functionCallBack = functionCallBack;
    }

    getFunctionCallBack() {
        return this.functionCallBack;
    }
}