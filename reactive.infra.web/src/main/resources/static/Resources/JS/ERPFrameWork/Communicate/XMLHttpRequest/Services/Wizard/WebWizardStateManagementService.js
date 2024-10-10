import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWizardDTO from "../../../Models/Response/Wizard/CoreWizardDTO.js";

export default class WebWizardStateManagementService extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.Wizard_StateManagement, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWizardDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWizardDTO, json);
            this.callBack(coreWizardDTOMap);
        }
    }

    StateManagement(coreWizardStateRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(coreWizardStateRequestDTO.toJSON());
    }
}