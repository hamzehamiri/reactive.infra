import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreDashboardRequestDTO from "../../../Models/Request/Dashboard/CoreDashboardRequestDTO.js";
import CoreDashboardItemDTO from "../../../Models/Response/Dashboard/CoreDashboardItemDTO.js";

export default class WebDashboardService_SearchDashboardItems_Client extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.DashboardSearchDashboardItemsURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreDashboardItemDTOArray = [];
            json.forEach((coreDashboardItemDTOJson) => {
                let coreDashboardItemDTO = new CoreDashboardItemDTO()
                coreDashboardItemDTO.applyData(coreDashboardItemDTOJson);
                coreDashboardItemDTOArray.push(coreDashboardItemDTO);
            })
            this.callBack(coreDashboardItemDTOArray);
        }
    }

    SearchDashboardItems(coreDashboardRequestDTO, callBack) {
        if (coreDashboardRequestDTO instanceof CoreDashboardRequestDTO) {
            this.callBack = callBack;
            this.send(coreDashboardRequestDTO.toJSON());
        }
    }
}