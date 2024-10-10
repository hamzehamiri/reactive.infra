import WindowAbstractView from "./WindowAbstractView.js";
import GraphTabPanelHTML from "../../../Components/SVG/GraphPanel/GraphTabPanelHTML.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import GraphTabItem from "../../../Components/SVG/GraphPanel/Container/GraphTabItem.js";
import GraphTabSVGLayoutData from "../../../Components/SVG/GraphPanel/Layout/GraphTabSVGLayoutData.js";
import TabEvent from "../../../../../UIFrameWork/HTML/TabPanel/Containers/Events/TabEvent.js";
import TabController from "../../Tab/Controller/TabController.js";
import ActiveTabEvent from "../../Tab/Events/ActiveTabEvent.js";
import TabView from "../../Tab/View/TabView.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import TreeGridDescriptor from "../../../../../UIFrameWork/HTML/Cells/Common/TreeGridDescriptor.js";
import TreeTraverseUtil from "../../../../../UIFrameWork/HTML/Cells/Common/TreeTraverseUtil.js";
import {Util} from "../../../../../UIFrameWork/Shared/Common/Util.js";
import {WindowControllerElement} from "../Controller/WindowController.js";
import {ShareContainer} from "../../../../../UIFrameWork/Shared/Layout/ShareContainer.js";
import GraphTabPanelTitle from "../../../Components/SVG/GraphPanel/Container/GraphTabPanelTitle.js";
import TreeTraverseFullPath from "../../../../../UIFrameWork/HTML/Cells/Common/TreeTraverseFullPath.js";

export default class WindowGraphPanelView extends WindowAbstractView {

    static registerKey() {
        return "WindowGraphPanelView";
    }

    constructor(windowController) {
        super(windowController);

        let graphTabPanel = new GraphTabPanelHTML();
        graphTabPanel.addListener(EventFrameWork.event.Components.TabPanel.ActiveTabItem, (tabEvent) => {
            if (tabEvent instanceof TabEvent) {
                let activeGraphTabItem = tabEvent.getActiveGraphTabItem();
                if (activeGraphTabItem instanceof GraphTabItem) {
                    let tabController = activeGraphTabItem.getData().get(TabView.Controller);
                    if (tabController instanceof TabController) {
                        let activeTabEvent = new ActiveTabEvent(activeGraphTabItem);
                        activeTabEvent.setActiveTabController(tabController);
                        this.fireEvent(FormEngineEventFrameWork.event.WindowController.ActiveContainerEvent, activeTabEvent);
                    }
                }
            }
        });

        this.setDataElement(WindowAbstractView.WindowMainContainer, graphTabPanel);
    }

    rebindModelToUI(item, translate) {
        super.rebindModelToUI(item, translate);
        if (item instanceof GraphTabItem) {
            item.setTitle(translate);
        }
        this.scrollToBestView();
    }

    setActiveContainer(activeGraphTabItem) {
        let graphTabPanel = this.getMainContainer();
        if (graphTabPanel instanceof GraphTabPanelHTML) {
            graphTabPanel.setActiveGraphTabItem(activeGraphTabItem)
        }
    }

    generateOfTabContainers(coreWindowDTO, creatorTabFunction) {
        let tabMap = coreWindowDTO.getCoreWindowTabDTOMap();
        let tabArray = Util.ConvertMapToArray(tabMap);

        this.util = new TreeTraverseUtil(new TreeGridDescriptor("translate", "id", (tab) => {
            return tab.getCoreWindowTabDTOParent() != null ? tab.getCoreWindowTabDTOParent().getId() : null;
        }), true);
        this.util.scanAllTreeNodes(tabArray);

        let positionStart = {x: 20, y: 20};
        this.offsetOfHeight = 10;
        this.offsetOfWidth = 30;
        this.baseOfHeight = 50;

        for (let [, treeTraverseFullPath] of this.util.getTreeRootNodeMap()) {
            this.generateWhileToLeaf(null, treeTraverseFullPath, creatorTabFunction, positionStart);
            this.generateNewPosition(positionStart);
        }

        let graphTabPanelHTML = this.getMainContainer();
        let graphTabPanelTitle = graphTabPanelHTML.getGraphTabPanelTitle();
        graphTabPanelTitle.layoutExecute();
        this.scrollToBestView();
    }

    scrollToBestView() {
        let graphTabPanelHTML = this.getMainContainer();
        if (graphTabPanelHTML instanceof GraphTabPanelHTML) {
            let graphTabPanelTitle = graphTabPanelHTML.getGraphTabPanelTitle();
            if (graphTabPanelTitle instanceof GraphTabPanelTitle) {
                graphTabPanelTitle.scrollIntoView();
            }
        }
    }

    generateWhileToLeaf(parentGraphTabItem, treeTraverseFullPath, creatorTabFunction, positionStart) {
        const tabFunctionReturn = creatorTabFunction(treeTraverseFullPath.record);
        let childGraphTabItem = tabFunctionReturn[WindowControllerElement.Container];
        let graphTabPanelHTML = this.getMainContainer();

        if (graphTabPanelHTML instanceof GraphTabPanelHTML) {
            let graphTabPanelTitle = graphTabPanelHTML.getGraphTabPanelTitle();
            let graphTabSVGLayoutData;
            if (childGraphTabItem instanceof GraphTabItem) {
                let titleText = childGraphTabItem.getTitle();
                // let elementTitle = childGraphTabItem.getTabItemTitle().getTextElement();
                let titleTextWidth = Util.getWithOfText(titleText, 'B Yekan', 14);
                titleTextWidth += 20;
                if (parentGraphTabItem instanceof GraphTabItem) {
                    let graphTabItemTitle = graphTabPanelTitle.getMapOfTitleAndTabItem().get(parentGraphTabItem.getUUID());
                    let parentLayoutData = graphTabItemTitle.getData().get(ShareContainer.LayoutData);
                    if (parentLayoutData instanceof GraphTabSVGLayoutData) {
                        graphTabSVGLayoutData = GraphTabSVGLayoutData.factory(parentLayoutData.x + this.offsetOfWidth, parentLayoutData.y + parentLayoutData.height + this.offsetOfHeight, titleTextWidth, this.baseOfHeight);
                    }
                } else {
                    graphTabSVGLayoutData = GraphTabSVGLayoutData.factory(positionStart.x, positionStart.y, titleTextWidth, this.baseOfHeight);
                }
            }
            graphTabPanelHTML.addItem(childGraphTabItem, graphTabSVGLayoutData);
        }
        for (const [, treeTraverseFullPathChild] of treeTraverseFullPath.getChildNodeMap()) {
            if (treeTraverseFullPath instanceof TreeTraverseFullPath && treeTraverseFullPathChild instanceof TreeTraverseFullPath) {
                if (treeTraverseFullPath.getPk() !== treeTraverseFullPathChild.getPk()) {
                    this.generateWhileToLeaf(childGraphTabItem, treeTraverseFullPathChild, creatorTabFunction, positionStart);
                    this.generateNewPosition(positionStart);
                }
            }
        }
    }

    generateNewPosition(positionStart) {
        positionStart.y += this.offsetOfHeight + this.baseOfHeight;
    }

    createParentContainerOfTab(coreWindowTabDTO) {
        let graphTabItem = new GraphTabItem();
        graphTabItem.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        graphTabItem.setTitle(coreWindowTabDTO.getTranslate());
        return graphTabItem;
    }
}