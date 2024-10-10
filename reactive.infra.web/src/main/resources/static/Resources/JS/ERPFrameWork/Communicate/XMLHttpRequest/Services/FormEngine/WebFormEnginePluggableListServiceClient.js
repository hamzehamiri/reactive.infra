import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreWindowTabPluggableRequestDTO from "../../../Models/Request/Window/Tab/CoreWindowTabPluggableRequestDTO.js";
import CoreWindowTabPluggableAssignTabDTO from "../../../Models/Response/Window/Tab/CoreWindowTabPluggableAssignTabDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class WebFormEnginePluggableListServiceClient extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.WindowTabPluggableList, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json != null) {
            ConvertUtil.ConvertGeneralWithArrayWithConsumer(CoreWindowTabPluggableAssignTabDTO, json, (coreWindowTabPluggableAssignTabDTO) => {
                this.callBack(coreWindowTabPluggableAssignTabDTO);
            });
        }
    }

    WindowTabPluggableList(coreWindowTabPluggableRequestDTO, callBack) {
        if (coreWindowTabPluggableRequestDTO instanceof CoreWindowTabPluggableRequestDTO) {
            this.callBack = callBack;
            this.send(coreWindowTabPluggableRequestDTO.toJSON());
        }
    }
}