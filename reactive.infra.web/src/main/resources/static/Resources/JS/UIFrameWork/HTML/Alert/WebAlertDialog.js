import {Popup} from "../Popup/Popup.js";
import ErrorResponseDTO from "../../../ERPFrameWork/Communicate/Models/Response/Error/ErrorResponseDTO.js";
import {RowLayout, RowLayout_Mode} from "../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import {DOM} from "../../Shared/Common/DOM.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export default class WebAlertDialog extends Popup {

    constructor() {
        super(true, true, true, false);

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.headerContainer = new HTMLContainer();
        this.headerContainer.setElement(DOM.createElement("div"));
        this.messageContainer = new HTMLContainer();
        this.messageContainer.setElement(DOM.createElement("div"));

        this.addItem(this.headerContainer, RowLayoutData.factory("1", "30", 0, 0, 0, 0));
        this.addItem(this.messageContainer, RowLayoutData.factory("1", "1", 0, 0, 0, 0));

        this.setBaseHeight(300);

        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();

        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.AlertDialog[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getAlertDialogMasterClass());

        this.setMessage(this.message, this.type);
    }

    setMessage(errorResponseDTO, type) {
        this.message = errorResponseDTO;
        this.type = type;
        if (this.getAttached()) {
            if (type === WebAlertDialog.Type.Error) {
                DOM.setClassNames(this.headerContainer.getElement(), this.getAlertDialogHeader_ErrorClass());
                DOM.setClassNames(this.messageContainer.getElement(), this.getAlertDialogMessageContainer_ErrorClass());
                if (errorResponseDTO instanceof ErrorResponseDTO) {
                    this.messageContainer.getElement().innerHTML = errorResponseDTO.getErrorDescription();
                }
            } else if (type === WebAlertDialog.Type.Info) {
                DOM.setClassNames(this.headerContainer.getElement(), this.getAlertDialogHeader_InfoClass());
                DOM.setClassNames(this.messageContainer.getElement(), this.getAlertDialogMessageContainer_InfoClass());
            }
        }
    }

    getAlertDialogMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMaster);
    }

    getAlertDialogHeader_ErrorClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Error);
    }

    getAlertDialogHeader_InfoClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Info);
    }

    getAlertDialogMessageContainer_ErrorClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Error);
    }

    getAlertDialogMessageContainer_InfoClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Info);
    }
}

WebAlertDialog.Type = Object.freeze({
    Debug: Symbol("Debug"),
    Error: Symbol("Error"),
    Info: Symbol("Info")
})