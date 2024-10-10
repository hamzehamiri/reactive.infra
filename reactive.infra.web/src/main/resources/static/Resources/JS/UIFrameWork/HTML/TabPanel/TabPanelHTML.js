import {RowLayout, RowLayout_Mode} from "../Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import TabPanelTitle from "./Containers/TabPanelTitle.js";
import TabPanelSlider from "./Containers/TabPanelSlider.js";
import TabItem from "./Containers/TabItem.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import TabTitleEvent from "./Containers/Events/TabTitleEvent.js";
import TabItemTitle from "./Containers/TabItemTitle/TabItemTitle.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import TabPanelDataHandler from "./Containers/TabPanelDataHandler.js";
import {DOM} from "../../Shared/Common/DOM.js";
import TabEvent from "./Containers/Events/TabEvent.js";
import HTMLContainer from "../Container/HTMLContainer.js";
import HorizontalContentLayoutData from "../Container/Layout/Sizeable/Normal/HorizontalContent/HorizontalContentLayoutData.js";
import {ShareContainer} from "../../Shared/Layout/ShareContainer.js";

export default class TabPanelHTML extends HTMLContainer {

    constructor(tabPanel_Mode) {
        super();

        this.tabPanel_Mode = tabPanel_Mode ? tabPanel_Mode : TabPanel_Mode.Button;
        this.bindTheme();

        this.setElement(DOM.createElement("div"));
        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.tabPanelDataHandler = new TabPanelDataHandler();

        this.tabPanelTitle = new TabPanelTitle(this.tabPanelDataHandler);
        this.tabPanelTitle.setTabPanelTitleClass(this.getTabPanelTitleClass());
        this.tabPanelTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickTitle, this.onTabPanelClickTitle, this);
        this.tabPanelTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickClose, this.onTabPanelClickClose, this);

        this.tabPanelSlider = new TabPanelSlider();
        this.tabPanelSlider.setTabItemContainerClass(this.getTabItemContainerClass());

        if (tabPanel_Mode && tabPanel_Mode === TabPanel_Mode.Top) {
            this.addItem(this.tabPanelTitle, RowLayoutData.factory(1, 42, 0, 0, 0, 1, true));
            this.addItem(this.tabPanelSlider, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        } else {
            this.addItem(this.tabPanelSlider, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
            this.addItem(this.tabPanelTitle, RowLayoutData.factory(1, 42, 0, 0, 0, 1, true));
        }

        this.setTabItemTitleInvoke(TabItemTitle);
    }

    clearItems() {
        this.tabPanelTitle.clearItems();
        this.tabPanelSlider.clearItems()
    }

    setTabItemTitleInvoke(TabItemTitleInvoke) {
        this.TabItemTitleInvoke = TabItemTitleInvoke;
    }

    onTabPanelClickTitle(tabTitleEvent) {
        if (tabTitleEvent instanceof TabTitleEvent && tabTitleEvent.getTabItemTitle() instanceof TabItemTitle) {
            let activeTabItemTitle = tabTitleEvent.getTabItemTitle();
            let activeTabItem = activeTabItemTitle.getTabItem();
            this.setActiveTabItem(activeTabItem);
        }
    }

    onTabPanelClickClose(tabTitleEvent) {
        if (tabTitleEvent instanceof TabTitleEvent && tabTitleEvent.getTabItemTitle() instanceof TabItemTitle) {
            let tabItemTitle = tabTitleEvent.getTabItemTitle();
            let tabItem = tabItemTitle.getTabItem();
            this.closeTabItem(tabItem);
        }
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.TabPanel[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getTabPanelMasterDivClass());
        if (this.passiveActiveTabItem)
            this.setActiveTabItem(this.passiveActiveTabItem);
    }

    addItem(component, layoutData, mapAttribute) {
        if (component instanceof TabItem) {
            let tabItemTitle = new this.TabItemTitleInvoke(component.getTitle());
            tabItemTitle.setTabItem(component);
            tabItemTitle.setTabPanelMode(this.tabPanel_Mode);
            tabItemTitle.setMapAttribute(mapAttribute);
            tabItemTitle.addListener(EventFrameWork.event.Components.TabPanel.ChangeTitle, (baseEvent) => {
                baseEvent.getSource().getData().get(ShareContainer.LayoutData).setContent(baseEvent.getSource().getTitle());
                this.tabPanelTitle.layoutExecute();
            });

            let horizontalContentLayoutData = new HorizontalContentLayoutData();
            horizontalContentLayoutData.setContent(component.getTitle());
            horizontalContentLayoutData.setLeft_Margin(5);
            horizontalContentLayoutData.setRight_Margin(5);
            horizontalContentLayoutData.setElementEffectiveFunction(() => {
                return tabItemTitle.getTitleElement();
            });
            this.tabPanelTitle.addItem(component, horizontalContentLayoutData, () => {
                return tabItemTitle;
            });
        } else if (component instanceof TabPanelTitle || component instanceof TabPanelSlider) {
            super.addItem(component, layoutData);
        }
    }

    setActiveTabItem(activeTabItem) {
        if (this.getAttached()) {
            if (!this.activeTabItem || (this.activeTabItem && this.activeTabItem.getUUID() !== activeTabItem.getUUID())) {
                this.tabPanelDataHandler.pushActiveTabItem(activeTabItem);
                this.activeTabItem = activeTabItem;
                this.tabPanelSlider.addItem(activeTabItem);
                this.tabPanelTitle.setActiveTabItem(activeTabItem)
                this.fireEvent(EventFrameWork.event.Components.TabPanel.ActiveTabItem, new TabEvent(this));
            }
        } else {
            this.passiveActiveTabItem = activeTabItem;
        }
    }

    getTabPanelDataHandler() {
        return this.tabPanelDataHandler;
    }

    getActiveItem() {
        return this.activeTabItem;
    }

    closeTabItem(tabItem) {
        if (this.getAttached()) {
            this.tabPanelTitle.removeItem(tabItem);
            this.tabPanelSlider.removeItem(tabItem);
        }
    }

    getTabPanelMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabPanel[1].TabPanelMasterDiv);
    }

    getTabItemContainerClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabPanel[1].TabItemContainer);
    }

    getTabPanelTitleClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabPanel[1].TabPanelTitle);
    }
}

export const TabPanel_Mode = {
    Top: 'Top',
    Button: 'Button'
};