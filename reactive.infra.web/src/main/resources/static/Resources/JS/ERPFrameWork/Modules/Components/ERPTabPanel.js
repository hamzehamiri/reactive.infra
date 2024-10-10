import TabPanelHTML, {TabPanel_Mode} from "../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import TabItem from "../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";

export default class ERPTabPanel extends TabPanelHTML {

    constructor() {
        super(TabPanel_Mode.Button);
    }

    createTabItem(tabItemTitle) {
        let tabItem = new TabItem();
        tabItem.setCloseable(true);
        tabItem.setTitle(tabItemTitle);
        this.addItem(tabItem);
        this.setActiveTabItem(tabItem);
        return tabItem;
    }
}