import {WebEditor} from "../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {DOM} from "../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {Drag} from "../../../../UIFrameWork/HTML/DND/Drag.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import DragEvent from "../../../../UIFrameWork/HTML/DND/DragEvent.js";
import WebSliderEditorGeneratorUI from "./Containers/Slider/WebSliderEditorGeneratorUI.js";

export default class WebSliderEditor extends WebEditor {
    static registerKey() {
        return "WebSliderEditor"
    };

    constructor() {
        super();

        let trackSliderDiv = DOM.createElement('div');
        let sliderDiv = DOM.createElement('div');
        DOM.setLeft(sliderDiv, 0);

        let masterSliderDiv = DOM.createElement('div');
        masterSliderDiv.appendChild(trackSliderDiv);
        masterSliderDiv.appendChild(sliderDiv);

        new Drag(this, Drag.DragMode.Horizontal, null, sliderDiv);

        this.addListener(EventFrameWork.event.position, (dragEvent) => {
            if (dragEvent instanceof DragEvent) {
                let rect = this.getBoundingClientRect_Style();
                if (rect.width) {
                    let percentValue = dragEvent.getXFinal() / rect.width;
                    this.setValue(percentValue);
                }
            }
        });

        this.setElement(masterSliderDiv);
        this.setDataElement(WebSliderEditor.DataElement.MasterSliderDiv, masterSliderDiv);
        this.setDataElement(WebSliderEditor.DataElement.TrackSliderDiv, trackSliderDiv);
        this.setDataElement(WebSliderEditor.DataElement.SliderDiv, sliderDiv);
        this.setGeneratedInputElement(false);
        this.setWebEditorValueGeneratorUI(new WebSliderEditorGeneratorUI(this));
        this.bindTheme();
        this.setValue(0.1);
    }

    setSize(width, height) {
        super.setSize(width, height);
        this.getWebEditorValueGeneratorUI().generateUi(this.value);
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WebSliderEditor[0]));
    }

    getMasterSliderDiv() {
        return this.getDataElement().get(WebSliderEditor.DataElement.MasterSliderDiv);
    }

    getTrackSliderDiv() {
        return this.getDataElement().get(WebSliderEditor.DataElement.TrackSliderDiv);
    }

    getSliderDiv() {
        return this.getDataElement().get(WebSliderEditor.DataElement.SliderDiv);
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getMasterSliderDiv(), this.getWebSliderEditorMasterDivClass());
        DOM.addClassName(this.getTrackSliderDiv(), this.getWebSliderEditorTrackDivClass());
        DOM.addClassName(this.getSliderDiv(), this.getWebSliderEditorSliderDivClass());
    }

    getWebSliderEditorMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorMasterDiv);
    }

    getWebSliderEditorTrackDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorTrackDiv);
    }

    getWebSliderEditorSliderDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorSliderDiv);
    }
}

WebSliderEditor.DataElement = {
    TrackSliderDiv: "TrackSliderDiv",
    SliderDiv: "SliderDiv",
    MasterSliderDiv: "MasterSliderDiv",
}
