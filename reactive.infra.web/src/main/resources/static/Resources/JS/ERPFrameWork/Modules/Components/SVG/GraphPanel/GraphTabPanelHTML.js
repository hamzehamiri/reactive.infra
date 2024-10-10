import {RegisterComponent} from "../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import HTMLContainer from "../../../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import GraphTabPanelTitle from "./Container/GraphTabPanelTitle.js";
import WrapSVGComponent from "../../../../../UIFrameWork/HTML/Component/WrapSVGComponent.js";
import GraphTabPanelDataHandler from "./GraphTabPanelDataHandler.js";
import GraphTabItemTitle from "./Container/GraphTabItemTitle.js";
import GraphTabItem from "./Container/GraphTabItem.js";
import GraphTabPanelSlider from "./Container/GraphTabPanelSlider.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import TabTitleEvent from "../../../../../UIFrameWork/HTML/TabPanel/Containers/Events/TabTitleEvent.js";
import {DOM} from "../../../../../UIFrameWork/Shared/Common/DOM.js";
import TabEvent from "../../../../../UIFrameWork/HTML/TabPanel/Containers/Events/TabEvent.js";
import {SideLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";

export default class GraphTabPanelHTML extends HTMLContainer {
    constructor() {
        super();
        this.nameSpace = 'http://www.w3.org/2000/svg';

        this.bindTheme();

        this.graphTabPanelDataHandler = new GraphTabPanelDataHandler();

        this.graphTabPanelTitle = new GraphTabPanelTitle(this.nameSpace, this.graphTabPanelDataHandler);
        this.graphTabPanelTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickTitle, this.onTabPanelClickTitle, this);

        this.wrapSraphTabPanelTitle = new WrapSVGComponent(this.nameSpace);
        this.wrapSraphTabPanelTitle.setBaseSVGComponent(this.graphTabPanelTitle);

        this.graphTabPanelSlider = new GraphTabPanelSlider();
        this.graphTabPanelSlider.setTabItemContainerClass(this.getGraphTabPanelContainerClass());

        this.setGraphTabItemTitleInvoke(GraphTabItemTitle);
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.GraphTabPanel[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getGraphTabPanelMasterDivClass());

        this.setLayout(new SideLayout());
        this.addItem(this.wrapSraphTabPanelTitle, SideLayoutData.factory(SideLayoutData.Side.Left, 200, true, false, true, true, 0, 0, 0, 0, 1));
        this.addItem(this.graphTabPanelSlider, SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, true, false, 0, 0, 0, 0));

        if (this.passiveActiveTabItem)
            this.setActiveGraphTabItem(this.passiveActiveTabItem);
    }

    addItem(component, layoutData, runtimeExecuteLayout) {
        if (component instanceof GraphTabItem) {
            let generatedGraphTabItemTitle = new this.GraphTabItemTitleInvoke(this.nameSpace, component.getTitle());
            generatedGraphTabItemTitle.setGraphTabItem(component);

            this.graphTabPanelTitle.addItem(component, layoutData, () => {
                return generatedGraphTabItemTitle;
            });
        } else if (component instanceof WrapSVGComponent || component instanceof GraphTabPanelSlider) {
            super.addItem(component, layoutData);
        }
    }

    setActiveGraphTabItem(activeGraphTabItem) {
        if (this.getAttached()) {
            if (!this.activeGraphTabItem || (this.activeGraphTabItem && this.activeGraphTabItem.getUUID() !== activeGraphTabItem.getUUID())) {
                this.graphTabPanelDataHandler.pushActiveTabItem(activeGraphTabItem);
                this.activeGraphTabItem = activeGraphTabItem;

                this.graphTabPanelSlider.addItem(activeGraphTabItem);

                this.graphTabPanelTitle.setActiveGraphTabItem(activeGraphTabItem)
                this.fireEvent(EventFrameWork.event.Components.TabPanel.ActiveTabItem, new TabEvent(this));
            }
        } else {
            this.passiveActiveTabItem = activeGraphTabItem;
        }
    }

    getGraphTabPanelDataHandler() {
        return this.graphTabPanelDataHandler;
    }

    getActiveGraphTabItem() {
        return this.activeGraphTabItem;
    }

    getGraphTabPanelTitle() {
        return this.graphTabPanelTitle;
    }

    clearItems() {
        this.graphTabPanelTitle.clearItems();
        this.graphTabPanelSlider.clearItems();
    }

    setGraphTabItemTitleInvoke(GraphTabItemTitleInvoke) {
        this.GraphTabItemTitleInvoke = GraphTabItemTitleInvoke;
    }

    onTabPanelClickTitle(tabTitleEvent) {
        if (tabTitleEvent instanceof TabTitleEvent && tabTitleEvent.getTabItemTitle() instanceof GraphTabItemTitle) {
            let activeGraphTabItemTitle = tabTitleEvent.getTabItemTitle();
            let activeGraphTabItem = activeGraphTabItemTitle.getGraphTabItem();
            this.setActiveGraphTabItem(activeGraphTabItem);
        }
    }

    getGraphTabPanelMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelMasterDiv);
    }

    getGraphTabPanelContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelContainer);
    }
}