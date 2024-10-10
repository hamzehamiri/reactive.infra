import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import CoreMenuDTO from "../../../Models/Response/Menu/CoreMenuDTO.js";
import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreMenuRequestDTO from "../../../Models/Request/Menu/CoreMenuRequestDTO.js";

export class WebMenuServiceClient extends XMLHttpRequestBaseService {

    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.MenuSearchDataURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json != null) {
            let menuItemArray = ConvertUtil.ConvertGeneralWithArray(CoreMenuDTO, json);
            this.callBack(menuItemArray);
        }
    }

    MenuItems(coreMenuRequestDTO, callBack) {
        this.callBack = callBack;
        if (coreMenuRequestDTO instanceof CoreMenuRequestDTO) {
            this.send(coreMenuRequestDTO.toJSON());
        }
    }
}