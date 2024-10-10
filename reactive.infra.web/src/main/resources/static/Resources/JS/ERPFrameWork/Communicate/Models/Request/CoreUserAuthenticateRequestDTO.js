import {BaseModel} from "../../../../UIFrameWork/Shared/Common/BaseModel.js";
import CoreRoleDTO from "../Response/Security/Role/CoreRoleDTO.js";
import CoreTranslateLanguageDTO from "../Response/Translate/CoreTranslateLanguageDTO.js";
import ConvertUtil from "../../Common/ConvertUtil.js";
import CoreUserTenantDTO from "../Response/Security/User/CoreUserTenantDTO.js";

export default class CoreUserAuthenticateRequestDTO extends BaseModel {
    constructor() {
        super();
    }

    setUserName(userName) {
        this.userName = userName;
    }

    setPassword(password) {
        this.password = password;
    }

    setCaptcha(captcha) {
        this.captcha = captcha;
    }

    setSelectedAllRoles(selectedAllRoles) {
        this.selectedAllRoles = selectedAllRoles;
    }

    setTenant(tenant) {
        this.tenant = tenant;
    }

    setRoles(roles) {
        this.roles = roles;
    }

    setLanguage(coreTranslateLanguageDTO) {
        this.coreTranslateLanguageDTO = coreTranslateLanguageDTO;
    }

    getLanguage() {
        if (this.coreTranslateLanguageDTO && !(this.coreTranslateLanguageDTO instanceof CoreTranslateLanguageDTO)) {
            this.coreTranslateLanguageDTO = ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, this.coreTranslateLanguageDTO);
        }
        return this.coreTranslateLanguageDTO;
    }

    getUserId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }

    getPassword() {
        return this.password;
    }

    getCaptcha() {
        return this.captcha;
    }

    getRoles() {
        if (this.roles && (this.roles instanceof Array && !(this.roles[0] instanceof BaseModel))) {
            this.roles = ConvertUtil.ConvertGeneralWithArray(CoreRoleDTO, this.roles);
        }
        return this.roles;
    }

    getTenant() {
        if (this.tenant && !(this.tenant instanceof BaseModel)) {
            this.tenant = ConvertUtil.ConvertGeneral(CoreUserTenantDTO, this.tenant);
        }
        return this.tenant;
    }
}