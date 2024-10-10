import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CoreTranslateRequestDTO from "../../../Models/Request/CoreTranslateRequestDTO.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreTranslateDTO from "../../../Models/Response/Translate/CoreTranslateDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebTranslateServiceClient extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, false, component);
        this.request(CommunicateConstantURL.TranslateURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json != null) {
            let coreTranslateDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreTranslateDTO , json);
            this.callBack(coreTranslateDTOMap);
        }
    }

    Translate(coreTranslateRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreTranslateRequestDTO instanceof CoreTranslateRequestDTO) {
            this.send(coreTranslateRequestDTO.toJSON());
        }
    }
}