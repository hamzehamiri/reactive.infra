import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreUserAuthenticateResponseDTO from "../../../Models/Response/Security/CoreUserAuthenticateResponseDTO.js";

export default class WebLoginServiceClient extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, false, component);
        this.request(CommunicateConstantURL.Login, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        let coreUserAuthenticateResponseDTO = new CoreUserAuthenticateResponseDTO();
        coreUserAuthenticateResponseDTO.applyData(json);
        this.callBack(coreUserAuthenticateResponseDTO);
    }


    Login(coreUserAuthenticateRequestDTO, callBack, finalCallBack, elementForMask) {
        this.callBack = callBack;
        this.send(coreUserAuthenticateRequestDTO.toJSON());
    }
}