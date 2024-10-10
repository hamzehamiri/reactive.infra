import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreDashboardRequestDTO from "../../../Models/Request/Dashboard/CoreDashboardRequestDTO.js";
import CoreDashboardViewDTO from "../../../Models/Response/Dashboard/CoreDashboardViewDTO.js";

export default class WebDashboardService_SearchDashboardViews_Client extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.DashboardSearchDashboardViewsURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreDashboardViewDTOArray = [];
            json.forEach((coreDashboardViewDTOJson) => {
                let coreDashboardViewDTO = new CoreDashboardViewDTO()
                coreDashboardViewDTO.applyData(coreDashboardViewDTOJson);
                coreDashboardViewDTOArray.push(coreDashboardViewDTO);
            })
            this.callBack(coreDashboardViewDTOArray);
        }
    }

    SearchDashboardViews(coreDashboardRequestDTO, callBack) {
        if (coreDashboardRequestDTO instanceof CoreDashboardRequestDTO) {
            this.callBack = callBack;
            this.send(coreDashboardRequestDTO.toJSON());
        }
    }
}