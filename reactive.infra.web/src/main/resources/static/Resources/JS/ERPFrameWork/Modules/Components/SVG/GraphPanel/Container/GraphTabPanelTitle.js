import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import SVGContainer from "../../../../../../UIFrameWork/SVG/Container/SVGContainer.js";
import GraphTabSVGLayout from "../Layout/GraphTabSVGLayout.js";
import GraphTabItem from "./GraphTabItem.js";
import {EventFrameWork} from "../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import TabPanelTitle from "../../../../../../UIFrameWork/HTML/TabPanel/Containers/TabPanelTitle.js";
import GraphTabItemTitle from "./GraphTabItemTitle.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {ShareContainer} from "../../../../../../UIFrameWork/Shared/Layout/ShareContainer.js";
import GraphTabSVGLayoutData from "../Layout/GraphTabSVGLayoutData.js";

export default class GraphTabPanelTitle extends SVGContainer {
    constructor(nameSpace, graphTabPanelDataHandler) {
        super(nameSpace);
        this.graphTabPanelDataHandler = graphTabPanelDataHandler;

        let layout = new GraphTabSVGLayout();

        this.setElement(DOM.createElementNS(nameSpace, 'g'));
        this.setLayout(layout);
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.GraphTabPanelTitle[0]));
    }

    initialVariables() {
        super.initialVariables();

        this.setData(TabPanelTitle.MapOfTitlesAndTabItem, new Map());
    }

    getMapOfTitleAndTabItem() {
        return this.getData().get(TabPanelTitle.MapOfTitlesAndTabItem);
    }

    StartDNDStartDraggingPosition(baseSVGComponent) {
        let graphTabSVGLayoutData = baseSVGComponent.getData().get(ShareContainer.LayoutData);
        if (graphTabSVGLayoutData instanceof GraphTabSVGLayoutData) {
            graphTabSVGLayoutData.setX(baseSVGComponent.x);
            graphTabSVGLayoutData.setY(baseSVGComponent.y);

            this.layoutExecute();
        }
    }

    addItem(graphTabItem, graphTabSVGLayoutData, GraphTabItemTitleFactoryFunction) {
        if (graphTabItem instanceof GraphTabItem) {
            let graphTabItemTitle = GraphTabItemTitleFactoryFunction();
            graphTabItemTitle.addListener(EventFrameWork.event.Components.TabPanel.ClickTitle, this.onTabPanelClickTitle, this);

            super.addItem(graphTabItemTitle, graphTabSVGLayoutData, false);

            this.graphTabPanelDataHandler.addTabItem(graphTabItem);
            this.graphTabPanelDataHandler.addTabItemTitle(graphTabItemTitle);

            this.getMapOfTitleAndTabItem().set(graphTabItem.getUUID(), graphTabItemTitle);
        }
    }

    onTabPanelClickTitle(tabTitleEvent) {
        this.fireEvent(EventFrameWork.event.Components.TabPanel.ClickTitle, tabTitleEvent);
    }

    setActiveGraphTabItem(activeGraphTabItem) {
        this.activeGraphTabItem = activeGraphTabItem;
        if (this.getAttached()) {
            this.getItems().forEach((graphTabItemTitle) => {
                if (graphTabItemTitle instanceof GraphTabItemTitle) {
                    if (graphTabItemTitle.getGraphTabItem() === activeGraphTabItem) {
                        graphTabItemTitle.setActive(true);
                    } else {
                        graphTabItemTitle.setActive(false);
                    }
                }
            })
        }
    }

    scrollIntoView() {
        if (this.getAttached()) {
            this.getElement().scrollIntoView();
        }
    }
}