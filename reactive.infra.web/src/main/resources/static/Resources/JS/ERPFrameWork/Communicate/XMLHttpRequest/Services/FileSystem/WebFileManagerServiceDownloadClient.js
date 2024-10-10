import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {
    HTTPRequestType,
    HTTPResponseType,
    XMLHttpRequestListener
} from "../../../../../ProxyService/XMLHttpRequestService.js";
import Utils from "../../../../Modules/Common/Utils.js";

export default class WebFileManagerServiceDownloadClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component, true);
        this.request(CommunicateConstantURL.Download, HTTPRequestType.GET , HTTPResponseType.Blob);
        this.addListener(XMLHttpRequestListener.onload, (event) => {
            if (event.currentTarget.readyState === 4) {
                console.log("Event : " + event.target.response);
                Utils.PrintPDF(event.target.response);
            }
        }, this);
    }

    Download(file, callBack) {
        this.callBack = callBack;
        this.send(file);
    }
}