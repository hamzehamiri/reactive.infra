import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import TabTitleEvent from "../Events/TabTitleEvent.js";
import {TabPanel_Mode} from "../../TabPanelHTML.js";
import BaseEvent from "../../../../Shared/Event/BaseEvent.js";

export default class TabItemTitle extends HTMLComponent {
    constructor(title) {
        super();

        let closeA = DOM.createElement("a");
        closeA.innerHTML = "✕";

        let titleA = this.createTitleElement();

        let masterDiv = DOM.createElement("div");
        masterDiv.appendChild(titleA);

        this.setDataElement(TabItemTitle.CloseA, closeA);
        this.setDataElement(TabItemTitle.TitleA, titleA);
        this.setDataElement(TabItemTitle.MasterDiv, masterDiv);
        this.setElement(masterDiv);
        this.setTitle(title);
        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.onClick.name, this);

        // this.bindTheme(); TODO Comment Becuase restyle method automatic call bindTheme()
    }

    createTitleElement() {
        return DOM.createElement("a");
    }

    getTitleElement() {
        return this.getDataElement().get(TabItemTitle.TitleA);
    }

    setTitle(title) {
        this.title = title;
        if (this.getAttached()) {
            this.getTitleElement().innerHTML = title;
            this.fireEvent(EventFrameWork.event.Components.TabPanel.ChangeTitle, new BaseEvent(this));
        }
    }

    getTitle() {
        return this.title;
    }

    setCloseable(closeable) {
        this.closeable = closeable;
        if (this.getAttached()) {
            let masterDiv = this.getDataElement().get(TabItemTitle.MasterDiv);
            let closeA = this.getDataElement().get(TabItemTitle.CloseA);
            if (closeable) {
                masterDiv.appendChild(closeA);
            } else {
                closeA.remove();
            }

        }
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.TabItemTitle[0]));
    }

    restyle() {
        super.restyle();

        DOM.addClassName(this.getDataElement().get(TabItemTitle.CloseA), this.getTabItemCloseClass());
        DOM.addClassName(this.getDataElement().get(TabItemTitle.TitleA), this.getTabItemTextClass());

        this.setTabPanelMode(this.tabPanel_Mode);
        this.setActive(this.active);
        this.setFloatPerLang();
    }

    onLoad() {
        super.onLoad();

        this.setMapAttribute(this.mapAttribute);
        this.setCloseable(this.closeable);
        this.setTitle(this.title);
        this.restyle();
    }

    onClick(event) {
        if (event.target === this.getDataElement().get(TabItemTitle.CloseA)) {
            this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickClose, new TabTitleEvent(this));
        } else if (event.target === this.getDataElement().get(TabItemTitle.TitleA)) {
            this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickTitle, new TabTitleEvent(this));
        }
    }

    setMapAttribute(mapAttribute) {
        this.mapAttribute = mapAttribute;
    }

    setTabItem(tabItem) {
        this.tabItem = tabItem;
        this.tabItem.setTabItemTitle(this);
    }

    getTabItem() {
        return this.tabItem;
    }

    setActive(active) {
        this.active = active;
        if (this.getAttached()) {
            DOM.removeClassName(this.getElement(), this.getTabItemTitleMasterTopActiveClass());
            DOM.removeClassName(this.getElement(), this.getTabItemTitleMasterButtonActiveClass());
            if (active) {
                switch (this.tabPanel_Mode) {
                    case TabPanel_Mode.Top:
                        DOM.addClassName(this.getElement(), this.getTabItemTitleMasterTopActiveClass());
                        break;
                    case TabPanel_Mode.Button:
                        DOM.addClassName(this.getElement(), this.getTabItemTitleMasterButtonActiveClass());
                        break;
                }
            }
        }
    }

    setTabPanelMode(tabPanel_Mode) {
        this.tabPanel_Mode = tabPanel_Mode;
        if (this.getAttached()) {
            switch (tabPanel_Mode) {
                case TabPanel_Mode.Top:
                    DOM.addClassName(this.getDataElement().get(TabItemTitle.MasterDiv), this.getTabItemTitleMasterTopClass());
                    break;
                case TabPanel_Mode.Button:
                    DOM.addClassName(this.getDataElement().get(TabItemTitle.MasterDiv), this.getTabItemTitleMasterButtonClass());
                    break;
            }
        }
    }

    getTabItemCloseClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemClose);
    }

    getTabItemTitleMasterTopClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTop);
    }

    getTabItemTitleMasterButtonClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButton);
    }

    getTabItemTitleMasterTopActiveClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTopActive);
    }

    getTabItemTitleMasterButtonActiveClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButtonActive);
    }

    getTabItemTextClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.TabItemTitle[1].TabItemText);
    }
}

TabItemTitle.MasterDiv = "MasterDiv";
TabItemTitle.TitleA = "TitleA";
TabItemTitle.CloseA = "CloseA";