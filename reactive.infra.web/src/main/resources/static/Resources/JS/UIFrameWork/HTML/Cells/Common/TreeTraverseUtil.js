import TreeGridDescriptor from "./TreeGridDescriptor.js";
import TreeTraverseFullPath from "./TreeTraverseFullPath.js";
import BaseSharedComponent from "../../../Shared/BaseShared/BaseSharedComponent.js";

export default class TreeTraverseUtil extends BaseSharedComponent {
    constructor(treeGridDescriptor, privateVariable) {
        super();
        if (treeGridDescriptor instanceof TreeGridDescriptor) {
            this.treeGridDescriptor = treeGridDescriptor;
        }

        if (privateVariable) {
            this.setData(TreeTraverseUtil.TreeNodeMap, new Map());
            this.setData(TreeTraverseUtil.TreeNodeMapParentId, new Map());
            this.setData(TreeTraverseUtil.TreeRootNodeMap, new Map());
        }
    }

    getTreeNodeMap() {
        return this.getData().get(TreeTraverseUtil.TreeNodeMap);
    }

    getTreeNodeMapParentId() {
        return this.getData().get(TreeTraverseUtil.TreeNodeMapParentId);
    }

    getTreeRootNodeMap() {
        return this.getData().get(TreeTraverseUtil.TreeRootNodeMap);
    }

    scanAllTreeNodes(records) {
        let maxDepth = 0;
        for (let index = 0; index < records.length; index++) {
            let record = records[index];
            let pk = this.treeGridDescriptor.convertToPKRecord(record);
            let pkParent = this.treeGridDescriptor.convertToPKParentRecord(record);

            let treeTraverseFullPath = new TreeTraverseFullPath(record, 0, 0, pk);

            this.getTreeNodeMap().set(pk, treeTraverseFullPath);
            this.addTreeNodeMapParentId(pkParent, pk);

            let depth = this.traverseToRoot(treeTraverseFullPath, pk, pkParent, 0);
            maxDepth = Math.max(maxDepth, depth);
            treeTraverseFullPath.setDepthToLeaf(depth);
        }
    }

    addTreeNodeMapParentId(pkParent, pk) {
        if (pkParent) {
            let pkArrays = this.getTreeNodeMapParentId().get(pkParent);
            if (!pkArrays) {
                pkArrays = [];
                this.getTreeNodeMapParentId().set(pkParent, pkArrays);
            }
            pkArrays.push(pk);
        }
    }

    traverseToRoot(treeTraverseFullPath, pk, pkParent, depthToLeaf) {
        if (pkParent != null) {
            let parentTreeTraverseFullPath = this.getTreeNodeMap().get(pkParent);
            if (parentTreeTraverseFullPath != null && parentTreeTraverseFullPath.getRecord() != null) {
                parentTreeTraverseFullPath.getChildNodeMap().set(pk, treeTraverseFullPath);
                pk = this.treeGridDescriptor.convertToPKRecord(parentTreeTraverseFullPath.getRecord());
                pkParent = this.treeGridDescriptor.convertToPKParentRecord(parentTreeTraverseFullPath.getRecord());
                if (pk === pkParent) {
                    treeTraverseFullPath.setDepthToLeaf(depthToLeaf);
                    this.getTreeRootNodeMap().set(pk, treeTraverseFullPath);
                    return depthToLeaf;
                } else {
                    return this.traverseToRoot(parentTreeTraverseFullPath, pk, pkParent, ++depthToLeaf);
                }
            } else {
                treeTraverseFullPath.setDepthToLeaf(depthToLeaf);
                this.getTreeRootNodeMap().set(pk, treeTraverseFullPath);
                return depthToLeaf;
            }
        } else {
            treeTraverseFullPath.setDepthToLeaf(depthToLeaf);
            let pkParentArray = this.getTreeNodeMapParentId().get(pk);
            this.getTreeRootNodeMap().set(pk, treeTraverseFullPath);
            if (pkParentArray != null) {
                let maxDepth = 0;
                for (let i = 0; i < pkParentArray.length; i++) {
                    pkParent = pkParentArray[i];
                    let depth = this.traverseToLeaf(treeTraverseFullPath, pkParent, pk, depthToLeaf);
                    maxDepth = Math.max(maxDepth, depth);
                }
                return maxDepth;
            }
        }
    }

    traverseToLeaf(treeTraverseFullPath, pk, pkParent, depthToLeaf) {
        if (pk != null) {
            treeTraverseFullPath = this.getTreeNodeMap().get(pk);
            let treeTraverseFullPathParent = this.getTreeNodeMap().get(pkParent);
            treeTraverseFullPathParent.getChildNodeMap().set(pk, treeTraverseFullPath);
            treeTraverseFullPathParent.setDepthToLeaf(depthToLeaf);
            treeTraverseFullPathParent.setCurrentLevel(depthToLeaf);
            this.getTreeRootNodeMap().delete(pk);
            let pkParentArray = this.getTreeNodeMapParentId().get(pk);
            let maxDepth = 0;
            if (pkParentArray != null) {
                for (let i = 0; i < pkParentArray.length; i++) {
                    pkParent = pkParentArray[i];
                    let depth = this.traverseToLeaf(treeTraverseFullPath, pkParent, pk, depthToLeaf);
                    maxDepth = Math.max(maxDepth, depth);
                }
                return maxDepth;
            }
            return maxDepth;
        } else {
            treeTraverseFullPath.setDepthToLeaf(depthToLeaf);
            treeTraverseFullPath.setCurrentLevel(depthToLeaf);
            return depthToLeaf;
        }
    }
}

TreeTraverseUtil.TreeNodeMap = "TreeNodeMap";
TreeTraverseUtil.TreeNodeMapParentId = "TreeNodeMapParentId";
TreeTraverseUtil.TreeRootNodeMap = "TreeRootNodeMap";