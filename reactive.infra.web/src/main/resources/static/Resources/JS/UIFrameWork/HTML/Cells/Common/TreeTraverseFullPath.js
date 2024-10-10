export default class TreeTraverseFullPath {
    constructor(record, currentLevel, depthToLeaf, pk) {
        this.childNodeMap = new Map();
        this.setRecord(record);
        this.setCurrentLevel(currentLevel);
        this.setDepthToLeaf(depthToLeaf);
        this.setPk(pk);
    }

    setRecord(record) {
        this.record = record;
    }

    setPk(pk) {
        this.pk = pk;
    }

    setCurrentLevel(currentLevel) {
        this.currentLevel = currentLevel;
    }

    setDepthToLeaf(depthToLeaf) {
        this.depthToLeaf = depthToLeaf;
    }

    getRecord() {
        return this.record;
    }

    getPk() {
        return this.pk;
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getChildNodeMap() {
        return this.childNodeMap;
    }
}