import XMLHttpRequestBaseService from "../../Base/XMLHttpRequestBaseService.js";
import CommunicateConstantURL from "../../../Common/CommunicateConstantURL.js";
import {HTTPRequestType} from "../../../../../ProxyService/XMLHttpRequestService.js";
import AnalyticReportRequestDTO from "../../../Models/Request/Analytic/Report/AnalyticReportRequestDTO.js";
import CoreAnalyticReportMetaDataDTO from "../../../Models/Response/Analytic/Report/CoreAnalyticReportMetaDataDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class AnalyticReportService_Load extends XMLHttpRequestBaseService {
    constructor(component) {
        super(false, true, component);
        this.request(CommunicateConstantURL.AnalyticReportLoadURL, HTTPRequestType.POST);
    }

    convertJsonToModel(json) {
        super.convertJsonToModel(json);
        if (json) {
            let coreAnalyticReportMetaDataDTOArray = ConvertUtil.ConvertGeneralWithArray(CoreAnalyticReportMetaDataDTO, json);
            this.callBack(coreAnalyticReportMetaDataDTOArray);
        }
    }

    Load(analyticReportRequestDTO, callBack) {
        if (analyticReportRequestDTO instanceof AnalyticReportRequestDTO) {
            this.callBack = callBack;
            this.send(analyticReportRequestDTO.toJSON());
        }
    }
}