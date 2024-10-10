import {BaseObservable} from "../UIFrameWork/Shared/Event/BaseObservable.js";
import {BaseModel} from "../UIFrameWork/Shared/Common/BaseModel.js";

export const HTTPRequestType = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT"
};

export const HTTPResponseType = {
    ArrayBuffer: 'arraybuffer',
    Blob: 'blob',
    Document: 'document',
    Json: 'json',
    Text: 'text'
}

export const XMLHttpRequestListener = {
    onload: 'onload',
    onprogress: 'onprogress',
    progress: 'progress',
    onerror: 'onerror',
    onloadstart: 'onloadstart',
    onreadystatechange: 'onreadystatechange',
    onloadend: 'onloadend'
}

export class XMLHttpRequestRequest extends BaseObservable {

    constructor(withCredentials, security, component, onprogress) {
        super();
        this.mapHeader = new Map();
        this.security = security;
        this.component = component;
        this.httpAjax = new XMLHttpRequest();
        this.onprogress = onprogress;
        if (withCredentials)
            this.httpAjax.withCredentials = withCredentials;
    }

    addHeader(header, value) {
        this.mapHeader.set(header, value);
        this.httpAjax.setRequestHeader(header, value);
    }

    request(url, httpRequestType, httpResponseType) {
        this.url = url;
        this.httpRequestType = httpRequestType;
        this.httpResponseType = httpResponseType;
    }

    readyToStart(data) {
        let that = this;

        switch (this.httpRequestType) {
            case HTTPRequestType.GET:
                this.httpAjax.open(this.httpRequestType, this.url + "?" + this.generateUrlParam(data), true);
                break;
            case HTTPRequestType.POST:
                this.httpAjax.open(this.httpRequestType, this.url, true);
                break;
        }

        if (this.httpResponseType) {
            this.httpAjax.responseType = this.httpResponseType;
        }

        this.httpAjax.onload = function (event) {
            that.fireEvent(XMLHttpRequestListener.onload, event);
        };
        if (this.onprogress) {
            this.httpAjax.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    that.fireEvent(XMLHttpRequestListener.onprogress, event);
                }
            };
        } else {
            this.httpAjax.onreadystatechange = function (event) {
                that.fireEvent(XMLHttpRequestListener.onreadystatechange, event);
            };
        }
        this.httpAjax.onerror = function (event) {
            console.log("error : => " + event);
        };
        this.httpAjax.onloadstart = function () {

        };
        this.httpAjax.onloadend = function () {

        };
    }

    afterReady() {

    }

    send(data, jsonSerializerActive) {
        jsonSerializerActive = jsonSerializerActive === undefined ? true : jsonSerializerActive;
        this.readyToStart(data);
        this.afterReady();
        switch (this.httpRequestType) {
            case HTTPRequestType.GET:
                this.httpAjax.send();
                break;
            case HTTPRequestType.POST:
                if (data != null) {
                    if (jsonSerializerActive) {
                        let jsonData = JSON.stringify(data);
                        this.httpAjax.setRequestHeader("Content-Type", "application/json");
                        this.httpAjax.send(jsonData);
                    } else {
                        this.httpAjax.send(data);
                    }
                } else {
                    this.httpAjax.send();
                }
                break;
        }
    }

    generateUrlParam(data) {
        if (data instanceof BaseModel) {
            return data.toSerialKeyValue();
        } else {
            return "";
        }
    }
}