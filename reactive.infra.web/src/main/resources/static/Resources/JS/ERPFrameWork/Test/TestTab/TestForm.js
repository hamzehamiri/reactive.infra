import {DefaultConfigData} from "../../../UIFrameWork/HTML/DefaultConfigData.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {RowLayout, RowLayout_Mode} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import Toolbar from "../../../UIFrameWork/HTML/Toolbar/Toolbar.js";
import PagingToolbar from "../../../UIFrameWork/HTML/Cells/Grid/PagingToolbar/PagingToolbar.js";
import WebGridAdvanced from "../../../UIFrameWork/HTML/Cells/Grid/Advanced/WebGridAdvanced.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class TestForm extends HTMLContainer {
    constructor() {
        super();

        this.setElement(DOM.createElement('div'));
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical))

        let descriptor = (record, key) => {
            let editorModel = record[key];
            if (editorModel === null || editorModel === undefined)
                return "";
            if (editorModel && ({}).constructor === editorModel.constructor)
                return editorModel.getDisplay();
            else
                return editorModel;
        };

        let recordDescriptorForPk = (record, webGrid) => {
            return record['pk'];
        }

        let toolBar = new Toolbar(32);

        let webGridAdvanced = new WebGridAdvanced();
        webGridAdvanced.setStripRow(true);
        webGridAdvanced.setRecordDescriptorForCell(descriptor);
        webGridAdvanced.setRecordDescriptorForPk(recordDescriptorForPk);

        let pagingToolbar = new PagingToolbar();

        this.addItem(toolBar, RowLayoutData.factory(1, 32, 0, 0, 0, 0));
        this.addItem(webGridAdvanced, RowLayoutData.factory(1, 1, 0, 0, 0, 0));
        this.addItem(pagingToolbar, RowLayoutData.factory(1, 24, 0, 0, 0, 0));

        DefaultConfigData.FillGridDataConfig(webGridAdvanced);

        setInterval(() => {
            // console.log("ddd");
            webGridAdvanced.addRecords([DefaultConfigData.RandomRecord()], descriptor);
        }, 11000);
    }

    onAttach(parentElement) {
        super.onAttach(parentElement);

        // this.toolBar.show();
    }

    onDetach() {
        super.onDetach();

        // this.toolBar.hide();
    }
}