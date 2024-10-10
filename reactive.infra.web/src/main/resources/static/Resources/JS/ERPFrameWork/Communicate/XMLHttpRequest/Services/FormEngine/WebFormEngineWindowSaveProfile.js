import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWindowProfileDTO from "../../../Models/Response/Profile/Window/CoreWindowProfileDTO.js";

export default class WebFormEngineWindowSaveProfile extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.WindowSaveProfileURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWindowProfileDTO = ConvertUtil.ConvertGeneral(CoreWindowProfileDTO, json);
            this.callBack(coreWindowProfileDTO);
        }
    }

    SaveWindowProfile(coreWindowProfileDTO, callBack) {
        this.callBack = callBack;
        this.send(coreWindowProfileDTO.toJSON());
    }
}