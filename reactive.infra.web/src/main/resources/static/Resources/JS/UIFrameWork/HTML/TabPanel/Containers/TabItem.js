import {FitLayout} from "../../Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {DOM} from "../../../Shared/Common/DOM.js";
import {HTMLComponent} from "../../Component/HTMLComponent.js";
import HTMLContainer from "../../Container/HTMLContainer.js";

export default class TabItem extends HTMLContainer {
    constructor() {
        super();

        // TODO moshkele scrool bayad baresy shavad
        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        this.setScrollTypeX(HTMLComponent.ScrollType.Hidden)
        this.setElement(DOM.createElement('div'));
        this.setLayout(new FitLayout())
    }

    setTitle(title) {
        this.title = title;
        if (this.tabItemTitle && this.tabItemTitle.getAttached()) {
            this.tabItemTitle.setTitle(this.title);
        }
    }

    setCloseable(closeable) {
        this.closeable = closeable;
        if (this.tabItemTitle && this.tabItemTitle.getAttached()) {
            this.tabItemTitle.setCloseable(this.closeable);
        }
    }

    setTabItemTitle(tabItemTitle) {
        this.tabItemTitle = tabItemTitle;
        this.tabItemTitle.setCloseable(this.closeable);
        this.tabItemTitle.setTitle(this.title);
    }

    getTabItemTitle() {
        return this.tabItemTitle;
    }

    getTitle() {
        return this.title;
    }
}