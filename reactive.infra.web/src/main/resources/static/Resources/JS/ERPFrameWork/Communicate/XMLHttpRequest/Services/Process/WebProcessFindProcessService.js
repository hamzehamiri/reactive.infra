import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreProcessRequestDTO from "../../../Models/Request/Process/CoreProcessRequestDTO.js";
import CoreProcessDTO from "../../../Models/Response/Process/CoreProcessDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebProcessFindProcessService extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.ProcessFind, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        if (json) {
            let coreProcessDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreProcessDTO, json);
            this.callBack(coreProcessDTOArray);
        }
    }

    FindProcess(coreProcessRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreProcessRequestDTO instanceof CoreProcessRequestDTO) {
            this.send(coreProcessRequestDTO.toJSON());
        }
    }
}