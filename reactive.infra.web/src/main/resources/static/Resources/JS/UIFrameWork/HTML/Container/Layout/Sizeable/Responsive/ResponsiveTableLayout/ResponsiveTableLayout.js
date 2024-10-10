import {HTMLComponent} from "../../../../../Component/HTMLComponent.js";
import {ShareContainer} from "../../../../../../Shared/Layout/ShareContainer.js";
import ResponsiveTableLayoutData from "./ResponsiveTableLayoutData.js";
import ResponsiveTableLayoutDataElement from "./ResponsiveTableLayoutDataElement.js";
import PageType from "../ResponsiveCommon/PageType.js";
import {DOM} from "../../../../../../Shared/Common/DOM.js";
import ResponsiveLayout from "../ResponsiveCommon/ResponsiveLayout.js";

export default class ResponsiveTableLayout extends ResponsiveLayout {
    constructor() {
        super();
        this.rowColumnMap = new Map();
    }

    setPadding(padding, unitPadding) {
        this.padding = padding;
        this.unitPadding = unitPadding;
    }

    ActivePreProcessLayout(component) {
        let layoutData = null;
        if (component instanceof HTMLComponent) {
            layoutData = component.getData().get(ShareContainer.LayoutData);
        } else if (component instanceof Element) {
            layoutData = this.getContainer().getElementItem().get(component);
        }

        if (layoutData instanceof ResponsiveTableLayoutData) {
            let that = this;
            layoutData.getResponsiveTableLayoutDataElement().forEach((responsiveTableLayoutDataElement) => {
                if (responsiveTableLayoutDataElement instanceof ResponsiveTableLayoutDataElement) {
                    let keyCodePage_JsonString = responsiveTableLayoutDataElement.getPageType().toJsonString();
                    let keyCodeRow = responsiveTableLayoutDataElement.getRowIndex();
                    let keyCodeCol = responsiveTableLayoutDataElement.getColumnIndex();
                    let pageTableItems = that.getMapElement().get(keyCodePage_JsonString);
                    if (!pageTableItems) {
                        pageTableItems = new Map();
                        that.getMapElement().set(keyCodePage_JsonString, pageTableItems);
                    }
                    let itemsRow = pageTableItems.get(keyCodeRow);
                    if (!itemsRow) {
                        itemsRow = new Map();
                        pageTableItems.set(keyCodeRow, itemsRow);
                    }
                    itemsRow.set(keyCodeCol, {
                        component: component,
                        layoutData: responsiveTableLayoutDataElement
                    });

                    let componentWithUUID = that.getComponentsPerPageType().get(keyCodePage_JsonString);
                    if (!componentWithUUID) {
                        componentWithUUID = new Map();
                        that.getComponentsPerPageType().set(keyCodePage_JsonString, componentWithUUID);
                    }
                    let componentExist = componentWithUUID.get(component.getUUID());
                    if (!componentExist) {
                        componentWithUUID.set(component.getUUID(), component);
                    }
                }
            });
        }
    }

    onDetach() {
        let pageItems = this.getMapElement().get(this.getActivePageType());
        if (pageItems) {
            pageItems.forEach((rowItems) => {
                rowItems.forEach((componentItemWithLayoutData) => {
                    let item = componentItemWithLayoutData.component;
                    if (item instanceof HTMLComponent) {
                        item.getElement().parentElement.parentElement.remove();
                        item.onDetach();
                    }
                });
            });
        }
        this.setActivePageType(null);
    }

    LayoutProcess() {
        super.LayoutProcess();
        this.defaultHeightSize = 50;
        if (this.getContainer()) {
            let width = this.getContainer().getWidth();
            if (!this.getActivePageType() || this.getActivePageType().getFromWidth() > width || width > this.getActivePageType().getToWidth()) {
                this.getMapElement().forEach((value, keyCodePage_JsonString) => {
                    let pageType = new PageType();
                    pageType.applyData(JSON.parse(keyCodePage_JsonString));
                    if (pageType instanceof PageType) {
                        if (pageType.getFromWidth() < width && width < pageType.getToWidth()) {
                            this.renderTableWithComponentItem(pageType);
                        }
                    }
                });
            } else {
                this.rowColumnMap.forEach((colMap, rowIndex) => {
                    colMap.forEach((itemComponentModel, colIndex) => {
                        let widthComponentItem = (width / colMap.size) - (colMap.size * 4) - (this.padding * 2);
                        itemComponentModel.item.setSize(widthComponentItem, this.defaultHeightSize);
                    });
                });
            }
        }
    }

