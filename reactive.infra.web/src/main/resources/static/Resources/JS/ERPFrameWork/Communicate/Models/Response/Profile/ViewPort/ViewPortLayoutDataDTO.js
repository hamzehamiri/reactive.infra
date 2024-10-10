import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import {SideLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";

export default class ViewPortLayoutDataDTO extends BaseModel {
    constructor() {
        super();
    }

    setTop(sideLayoutDataTop) {
        this.sideLayoutDataTop = sideLayoutDataTop;
    }

    getTop() {
        if (this.sideLayoutDataTop && !(this.sideLayoutDataTop instanceof BaseModel)) {
            this.sideLayoutDataTop = ConvertUtil.ConvertGeneral(SideLayoutData, this.sideLayoutDataTop);
        }
        return this.sideLayoutDataTop;
    }

    setLeft(sideLayoutDataLeft) {
        this.sideLayoutDataLeft = sideLayoutDataLeft;
    }

    getLeft() {
        if (this.sideLayoutDataLeft && !(this.sideLayoutDataLeft instanceof BaseModel)) {
            this.sideLayoutDataLeft = ConvertUtil.ConvertGeneral(SideLayoutData, this.sideLayoutDataLeft);
        }
        return this.sideLayoutDataLeft;
    }

    setCenter(sideLayoutDataCenter) {
        this.sideLayoutDataCenter = sideLayoutDataCenter;
    }

    getCenter() {
        if (this.sideLayoutDataCenter && !(this.sideLayoutDataCenter instanceof BaseModel)) {
            this.sideLayoutDataCenter = ConvertUtil.ConvertGeneral(SideLayoutData, this.sideLayoutDataCenter);
        }
        return this.sideLayoutDataCenter;
    }
}