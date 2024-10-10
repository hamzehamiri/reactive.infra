import {BaseModel} from "../../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreWindowTabFieldDTO from "./Field/CoreWindowTabFieldDTO.js";
import ConvertUtil from "../../../../Common/ConvertUtil.js";
import CoreWindowTabJoinColumnDTO from "./CoreWindowTabJoinColumnDTO.js";
import CoreButtonAssignElementDTO from "../../Button/CoreButtonAssignElementDTO.js";
import CoreAllElementDTO from "../../Element/CoreAllElementDTO.js";
import CoreLayoutAssignElementDTO from "../../Layout/CoreLayoutAssignElementDTO.js";

export default class CoreWindowTabDTO extends BaseModel {

    constructor() {
        super();
    }

    setCoreWindowTabFieldDTOMap(coreWindowTabFieldDTOMap) {
        this.coreWindowTabFieldDTOMap = coreWindowTabFieldDTOMap;
    }

    setCoreButtonAssignElementDTOMap(coreButtonAssignElementDTOMap) {
        this.coreButtonAssignElementDTOMap = coreButtonAssignElementDTOMap;
    }

    setCoreWindowTabProfileDTO(coreWindowTabProfileDTO) {
        this.coreWindowTabProfileDTO = coreWindowTabProfileDTO;
    }

    setCoreWindowTabDTOParent(coreWindowTabDTOParent) {
        this.coreWindowTabDTOParent = coreWindowTabDTOParent;
    }

    setCoreWindowTabJoinColumnDTOParent(coreWindowTabJoinColumnDTOParent) {
        this.coreWindowTabJoinColumnDTOParent = coreWindowTabJoinColumnDTOParent;
    }

    getCoreWindowTabFieldDTOMap() {
        if (this.coreWindowTabFieldDTOMap && !(this.coreWindowTabFieldDTOMap instanceof Map)) {
            this.coreWindowTabFieldDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabFieldDTO, this.coreWindowTabFieldDTOMap, "id");
        }
        return this.coreWindowTabFieldDTOMap;
    }

    getCoreButtonAssignElementDTOMap() {
        if (this.coreButtonAssignElementDTOMap && !(this.coreButtonAssignElementDTOMap instanceof Map)) {
            this.coreButtonAssignElementDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreButtonAssignElementDTO, this.coreButtonAssignElementDTOMap, "id");
        }

        return this.coreButtonAssignElementDTOMap;
    }

    getTabIndex() {
        return this.tabIndex;
    }

    getCoreAllElementDTO() {
        if (this.coreAllElementDTO && !(this.coreAllElementDTO.constructor instanceof BaseModel)) {
            this.coreAllElementDTO = ConvertUtil.ConvertGeneral(CoreAllElementDTO, this.coreAllElementDTO);
        }
        return this.coreAllElementDTO;
    }

    getCoreLayoutAssignElementDTOMap_Tab() {
        if (this.coreLayoutAssignElementDTOMap_Tab && !(this.coreLayoutAssignElementDTOMap_Tab instanceof Map)) {
            this.coreLayoutAssignElementDTOMap_Tab = ConvertUtil.ConvertGeneralWithMap(CoreLayoutAssignElementDTO, this.coreLayoutAssignElementDTOMap_Tab);
        }
        return this.coreLayoutAssignElementDTOMap_Tab;
    }

    getCoreLayoutAssignElementDTOMap_Toolbar() {
        if (this.coreLayoutAssignElementDTOMap_Toolbar && !(this.coreLayoutAssignElementDTOMap_Toolbar instanceof Map)) {
            this.coreLayoutAssignElementDTOMap_Toolbar = ConvertUtil.ConvertGeneralWithMap(CoreLayoutAssignElementDTO, this.coreLayoutAssignElementDTOMap_Toolbar);
        }
        return this.coreLayoutAssignElementDTOMap_Toolbar;
    }

    getCoreWindowTabJoinColumnDTOMap() {
        if (this.coreWindowTabJoinColumnDTOMap && !(this.coreWindowTabJoinColumnDTOMap instanceof Map)) {
            this.coreWindowTabJoinColumnDTOMap = ConvertUtil.ConvertGeneralWithMap(CoreWindowTabJoinColumnDTO, this.coreWindowTabJoinColumnDTOMap);
        }
        return this.coreWindowTabJoinColumnDTOMap;
    }

    getCoreWindowTabDTOParent() {
        if (this.coreWindowTabDTOParent && !(this.coreWindowTabDTOParent instanceof BaseModel)) {
            this.coreWindowTabDTOParent = ConvertUtil.ConvertGeneral(CoreWindowTabDTO, this.coreWindowTabDTOParent);
        }
        return this.coreWindowTabDTOParent;
    }

    getCoreWindowTabJoinColumnDTOParent() {
        if (this.coreWindowTabJoinColumnDTOParent && !(this.coreWindowTabJoinColumnDTOParent instanceof BaseModel)) {
            this.coreWindowTabJoinColumnDTOParent = ConvertUtil.ConvertGeneral(CoreWindowTabJoinColumnDTO, this.coreWindowTabJoinColumnDTOParent);
        }
        return this.coreWindowTabJoinColumnDTOParent;
    }
}