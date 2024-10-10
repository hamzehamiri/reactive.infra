import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreAnalyticReportDTO from "./CoreAnalyticReportDTO.js";
import CoreAnalyticReportFieldDTO from "./Field/CoreAnalyticReportFieldDTO.js";
import PagingDTO from "../../../Request/Common/PagingDTO.js";
import CoreButtonAssignElementDTO from "../../Button/CoreButtonAssignElementDTO.js";

export default class CoreAnalyticReportMetaDataDTO extends BaseModel {
    constructor() {
        super();
    }

    setCoreAnalyticReportFieldDTOMap(coreAnalyticReportFieldDTOMap) {
        this.coreAnalyticReportFieldDTOMap = coreAnalyticReportFieldDTOMap;
        this.coreAnalyticReportFieldDTOMapConverted = undefined;
    }

    setPagingDTOHorizontal(pagingDTOHorizontal) {
        this.pagingDTOHorizontalConverted = pagingDTOHorizontal;
    }

    setPagingDTOVertical(pagingDTOVertical) {
        this.pagingDTOVerticalConverted = pagingDTOVertical;
    }

    getCoreAnalyticReportDTO() {
        if (this.coreAnalyticReportDTO && !(this.coreAnalyticReportDTO.constructor.prototype instanceof BaseModel)) {
            this.coreAnalyticReportDTO = ConvertUtil.ConvertGeneral(CoreAnalyticReportDTO, this.coreAnalyticReportDTO);
        }
        return this.coreAnalyticReportDTO;
    }

    getCoreAnalyticReportFieldDTOMap() {
        if (this.coreAnalyticReportFieldDTOMap && !(this.coreAnalyticReportFieldDTOMap instanceof Map)) {
            this.coreAnalyticReportFieldDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreAnalyticReportFieldDTO, this.coreAnalyticReportFieldDTOMap, "id");
        }
        return this.coreAnalyticReportFieldDTOMap;
    }

    getCoreButtonAssignElementDTOMap() {
        if (this.coreButtonAssignElementDTOMap && !(this.coreButtonAssignElementDTOMap instanceof Map)) {
            this.coreButtonAssignElementDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreButtonAssignElementDTO, this.coreButtonAssignElementDTOMap, "id");
        }
        return this.coreButtonAssignElementDTOMap;
    }

    getPagingDTOHorizontal() {
        if (this.pagingDTOHorizontal && !(this.pagingDTOHorizontal.constructor.prototype instanceof BaseModel)) {
            this.pagingDTOHorizontal = ConvertUtil.ConvertGeneral(PagingDTO, this.pagingDTOHorizontal);
        }
        return this.pagingDTOHorizontal;
    }

    getPagingDTOVertical() {
        if (this.pagingDTOVertical && !(this.pagingDTOVertical.constructor.prototype instanceof BaseModel)) {
            this.pagingDTOVertical = ConvertUtil.ConvertGeneral(PagingDTO, this.pagingDTOVertical);
        }
        return this.pagingDTOVertical;
    }
}