import {BoxSVGTitleComponent} from "../../Common/BoxSVGTitleComponent.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import TabTitleEvent from "../../../../../../UIFrameWork/HTML/TabPanel/Containers/Events/TabTitleEvent.js";
import GraphTabItem from "./GraphTabItem.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";

export default class GraphTabItemTitle extends BoxSVGTitleComponent {
    constructor(nameSpace, title) {
        super(nameSpace);
        this.setTitle(title);

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onClick.name, this);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.GraphTabItemTitle[0]));
    }

    onClick(event) {
        this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickTitle, new TabTitleEvent(this));
    }

    setGraphTabItem(graphTabItem) {
        this.graphTabItem = graphTabItem;
        if (this.graphTabItem instanceof GraphTabItem) {
            this.graphTabItem.setTabItemTitle(this);
        }
    }

    getGraphTabItem() {
        return this.graphTabItem;
    }

    setTitleClass(titleClass) {
        this.titleClass = titleClass;
        if (this.getAttached()) {
            DOM.addClassName(this.textElement, titleClass);
        }
    }

    setSVGClass(svgClass) {
        this.svgClass = svgClass;
        if (this.getAttached()) {
            DOM.addClassName(this.getElement(), svgClass);
        }
    }

    onLoad() {
        super.onLoad();

        this.setTitleClass(this.getGraphTabItemTitleTextClass());
        this.setSVGClass(this.getGraphTabItemTitleSVGClass());
    }

    setActive(active) {
        this.active = active;
        if (this.getAttached()) {
            if (active) {
                DOM.addClassName(this.getElement(), this.getGraphTabItemTitleSVGSelectedClass());
            } else {
                DOM.removeClassName(this.getElement(), this.getGraphTabItemTitleSVGSelectedClass());
            }
        }
    }

    getGraphTabItemTitleTextClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleText);
    }

    getGraphTabItemTitleSVGClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVG);
    }

    getGraphTabItemTitleSVGSelectedClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVGSelected);
    }
}