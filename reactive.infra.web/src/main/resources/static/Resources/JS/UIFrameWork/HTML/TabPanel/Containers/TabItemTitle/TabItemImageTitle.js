import TabItemTitle from "./TabItemTitle.js";
import {DOM} from "../../../../Shared/Common/DOM.js";

export default class TabItemImageTitle extends TabItemTitle {
    constructor(title) {
        super(title);
    }

    createTitleElement() {
        return DOM.createElement('img');
    }

    setMapAttribute(mapAttribute) {
        super.setMapAttribute(mapAttribute);
        if (this.getAttached()) {
            let img = this.getDataElement().get(TabItemTitle.TitleA);
            DOM.setAttribute(img, 'src', mapAttribute.get(TabItemImageTitleMapAttribute.ImgSrc));
            DOM.addStyleAttribute(img, 'width', mapAttribute.get(TabItemImageTitleMapAttribute.Width))
        }
    }
}

export const TabItemImageTitleMapAttribute = {
    ImgSrc: 'ImgSrc',
    Width: 'Width'
}