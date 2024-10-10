import {WebTextEditor} from "../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {FormButtonBarContainer} from "../../../UIFrameWork/HTML/Component/FormButtonBarContainer.js";
import {LayoutContainer} from "../../../UIFrameWork/HTML/Container/LayoutContainer.js";
import {RowLayout, RowLayout_Mode} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import WebLanguageEditor from "./Editors/WebLang/WebLanguageEditor.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import EditorEvent from "../../../UIFrameWork/HTML/WebEditor/Common/EditorEvent.js";
import {WebCheckBoxEditor} from "../FormEngine/WebEditors/WebCheckBoxEditor.js";
import WebRoleEditor from "./Editors/WebRole/WebRoleEditor.js";
import WebLoginServiceClient from "../../Communicate/XMLHttpRequest/Services/Login/WebLoginServiceClient.js";
import CoreUserAuthenticateRequestDTO from "../../Communicate/Models/Request/CoreUserAuthenticateRequestDTO.js";
import WebEnvironment from "../../Communicate/Common/WebEnvironment.js";
import WebTenantEditor from "./Editors/WebTenant/WebTenantEditor.js";
import WebTranslateServiceClient
    from "../../Communicate/XMLHttpRequest/Services/Translate/WebTranslateServiceClient.js";
import CoreTranslateRequestDTO from "../../Communicate/Models/Request/CoreTranslateRequestDTO.js";
import CoreTranslateLanguageDTO from "../../Communicate/Models/Response/Translate/CoreTranslateLanguageDTO.js";
import {Util} from "../../../UIFrameWork/Shared/Common/Util.js";
import ConvertUtil from "../../Communicate/Common/ConvertUtil.js";
import BaseEvent from "../../../UIFrameWork/Shared/Event/BaseEvent.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import SimpleButton from "../FormEngine/Toolbar/StandardButtons/SimpleButton.js";

export default class LoginContainer extends HTMLContainer {
    constructor(enableDispatchTranslate) {
        super();
        this.setLayout(new FitLayout());

        this.defaultSizeHeight = 80;

        this.userTextInput = new WebTextEditor();
        this.userTextInput.setGeneratePlaceHolderLabel("UserName");
        this.passwordTextInput = new WebTextEditor(true);
        this.passwordTextInput.setGeneratePlaceHolderLabel("Password");
        this.languageCombobox = new WebLanguageEditor();
        this.languageCombobox.setGeneratePlaceHolderLabel("Languages");
        this.languageCombobox.addListener(EventFrameWork.event.Editors.FieldChangeEvent, (editorEvent) => {
            if (editorEvent instanceof EditorEvent) {
                let coreTranslateLanguage = editorEvent.getValue();
                if (coreTranslateLanguage instanceof Array) {
                    coreTranslateLanguage = ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, coreTranslateLanguage[0]);
                } else {
                    if (coreTranslateLanguage) {
                        coreTranslateLanguage = ConvertUtil.ConvertGeneral(CoreTranslateLanguageDTO, coreTranslateLanguage);
                    }
                }
                if (enableDispatchTranslate) {
                    RegisterComponent.changeLangBindAllComponent(coreTranslateLanguage, true);
                } else {
                    this.bindLang(coreTranslateLanguage, true);
                }
                this.translateRequest(coreTranslateLanguage);
            }
        });

        this.tenantCombobox = new WebTenantEditor();
        this.tenantCombobox.setGeneratePlaceHolderLabel("Tenant");

        this.roleCombobox = new WebRoleEditor();
        this.roleCombobox.setGeneratePlaceHolderLabel("Roles Selected");

        this.rememberPassword = new WebCheckBoxEditor(WebCheckBoxEditor.StateMode.Mode3State);
        this.rememberPassword.setGeneratePlaceHolderLabel("Remember User Per Tenant");

        this.mapEditor = new Map();
        this.mapEditor.set("username", this.userTextInput);
        this.mapEditor.set("password", this.passwordTextInput);
        this.mapEditor.set("language", this.languageCombobox);
        this.mapEditor.set("tenant", this.tenantCombobox);
        this.mapEditor.set("roles", this.roleCombobox);
        this.mapEditor.set("remember_user_per_tenant", this.rememberPassword);

