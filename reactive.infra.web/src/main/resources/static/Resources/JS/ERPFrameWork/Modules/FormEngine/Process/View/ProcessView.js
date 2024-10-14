import BaseView from "../../../Common/BaseView.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import ConfirmPanel from "../../../Common/Confirm/ConfirmPanel.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import FormView from "../../Tab/View/FormView.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {SideLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import ProcessViewSideBar from "./ProcessViewSideBar.js";
import WrapSVGComponent from "../../../../../UIFrameWork/HTML/Component/WrapSVGComponent.js";
import GraphTabPanelTitle from "../../../Components/SVG/GraphPanel/Container/GraphTabPanelTitle.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import WrapCanvasComponent from "../../../../../UIFrameWork/HTML/Component/WrapCanvasComponent.js";
import ComplexCanvasContainer from "./ComplexCanvasContainer.js";

export default class ProcessView extends BaseView {
    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical, null, "hidden"));

        this.editorMap = new Map();
        this.formView = new FormView();
        this.processViewSideBar = new ProcessViewSideBar();
        this.confirmPanel = new ConfirmPanel();

        this.canvasElement = new WrapCanvasComponent();
        this.canvasElement.setBase2DContainer(new ComplexCanvasContainer());
        this.wrapSVGComponent = new WrapSVGComponent('http://www.w3.org/2000/svg');
        this.wrapSVGComponent.setBaseSVGComponent(new GraphTabPanelTitle('http://www.w3.org/2000/svg'));

        let containerCenter = new HTMLContainer();
        containerCenter.setLayout(new SideLayout());
        containerCenter.addItem(this.formView, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, false, false, 5, 5, 5, 5));
        containerCenter.addItem(this.canvasElement, SideLayoutData.factory(SideLayoutData.Side.Top, 200, true, false, false, false, 5, 5, 5, 5));
        // containerCenter.addItem(this.wrapSVGComponent, SideLayoutData.factory(SideLayoutData.Side.Top, 200, true, false, false, false, 5, 5, 5, 5))
        containerCenter.addItem(this.processViewSideBar, SideLayoutData.factory(SideLayoutData.Side.Left, 300, true, false, false, false, 0, 0, 0, 0));

        this.addItem(containerCenter, RowLayoutData.factory(1, 1, 2, 2, 2, 2, true));
        this.addItem(this.confirmPanel, RowLayoutData.factory(1, 40, 2, 2, 1, 1, true));
    }

    onLoad() {
        super.onLoad();
        DOM.setAttribute(this.getElement(), "ProcessView", "true");
    }

    getConfirmPanel() {
        return this.confirmPanel;
    }

    getFormView() {
        return this.formView;
    }

    getEditorMap() {
        return this.editorMap;
    }

    getProcessViewSideBar() {
        return this.processViewSideBar;
    }
}