import {XMLHttpRequestListener, XMLHttpRequestRequest} from "../../../../ProxyService/XMLHttpRequestService.js";
import WebEnvironment from "../../Common/WebEnvironment.js";
import LoginFactory from "../../../Modules/Login/LoginFactory.js";
import {WebTextEditor} from "../../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import WebAlertDialog from "../../../../UIFrameWork/HTML/Alert/WebAlertDialog.js";
import ErrorResponseDTO from "../../Models/Response/Error/ErrorResponseDTO.js";
import CommunicateConstantURL from "../../Common/CommunicateConstantURL.js";

export default class XMLHttpRequestBaseService extends XMLHttpRequestRequest {

    constructor(withCredentials, security, component, onprogress) {
        super(withCredentials, security, component, onprogress);
        this.relogin = true;
        this.setPostbackDataType(XMLHttpRequestBaseService.PostbackDataType.PostbackDataType_JSON);
    }

    setPostbackDataType(PostbackDataType) {
        this.PostbackDataType = PostbackDataType;
    }

    afterReady() {
        super.afterReady();
        this.httpAjax.addEventListener("error", (event) => {
            console.log("Error");
        });
        this.addListener(XMLHttpRequestListener.onreadystatechange, (event) => {
            this.postBackData(event, false);
        }, this);
        this.addListener(XMLHttpRequestListener.onprogress, (event) => {
            if (this.component)
                this.component.unMaskComponent();
            this.fireEvent(XMLHttpRequestListener.progress, event);
        }, this);
        if (this.security) {
            try {
                this.securityHeaderAppend();
            } catch (e) {
                LoginFactory.LoginFactoryWithDefaults((event) => {

                }, false, true);
            }
        }
    }

    postBackData(event) {
        if (event.currentTarget.readyState === 4) {
            if (this.component)
                this.component.unMaskComponent();
            if (event.currentTarget.status === 200) {
                if (this.PostbackDataType === XMLHttpRequestBaseService.PostbackDataType.PostbackDataType_JSON) {
                    let jsonData = JSON.parse(event.currentTarget.responseText);
                    this.convertJsonToModel(jsonData);
                } else if (this.PostbackDataType === XMLHttpRequestBaseService.PostbackDataType.PostbackDataType_Bin) {
                    this.convertToByte(event.currentTarget.responseText);
                }
            } else if (event.currentTarget.status === 500) {
                let webAlert = new WebAlertDialog();
                webAlert.setMessage(this.convertErrorDTOMessage(event), WebAlertDialog.Type.Error);
                if (this.component)
                    webAlert.showCenterElement(this.component.getElement(), 300);
            } else if (event.currentTarget.status === 401) {
                if (this.relogin) {
                    LoginFactory.LoginFactoryWithDefaults((event) => {
                        LoginFactory.AfterLogin(event);
                    }, false, true);
                } else {
                    let webAlert = new WebAlertDialog();
                    webAlert.setMessage(this.convertErrorDTOMessage(event), WebAlertDialog.Type.Error);
                    if (this.component) {
                        webAlert.showCenterElement(this.component.getElement(), 300);
                    }
                }
            }
        }
    }

    convertErrorDTOMessage(event) {
        let errorResponseDTOJson = JSON.parse(event.currentTarget.responseText);
        let errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.applyData(errorResponseDTOJson);
        return errorResponseDTO;
    }

    securityHeaderAppend() {
        let token = WebEnvironment.GetToken();
        if (token) {
            this.addHeader(CommunicateConstantURL.TokenHeaderKey(), CommunicateConstantURL.BearValue() + token);
        } else {
            throw "User Not Login";
        }
    }

    send(data, jsonSerializerActive) {
        super.send(data, jsonSerializerActive);
        if (this.component) {
            this.component.showMaskComponent(new WebTextEditor(), 200, 200, this.component.getElement());
        }
    }

    convertJsonToModel(json) {

    }

    convertToByte(bytes) {

    }

}

XMLHttpRequestBaseService.PostbackDataType = {
    PostbackDataType_JSON: "Json",
    PostbackDataType_Bin: "Bin",
}