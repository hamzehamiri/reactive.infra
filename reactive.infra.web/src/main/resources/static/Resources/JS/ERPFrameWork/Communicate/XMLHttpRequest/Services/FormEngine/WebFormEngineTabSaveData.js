import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreWindowTabResponseSearchDTO from "../../../Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebFormEngineTabSaveData extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.TabSaveDataURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWindowTabResponseSearchDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreWindowTabResponseSearchDTO, json);
            this.callBack(coreWindowTabResponseSearchDTOArray);
        }
    }

    SaveTabData(coreWindowSaveDataRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(coreWindowSaveDataRequestDTO.toJSON());
    }
}