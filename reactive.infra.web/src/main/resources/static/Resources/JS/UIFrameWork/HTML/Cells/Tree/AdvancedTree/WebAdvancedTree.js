import {HTMLComponent} from "../../../Component/HTMLComponent.js";
import {RegisterComponent} from "../../../../Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../ThemeLanguage/Theme.js";
import {DOM} from "../../../../Shared/Common/DOM.js";
import TreeGridDescriptor from "../../Common/TreeGridDescriptor.js";
import {EventFrameWork} from "../../../../Shared/Event/EventFrameWork.js";
import AdvancedTreeEvent from "./AdvancedTreeEvent.js";
import WebAdvancedTreeSelection from "./WebAdvancedTreeSelection.js";
import TreeTraverseComponentUtil from "../../Common/TreeTraverseComponentUtil.js";

export default class WebAdvancedTree extends HTMLComponent {
    constructor() {
        super();

        let treeUlElement = DOM.createElement('ul');
        let masterElement = DOM.createElement("div");
        masterElement.appendChild(treeUlElement);

        this.setDataElement(WebAdvancedTree.TreeULElement, treeUlElement);
        this.setDataElement(WebAdvancedTree.TreeDivMaster, masterElement);

        this.setElement(masterElement);
        this.setScrollType(HTMLComponent.ScrollType.Auto);
        this.bindTheme();
        this.addStyleAttribute("padding", "0px");

        this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.click, this.getElement(), this.mouseNodeClick.name, this);
    }

    initialVariables() {
        super.initialVariables();
        this.setData(WebAdvancedTree.AllClickNodes, new Map());
        this.setData(WebAdvancedTree.AllCheckBoxNodes, new Map());
        this.setData(WebAdvancedTree.RecordByNodeElement, new Map());
        this.selection = new WebAdvancedTreeSelection(this);
    }

    getMasterDivElement() {
        return this.getDataElement().get(WebAdvancedTree.TreeDivMaster);
    }

    getTreeULElement() {
        return this.getDataElement().get(WebAdvancedTree.TreeULElement);
    }

    getAllClickNodes() {
        return this.getData().get(WebAdvancedTree.AllClickNodes);
    }

    getAllCheckBoxNodes() {
        return this.getData().get(WebAdvancedTree.AllCheckBoxNodes);
    }

    getRecordByNodeElement() {
        return this.getData().get(WebAdvancedTree.RecordByNodeElement);
    }

    mouseNodeClick(event) {
        let recordModel = this.getAllClickNodes().get(event.target);
        if (recordModel) {
            this.fireEvent(EventFrameWork.event.Components.Tree.SelectedTreeNode, new AdvancedTreeEvent(this, recordModel));
        }
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.WebAdvancedTree[0]));
    }

    onLoad() {
        super.onLoad();

        this.getTreeULElement().setAttribute('class', this.getTreeNodeGroupUlClass());
        this.getMasterDivElement().setAttribute('class', this.getTreeNodeMasterDivClass());
        DOM.addStyleAttribute(this.getTreeULElement(), 'padding', "0px");
        DOM.addStyleAttribute(this.getTreeULElement(), 'width', "max-content");
    }

    setTreeGridDescriptor(treeGridDescriptor) {
        if (treeGridDescriptor instanceof TreeGridDescriptor) {
            this.descriptor = treeGridDescriptor;
            this.util = new TreeTraverseComponentUtil(this, this.descriptor);
        }
    }

    setSelectedNode(record) {
        this.selection.setSelectedNode(record);
    }

    renderRecords(records) {
        if (records) {
            if (records.arrayRecord instanceof Array) {
                this.util.scanAllTreeNodes(records.arrayRecord);

                for (let [, treeTraverseFullPath] of this.util.getTreeRootNodeMap()) {
                    this.generateWhileToLeaf(this.getTreeULElement(), treeTraverseFullPath, false);
                }
            }
        }
    }

    removeNodes() {
        this.getAllClickNodes().clear();
        this.getRecordByNodeElement().clear();
        this.getTreeULElement().innerHTML = "";
    }

    generateWhileToLeaf(parentElement, treeTraverseFullPath, generateUlElement) {
        let targetNodeElementModel = this.renderTreeNodeElement(this.descriptor.convertToDisplayRecord(treeTraverseFullPath.getRecord()));

        this.descriptor.iconServiceDownloader(treeTraverseFullPath.getRecord(), targetNodeElementModel.tree_img_tag);

        let targetNodeElementLi = this.generateUl(targetNodeElementModel.tree_node_group_li, generateUlElement);
        parentElement.appendChild(targetNodeElementLi.toParent);

        this.getAllClickNodes().set(targetNodeElementModel.tree_node_click, treeTraverseFullPath.getRecord())
        this.getRecordByNodeElement().set(treeTraverseFullPath.getPk(), targetNodeElementModel.tree_node_label_div);

        for (const [, treeTraverseFullPathChild] of treeTraverseFullPath.getChildNodeMap()) {
            this.generateWhileToLeaf(targetNodeElementLi.ToChild, treeTraverseFullPathChild, targetNodeElementLi.ToChild.tagName === "LI");
        }
    }

    generateUl(li, generateUlElement) {
        if (generateUlElement) {
            let tree_node_group_ul = DOM.createElement('ul');
            tree_node_group_ul.appendChild(li);
            DOM.addClassName(tree_node_group_ul, this.getTreeNodeGroupUlClass());
            return {
                "toParent": tree_node_group_ul,
                "ToChild": li
            };
        } else {
            return {
                "toParent": li,
                "ToChild": li
            };
        }
    }

    renderTreeNodeElement(treeLabel) {
        let tree_node_collapse_span_img = DOM.createElement('img');
        DOM.addClassName(tree_node_collapse_span_img, this.getTreeNodeCollapseSpanImgClass());
        if (this.getLanguage().getIsRTL()) {
            DOM.addStyleAttribute(tree_node_collapse_span_img, 'transform', 'rotate(0deg)');
        } else {
            DOM.addStyleAttribute(tree_node_collapse_span_img, 'transform', 'rotate(180deg)');
        }

        let tree_node_collapse_span = DOM.createElement('span');
        tree_node_collapse_span.appendChild(tree_node_collapse_span_img);
        DOM.setFloat(tree_node_collapse_span, this.getLanguage().getIsRTL() ? 'right' : 'left');
        DOM.addClassName(tree_node_collapse_span, this.getTreeNodeCollapseSpanClass());

        let imgIcon = DOM.createElement('img');
        DOM.addClassName(imgIcon, this.getTreeNodeIconClass());

        let tree_node_icon = DOM.createElement('span');
        tree_node_icon.appendChild(imgIcon);

        let tree_node_label_span = DOM.createElement('span');
        tree_node_label_span.innerText = treeLabel;
        DOM.addClassName(tree_node_label_span, this.getTreeNodeLabelSpanClass());
        if (this.getLanguage().getIsRTL()) {
            DOM.addStyleAttribute(tree_node_label_span, 'padding-right', '3px');
        } else {
            DOM.addStyleAttribute(tree_node_collapse_span_img, 'padding-left', '3px');
        }
        let tree_node_label_div = DOM.createElement('div');
        tree_node_label_div.appendChild(tree_node_icon);
        tree_node_label_div.appendChild(tree_node_label_span);
        DOM.setFloat(tree_node_label_div, this.getLanguage().getIsRTL() ? 'right' : 'left');
        DOM.addClassName(tree_node_label_div, this.getTreeNodeLabelDivClass());

        let tree_node_break_b = DOM.createElement('b');
        DOM.addClassName(tree_node_break_b, this.getTreeNodeBreakUlClass());

        let tree_node_group_li = DOM.createElement('li');
        tree_node_group_li.appendChild(tree_node_collapse_span);
        tree_node_group_li.appendChild(tree_node_label_div);
        tree_node_group_li.appendChild(tree_node_break_b);
        DOM.addClassName(tree_node_group_li, this.getTreeNodeGroupLiClass());

        return {
            'tree_node_group_li': tree_node_group_li,
            'tree_node_label_div': tree_node_label_div,
            'tree_node_click': tree_node_label_span,
            'tree_img_tag': imgIcon
            // 'tree_node_checkbox': tree_node_checkbox
        };
    }

    addRecords(arrayRecord) {
        if (this.getAttached()) {
            this.renderRecords({
                arrayRecord: arrayRecord
            }, true);
        }
    }

    getTreeNodeMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeMasterDiv);
    }

    getTreeNodeGroupUlClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupUl);
    }

    getTreeNodeGroupLiClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupLi);
    }

    getTreeNodeCollapseSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpan);
    }

    getTreeNodeLabelDivSelectedClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDivSelected);
    }

    getTreeNodeLabelDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDiv);
    }

    getTreeNodeBreakUlClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeBreakUl);
    }

    getTreeNodeCheckboxClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCheckbox);
    }

    getTreeNodeIconClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeIcon);
    }

    getTreeNodeLabelSpanClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelSpan);
    }

    getTreeNodeCollapseSpanImgClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpanImg);
    }
}

WebAdvancedTree.TreeULElement = "TreeULElement";
WebAdvancedTree.TreeDivMaster = "TreeDivMaster";
WebAdvancedTree.AllClickNodes = "AllClickNodes";
WebAdvancedTree.AllCheckBoxNodes = "AllCheckBoxNodes";
WebAdvancedTree.RecordByNodeElement = "RecordByNodeElement";
WebAdvancedTree.SelectedRecords = "SelectedRecords";