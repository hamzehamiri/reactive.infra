import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayout, RowLayout_Mode} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import SimpleButton from "../FormEngine/Toolbar/StandardButtons/SimpleButton.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import ButtonFactory from "../FormEngine/WebEditors/Factory/ButtonFactory.js";
import WebLanguageEditor from "../Login/Editors/WebLang/WebLanguageEditor.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import EditorEvent from "../../../UIFrameWork/HTML/WebEditor/Common/EditorEvent.js";
import ConvertUtil from "../../Communicate/Common/ConvertUtil.js";
import CoreTranslateLanguageDTO from "../../Communicate/Models/Response/Translate/CoreTranslateLanguageDTO.js";
import WebEnvironment from "../../Communicate/Common/WebEnvironment.js";
import WebThemeEditor from "../Login/Editors/WebTheme/WebThemeEditor.js";
import CoreThemeDTO from "../../Communicate/Models/Response/Translate/CoreThemeDTO.js";
import LetterButton from "../FormEngine/Toolbar/StandardButtons/LetterButton.js";
import CoreUserAuthenticateRequestDTO from "../../Communicate/Models/Request/CoreUserAuthenticateRequestDTO.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ProfileContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal, (component) => {
            return !component.getLanguage().getIsRTL();
        }));

        let profileSimpleButton = new SimpleButton(null, new Map([
            [ButtonFactory.Attribute.classButton, "ClassProfileUser"],
            [ButtonFactory.Attribute.imageIconSrc, './Resources/Themes/Img/Profile/user-profile.svg']
        ]));

        let letterButton = new LetterButton();

        this.languageCombobox = new WebLanguageEditor();
        this.languageCombobox.setGeneratePlaceHolderLabel("Languages");
        this.languageCombobox.setValue(ConvertUtil.ConvertCoreTranslateLanguageDTOToKeyValueDTO(WebEnvironment.GetCoreTranslateLanguageDTO()));
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
                let coreUserDTO = WebEnvironment.GetCoreUserAuthenticateRequestDTO();
                if (coreUserDTO instanceof CoreUserAuthenticateRequestDTO) {
                    coreUserDTO.setLanguage(coreTranslateLanguage);
                    WebEnvironment.SetCoreUserAuthenticateRequestDTO(coreUserDTO, true);
                }
                WebEnvironment.SetCoreTranslateLanguageDTO(coreTranslateLanguage, true);
                RegisterComponent.changeLangBindAllComponent(coreTranslateLanguage, true);
            }
        });

        this.themeEditor = new WebThemeEditor();
        this.themeEditor.setGeneratePlaceHolderLabel("Theme");
        this.themeEditor.setValue(ConvertUtil.ConvertCoreThemeDTOToKeyValueDTO(WebEnvironment.GetCurrentCoreThemeDTO()));
        this.themeEditor.addListener(EventFrameWork.event.Editors.FieldChangeEvent, (editorEvent) => {
            if (editorEvent instanceof EditorEvent) {
                let coreThemeDTO = editorEvent.getValue();
                if (coreThemeDTO instanceof CoreThemeDTO) {
                    WebEnvironment.SetCurrentCoreThemeDTO(coreThemeDTO, true);
                    RegisterComponent.setCurrentTheme(coreThemeDTO.getJsonCss());
                }
            }
        });

        this.addItem(profileSimpleButton, RowLayoutData.factory(32, 1, 1, 1, 1, 1, true));
        this.addItem(letterButton, RowLayoutData.factory(40, 1, 1, 1, 1, 1, true));
        this.addItem(this.languageCombobox, RowLayoutData.factory(200, 1, 1, 1, 1, 1, true));
        this.addItem(this.themeEditor, RowLayoutData.factory(200, 1, 1, 1, 1, 1, true));

        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.ProfileContainer[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getProfileContainerMasterClass());
    }

    getProfileContainerMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.ProfileContainer[1].ProfileContainerMaster);
    }
}