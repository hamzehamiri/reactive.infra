import {ShareLayout} from "../../../../../../Shared/Layout/ShareLayout.js";

export default class ResponsiveLayout extends ShareLayout {
    constructor() {
        super();
    }

    setContainer(container) {
        super.setContainer(container);
        if (container) {
            container.setData(ResponsiveLayout.MapElement, new Map());
            container.setData(ResponsiveLayout.ComponentsPerPageType, new Map());
        }
    }

    getMapElement() {
        return this.container.getData().get(ResponsiveLayout.MapElement);
    }

    getComponentsPerPageType() {
        return this.container.getData().get(ResponsiveLayout.ComponentsPerPageType);
    }

    getActivePageType() {
        return this.container.getData().get(ResponsiveLayout.ActivePageType);
    }

    setActivePageType(activePageType) {
        this.container.getData().set(ResponsiveLayout.ActivePageType, activePageType);
    }
}

ResponsiveLayout.MapElement = "MapElement";
ResponsiveLayout.ComponentsPerPageType = "ComponentsPerPageType";
ResponsiveLayout.ActivePageType = "ActivePageType";