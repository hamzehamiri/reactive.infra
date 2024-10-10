import BaseView from "../../../../../Common/BaseView.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import ConfirmPanel from "../../../../../Common/Confirm/ConfirmPanel.js";
import GridView from "../../../../Tab/View/GridView.js";
import {RowLayoutData} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {FitLayout} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {SideLayout} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import {BaseButtonEditor} from "../../../../../../../UIFrameWork/HTML/WebEditor/Button/BaseButtonEditor.js";
import {Util} from "../../../../../../../UIFrameWork/Shared/Common/Util.js";
import HTMLContainer from "../../../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export class WebERPSearchAdvancedView extends BaseView {
    constructor() {
        super();

        this.setLayout(new SideLayout());

        this.filterViewContainer = new HTMLContainer();
        this.filterViewContainer.setLayout(new FitLayout());

        let magnifying_style = {
            "classButton": "btn_magnifying btn_general",
            "imageIconSrc": "./Resources/Themes/Img/Toolbar/Buttons/Filter/magnifying.svg"
        };

        this.magnifyingBtn = new BaseButtonEditor(Util.ConvertJsonToMap(magnifying_style), null, true);

        this.gridView = new GridView();

        this.confirmPanel = new ConfirmPanel();
        this.confirmPanel.addItem(this.magnifyingBtn, RowLayoutData.factory(60, 1, 0, 0, 0, 0, true));

        let containerButton = new HTMLContainer();
        containerButton.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        containerButton.addItem(this.gridView, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        containerButton.addItem(this.confirmPanel, RowLayoutData.factory(1, 40, 0, 0, 0, 0, true));

        this.addItem(this.filterViewContainer, SideLayoutData.factory(SideLayoutData.Side.Center, 1, true, false, true, true, 0, 0, 0, 0));
        this.addItem(containerButton, SideLayoutData.factory(SideLayoutData.Side.Bottom, 200, true, false, true, true, 0, 0, 0, 0));

        this.bindTheme();
    }

    getGridView() {
        return this.gridView;
    }

    getMagnifyingBtn() {
        return this.magnifyingBtn;
    }

    getFilterViewContainer() {
        return this.filterViewContainer;
    }

    getConfirmPanel() {
        return this.confirmPanel;
    }
}