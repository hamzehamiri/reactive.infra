import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {
    HTTPRequestType,
    HTTPResponseType,
    XMLHttpRequestListener
} from "../../../../../ProxyService/XMLHttpRequestService.js";

export default class WebFileManagerServiceIconDownloaderClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component, true);
        let that = this;

        this.setPostbackDataType(XMLHttpRequestBaseService.PostbackDataType.PostbackDataType_Bin);
        this.request(CommunicateConstantURL.IconDownloader, HTTPRequestType.GET, HTTPResponseType.Blob);
        this.addListener(XMLHttpRequestListener.progress, (progressEvent) => {
            this.callBack(progressEvent);
        }, this);
        this.addListener(XMLHttpRequestListener.onload, (event) => {
            if (event.currentTarget.readyState === 4) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    that.callBack(e.target.result);
                };
                reader.readAsDataURL(event.target.response);
            }
        });
    }

    convertToByte(byteData) {
        this.callBack(byteData);
    }

    IconDownloader(iconDownloadRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(iconDownloadRequestDTO, false);
    }
}