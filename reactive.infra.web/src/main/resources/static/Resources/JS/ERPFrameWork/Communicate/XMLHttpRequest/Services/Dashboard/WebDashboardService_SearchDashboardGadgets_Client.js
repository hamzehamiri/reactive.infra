import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreDashboardGadgetDTO from "../../../Models/Response/Dashboard/CoreDashboardGadgetDTO.js";
import CoreDashboardItemDTO from "../../../Models/Response/Dashboard/CoreDashboardItemDTO.js";

export default class WebDashboardService_SearchDashboardGadgets_Client extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.DashboardSearchDashboardGadgetsURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreDashboardGadgetDTOArray = [];
            json.forEach((coreDashboardGadgetDTOJson) => {
                let coreDashboardGadgetDTO = new CoreDashboardGadgetDTO()
                coreDashboardGadgetDTO.applyData(coreDashboardGadgetDTOJson);
                coreDashboardGadgetDTOArray.push(coreDashboardGadgetDTO);
            })
            this.callBack(coreDashboardGadgetDTOArray);
        }
    }

    SearchDashboardGadgets(coreDashboardItemDTO, callBack) {
        if (coreDashboardItemDTO instanceof CoreDashboardItemDTO) {
            this.callBack = callBack;
            this.send(coreDashboardItemDTO.toJSON());
        }
    }
}