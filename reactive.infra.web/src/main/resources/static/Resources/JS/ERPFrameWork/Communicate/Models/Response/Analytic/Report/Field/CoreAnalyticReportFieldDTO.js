import {BaseModel} from "../../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../Common/ConvertUtil.js";
import CoreTableColumnDTO from "../../../Table/Column/CoreTableColumnDTO.js";
import CoreWindowTabFieldDTO from "../../../Window/Tab/Field/CoreWindowTabFieldDTO.js";
import CoreAnalyticReportFieldAggregateModelDTO from "./CoreAnalyticReportFieldAggregateModelDTO.js";

export default class CoreAnalyticReportFieldDTO extends BaseModel {
    constructor() {
        super();
    }

    getTitle() {
        return this.title;
    }

    getCoreTableColumnDTO() {
        if (this.coreTableColumnDTO && this.coreTableColumnDTOConverted == null) {
            this.coreTableColumnDTOConverted = ConvertUtil.ConvertGeneral(CoreTableColumnDTO, this.coreTableColumnDTO);
        }
        return this.coreTableColumnDTOConverted;
    }

    getCoreWindowTabFieldDTO() {
        if (this.coreWindowTabFieldDTO && this.coreWindowTabFieldDTOConverted == null) {
            this.coreWindowTabFieldDTOConverted = ConvertUtil.ConvertGeneral(CoreWindowTabFieldDTO, this.coreWindowTabFieldDTO);
        }
        return this.coreWindowTabFieldDTOConverted;
    }

    getCoreAnalyticReportFieldAggregateModelDTOS() {
        if (this.coreAnalyticReportFieldAggregateModelDTOS && this.coreAnalyticReportFieldAggregateModelDTOSConverted == null) {
            this.coreAnalyticReportFieldAggregateModelDTOSConverted = ConvertUtil.ConvertGeneralWithArray(CoreAnalyticReportFieldAggregateModelDTO, this.coreAnalyticReportFieldAggregateModelDTOS);
        }
        return this.coreAnalyticReportFieldAggregateModelDTOSConverted;
    }
}