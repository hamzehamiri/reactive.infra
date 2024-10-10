import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CoreWindowTabDTO from "../../../Models/Response/Window/Tab/CoreWindowTabDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWindowTabRequestDTO from "../../../Models/Request/Window/Tab/CoreWindowTabRequestDTO.js";

export class WebFormEngineTabServiceClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.TabURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json != null) {
            let coreWindowTabDTO = ConvertUtil.ConvertGeneral(CoreWindowTabDTO, json);
            this.callBack(coreWindowTabDTO);
        }
    }

    FindTab(coreWindowTabRequestDTO, callBack) {
        if (coreWindowTabRequestDTO instanceof CoreWindowTabRequestDTO) {
            this.callBack = callBack;
            this.send(coreWindowTabRequestDTO.toJSON());
        }
    }
}