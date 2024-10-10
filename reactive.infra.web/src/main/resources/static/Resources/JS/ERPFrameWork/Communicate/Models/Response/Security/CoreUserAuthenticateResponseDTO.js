import {BaseModel} from "../../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreRoleDTO from "./Role/CoreRoleDTO.js";
import CoreUserTenantDTO from "./User/CoreUserTenantDTO.js";
import ConvertUtil from "../../../Common/ConvertUtil.js";

export default class CoreUserAuthenticateResponseDTO extends BaseModel {
    constructor() {
        super();
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    setAllTenants(allTenants) {
        this.allTenants = allTenants;
    }

    getAllTenants() {
        if (this.allTenants && (this.allTenants instanceof Array && !(this.allTenants[0].constructor instanceof BaseModel))) {
            this.allTenants = ConvertUtil.ConvertGeneralWithArray(CoreUserTenantDTO, this.allTenants);
        }
        return this.allTenants;
    }

    setAllRoles(allRoles) {
        this.allRoles = allRoles;
    }

    getAllRoles() {
        if (this.allRoles && (this.allRoles instanceof Array && !(this.allRoles[0].constructor instanceof BaseModel))) {
            this.allRoles = ConvertUtil.ConvertGeneralWithArray(CoreRoleDTO, this.allRoles);
        }
        return this.allRoles;
    }
}