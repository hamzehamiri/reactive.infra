import {BaseObservable} from "../../../../Shared/Event/BaseObservable.js";
import WebAdvancedTree from "./WebAdvancedTree.js";
import {DOM} from "../../../../Shared/Common/DOM.js";

export default class WebAdvancedTreeSelection extends BaseObservable {
    constructor(webAdvancedTree) {
        super();
        this.webAdvancedTree = webAdvancedTree;
        this.selectionMode = WebAdvancedTreeSelection.SelectionMode.SingleNode;

        this.initialVariables();
    }

    initialVariables() {
        this.webAdvancedTree.setData(WebAdvancedTree.SelectedRecords, new Map());
    }

    getSelectedRecords() {
        return this.webAdvancedTree.getData().get(WebAdvancedTree.SelectedRecords);
    }

    setSelectedNode(record) {
        let pk = this.webAdvancedTree.descriptor.convertToPKRecord(record);
        let nodeElementDiv = this.webAdvancedTree.getRecordByNodeElement().get(pk);
        if (nodeElementDiv) {
            switch (this.selectionMode) {
                case WebAdvancedTreeSelection.SelectionMode.SingleNode:
                    this.clearAllSelected();
                    this.addSelectedNode(nodeElementDiv, pk);
                    break;
                case WebAdvancedTreeSelection.SelectionMode.MultiNode:
                    this.addSelectedNode(nodeElementDiv, pk);
                    break;
            }
        }
    }

    clearAllSelected() {
        let that = this;
        this.getSelectedRecords().forEach((nodeElementDivOldSelected, id) => {
            DOM.removeClassName(nodeElementDivOldSelected, that.webAdvancedTree.getTreeNodeLabelDivSelectedClass());
        });
        this.getSelectedRecords().clear();
    }

    addSelectedNode(nodeElementDiv, pk) {
        DOM.addClassName(nodeElementDiv, this.webAdvancedTree.getTreeNodeLabelDivSelectedClass());
        this.getSelectedRecords().set(pk, nodeElementDiv);
    }

    setSelectionMode(selectionMode) {
        this.selectionMode = selectionMode;
    }
}

WebAdvancedTreeSelection.SelectionMode = {
    SingleNode: 'SingleNode',
    MultiNode: 'MultiNode'
}