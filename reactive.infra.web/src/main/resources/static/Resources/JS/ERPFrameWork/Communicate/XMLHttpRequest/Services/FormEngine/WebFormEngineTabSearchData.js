import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreWindowTabResponseSearchDTO from "../../../Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreWindowTabRequestSearchDTO from "../../../Models/Request/Window/Tab/CoreWindowTabRequestSearchDTO.js";

export default class WebFormEngineTabSearchData extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.TabSearchDataURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreWindowTabResponseSearchDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreWindowTabResponseSearchDTO, json);
            this.callBack(coreWindowTabResponseSearchDTOArray);
        }
    }

    TabSearchData(coreWindowTabRequestSearchDTO, callBack) {
        this.callBack = callBack;
        if (coreWindowTabRequestSearchDTO instanceof CoreWindowTabRequestSearchDTO) {
            this.send(coreWindowTabRequestSearchDTO.toJSON());
        }
    }
}