import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import WebTextEditorSimple from "./WebTextEditorSimple.js";
import EditorColorRGBA from "../../../../../Communicate/Common/DataProvider/Impl/EditorColorRGBA.js";
import HTMLContainer from "../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class RGBAlphaContainer extends HTMLContainer {
    constructor() {
        super();

        this.rEditor = new WebTextEditorSimple();
        this.rEditor.setGeneratePlaceHolderLabel("r");
        this.rEditor.addStyleAttribute('padding', '0px');

        this.gEditor = new WebTextEditorSimple();
        this.gEditor.setGeneratePlaceHolderLabel("g");
        this.gEditor.addStyleAttribute('padding', '0px');

        this.bEditor = new WebTextEditorSimple();
        this.bEditor.setGeneratePlaceHolderLabel("b");
        this.bEditor.addStyleAttribute('padding', '0px');

        this.alphaEditor = new WebTextEditorSimple();
        this.alphaEditor.setGeneratePlaceHolderLabel("a");
        this.alphaEditor.addStyleAttribute('padding', '0px');

        this.setLayout(new RowLayout(RowLayout_Mode.Horizontal));
        this.addItem(this.rEditor, RowLayoutData.factory(0.25, 1, 2, 2, 2, 2, true));
        this.addItem(this.gEditor, RowLayoutData.factory(0.25, 1, 2, 2, 2, 2, true));
        this.addItem(this.bEditor, RowLayoutData.factory(0.25, 1, 2, 2, 2, 2, true));
        this.addItem(this.alphaEditor, RowLayoutData.factory(0.25, 1, 2, 2, 2, 2, true));
    }

    bindUiToModel() {
        let dataProviderColorRGBA = new EditorColorRGBA();
        dataProviderColorRGBA.setR(this.rEditor.getValue());
        dataProviderColorRGBA.setG(this.gEditor.getValue());
        dataProviderColorRGBA.setB(this.bEditor.getValue());
        dataProviderColorRGBA.setAlpha(this.alphaEditor.getValue());

        return dataProviderColorRGBA;
    }


}