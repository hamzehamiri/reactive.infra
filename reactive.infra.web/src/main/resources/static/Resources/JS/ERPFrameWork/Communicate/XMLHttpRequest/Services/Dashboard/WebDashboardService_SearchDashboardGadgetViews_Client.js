import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreDashboardItemDTO from "../../../Models/Response/Dashboard/CoreDashboardItemDTO.js";
import CoreDashboardGadgetViewDTO from "../../../Models/Response/Dashboard/CoreDashboardGadgetViewDTO.js";

export default class WebDashboardService_SearchDashboardGadgetViews_Client extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.DashboardSearchDashboardGadgetViewsURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreDashboardGadgetViewDTOArray = [];
            json.forEach((coreDashboardGadgetViewDTOJson) => {
                let coreDashboardGadgetViewDTO = new CoreDashboardGadgetViewDTO()
                coreDashboardGadgetViewDTO.applyData(coreDashboardGadgetViewDTOJson);
                coreDashboardGadgetViewDTOArray.push(coreDashboardGadgetViewDTO);
            })
            this.callBack(coreDashboardGadgetViewDTOArray);
        }
    }

    SearchDashboardGadgetViews(coreDashboardItemDTO, callBack) {
        if (coreDashboardItemDTO instanceof CoreDashboardItemDTO) {
            this.callBack = callBack;
            this.send(coreDashboardItemDTO.toJSON());
        }
    }
}