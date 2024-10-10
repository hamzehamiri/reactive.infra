import {HTMLComponent} from "../../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {DOM} from "../../../../../../UIFrameWork/Shared/Common/DOM.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import SearchUIIconButtonFloatAble from "./SearchUIIconButtonFloatAble.js";
import {IconButtonFloatAbleAlignment} from "../../../../Components/IconButtonFloatAble.js";

export default class SearchUI extends HTMLComponent {
    constructor(labelData, searchDataModel) {
        super();

        this.searchDataModel = searchDataModel;

        let label = DOM.createElement('p');
        label.innerHTML = labelData;

        let containerElement = DOM.createElement("div");
        containerElement.appendChild(label);

        this.setElement(containerElement);
        this.bindTheme();

        let buttonFloatAbel = new SearchUIIconButtonFloatAble(this, IconButtonFloatAbleAlignment.Bottom);

        DOM.addClassName(label , this.getWebSearchLabelItem());
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getWebSearchContainerUI());
    }

    bindTheme() {
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.SearchUI[0]));
    }

    getWebSearchContainerUI() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUI[1].WebSearchContainerUI);
    }

    getWebSearchLabelItem() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.SearchUI[1].WebSearchLabelItem);
    }
}