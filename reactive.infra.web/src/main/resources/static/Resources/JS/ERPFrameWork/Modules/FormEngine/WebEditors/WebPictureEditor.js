import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class WebPictureEditor extends WebEditor {

    static registerKey() {
        return "WebPictureEditor";
    };

    constructor() {
        super();

        this.fileInputElement = DOM.createElement("input");

        this.bindTheme();
        this.requestCaptureEvent_DOM(EventFrameWork.event.FileInput.change, this.fileInputElement, this.fileInputChange.name, this);
    }

    fileInputChange(event) {
        let files = event.target.files;
        if (files instanceof FileList) {
            for (let indexFile = 0; indexFile < files.length; indexFile++) {
                let file = files[indexFile];
                if (file instanceof File) {
                    // this.containerOfItems.addItem(new WebAttachmentUI(file, this), RowLayoutData.factory(90, 1, 0, 6, 0, 0, true));
                }
            }
        }
    }

    onLoad() {
        super.onLoad();

        this.getElement().appendChild(this.fileInputElement);
        DOM.addStyleAttribute(this.fileInputElement, "display", "none");
        DOM.setAttribute(this.fileInputElement, "type", "file");
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebPictureEditor[0]));
    }

    getWebPictureEditorMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebPictureEditor[1].WebPictureEditorMasterDiv)
    }
}