import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import PageDataDTO from "../../../Models/Request/Common/PageDataDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebLanguageClient extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, false, component);
        this.request(CommunicateConstantURL.GetAllLanguages, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let pageDataDTOArray = ConvertUtil.ConvertGeneralWithArray(PageDataDTO , json);
            this.callBack(pageDataDTOArray);
        }
    }

    WebLanguages(callBack) {
        this.callBack = callBack;
        this.send();
    }
}