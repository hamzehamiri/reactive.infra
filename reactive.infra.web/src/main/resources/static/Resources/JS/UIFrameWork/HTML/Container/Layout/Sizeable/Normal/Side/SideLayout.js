import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {ShareContainer} from "../../../../../../Shared/Layout/ShareContainer.js";
import {SideLayoutData} from "./SideLayoutData.js";
import {Cursor, DOM} from "../../../../../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../../Shared/BaseShared/RegisterComponent.js";
import {Drag} from "../../../../../DND/Drag.js";
import {DragComponent} from "../../../../../DND/DragComponent.js";
import {EventFrameWork} from "../../../../../../Shared/Event/EventFrameWork.js";
import DragEvent from "../../../../../DND/DragEvent.js";
import BaseEvent from "../../../../../../Shared/Event/BaseEvent.js";

export class SideLayout extends ShareLayout {
    constructor() {
        super(false);
        this.mapOfResize = new Map();
        this.horizontalComponents = [];
        this.verticalComponents = [];
    }

    setDistanceValue(distanceValue) {
        this.distanceValue = distanceValue;
    }

    setDistancePercent(distancePercent) {
        this.distancePercent = distancePercent;
    }

    ActivePreProcessLayout(component) {
        super.ActivePreProcessLayout(component);
        let layoutData = component.getData().get(ShareContainer.LayoutData);
        if (layoutData instanceof SideLayoutData) {
            if (layoutData.getSide() === SideLayoutData.Side.Center) {
                this.centerItem = component;
            } else {
                if (layoutData.getSide() === SideLayoutData.Side.Top || layoutData.getSide() === SideLayoutData.Side.Bottom) {
                    this.horizontalComponents.push(component);
                } else {
                    this.verticalComponents.push(component);
                }
            }
        }
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            let that = this;
            let Width = this.getContainer().getWidth();
            let Height = this.getContainer().getHeight();
            let maxTop = 0, minTop = 0, minLeft = 0, leftWidth = 0, maxLeft = 0, rightWidth = 0;

            this.verticalComponents.forEach((item) => {
                let layoutData = item.getData().get(ShareContainer.LayoutData);
                if (layoutData instanceof SideLayoutData) {
                    let xComponent = 0, yComponent = 0, widthItem = 0, heightItem = 0,
                        xDrag = 0, yDrag = 0, heightDrag = 0, weightDrag = 0, staticSpace = 5, cursor;
                    let side;
                    switch (layoutData.getSide()) {
                        case SideLayoutData.Side.Left :
                            if (RegisterComponent.getCurrentLanguage().getIsRTL()) {
                                xComponent = Width - (layoutData.getSize() + layoutData.getLeft_Margin());
                                yComponent = 0;
                                widthItem = (layoutData.getSize() - layoutData.getRight_Margin());
                                heightItem = Height;

                                xDrag = xComponent;
                                yDrag = yComponent;
                                cursor = Cursor.colresize;

                                leftWidth = widthItem;
                                maxLeft = xComponent;
                            } else {
                                xComponent = 0;
                                yComponent = 0;
                                widthItem = layoutData.getSize();
                                heightItem = Height;

                                leftWidth = widthItem;
                                minLeft = widthItem;
                            }
                            heightDrag = Height;
                            weightDrag = staticSpace;
                            cursor = Cursor.colresize;
                            side = Drag.DragMode.Horizontal;
                            break;
                        case SideLayoutData.Side.Right :
                            if (RegisterComponent.getCurrentLanguage().getIsRTL()) {
                                xComponent = layoutData.getLeft_Margin();
                                yComponent = 0;
                                widthItem = layoutData.getSize() - layoutData.getRight_Margin();
                                heightItem = Height;

                                xDrag = widthItem - 5;
                                yDrag = yComponent;

                                rightWidth = widthItem;
                                minLeft = widthItem;
                            } else {
                                xComponent = Width - layoutData.getSize();
                                yComponent = 0;
                                widthItem = layoutData.getSize();
                                heightItem = Height;

                                rightWidth = widthItem;
                                maxLeft = xComponent;
                            }
                            heightDrag = Height;
                            weightDrag = staticSpace;
                            cursor = Cursor.colresize;
                            side = Drag.DragMode.Horizontal;
                            break;
                    }

                    this.drawItemWithDrag(item, layoutData, side, cursor, xComponent, yComponent, widthItem, heightItem, xDrag, yDrag, weightDrag, heightDrag);
                }
            });

            this.horizontalComponents.forEach((item) => {
                let layoutData = item.getData().get(ShareContainer.LayoutData);
                if (layoutData instanceof SideLayoutData) {
                    let xComponent = 0, yComponent = 0, widthItem = 0, heightItem = 0,
                        xDrag = 0, yDrag = 0, heightDrag = 0, weightDrag = 0, staticSpace = 5, cursor;
                    let side;
                    switch (layoutData.getSide()) {
                        case SideLayoutData.Side.Top :
                            xComponent = minLeft + layoutData.getLeft_Margin();
                            yComponent = 0;
                            widthItem = Width - (leftWidth + rightWidth + layoutData.getRight_Margin() + layoutData.getLeft_Margin());
                            heightItem = layoutData.getSize();

                            xDrag = xComponent;
                            yDrag = yComponent + heightItem - 5;
                            cursor = Cursor.rowresize;

                            heightDrag = staticSpace;
                            weightDrag = widthItem;

                            minTop = heightItem;
                            side = Drag.DragMode.Vertical;
                            break;
                        case SideLayoutData.Side.Bottom :
                            xComponent = minLeft + layoutData.getLeft_Margin();
                            yComponent = Height - layoutData.getSize();
                            widthItem = Width - (leftWidth + rightWidth + layoutData.getRight_Margin() + layoutData.getLeft_Margin());
                            heightItem = layoutData.getSize();

                            heightDrag = staticSpace;
                            weightDrag = widthItem;

                            xDrag = xComponent;
                            yDrag = yComponent;
                            cursor = Cursor.rowresize;

                            maxTop = yComponent;
                            side = Drag.DragMode.Vertical;
                            break;
                    }
                    this.drawItemWithDrag(item, layoutData, side, cursor, xComponent, yComponent, widthItem, heightItem, xDrag, yDrag, weightDrag, heightDrag);
                }
            });
            if (maxLeft < 1) {
                maxLeft = Width;
            }
            if (maxTop < 1) {
                maxTop = Height;
            }
            if (this.centerItem) {
                this.drawItem(this.centerItem, null, minLeft, minTop, Width - (leftWidth + rightWidth), (maxTop - minTop));
            }
        }
    }

    drawItemWithDrag(item, layoutData, side, cursor, xComponent, yComponent, widthItem, heightItem, xDrag, yDrag, weightDrag, heightDrag) {
        this.drawItem(item, layoutData, xComponent, yComponent, widthItem, heightItem);
        if (layoutData.getResizeable()) {
            let dragComponent = this.mapOfResize.get(layoutData.getSide());
            if (!dragComponent) {
                dragComponent = new DragComponent(side, item, false);
                dragComponent.addListener(EventFrameWork.event.positionEnd, this.onPositionEndDragComponent, this);
                dragComponent.makePositionable(true);
                dragComponent.setCursor(cursor);

                dragComponent.setParent(this.getContainer());
                dragComponent.onAttach();
                // let body = BodyElementWidget.get();
                // body.addItem(dragComponent);
                this.mapOfResize.set(layoutData.getSide(), dragComponent);
            }
            dragComponent.setPosition(xDrag, yDrag);
            dragComponent.setSize(weightDrag, heightDrag);
            if (layoutData.getZIndex())
                dragComponent.setZIndex(layoutData.getZIndex() + 1);
        }
    }

    onPositionEndDragComponent(dragEvent) {
        if (dragEvent instanceof DragEvent) {
            let layoutData = dragEvent.getMateSizeComponent().getData().get(ShareContainer.LayoutData);
            if (layoutData instanceof SideLayoutData) {
                if (layoutData.getSide() === SideLayoutData.Side.Left || layoutData.getSide() === SideLayoutData.Side.Bottom) {
                    layoutData.setSize(layoutData.getSize() - dragEvent.getDxDy());
                } else {
                    layoutData.setSize(layoutData.getSize() + dragEvent.getDxDy());
                }
                this.getContainer().layoutExecute();
                this.getContainer().fireEvent(EventFrameWork.event.Components.SideLayoutEvents.SideLayoutEventsResize, new BaseEvent(layoutData));
            }
        }
    }

    drawItem(item, layoutData, xComponent, yComponent, widthItem, heightItem) {
        item.setParent(this.getContainer());
        item.onAttach();
        item.setPosition(xComponent, yComponent);
        item.makePositionable(true);
        // item.setSize(widthItem, heightItem);

        let computeStyle_mt = DOM.getComputeStyleMap(item.getElement(), 'margin-top');
        let computeStyle_mb = DOM.getComputeStyleMap(item.getElement(), 'margin-bottom');
        // let computeStyle_ml = DOM.getComputeStyleMap(item.getElement(), 'margin-left');
        // let computeStyle_mr = DOM.getComputeStyleMap(item.getElement(), 'margin-right');

        let computeStyle_pt = DOM.getComputeStyleMap(item.getElement(), 'padding-top');
        let computeStyle_pb = DOM.getComputeStyleMap(item.getElement(), 'padding-bottom');
        // let computeStyle_pl = DOM.getComputeStyleMap(item.getElement(), 'padding-left');
        // let computeStyle_pr = DOM.getComputeStyleMap(item.getElement(), 'padding-right');

        // let computeStyle_bw = DOM.getComputeStyleMap(item.getElement(), 'border');

        item.setSize(widthItem, heightItem - (computeStyle_mt + computeStyle_mb + computeStyle_pt + computeStyle_pb));

        if (layoutData && layoutData.getZIndex())
            item.setZIndex(layoutData.getZIndex());
    }
}