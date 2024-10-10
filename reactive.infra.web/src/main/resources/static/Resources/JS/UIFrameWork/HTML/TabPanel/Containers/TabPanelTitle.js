import TabItem from "./TabItem.js";
import TabItemTitle from "./TabItemTitle/TabItemTitle.js";
import {EventFrameWork} from "../../../Shared/Event/EventFrameWork.js";
import HTMLContainer from "../../Container/HTMLContainer.js";
import HorizontalContentLayout from "../../Container/Layout/Sizeable/Normal/HorizontalContent/HorizontalContentLayout.js";

export default class TabPanelTitle extends HTMLContainer {
    constructor(tabPanelDataHandler) {
        super();

        this.tabPanelDataHandler = tabPanelDataHandler;

        this.setLayout(new HorizontalContentLayout());
    }

    initialVariables() {
        super.initialVariables();

        this.setData(TabPanelTitle.MapOfTitlesAndTabItem, new Map());
    }

    getMapOfTitleAndTabItem() {
        return this.getData().get(TabPanelTitle.MapOfTitlesAndTabItem);
    }

    onLoad() {
        super.onLoad();
        this.setTabPanelTitleClass(this.tabPanelTitleClass);
        this.setActiveTabItem(this.activeTabItem);
    }

    addItem(tabItem, layoutData, tabItemTitleFactoryFunction) {
        if (tabItem instanceof TabItem) {
            let tabItemTitle = tabItemTitleFactoryFunction();
            tabItemTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickTitle, this.onTabPanelClickTitle, this);
            tabItemTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickClose, this.onTabPanelClickClose, this);

            super.addItem(tabItemTitle, layoutData);

            this.tabPanelDataHandler.addTabItem(tabItem);
            this.tabPanelDataHandler.addTabItemTitle(tabItemTitle);

            this.getMapOfTitleAndTabItem().set(tabItem.getUUID(), tabItemTitle);
        }
    }

    removeItem(tabItem) {
        if (tabItem instanceof TabItem) {
            let tabItemTitle = tabItem.getTabItemTitle();
            super.removeItem(tabItemTitle);
        }
    }

    onTabPanelClickTitle(tabTitleEvent) {
        this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickTitle, tabTitleEvent);
    }

    onTabPanelClickClose(tabTitleEvent) {
        this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickClose, tabTitleEvent);
    }

    setTabPanelTitleClass(tabPanelTitleClass) {
        this.tabPanelTitleClass = tabPanelTitleClass;
        if (this.getAttached()) {
            this.getElement().setAttribute("class", this.tabPanelTitleClass);
        }
    }

    setActiveTabItem(activeTabItem) {
        this.activeTabItem = activeTabItem;
        if (this.getAttached()) {
            this.getItems().forEach((tabItemTitle) => {
                if (tabItemTitle instanceof TabItemTitle) {
                    if (tabItemTitle.getTabItem() === activeTabItem) {
                        tabItemTitle.setActive(true);
                    } else {
                        tabItemTitle.setActive(false);
                    }
                }
            })
        }
    }
}

TabPanelTitle.MapOfTitlesAndTabItem = "MapOfTitlesAndTabItem";