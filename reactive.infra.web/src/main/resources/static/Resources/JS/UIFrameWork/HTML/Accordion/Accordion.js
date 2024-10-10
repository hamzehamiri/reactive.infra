import AccordionLayout from "./AccordionLayout.js";
import {DOM} from "../../Shared/Common/DOM.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import TreeGridDescriptor from "../Cells/Common/TreeGridDescriptor.js";
import TreeTraverseUtil from "../Cells/Common/TreeTraverseUtil.js";
import AccordionFrame from "./AccordionFrame.js";
import AccordionLayoutData from "./AccordionLayoutData.js";
import AccordionFrameItem from "./AccordionFrameItem.js";
import FreeLayout from "../Container/Layout/Sizeable/Normal/Free/FreeLayout.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import AccordionEvent from "./AccordionEvent.js";
import Stack from "../../Shared/Common/Stack.js";
import HTMLContainer from "../Container/HTMLContainer.js";

export default class Accordion extends HTMLContainer {

    constructor() {
        super();
        this.setElement(DOM.createElement('div'));
        this.setLayout(new AccordionLayout(AccordionLayout.Mode.AllOpen));
        this.stackSelectItem = new Stack();
        this.bindTheme();
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.Accordion[0]));
    }

    setTreeGridDescriptor(treeGridDescriptor) {
        if (treeGridDescriptor instanceof TreeGridDescriptor) {
            this.descriptor = treeGridDescriptor;
            this.util = new TreeTraverseUtil(this.descriptor, true);
        }
    }

    renderRecords(records) {
        if (records) {
            if (records instanceof Array) {
                this.util.scanAllTreeNodes(records);
                for (let [, treeTraverseFullPath] of this.util.getTreeRootNodeMap()) {
                    this.traverseToLeaf(treeTraverseFullPath);
                }
            }
        }
    }

    traverseToLeaf(treeTraverseFullPath) {
        let that = this;
        let accordionFrame = new AccordionFrame(this.descriptor.convertToDisplayRecord(treeTraverseFullPath.record), true);
        accordionFrame.setLayout(new FreeLayout());

        this.addItem(accordionFrame, new AccordionLayoutData());
        for (const [, treeTraverseFullPathChild] of treeTraverseFullPath.getChildNodeMap()) {
            if (treeTraverseFullPathChild.getChildNodeMap().size > 0) {

            } else {
                let accordionFrameItem = new AccordionFrameItem(this.descriptor.convertToDisplayRecord(treeTraverseFullPathChild.record), treeTraverseFullPathChild.record);
                accordionFrameItem.setItemClass(accordionFrame.getBodyItemClass());
                accordionFrameItem.setItemSelectedClass(accordionFrame.getBodyItemSelectedClass());
                accordionFrameItem.addListener(EventFrameWork.event.Components.AccordionFrameItem.Select, (accordionFrameItemEvent) => {
                    let item = accordionFrameItemEvent.getSource();
                    if (item instanceof AccordionFrameItem) {
                        let last = that.stackSelectItem.peek();
                        if (last) {
                            last.select(false);
                        }
                        item.select(true);
                        that.stackSelectItem.push(accordionFrameItemEvent.getSource());
                        that.fireEvent(EventFrameWork.event.Components.Accordion.Select, new AccordionEvent(that, accordionFrameItemEvent.getSource(), accordionFrameItemEvent.model));
                    }
                });
                accordionFrame.addItem(accordionFrameItem);
            }
        }
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getClassNamesByElement(UiFrameWorkComponent.Components.Accordion[1].AccordionMaster));
    }
}