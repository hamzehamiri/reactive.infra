import BaseEvent from "../../../../Shared/Event/BaseEvent.js";

export default class AdvancedTreeEvent extends BaseEvent {

    constructor(advancedTree, source) {
        super(source);
        this.advancedTree = advancedTree;
    }

    getAdvancedTree() {
        return this.advancedTree;
    }

    getTreeNodeSelected() {
        return this.source;
    }
}