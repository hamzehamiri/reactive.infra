import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import WebTriggerEditorNew from "../../../../UIFrameWork/HTML/WebEditor/Common/WebTriggerEditorNew.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import WebAttachmentEditorValueGeneratorUI from "./Containers/Attachment/WebAttachmentEditorValueGeneratorUI.js";
import EditorAttachment from "../../../Communicate/Common/DataProvider/Impl/EditorAttachment.js";
import EditorAttachmentDTO from "../../../Communicate/Common/DataProvider/Impl/EditorAttachmentDTO.js";
import {UUID} from "../../../../UIFrameWork/Shared/Common/UUID.js";

export default class WebAttachmentEditor extends WebTriggerEditorNew {

    static registerKey() {
        return "WebAttachmentEditor";
    };

    constructor() {
        super();

        this.fileInputElement = DOM.createElement("input");
        DOM.setAttribute(this.fileInputElement, 'multiple', '');

        this.bindTheme();
        this.requestCaptureEvent_DOM(EventFrameWork.event.FileInput.change, this.fileInputElement, this.fileInputChange.name, this);
        this.setWebEditorValueGeneratorUI(new WebAttachmentEditorValueGeneratorUI(this));
        this.generateBaseTriggerEditor();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebAttachmentEditor[0]));
    }

    fileInputChange(event) {
        let files = event.target.files;
        if (files instanceof FileList) {
            let value = this.getOriginalValue();
            if (value) {

            } else {
                value = new EditorAttachment();
                value.setOriginalData([]);
            }

            for (let indexFile = 0; indexFile < files.length; indexFile++) {
                let file = files[indexFile];

                let uuid = UUID.create();
                let editorAttachmentDTO = new EditorAttachmentDTO();
                editorAttachmentDTO.setUUID(uuid);
                editorAttachmentDTO.setFile(file);
                editorAttachmentDTO.setFileName(file.name);

                if (value instanceof EditorAttachment) {
                    value.getOriginalData().push(editorAttachmentDTO);
                }
            }

            this.setValue(value);
        }
    }

    onLoad() {
        super.onLoad();

        this.getElement().appendChild(this.fileInputElement);
        DOM.addStyleAttribute(this.fileInputElement, "display", "none");
        DOM.setAttribute(this.fileInputElement, "type", "file");
    }

    onMouseClickTrigger(event) {
        this.fileInputElement.click();
    }

    getTriggerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAttachmentEditor[1].AttachmentTrigger)
    }
}