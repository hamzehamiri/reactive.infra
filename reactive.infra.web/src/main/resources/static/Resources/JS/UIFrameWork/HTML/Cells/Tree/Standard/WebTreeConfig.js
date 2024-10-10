export class WebTreeConfig {
    constructor() {
    }

    setParentColumnConfig(parentColumnConfig) {
        this.parentColumnConfig = parentColumnConfig;
    }

    getParentColumnConfig() {
        return this.parentColumnConfig;
    }

    setMainColumnConfig(mainColumnConfig) {
        this.mainColumnConfig = mainColumnConfig;
    }

    getMainColumnConfig() {
        return this.mainColumnConfig;
    }
}