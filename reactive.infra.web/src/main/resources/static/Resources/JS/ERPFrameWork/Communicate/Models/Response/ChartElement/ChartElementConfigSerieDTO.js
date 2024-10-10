import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class ChartElementConfigSeriesRowDTO extends BaseModel {
    constructor() {
        super();
    }

    setUUID(uuid) {
        this.uuid = uuid;
    }

    getUUID() {
        return this.uuid;
    }

    setXField(xCoreWindowTabField) {
        this.xCoreWindowTabField = xCoreWindowTabField;
    }

    getXField() {
        return this.xCoreWindowTabField;
    }

    setYField(yCoreWindowTabField) {
        this.yCoreWindowTabField = yCoreWindowTabField;
    }

    getYField() {
        return this.yCoreWindowTabField;
    }

    setSeriesName(seriesName) {
        this.seriesName = seriesName;
    }

    getSeriesName() {
        return this.seriesName;
    }

    setDataProviderColorRGBA(dataProviderColorRGBA) {
        this.dataProviderColorRGBA = dataProviderColorRGBA;
    }

    getDataProviderColorRGBA() {
        return this.dataProviderColorRGBA;
    }
}