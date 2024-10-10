import {ShareLayoutData} from "../../Shared/Layout/ShareLayoutData.js";

export class ResizeLayoutData extends ShareLayoutData {
    constructor(type) {
        super();
        this.type = type;
    }

    getType() {
        return this.type;
    }

}

ResizeLayoutData.Type = {
    Left: 'Left',
    Right: 'Right',
    Top: 'Top',
    Bottom: 'Bottom'
};