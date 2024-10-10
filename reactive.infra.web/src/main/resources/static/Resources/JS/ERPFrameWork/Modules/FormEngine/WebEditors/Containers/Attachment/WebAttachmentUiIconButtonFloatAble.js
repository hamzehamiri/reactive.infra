import IconButtonFloatAble from "../../../../Components/IconButtonFloatAble.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import FormEngineEventFrameWork from "../../../Events/FormEngineEventFrameWork.js";
import WebAttachmentUIStartUploadEvent from "./WebAttachmentUIStartUploadEvent.js";

export default class WebAttachmentUiIconButtonFloatAble extends IconButtonFloatAble {
    constructor(parentComponent, horizontal, iconButtonFloatAbleAlignment) {
        super(parentComponent, horizontal, iconButtonFloatAbleAlignment);

        this.downloadIconButton = DOM.createElement('div');
        this.uploadIconButton = DOM.createElement('div');
        this.deleteIconButton = DOM.createElement('div');
        this.editIconButton = DOM.createElement('div');
        this.previewIconButton = DOM.createElement('div');

        this.getElement().appendChild(this.downloadIconButton);
        this.getElement().appendChild(this.uploadIconButton);
        this.getElement().appendChild(this.deleteIconButton);
        this.getElement().appendChild(this.editIconButton);
        this.getElement().appendChild(this.previewIconButton);

        this.bindTheme();

        DOM.addClassName(this.getElement(), this.getContainerButtonClass());
        DOM.addClassName(this.downloadIconButton, this.getDownloadIconButtonClass());
        DOM.addClassName(this.uploadIconButton, this.getUploadIconButtonClass());
        DOM.addClassName(this.deleteIconButton, this.getDeleteIconButtonClass());
        DOM.addClassName(this.editIconButton, this.getEditIconButtonClass());
        DOM.addClassName(this.previewIconButton, this.getPreviewIconButtonClass());
    }

    btnClick(event) {
        if (event.target === this.downloadIconButton) {
            this.parentComponent.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorDownloadEvent, new WebAttachmentUIStartUploadEvent(this.parentComponent));
        } else if (event.target === this.uploadIconButton) {
            this.parentComponent.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorUploadEvent, new WebAttachmentUIStartUploadEvent(this.parentComponent));
        } else if (event.target === this.deleteIconButton) {
            this.parentComponent.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorDeleteEvent, new WebAttachmentUIStartUploadEvent(this.parentComponent));
        } else if (event.target === this.editIconButton) {
            this.parentComponent.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorEditEvent, new WebAttachmentUIStartUploadEvent(this.parentComponent));
        } else if (event.target === this.previewIconButton) {
            this.parentComponent.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorPreviewEvent, new WebAttachmentUIStartUploadEvent(this.parentComponent));
        }
    }

    mouseEnterParent(event) {
        super.mouseEnterParent(event);
        DOM.removeClassName(this.getElement(), this.getContainerHideClass());
        DOM.addClassName(this.getElement(), this.getContainerActiveClass());
    }

    mouseLeaveParent(event) {
        super.mouseLeaveParent(event);
        DOM.removeClassName(this.getElement(), this.getContainerActiveClass());
        DOM.addClassName(this.getElement(), this.getContainerHideClass());
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[0]));
    }

    getContainerActiveClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleActive);
    }

    getContainerHideClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleHide);
    }

    getContainerButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleContainer);
    }

    getDownloadIconButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DownloadIconButton);
    }

    getEditIconButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].EditIconButton);
    }

    getDeleteIconButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DeleteIconButton);
    }

    getPreviewIconButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].PreviewIconButton);
    }

    getUploadIconButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].UploadIconButton);
    }
}