    renderTableWithComponentItem(pageType) {
        if (!this.tableElement) {
            this.generateBaseTableElement();
        }

        this.detachComponents(this.getActivePageType(), pageType);
        this.renderItems(pageType);
        this.setActivePageType(pageType);
    }

    generateBaseTableElement() {
        this.tbodyElement = DOM.createElement("tbody");

        this.tableElement = DOM.createElement("table");
        this.tableElement.appendChild(this.tbodyElement);

        DOM.setWidthPercent(this.tbodyElement, 100);
        DOM.setWidthPercent(this.tableElement, 100);

        this.getContainer().getElement().appendChild(this.tableElement);
    }

    detachComponents(beforePageType, nextPageType) {
        if (beforePageType != null) {
            let componentWithUUIDBefore = this.getComponentsPerPageType().get(beforePageType);
            let componentWithUUIDNext = this.getComponentsPerPageType().get(nextPageType);

            if (componentWithUUIDBefore)
                componentWithUUIDBefore.forEach((component, uuid) => {
                    if (componentWithUUIDNext && !componentWithUUIDNext.has(uuid)) {
                        if (component.getAttached()) {
                            component.onDetach();
                        }
                    }
                });
        }
    }

    renderItems(pageType) {
        this.rowColumnMap.clear();
        DOM.removeChildNodes(this.tbodyElement);

        let pageItems = this.getMapElement().get(pageType.toJsonString());
        let that = this;
        let width = this.getContainer().getWidth();
        DOM.setAttribute(this.getContainer().getElement(), "ResponsiveTableLayout", "true");
        if (pageItems) {
            let sortRowIndex = new Map([...pageItems].sort((a, b) => {
                return a[0] - b[0];
            }));
            let maxColIndex = 0;
            sortRowIndex.forEach((rowItems) => {
                maxColIndex = Math.max(rowItems.size, maxColIndex);
            });

            sortRowIndex.forEach((rowItems, rowIndex) => {
                let isTrDeleted = false;
                let trElement = DOM.createElement("tr");
                that.tbodyElement.appendChild(trElement);

                let colMap = new Map();
                this.rowColumnMap.set(rowIndex, colMap);

                let sortColIndex = new Map([...rowItems].sort((a, b) => {
                    return a[0] - b[0];
                }));

                let remainColSpan = maxColIndex - sortColIndex.size;

                sortColIndex.forEach((componentItemWithLayoutData, colIndex) => {
                    let tdElement = DOM.createElement("td");
                    if (this.padding)
                        DOM.addStyleAttribute(tdElement, 'padding', this.padding + this.unitPadding);
                    trElement.appendChild(tdElement);

                    if (sortColIndex.size === colIndex && remainColSpan > 0) {
                        DOM.setAttribute(tdElement, 'colspan', remainColSpan + 1);
                    }

                    let itemComponent = componentItemWithLayoutData.component;
                    if (itemComponent instanceof HTMLComponent) {

                        colMap.set(colIndex, {
                            item: itemComponent,
                            tdElement: tdElement
                        });

                        let widthComponentItem = (width / rowItems.size) - (rowItems.size * 4) - (this.padding * 2);

                        if (itemComponent.getAttached()) {
                            if (!isTrDeleted) {
                                isTrDeleted = true;
                                itemComponent.getElement().parentElement.parentElement.remove();
                            }
                            itemComponent.reAttach(tdElement);
                        } else {
                            itemComponent.setParent(that.getContainer());
                            itemComponent.onAttach(tdElement);
                            itemComponent.setSize(widthComponentItem, this.defaultHeightSize);
                        }

                        if (componentItemWithLayoutData.layoutData instanceof ResponsiveTableLayoutDataElement) {
                            if (componentItemWithLayoutData.layoutData.getColSpan())
                                DOM.setAttribute(tdElement, 'colspan', componentItemWithLayoutData.layoutData.getColSpan());
                            if (componentItemWithLayoutData.layoutData.getRowSpan()) {
                                DOM.setAttribute(tdElement, 'rowspan', componentItemWithLayoutData.layoutData.getRowSpan());
                                DOM.setHeight(tdElement, 0);
                                itemComponent.setHeightPercent(100);
                            }
                        }
                    }
                });
            });
        }
    }
}