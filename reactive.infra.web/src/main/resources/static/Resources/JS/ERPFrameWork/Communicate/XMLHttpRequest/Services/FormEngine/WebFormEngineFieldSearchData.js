import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import PageDataDTO from "../../../Models/Request/Common/PageDataDTO.js";

export default class WebFormEngineFieldSearchData extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.DataProviderSearchDataURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let pageDataDTOArray = [];
            json.forEach((pageDTOJson) => {
                let pageDataDTO = new PageDataDTO()
                pageDataDTO.applyData(pageDTOJson);
                pageDataDTOArray.push(pageDataDTO);
            })
            this.callBack(pageDataDTOArray);
        }
    }

    SearchKeyValueReference(coreWindowTabFieldSearchRequestDTO, callBack) {
        this.callBack = callBack;
        this.send(coreWindowTabFieldSearchRequestDTO.toJSON());
    }
}