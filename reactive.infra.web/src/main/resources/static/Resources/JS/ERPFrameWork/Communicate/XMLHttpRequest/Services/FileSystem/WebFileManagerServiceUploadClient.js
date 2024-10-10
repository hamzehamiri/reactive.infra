import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType, XMLHttpRequestListener} from "../../../../../ProxyService/XMLHttpRequestService.js";

export default class WebFileManagerServiceUploadClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component, true);
        this.request(CommunicateConstantURL.Upload, HTTPRequestType.POST);
        this.addListener(XMLHttpRequestListener.progress, (progressEvent) => {
            this.callBack(progressEvent);
        }, this);
    }

    Upload(formData, callBack) {
        this.callBack = callBack;
        this.send(formData, false);
    }
}