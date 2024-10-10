import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class ChartElementConfigSeriesDTO extends BaseModel {
    constructor() {
        super();
    }

    setRowSeries(chartElementConfigSeriesRowDTOMap) {
        this.chartElementConfigSeriesRowDTOMap = chartElementConfigSeriesRowDTOMap;
    }
}