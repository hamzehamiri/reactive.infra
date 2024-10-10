import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import CoreAnalyticReportMetaDataDTO from "../../../Models/Response/Analytic/Report/CoreAnalyticReportMetaDataDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";
import CoreAnalyticReportPivotGrid from "../../../Models/Response/Analytic/Report/CoreAnalyticReportPivotGrid.js";

export default class AnalyticReportService_Refresh extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.AnalyticReportRefreshURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreAnalyticReportPivotGridArray = ConvertUtil.ConvertGeneralWithArray(CoreAnalyticReportPivotGrid, json);
            this.callBack(coreAnalyticReportPivotGridArray);
        }
    }

    Refresh(coreAnalyticReportMetaDataDTO, callBack) {
        if (coreAnalyticReportMetaDataDTO instanceof CoreAnalyticReportMetaDataDTO) {
            this.callBack = callBack;
            this.send(coreAnalyticReportMetaDataDTO.toJSON());
        }
    }
}