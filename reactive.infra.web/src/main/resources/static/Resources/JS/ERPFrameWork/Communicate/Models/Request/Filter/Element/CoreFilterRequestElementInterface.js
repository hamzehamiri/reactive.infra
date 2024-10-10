import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreFilterRequestElementInterface extends BaseModel {
    constructor() {
        super();
    }

    setDataModelRegistry(dataModelRegistry) {
        this.dataModelRegistry = dataModelRegistry;
    }

    getDataModelRegistry() {
        return this.dataModelRegistry;
    }
}

CoreFilterRequestElementInterface.Register = () => {
    return Object.freeze({
        registerKey_ElementWithOperand: Symbol("ElementWithOperand"),
        registerKey_ElementWithOperationParamValue: Symbol("ElementWithOperationParamValue"),
    });
}

CoreFilterRequestElementInterface.Method = () => {
    return Object.freeze({
        dataModelRegistryPropName: Symbol("dataModelRegistry"),
    });
}