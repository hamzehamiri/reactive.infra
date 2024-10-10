import TabItem from "./TabItem.js";
import TabItemTitle from "./TabItemTitle/TabItemTitle.js";

export default class TabPanelDataHandler {
    constructor() {
        this.tabItemUUIDMap = new Map();
        this.tabItemTitleUUIDMap = new Map();
        this.activeTabItem = [];
    }

    addTabItem(tabItem) {
        if (tabItem instanceof TabItem) {
            this.tabItemUUIDMap.set(tabItem.getUUID(), tabItem);
        }
    }

    findTabItemByUUID(uuid) {
        return this.tabItemUUIDMap.get(uuid);
    }

    addTabItemTitle(tabItemTitle) {
        if (tabItemTitle instanceof TabItemTitle) {
            this.tabItemTitleUUIDMap.set(tabItemTitle.getUUID(), tabItemTitle);
        }
    }

    findTabItemTitleByUUID(uuid) {
        return this.tabItemTitleUUIDMap.get(uuid);
    }


    pushActiveTabItem(activeTabItem) {
        this.activeTabItem.push(activeTabItem);
    }

    popActiveTabItem() {
        return this.activeTabItem.pop();
    }

    getPreviousActiveTabItem() {
        return this.activeTabItem.length > 0 ? this.activeTabItem[this.activeTabItem.length - 1] : null;
    }
}