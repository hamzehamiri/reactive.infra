import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";

export default class CoreWindowTabRequestSearchDTO extends BaseModel {
    constructor() {
        super();
    }

    setUuidTarget(uuidTarget) {
        this.uuidTarget = uuidTarget;
    }

    setCoreWindowTabId(coreWindowTabId) {
        this.coreWindowTabId = coreWindowTabId;
    }

    setPagingDTO(pagingDTO) {
        this.pagingDTO = pagingDTO;
    }

    setSortOrderMap(sortOrderMap) {
        this.sortOrderMap = sortOrderMap;
    }

    setCoreFilterRequestElementWithOperandDTO(coreFilterRequestElementWithOperandDTO) {
        this.coreFilterRequestElementWithOperandDTO = coreFilterRequestElementWithOperandDTO;
    }

    getSortOrderMap() {
        if (!this.sortOrderMap) {
            this.sortOrderMap = new Map();
        }
        return this.sortOrderMap;
    }
}