        this.formContainerLogin = new LayoutContainer();
        this.formContainerLogin.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.formContainerLogin.addItem(this.userTextInput, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 38, 0));
        this.formContainerLogin.addItem(this.passwordTextInput, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
        this.formContainerLogin.addItem(this.languageCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
        this.formContainerLogin.addItem(this.rememberPassword, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));

        let ok_style = {
            "classButton": "btn_ok",
            "imageIconSrc": "./Resources/Themes/Img/Login/login.svg"
        };
        let loginButton = new SimpleButton(null, Util.ConvertJsonToMap(ok_style), null, true);
        loginButton.addListener(EventFrameWork.event.MouseEvent.click, (event) => {
            this.authenticateRequest();
        }, this);

        let formContainer = new FormButtonBarContainer({
            ButtonBarSide: 'button',
            SizeButtonBar: 60,
            Buttons: [{
                Button: loginButton,
                Graphic: {
                    width: 100,
                    height: 1,
                    margin: {
                        left: 2,
                        right: 2,
                        top: 2,
                        bottom: 2
                    }
                }
            }],
            CenterContainer: this.formContainerLogin
        });

        this.addItem(formContainer);
        this.bindTheme();
        this.bindDataFromStorage();
    }

    bindDataFromStorage() {
        let coreUserAuthenticateRequestDTO = WebEnvironment.GetCoreUserAuthenticateRequestDTO();
        if (coreUserAuthenticateRequestDTO instanceof CoreUserAuthenticateRequestDTO) {
            this.userTextInput.setValue(coreUserAuthenticateRequestDTO.getUserName());
            this.passwordTextInput.setValue(coreUserAuthenticateRequestDTO.getPassword());
            this.languageCombobox.setValue(ConvertUtil.ConvertCoreTranslateLanguageDTOToKeyValueDTO(coreUserAuthenticateRequestDTO.getLanguage()));
            this.tenantCombobox.setValue(ConvertUtil.ConvertCoreUserTenantDTOToKeyValueDTO(coreUserAuthenticateRequestDTO.getTenant()));
            this.roleCombobox.setValue(ConvertUtil.ConvertCoreRoleDTOToKeyValueDTOs(coreUserAuthenticateRequestDTO.getRoles()));

            if (coreUserAuthenticateRequestDTO.getTenant()) {
                this.formContainerLogin.addItem(this.tenantCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
            }
            if (coreUserAuthenticateRequestDTO.getRoles()) {
                this.formContainerLogin.addItem(this.roleCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
            }
        }
    }

    authenticateRequest() {
        let coreUserAuthenticateRequestDTO = new CoreUserAuthenticateRequestDTO();
        coreUserAuthenticateRequestDTO.setUserName(this.userTextInput.getValue());
        coreUserAuthenticateRequestDTO.setPassword(this.passwordTextInput.getValue());
        coreUserAuthenticateRequestDTO.setLanguage(this.languageCombobox.getValue());
        coreUserAuthenticateRequestDTO.setTenant(this.tenantCombobox.getValue());
        coreUserAuthenticateRequestDTO.setRoles(this.roleCombobox.getValue());

        new WebLoginServiceClient(this).Login(coreUserAuthenticateRequestDTO, (coreUserAuthenticateResponseDTO) => {
            let tenants = coreUserAuthenticateResponseDTO.getAllTenants();
            let roles = coreUserAuthenticateResponseDTO.getAllRoles();
            if (tenants != null) {
                if (tenants.length === 1) {
                    this.formContainerLogin.addItem(this.tenantCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
                    this.formContainerLogin.addItem(this.roleCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
                    if (this.tenantCombobox.getValue() == null) {
                        this.tenantCombobox.setValue(this.tenantCombobox.convertValue(tenants[0]));
                    }
                    this.roleCombobox.setStoreData(roles);
                } else if (tenants.length > 1) {
                    this.formContainerLogin.addItem(this.tenantCombobox, RowLayoutData.factory(1, this.defaultSizeHeight, 30, 30, 18, 0));
                    this.tenantCombobox.setStoreData(tenants);
                }
            }
            if (coreUserAuthenticateResponseDTO.getToken()) {
                WebEnvironment.SetCoreUserAuthenticateRequestDTO(coreUserAuthenticateRequestDTO, this.rememberPassword.getValue());
                WebEnvironment.SetCoreUserAuthenticateResponseDTO(coreUserAuthenticateResponseDTO, this.rememberPassword.getValue());
                WebEnvironment.SetToken(coreUserAuthenticateResponseDTO.getToken(), this.rememberPassword.getValue());
                WebEnvironment.SetCoreTranslateLanguageDTO(this.languageCombobox.getValue(), this.rememberPassword.getValue());
                this.fireEvent(EventFrameWork.event.Login.LoginSuccess, new BaseEvent(this));
            }
        }, null, this.getElement());
    }

    translateRequest(coreTranslateLanguage) {
        let coreTranslateRequestDTO = new CoreTranslateRequestDTO();
        coreTranslateRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguage);
        coreTranslateRequestDTO.setRegisterKey("Login");
        new WebTranslateServiceClient(this).Translate(coreTranslateRequestDTO, (coreTranslateDTOMap) => {
            if (coreTranslateDTOMap instanceof Map) {
                coreTranslateDTOMap.forEach((coreTranslateDTO, recordId) => {
                    let editor = this.mapEditor.get(coreTranslateDTO.getCoreGeneralRecordDTO()['name'].toLowerCase());
                    if (editor)
                        editor.setGeneratePlaceHolderLabel(coreTranslateDTO.getTranslateValue());
                });
            }
        }, this);
    }

    onLoad() {
        super.onLoad();
        this.getElement().setAttribute('class', this.getContainerClass());
        this.translateRequest(RegisterComponent.getCurrentLanguage());
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Login[0]));
    }

    getContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.Login[1].LoginContainer);
    }
}