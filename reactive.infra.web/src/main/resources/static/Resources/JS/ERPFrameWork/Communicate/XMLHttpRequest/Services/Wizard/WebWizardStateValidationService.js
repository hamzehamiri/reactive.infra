import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWizardValidationMessageDTO from "../../../Models/Response/Wizard/Validation/CoreWizardValidationMessageDTO.js";

export default class WebWizardStateValidationService extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.Wizard_StateValidation, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWizardValidationMessageDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreWizardValidationMessageDTO, json);
            this.callBack(coreWizardValidationMessageDTOArray);
        }
    }

    StateValidation(coreWizardStateValidationRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(coreWizardStateValidationRequestDTO.toJSON());
    }
}