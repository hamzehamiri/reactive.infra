import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {AnchorLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayout.js";
import WebEditorFactory from "../../Modules/FormEngine/WebEditors/Factory/WebEditorFactory.js";
import {WebTextEditor} from "../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {BaseButtonEditor} from "../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {WebDateEditor} from "../../../UIFrameWork/HTML/WebEditor/Calendar/WebDateEditor.js";
import {WebComboBox} from "../../../UIFrameWork/HTML/WebEditor/Combobox/WebComboBox.js";
import {WebCheckBoxEditor} from "../../Modules/FormEngine/WebEditors/WebCheckBoxEditor.js";
import WebCkeditor from "../../../UIFrameWork/HTML/WebEditor/Ckeditor/WebCkeditor.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {Language} from "../../../UIFrameWork/HTML/ThemeLanguage/Language.js";
import {Theme_Standard} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme_Standard.js";
import {Theme_Dark} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme_ِDark.js";
import {AnchorLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayoutData.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class Form1 extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new AnchorLayout({Width: 400, Height: 350}, false));

        let TextField = WebEditorFactory.factory(WebTextEditor.registerKey());
        let ButtonField = WebEditorFactory.factory(BaseButtonEditor.clientUiKey());
        let DateField = WebEditorFactory.factory(WebDateEditor.registerKey());
        let ComboBoxField = WebEditorFactory.factory(WebComboBox.registerKey());
        let CheckBoxField = WebEditorFactory.factory(WebCheckBoxEditor.registerKey());
        let CkeditorField = WebEditorFactory.factory(WebCkeditor.registerKey());
        let t1 = new TextField();
        let t2 = new TextField();
        let t3 = new TextField();
        let t4 = new TextField();
        let t5 = new TextField();
        let t6 = new ButtonField();
        let t7 = new DateField();
        let t8 = new ComboBoxField();
        let t9 = new CheckBoxField();

        t1.setGeneratePlaceHolderLabel("Test1");
        t2.setGeneratePlaceHolderLabel("Test2");
        t3.setGeneratePlaceHolderLabel("Test3");
        t4.setGeneratePlaceHolderLabel("Test4");
        t5.setGeneratePlaceHolderLabel("Test5");
        t6.setGeneratePlaceHolderLabel("Test6");
        t7.setGeneratePlaceHolderLabel("Test7");
        t8.setGeneratePlaceHolderLabel("Test8");
        t9.setGeneratePlaceHolderLabel("Test9");

        t6.addListener(EventFrameWork.event.MouseEvent.click, function (event) {
            // let recorder = new Recorder();
            // recorder.setAudioEnable(true);
            // recorder.Recording(true);
            // recorder.startCapture();
            if (RegisterComponent.getCurrentLanguage() === Language.Language_US) {
                RegisterComponent.changeLangBindAllComponent(Language.Language_IR);
                RegisterComponent.changeTheme(Theme_Standard);
            } else {
                RegisterComponent.changeLangBindAllComponent(Language.Language_US);
                RegisterComponent.changeTheme(Theme_Dark);
            }
        }, this);

        let height = 60;
        let margin = 10;

        this.addItem(t1, AnchorLayoutData.factory(
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            null,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {Top: 30, Left: 200, Width: 100, Height: height * 2 + margin},
            {Scale: 30, Fix: false},
            {Scale: 60, Fix: false}));
        this.addItem(t2, AnchorLayoutData.factory(
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Top'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: t1.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30, Left: 100, Width: 90, Height: height},
            {Scale: 40, Fix: false},
            {Scale: 30, Fix: false}));
        this.addItem(t3, AnchorLayoutData.factory(
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: t5.getUUID(), Fix: true, Side: 'Top'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: t2.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30, Left: 10, Width: 80, Height: height},
            {Scale: 30, Fix: false},
            {Scale: 30, Fix: false}));

        this.addItem(t4, AnchorLayoutData.factory(
            {AnchorTo: t2.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: t5.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: t1.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + height + margin, Left: 80, Width: 110, Height: height},
            {Scale: 70, Fix: false},
            {Scale: 30, Fix: false}));
        this.addItem(t5, AnchorLayoutData.factory(
            {AnchorTo: t3.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: t4.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + height + margin, Left: 10, Width: 60, Height: height},
            {Scale: 0, Fix: true},
            {Scale: 30, Fix: false}));
        this.addItem(t6, AnchorLayoutData.factory(
            {AnchorTo: t5.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + 2 * height + 2 * margin, Left: 10, Width: 290, Height: height},
            {Scale: 100, Fix: false},
            {Scale: 30, Fix: false}));
        this.addItem(t7, AnchorLayoutData.factory(
            {AnchorTo: t6.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + 3 * height + 3 * margin, Left: 10, Width: 290, Height: height},
            {Scale: 100, Fix: false},
            {Scale: 10, Fix: false}));
        this.addItem(t8, AnchorLayoutData.factory(
            {AnchorTo: t7.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: t9.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + 4 * height + 4 * margin, Left: 10, Width: 290, Height: height},
            {Scale: 100, Fix: false},
            {Scale: 1, Fix: true}));

        this.addItem(t9, AnchorLayoutData.factory(
            {AnchorTo: t8.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30 + 5 * height + 5 * margin, Left: 10, Width: 290, Height: height},
            {Scale: 100, Fix: false},
            {Scale: 1, Fix: true}));
    }
}