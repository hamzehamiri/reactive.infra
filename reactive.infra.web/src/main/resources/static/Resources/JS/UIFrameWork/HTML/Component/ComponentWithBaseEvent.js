import {HTMLComponent} from "./HTMLComponent.js";

export default class ComponentWithBaseEvent extends HTMLComponent {
    constructor(element, jsonEventFunctionCallBackArray) {
        super();

        this.setElement(element);

        if (jsonEventFunctionCallBackArray) {
            let that = this;
            jsonEventFunctionCallBackArray.forEach(jsonEventFunctionCallBack => {
                that.requestCaptureEvent_DOM(jsonEventFunctionCallBack.getEventName(), element, (event) => {
                    jsonEventFunctionCallBack.getFunctionCallBack()(that);
                }, that);
            });
        }
    }
}