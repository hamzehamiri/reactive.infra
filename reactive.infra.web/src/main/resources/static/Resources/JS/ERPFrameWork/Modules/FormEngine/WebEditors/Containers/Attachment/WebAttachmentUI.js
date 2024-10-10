import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import Progress from "../../../../Components/HTML/Progress/Progress.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import WebAttachmentUiIconButtonFloatAble from "./WebAttachmentUiIconButtonFloatAble.js";
import {IconButtonFloatAbleAlignment} from "../../../../Components/IconButtonFloatAble.js";
import FlexLayout, {FlexDirection} from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import FlexLayoutData from "../../../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import EditorAttachmentDTO from "../../../../../Communicate/Common/DataProvider/Impl/EditorAttachmentDTO.js";
import FormEngineEventFrameWork from "../../../Events/FormEngineEventFrameWork.js";
import WebAttachmentUIStartUploadEvent from "./WebAttachmentUIStartUploadEvent.js";

export default class WebAttachmentUI extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement("div"));
        this.setLayout(new FlexLayout(FlexDirection.column));

        this.floatAbleButtons = new WebAttachmentUiIconButtonFloatAble(this, IconButtonFloatAbleAlignment.Bottom);

        // this.iconElement = DOM.createElement('div');
        this.labelElement = DOM.createElement('p');

        // this.addItem(this.iconElement, FlexLayoutData.factory(1));
        this.addItem(this.labelElement, FlexLayoutData.factory(1));

        this.bindTheme();
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[0]));
    }

    bindModelToUI(editorAttachmentDTO) {
        this.editorAttachmentDTO = editorAttachmentDTO;
        if (this.getAttached() && editorAttachmentDTO) {
            if (editorAttachmentDTO instanceof EditorAttachmentDTO) {
                this.labelElement.innerHTML = editorAttachmentDTO.getFileName();
            }
            if (editorAttachmentDTO.getFile()) {
                this.startUpload();
            }
        }
    }

    getEditorAttachmentDTO() {
        return this.editorAttachmentDTO;
    }

    onLoad() {
        super.onLoad();

        DOM.addStyleAttribute(this.labelElement, 'direction', 'ltr');

        DOM.addClassName(this.getElement(), this.getMasterClass());
        // DOM.addClassName(this.iconElement, this.getIconClass());
        DOM.addClassName(this.labelElement, this.getLabelClass());

        this.bindModelToUI(this.editorAttachmentDTO);
    }

    startUpload() {
        this.progress = new Progress(this);

        let formData = new FormData();
        formData.append("fileModel", this.editorAttachmentDTO.toJsonString());
        formData.append("file", this.editorAttachmentDTO.getFile());

        this.fireEvent(FormEngineEventFrameWork.event.WebAttachmentEditorEvents.WebAttachmentEditorStartUploadEvent, new WebAttachmentUIStartUploadEvent(this, formData, this.editorAttachmentDTO));
    }

    getIconClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIIcon);
    }

    getMasterClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIMaster);
    }

    getLabelClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUILabel);
    }
}