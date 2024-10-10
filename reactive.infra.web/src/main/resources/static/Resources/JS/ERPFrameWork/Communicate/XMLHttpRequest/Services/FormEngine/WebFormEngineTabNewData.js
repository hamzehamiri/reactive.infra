import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWindowTabRequestDTO from "../../../Models/Request/Window/Tab/CoreWindowTabRequestDTO.js";
import CoreWindowTabResponseSearchDTO from "../../../Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";

export default class WebFormEngineTabNewData extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.TabNewDataURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWindowTabResponseSearchDTO = ConvertUtil.ConvertGeneral(CoreWindowTabResponseSearchDTO, json);
            this.callBack(coreWindowTabResponseSearchDTO);
        }
    }

    TabNewData(coreWindowTabRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreWindowTabRequestDTO instanceof CoreWindowTabRequestDTO) {
            this.send(coreWindowTabRequestDTO.toJSON());
        }
    }
}