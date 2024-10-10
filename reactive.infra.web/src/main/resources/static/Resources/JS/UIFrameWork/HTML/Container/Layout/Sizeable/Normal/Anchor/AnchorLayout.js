import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";
import {ShareContainer} from "../../../../../../Shared/Layout/ShareContainer.js";
import {AnchorLayoutData} from "./AnchorLayoutData.js";
import {HTMLComponent} from "../../../../../Component/HTMLComponent.js";
import {Util} from "../../../../../../Shared/Common/Util.js";

export class AnchorLayout extends ShareLayout {
    constructor(primitiveSize) {
        super(false);
        this.setPrimitiveSize(primitiveSize);
        this.DrawAllItem = false;
    }

    setContainer(container) {
        super.setContainer(container);
        if (container) {
            container.setData(AnchorLayout.HorizontalMap, new Map());
            container.setData(AnchorLayout.VerticalMap, new Map());
        }
    }

    setPrimitiveSize(primitiveSize) {
        this.primitiveSize = primitiveSize;
    }

    PassiveLayout(component) {
        super.PassiveLayout(component);
        if (component instanceof HTMLComponent) {
            this.HorizontalVerticalProcess(component);
        }
    }

    getHorizontalMap() {
        return this.container.getData().get(AnchorLayout.HorizontalMap);
    }

    getVerticalMap() {
        return this.container.getData().get(AnchorLayout.VerticalMap);
    }

    HorizontalVerticalProcess(currentItem) {
        let layoutData = currentItem.getData().get(ShareContainer.LayoutData);
        if (layoutData instanceof AnchorLayoutData) {
            let endLeftAnchor = this.findEndOfSide(currentItem, "Left", "Right");
            let endRightAnchor = this.findEndOfSide(currentItem, "Right", "Left");
            if (endLeftAnchor && this.isMainContainer(endLeftAnchor.Last) && endRightAnchor && this.isMainContainer(endRightAnchor.Last)) {
                let allItemInHorizontal = [];
                Util.CopyArray(allItemInHorizontal, endLeftAnchor.Path, endRightAnchor.Path);
                allItemInHorizontal.push(currentItem);
                allItemInHorizontal.sort(function (before, next) {
                    let beforeLayout = before.getData().get(ShareContainer.LayoutData);
                    let nextLayout = next.getData().get(ShareContainer.LayoutData);
                    return beforeLayout.getPrimitiveRect().Left - nextLayout.getPrimitiveRect().Left;
                });

                let finalStaticWidth = endLeftAnchor.StaticDistance + endRightAnchor.StaticDistance;

                let row = new AnchorLayout_Cluster();
                row.setItems(allItemInHorizontal);
                row.setStaticValue(finalStaticWidth);

                this.getHorizontalMap().set(row.getHashCode(), row);
            }

            let endTopAnchor = this.findEndOfSide(currentItem, "Top", "Bottom");
            let endBottomAnchor = this.findEndOfSide(currentItem, "Bottom", "Top");

            if (endTopAnchor && this.isMainContainer(endTopAnchor.Last) && endBottomAnchor && this.isMainContainer(endBottomAnchor.Last)) {
                let allItemInVertical = [];
                Util.CopyArray(allItemInVertical, endTopAnchor.Path, endBottomAnchor.Path);
                allItemInVertical.push(currentItem);
                allItemInVertical.sort(function (before, next) {
                    let beforeLayout = before.getData().get(ShareContainer.LayoutData);
                    let nextLayout = next.getData().get(ShareContainer.LayoutData);
                    return beforeLayout.getPrimitiveRect().Top - nextLayout.getPrimitiveRect().Top;
                });

                let finalStaticHeight = endTopAnchor.StaticDistance + endBottomAnchor.StaticDistance;

                let col = new AnchorLayout_Cluster();
                col.setItems(allItemInVertical);
                col.setStaticValue(finalStaticHeight);

                this.getVerticalMap().set(col.getHashCode(), col);
            }
        }
    }

