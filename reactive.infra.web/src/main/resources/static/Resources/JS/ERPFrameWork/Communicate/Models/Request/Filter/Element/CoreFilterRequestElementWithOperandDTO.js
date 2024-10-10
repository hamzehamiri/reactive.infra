import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreFilterRequestElementInterface from "./CoreFilterRequestElementInterface.js";
import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreFilterRequestElementWithOperandDTO extends CoreFilterRequestElementInterface {
    constructor() {
        super();
    }

    setCoreFilterRequestElementValueInterfaceList(coreFilterRequestElementValueInterfaceList) {
        this.coreFilterRequestElementValueInterfaceList = coreFilterRequestElementValueInterfaceList;
    }

    setCoreFilterRequestOperandEnum(coreFilterRequestOperandEnum) {
        this.coreFilterRequestOperandEnum = coreFilterRequestOperandEnum;
    }

    getCoreFilterRequestElementValueInterfaceList() {
        if (this.coreFilterRequestElementValueInterfaceList && (this.coreFilterRequestElementValueInterfaceList instanceof Array && !(this.coreFilterRequestElementValueInterfaceList[0] instanceof BaseModel))) {
            this.coreFilterRequestElementValueInterfaceList = ConvertUtil.ConvertCoreFilterRequestElementValueInterfaceList(this.coreFilterRequestElementValueInterfaceList);
        }
        return this.coreFilterRequestElementValueInterfaceList;
    }

    getCoreFilterRequestOperandEnum() {
        return this.coreFilterRequestOperandEnum;
    }
}