import {LayoutContainer} from "../../../UIFrameWork/HTML/Container/LayoutContainer.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import {GridLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/GridLayout.js";
import {ShopItem} from "./ShopItem/ShopItem.js";

export class ShopContainer extends LayoutContainer {
    constructor() {
        super();
        this.setElement(DOM.createElement("div"));

        this.setLayout(new GridLayout());

        this.addItem(new ShopItem());
        this.addItem(new ShopItem());
        this.addItem(new ShopItem());
        this.addItem(new ShopItem());
    }
}