    findEndOfSide(currentItem, side, sideUpdate) {
        let nextItem = currentItem;
        let items = [];
        let staticDistance = 0;
        while (nextItem && !this.isMainContainer(nextItem)) {
            let nextItemLayoutData = nextItem.getData().get(ShareContainer.LayoutData);
            if (nextItemLayoutData) {
                let nextItemConfigSide = nextItemLayoutData['get' + side]();
                if (nextItemConfigSide) {
                    let uuidNext = nextItemConfigSide.AnchorTo;
                    nextItem = this.findUUIDItem(uuidNext);
                    let distanceTwoItem = this.distanceTwoItem(currentItem, nextItem, side);
                    nextItemLayoutData.setData(side, distanceTwoItem);

                    let itemLayoutData = nextItem.getData().get(ShareContainer.LayoutData);
                    if (itemLayoutData)
                        itemLayoutData.setData(sideUpdate, distanceTwoItem);

                    staticDistance += distanceTwoItem;
                    currentItem = nextItem;

                    if (nextItem && !this.isMainContainer(nextItem))
                        items.push(currentItem);
                } else {
                    nextItem = null;
                }
            }
        }
        return {
            Last: nextItem,
            Path: items,
            StaticDistance: staticDistance
        };
    }

    distanceTwoItem(currentItem, nextItem, side) {
        let currentLayoutData = currentItem.getData().get(ShareContainer.LayoutData);
        let nextLayoutData = nextItem ? nextItem.getData().get(ShareContainer.LayoutData) : null;
        if (currentLayoutData && currentLayoutData.getPrimitiveRect()) {
            if (side === "Right") {
                if (nextLayoutData && nextLayoutData.getPrimitiveRect()) {
                    return nextLayoutData.getPrimitiveRect().Left - (currentLayoutData.getPrimitiveRect().Left + currentLayoutData.getPrimitiveRect().Width);
                } else if (this.isMainContainer(nextItem)) {
                    return this.primitiveSize.Width - (currentLayoutData.getPrimitiveRect().Left + currentLayoutData.getPrimitiveRect().Width);
                }
            } else if (side === "Left") {
                if (nextLayoutData && nextLayoutData.getPrimitiveRect()) {
                    return nextLayoutData.getPrimitiveRect().Left + currentLayoutData.getPrimitiveRect().Width - nextLayoutData.getPrimitiveRect().Left;
                }
                if (this.isMainContainer(nextItem)) {
                    return currentLayoutData.getPrimitiveRect().Left;
                }
            } else if (side === "Bottom") {
                if (nextLayoutData && nextLayoutData.getPrimitiveRect()) {
                    return nextLayoutData.getPrimitiveRect().Top - (currentLayoutData.getPrimitiveRect().Top + nextLayoutData.getPrimitiveRect().Height);
                }
                if (this.isMainContainer(nextItem)) {
                    return this.primitiveSize.Height - (currentLayoutData.getPrimitiveRect().Top + currentLayoutData.getPrimitiveRect().Height);
                }
            } else if (side === "Top") {
                if (nextLayoutData && nextLayoutData.getPrimitiveRect()) {
                    return currentLayoutData.getPrimitiveRect().Top - (nextLayoutData.getPrimitiveRect().Top + nextLayoutData.getPrimitiveRect().Height);
                }
                if (this.isMainContainer(nextItem)) {
                    return currentLayoutData.getPrimitiveRect().Top;
                }
            }
        }
        return 0;
    }

    isMainContainer(item) {
        return item && (item.getUUID() === this.getContainer().getUUID());
    }

    findUUIDItem(uuid) {
        let itemFind = this.getContainer().getItems().get(uuid);
        if (itemFind) {
            return itemFind;
        } else {
            if (this.getContainer().getUUID() === uuid)
                return this.getContainer();
        }
        return null;
    }

