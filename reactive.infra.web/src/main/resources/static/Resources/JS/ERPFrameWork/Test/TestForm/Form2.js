import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {AnchorLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayout.js";
import WebEditorFactory from "../../Modules/FormEngine/WebEditors/Factory/WebEditorFactory.js";
import {WebTextEditor} from "../../../UIFrameWork/HTML/WebEditor/Text/WebTextEditor.js";
import {AnchorLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Anchor/AnchorLayoutData.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class Form2 extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new AnchorLayout({Width: 400, Height: 350}, false));

        let TextField = WebEditorFactory.factory(WebTextEditor.registerKey());

        let t1 = new TextField();
        let t2 = new TextField();

        t1.setGeneratePlaceHolderLabel("Test1");
        t2.setGeneratePlaceHolderLabel("Test2");

        let height = 60;
        let margin = 10;

        this.addItem(t1, AnchorLayoutData.factory(
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Left'},
            {AnchorTo: t2.getUUID(), Fix: true, Side: 'Left'},
            {Top: 30, Left: 10, Width: 100, Height: height * 2 + margin},
            {Scale: 30, Fix: false},
            {Scale: 100, Fix: true}));

        this.addItem(t2, AnchorLayoutData.factory(
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Top'},
            null/*{AnchorTo: this.getUUID(), Fix: true, Side: 'Bottom'}*/,
            {AnchorTo: t1.getUUID(), Fix: true, Side: 'Right'},
            {AnchorTo: this.getUUID(), Fix: true, Side: 'Right'},
            {Top: 30, Left: 120, Width: 100, Height: height * 2 + margin},
            {Scale: 30, Fix: false},
            {Scale: 100, Fix: true}));
    }
}