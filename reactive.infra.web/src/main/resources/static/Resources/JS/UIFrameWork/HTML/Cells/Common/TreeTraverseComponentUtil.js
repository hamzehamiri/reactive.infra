import TreeTraverseUtil from "./TreeTraverseUtil.js";
import {HTMLComponent} from "../../Component/HTMLComponent.js";

export default class TreeTraverseComponentUtil extends TreeTraverseUtil {
    constructor(componentTree, treeGridDescriptor) {
        super(treeGridDescriptor, false);

        if (componentTree instanceof HTMLComponent) {
            this.componentTree = componentTree;
            this.componentTree.setData(TreeTraverseUtil.TreeNodeMap, new Map());
            this.componentTree.setData(TreeTraverseUtil.TreeNodeMapParentId, new Map());
            this.componentTree.setData(TreeTraverseUtil.TreeRootNodeMap, new Map());
        }
    }

    getTreeNodeMap() {
        return this.componentTree.getData().get(TreeTraverseUtil.TreeNodeMap);
    }

    getTreeNodeMapParentId() {
        return this.componentTree.getData().get(TreeTraverseUtil.TreeNodeMapParentId);
    }

    getTreeRootNodeMap() {
        return this.componentTree.getData().get(TreeTraverseUtil.TreeRootNodeMap);
    }
}