    onDetach() {
        super.onDetach();
        this.DrawAllItem = false;
    }

    LayoutProcess() {
        super.LayoutProcess();
        if (this.getContainer()) {
            if (this.DrawAllItem === false) {
                let that = this;
                this.getContainer().getItems().forEach(function (item) {
                    that.drawItem(item);
                });
                this.DrawAllItem = true;
            }
            let dWidth = this.getContainer().getWidth() > 0 ? this.getContainer().getWidth() - this.primitiveSize.Width : 0;
            let dHeight = this.getContainer().getHeight() > 0 ? this.getContainer().getHeight() - this.primitiveSize.Height : 0;
            this.getHorizontalMap().forEach(function (row, key) {
                if (row instanceof AnchorLayout_Cluster) {
                    let leftTotal = 0;
                    for (let indexItem = 0; indexItem < row.getItems().length; indexItem++) {
                        let item = row.getItems()[indexItem];
                        let layoutData = item.getData().get(ShareContainer.LayoutData);

                        if (layoutData instanceof AnchorLayoutData) {
                            let middleHorizontal = layoutData.getMiddleHorizontal();
                            let dw = 0;

                            if (indexItem === 0) {
                                leftTotal = item.getBoundingClientRect_Style().left;
                            }

                            if (!middleHorizontal.Fix) {
                                dw = (dWidth * middleHorizontal.Scale) / 100;
                            }

                            let offsetRight = layoutData.getData().get("Right");

                            item.setLeft(leftTotal);
                            item.setWidth(layoutData.primitiveRect.Width + dw);

                            leftTotal += offsetRight ? layoutData.primitiveRect.Width + dw + offsetRight : layoutData.primitiveRect.Width + dw;
                        }
                    }
                }
            });

            this.getVerticalMap().forEach(function (col, key) {
                if (col instanceof AnchorLayout_Cluster) {
                    let topTotal = 0;
                    for (let indexItem = 0; indexItem < col.getItems().length; indexItem++) {
                        let item = col.getItems()[indexItem];
                        let layoutData = item.getData().get(ShareContainer.LayoutData);
                        if (layoutData instanceof AnchorLayoutData) {
                            let middleVertical = layoutData.getMiddleVertical();
                            let dh = 0;

                            if (indexItem === 0) {
                                topTotal = item.getBoundingClientRect_Style().top;
                            }

                            if (!middleVertical.Fix) {
                                dh = (dHeight * middleVertical.Scale) / 100;
                            }

                            let offsetBottom = layoutData.getData().get("Bottom");

                            item.setTop(topTotal);
                            item.setHeight(layoutData.primitiveRect.Height + dh);

                            topTotal += offsetBottom ? layoutData.primitiveRect.Height + dh + offsetBottom : layoutData.primitiveRect.Height + dh;
                        }
                    }
                }
            });
        }
    }

    drawItem(item) {
        let layoutData = item.getData().get(ShareContainer.LayoutData);
        let primitiveRect = layoutData.getPrimitiveRect();
        let newLeft, newWidth, newTop, newHeight;

        newLeft = primitiveRect.Left;
        newWidth = primitiveRect.Width;
        newTop = primitiveRect.Top;
        newHeight = primitiveRect.Height;

        item.setParent(this.getContainer());
        item.onAttach();
        item.setPosition(newLeft, newTop);
        item.makePositionable(true);
        item.setSize(newWidth, newHeight);
    }
}

AnchorLayout.HorizontalMap = 'HorizontalMap';
AnchorLayout.VerticalMap = 'VerticalMap';

export class AnchorLayout_Cluster {
    constructor() {

    }

    setItems(items) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    getHashCode() {
        let uk = '';
        this.items.forEach(function (item) {
            uk += "##" + item.getUUID();
        });
        return uk;
    }

    setStaticValue(staticValue) {
        this.staticValue = staticValue;
    }

    getStaticValue() {
        return this.staticValue;
    }
}