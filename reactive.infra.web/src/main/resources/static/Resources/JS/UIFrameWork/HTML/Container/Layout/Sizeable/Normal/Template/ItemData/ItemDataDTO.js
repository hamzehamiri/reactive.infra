import {BaseModel} from "../../../../../../../Shared/Common/BaseModel.js";
import ConvertUtil from "../../../../../../../../ERPFrameWork/Communicate/Common/ConvertUtil.js";
import ItemDataMiniDTO from "./ItemDataMiniDTO.js";

export default class ItemDataDTO extends BaseModel {
    constructor() {
        super();
    }

    setBaseModel(baseModel) {
        this.baseModel = baseModel;
    }

    getBaseModel() {
        return this.baseModel;
    }

    setItemDataMiniDTOArray(itemDataMiniDTOArray) {
        this.itemDataMiniDTOArray = itemDataMiniDTOArray;
    }

    getItemDataMiniDTOArray() {
        if (this.itemDataMiniDTOArray && (this.itemDataMiniDTOArray instanceof Array && !(this.itemDataMiniDTOArray[0] instanceof BaseModel))) {
            this.itemDataMiniDTOArray = ConvertUtil.ConvertGeneralWithArray(ItemDataMiniDTO, this.itemDataMiniDTOArray);
        }
        return this.itemDataMiniDTOArray;
    }
}