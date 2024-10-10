import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CoreFilterRequestDTO from "../../../Models/Request/Filter/CoreFilterRequestDTO.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreFilterAssignElementMasterDTO from "../../../Models/Response/Filter/CoreFilterAssignElementMasterDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebFilterLoadService extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.FilterLoad, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            this.callBack(json);
        }
    }

    Load(coreFilterRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreFilterRequestDTO instanceof CoreFilterRequestDTO) {
            this.send(coreFilterRequestDTO.toJSON());
        }
    }
}