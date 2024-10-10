import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import GadgetPrivateToolbar from "./GadgetPrivateToolbar.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import {ResizeContainer} from "../../../../../UIFrameWork/HTML/Resizer/ResizeContainer.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import ErpEvents from "../../../Components/ErpEvents.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class Gadget extends HTMLContainer {

    constructor(resizerActive) {
        super();

        this.resizerActive = resizerActive;
        this.dragElementMatcherFunctionArray = [];

        this.privateToolbar = new GadgetPrivateToolbar();
        this.privateToolbar.removeBtn.addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.fireEvent(ErpEvents.events.Dashboard.Gadgets.DashboardGadgetPrivateToolbar.DashboardGadgetPrivateToolbarRemove, new BaseEvent(this));
        });

        this.gadgetContainerCenter = new HTMLContainer();
        this.gadgetContainerCenter.setLayout(new FitLayout());

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.addItem(this.privateToolbar, RowLayoutData.factory(1, 24, 0, 0, 0, 0, true));
        this.addItem(this.gadgetContainerCenter, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.DashboardGadget[0]));
    }

    addDragElementMatcherFunction(dragElementMatcherFunction) {
        this.dragElementMatcherFunctionArray.push(dragElementMatcherFunction);
        if (this.getAttached()) {
            this.resizer.addDragElementMatcherFunction(dragElementMatcherFunction);
        }
    }

    onLoad() {
        super.onLoad();
        DOM.addClassName(this.getElement(), this.getDashboardGadgetContainerClass());

        if (this.resizerActive) {
            this.resizer = new ResizeContainer(this);

            for (let dragElementMatcherFunction of this.dragElementMatcherFunctionArray) {
                this.resizer.addDragElementMatcherFunction(dragElementMatcherFunction);
            }

            this.resizer.syncActivate(true, true);
            this.resizer.setParent(this.getParent());
            this.resizer.onAttach();
        }
    }

    layoutExecute() {
        super.layoutExecute();
        if (!this.getLayout().getContainer().getTransitionLayoutExecute() && this.resizer && this.resizer.getParent()) {
            this.resizer.layoutExecute();
        }
    }

    callBackTransition() {
        // super.callBackTransition();
        if (this.resizer)
            this.resizer.layoutExecute();
    }

    onDetach() {
        super.onDetach();
        if (this.resizer)
            this.resizer.onDetach();
    }

    getDashboardGadgetContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Modules.DashboardGadget[1].DashboardGadgetContainer);
    }

    getPrivateToolbar() {
        return this.privateToolbar;
    }
}