import WindowAbstractView from "./WindowAbstractView.js";
import TabPanelHTML, {TabPanel_Mode} from "../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import TabEvent from "../../../../../UIFrameWork/HTML/TabPanel/Containers/Events/TabEvent.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import TabController from "../../Tab/Controller/TabController.js";
import ActiveTabEvent from "../../Tab/Events/ActiveTabEvent.js";
import TabView from "../../Tab/View/TabView.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";

export default class WindowTabPanelView extends WindowAbstractView {
    static registerKey() {
        return "WindowTabPanelView";
    }

    constructor(windowController) {
        super(windowController);

        let tabPanel = new TabPanelHTML(TabPanel_Mode.Top);
        tabPanel.addListener(EventFrameWork.event.Components.TabPanel.ActiveTabItem, (tabEvent) => {
            if (tabEvent instanceof TabEvent) {
                let activeTabItem = tabEvent.getActiveItem();
                let previousActiveTabItem = tabEvent.getPreviousActiveTabItem();
                if (activeTabItem instanceof TabItem) {
                    let tabController = activeTabItem.getData().get(TabView.Controller);
                    if (tabController instanceof TabController) {
                        let activeTabEvent = new ActiveTabEvent(activeTabItem);
                        activeTabEvent.setActiveTabController(tabController);
                        this.fireEvent(FormEngineEventFrameWork.event.WindowController.ActiveContainerEvent, activeTabEvent);
                    }
                }
            }
        });

        this.setDataElement(WindowAbstractView.WindowMainContainer, tabPanel);
    }

    rebindModelToUI(item, translate) {
        super.rebindModelToUI(item, translate);
        if (item instanceof TabItem) {
            item.setTitle(translate);
        }
    }

    setActiveContainer(activeTabItem) {
        let tabPanel = this.getMainContainer();
        if (tabPanel instanceof TabPanelHTML) {
            tabPanel.setActiveTabItem(activeTabItem)
        }
    }

    generateOfTabContainers(coreWindowDTO, creatorTabFunction) {
        super.generateOfTabContainers(coreWindowDTO, creatorTabFunction);

        coreWindowDTO.getCoreWindowTabDTOMap().forEach((coreWindowDTO) => {
            creatorTabFunction(coreWindowDTO);
        })
        // let sortedTabArray = TabUtil.startSortTabWithTreeStructure(coreWindowDTO.getCoreWindowTabDTOMap(), null);
        // sortedTabArray.forEach(coreWindowDTO => {
        //     creatorTabFunction(coreWindowDTO);
        // });
    }

    createParentContainerOfTab(coreWindowTabDTO) {
        let tabPanel = this.getMainContainer();

        let tabItem = new TabItem();
        tabItem.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        tabItem.setTitle(coreWindowTabDTO.getTranslate());
        if (tabPanel instanceof TabPanelHTML) {
            tabPanel.addItem(tabItem);
        }
        return tabItem;
    }
}