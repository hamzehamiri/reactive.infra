import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {BaseButtonEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {Util} from "../../../../../UIFrameWork/Shared/Common/Util.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ChartElementConfigDataContainer extends HTMLContainer {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        let apply_style = {
            "classButton": "btn_apply btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Tab/apply.svg"
        };

        this.containerSeries = new HTMLContainer();
        this.containerSeries.setLayout(new RowLayout(RowLayout_Mode.Vertical, null, 'hidden auto'));
        this.applyButton = new BaseButtonEditor(Util.ConvertJsonToMap(apply_style), null, true);

        this.addItem(this.containerSeries, RowLayoutData.factory(1, 1, 1, 1, 1, 1, true));
        this.addItem(this.applyButton, RowLayoutData.factory(1, 40, 4, 1, 1, 4, true));
    }

    getContainerSeries() {
        return this.containerSeries;
    }

    getApplyButton() {
        return this.applyButton;
    }
}