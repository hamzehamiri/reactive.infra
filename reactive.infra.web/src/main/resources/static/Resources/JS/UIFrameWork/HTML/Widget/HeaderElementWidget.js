import {StyleElementWidget} from "./StyleElementWidget.js";
import {BaseHTMLComponent} from "../Component/BaseHTMLComponent.js";
import {UUID} from "../../Shared/Common/UUID.js";

export class HeaderElementWidget extends BaseHTMLComponent {

    constructor() {
        super();
        this.setUUID(UUID.create());
    }

    setStyle(styleElementWidget) {
        if (!this.styleMapWidget)
            this.styleMapWidget = new Map();
        if (styleElementWidget instanceof StyleElementWidget) {
            if (!this.styleMapWidget.has(styleElementWidget.getUUID())) {
                this.styleMapWidget.set(styleElementWidget.getUUID(), styleElementWidget);
            }
        }
    }

    onAttach() {
        super.onAttach();
        let that = this;
        if (this.styleMapWidget) {
            this.styleMapWidget.forEach(function (styleElementWidget, uuid) {
                styleElementWidget.setParent(that);
                styleElementWidget.onAttach();
            });
        }
    }

    getStyleMapWidget() {
        return this.styleMapWidget;
    }

    clearStyle() {
        if (this.styleMapWidget != null) {
            this.styleMapWidget.forEach(value => {
                value.onDetach();
            });
            this.styleMapWidget.clear();
        }
    }

    static get() {
        if (!this.header) {
            this.header = new HeaderElementWidget();
            this.header.setElement(document.getElementsByTagName("head")[0]);
            this.header.setAttachedBefore(true);
        }
        return this.header;
    }
}