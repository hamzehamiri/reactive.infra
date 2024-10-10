import {BaseButtonEditor} from "./BaseButtonEditor.js";
import ButtonFactory from "../../../../ERPFrameWork/Modules/FormEngine/WebEditors/Factory/ButtonFactory.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import {Util} from "../../../Shared/Common/Util.js";
import BaseEvent from "../../../Shared/Event/BaseEvent.js";
import {UiFrameWorkComponent} from "../../ThemeLanguage/Theme.js";
import FormEngineEventFrameWork from "../../../../ERPFrameWork/Modules/FormEngine/Events/FormEngineEventFrameWork.js";
import ButtonEditorEvent from "../Common/ButtonEditorEvent.js";
import WebEditorModelKeyDisplay from "../Common/WebEditorModelKeyDisplay.js";
import WebEditorModelKeyDisplayArray from "../Common/WebEditorModelKeyDisplayArray.js";
import MultiOptionButtonEditorOriginalModel from "./MultiOptionButtonEditorOriginalModel.js";
import MultiOptionButtonSerializer from "../Common/Serializer/MultiOptionButtonSerializer.js";
import CoreButtonAssignElementDTO
    from "../../../../ERPFrameWork/Communicate/Models/Response/Button/CoreButtonAssignElementDTO.js";
import SimpleButton from "../../../../ERPFrameWork/Modules/FormEngine/Toolbar/StandardButtons/SimpleButton.js";

export default class MultiOptionButtonEditor extends BaseButtonEditor {

    static Init() {
        ButtonFactory.register(MultiOptionButtonEditor.clientUiKey(), MultiOptionButtonEditor);
    }

    static clientUiKey() {
        return "MultiOptionButton";
    };

    constructor(attributeMap, txtButton, defaultButton, mode) {
        super(attributeMap, txtButton, defaultButton);

        this.mode = mode;

        let master = DOM.createElement("div");
        DOM.addStyleAttribute(master);

        let masterAttr = attributeMap.get('master');
        if (masterAttr) {
            this.clickCallback = masterAttr[ButtonFactory.Attribute.clickCallback];
            this.producerDataCallback = masterAttr[ButtonFactory.Attribute.producerDataCallback];
            this.imageIcon = masterAttr[ButtonFactory.Attribute.imageIconSrc];
            this.classButton = masterAttr[ButtonFactory.Attribute.classButton] ? masterAttr[ButtonFactory.Attribute.classButton] : this.getBaseButtonClass();
            this.bindDataFunction = masterAttr[ButtonFactory.Attribute.bindDataFunction];
        }

        this.mapButtonEditor = new Map();

        this.setElement(master);
        this.setWebEditorValueSerializer(new MultiOptionButtonSerializer(this));
    }

    onLoad() {
        super.onLoad();
        this.setOptions(this.optionsArray);
        DOM.addClassName(this.getElement(), this.classButton);
    }

    onDetach() {
        super.onDetach();
        this.mapButtonEditor.forEach(btn => {
            if (btn.getAttached())
                btn.onDetach();
        });
        this.mapButtonEditor.clear();
    }

    setOptions(optionsArray) {
        if (optionsArray instanceof WebEditorModelKeyDisplayArray) {
            this.optionsArray = optionsArray;
            if (this.getAttached()) {
                this.optionsArray.getMapValues().forEach(option => {
                    if (option instanceof WebEditorModelKeyDisplay) {
                        let btn = this.generateOption(option.getKey(), option.getDisplay());
                        btn.setParent(this);
                        btn.onAttach();
                        btn.makePositionable(false);
                        btn.addStyleAttribute('display', 'inline-block');
                        btn.setSize(32, 32);
                        btn.addListener(EventFrameWork.event.MouseEvent.click, (event) => {
                            if (event instanceof BaseEvent && event.getSource().getButtonKey() instanceof CoreButtonAssignElementDTO && event.getSource().getButtonKey().getCoreButtonDTO()) {
                                let keyData = event.getSource().getButtonKey().getCoreButtonDTO().getCommandClientKey();
                                this.fireClickBtn(keyData);
                            }
                        }, this);

                        this.mapButtonEditor.set(option.key, btn);
                    }
                });
                this.setValue(this.optionsArray);
            }
        }
    }

    fireClickBtn(keyData) {
        switch (this.mode) {
            case MultiOptionButtonEditor.Mode.Free:
                break;
            case MultiOptionButtonEditor.Mode.OneToggle:
                let buttonEditor = this.mapButtonEditor.get(keyData);
                if (buttonEditor) {
                    this.fireEvent(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, new ButtonEditorEvent(this, buttonEditor.getButtonKey()));
                    this.mapButtonEditor.forEach((btn, key) => {
                        let webEditorValue = this.getOriginalValue().getMapValues().get(key);
                        let originalValue = webEditorValue.getOriginal();
                        if (originalValue instanceof MultiOptionButtonEditorOriginalModel) {
                            if (key !== keyData) {
                                btn.setDeActiveClass(UiFrameWorkComponent.Components.Buttons[1].btn_active);
                                originalValue.setIsActive(false);
                            } else {
                                btn.setActiveClass(UiFrameWorkComponent.Components.Buttons[1].btn_active);
                                originalValue.setIsActive(true);
                            }
                        }
                    });
                }
                break;
            case MultiOptionButtonEditor.Mode.MultiToggle:
                break;
        }
    }

    generateOption(key, display) {
        let attr_btn = this.getAttributeMap() ? this.getAttributeMap().get(key) : null;
        let button = null;
        if (attr_btn) {
            button = new SimpleButton(null, Util.ConvertJsonToMap(attr_btn), null, true);
        } else {
            button = new SimpleButton(null, null, null, true);
        }

        let coreButtonAssignElementDTO = this.getButtonKey().CloneOfClass();
        coreButtonAssignElementDTO.getCoreButtonDTO().setCommandClientKey(key);

        button.setButtonKey(coreButtonAssignElementDTO);
        return button;
    }
}

MultiOptionButtonEditor.Mode = {
    "Free": "Free",
    "OneToggle": "OneToggle",
    "MultiToggle": "MultiToggle"
}

MultiOptionButtonEditor.OrginalModel = {
    'Is_Active': 'Is_Active'
}