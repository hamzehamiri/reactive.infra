import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import {CoreWindowRequestDTO} from "../../../Models/Request/Window/CoreWindowRequestDTO.js";
import {CoreWindowDTO} from "../../../Models/Response/Window/CoreWindowDTO.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";

export class WebFormEngineWindowServiceClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.WindowURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json != null) {
            let coreWindowDTO = new CoreWindowDTO();
            coreWindowDTO.applyData(json);
            this.callBack(coreWindowDTO);
        }
    }

    FindWindow(windowRequestModel, callBack) {
        if (windowRequestModel instanceof CoreWindowRequestDTO) {
            this.callBack = callBack;
            this.send(windowRequestModel.toJSON());
        }
    }
}