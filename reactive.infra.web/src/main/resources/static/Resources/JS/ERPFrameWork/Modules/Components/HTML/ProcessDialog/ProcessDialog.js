import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import ResourceStateModel from "../../../../../UIFrameWork/Shared/Common/ResourceStateModel.js";
import ScriptManagerUtil from "../../../../../UIFrameWork/Shared/Common/ScriptManagerUtil.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import ErpWindow from "../../ErpWindow.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import ProcessDialogCommandPanel from "./ProcessDialogCommandPanel.js";

export default class ProcessDialog extends ErpWindow {
    constructor() {
        super(true, true, true, false);
        this.setHideOnOtherClick(false);
        this.setBaseHeight(300);

        let arrayResourceStateModel = [];
        arrayResourceStateModel.push(new ResourceStateModel('./Resources/Library/LoadingBar/loading-bar.js', 'LoadingBar', ScriptManagerUtil.Type.JavaScript));
        arrayResourceStateModel.push(new ResourceStateModel('./Resources/Library/LoadingBar/loading-bar.css', 'LoadingBarCss', ScriptManagerUtil.Type.Css));

        arrayResourceStateModel.forEach((arrayResourceState) => {
            this.addMapByComponent(arrayResourceState);
        });

        this.startCaptureResource((resourceStateModel) => {

        }, () => {
            this.unMaskComponent();
            this.loadLoadingBar();
        });

        this.barElement = DOM.createElement("div");
        this.processDialogCommandPanel = new ProcessDialogCommandPanel();

        this.content.setLayout(new RowLayout(RowLayout_Mode.Vertical, null, 'hidden'));
        this.content.addItem(this.barElement, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        this.content.addItem(this.processDialogCommandPanel, RowLayoutData.factory(1, 32, 0, 0, 0, 0, true));
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.barElement, "label-center");
    }

    percentDraw(percent) {
        this.percent = percent;
        this.ldBar.set(
            percent * 100, // 60%
            true // disable animation
        );
    }

    loadLoadingBar() {
        this.ldBar = new ldBar(this.barElement, {
            "stroke": '#f00',
            "stroke-width": 10,
            "preset": "circle",
        });
    }

    getProcessDialogCommandPanel() {
        return this.processDialogCommandPanel;
    }
}