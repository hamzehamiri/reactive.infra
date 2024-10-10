import {ShareLayoutData} from "../../../../../Shared/Layout/ShareLayoutData.js";

export default class FlexLayoutData extends ShareLayoutData {
    constructor() {
        super();
    }

    setFlexAttribute(flexValue) {
        this.flexValue = flexValue;
    }
}

FlexLayoutData.factory = (flexValue, leftMargin, rightMargin, topMargin, bottomMargin) => {
    let flexLayoutData = new FlexLayoutData();
    flexLayoutData.setFlexAttribute(flexValue);
    flexLayoutData.setLeft_Margin(leftMargin);
    flexLayoutData.setRight_Margin(rightMargin);
    flexLayoutData.setTop_Margin(topMargin);
    flexLayoutData.setBottom_Margin(bottomMargin);
    return flexLayoutData;
}