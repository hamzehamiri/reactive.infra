import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAllElementDTO from "../../../Models/Response/Element/CoreAllElementDTO.js";

export default class WebElementServiceFindElement extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.ElementFindByKeyURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreAllElementDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreAllElementDTO, json);
            this.callBack(coreAllElementDTOArray);
        }
    }

    FindElementByRegisterKey(coreAllElementRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(coreAllElementRequestDTO.toJSON());
    }
}