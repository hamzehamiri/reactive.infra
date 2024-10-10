import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {HTMLComponent} from "../Component/HTMLComponent.js";
import {ResizeContainer} from "../Resizer/ResizeContainer.js";
import {BodyElementWidget} from "../Widget/BodyElementWidget.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {DOM} from "../../Shared/Common/DOM.js";
import {PopupManager} from "./PopupManager.js";
import HTMLContainer from "../Container/HTMLContainer.js";
import {RootPanel} from "../Container/RootPanel.js";

export class Popup extends HTMLContainer {

    constructor(resizerActive, resizeOption, dragOption, modal) {
        super();

        this.resizerActive = resizerActive;
        this.resizeOption = resizeOption;
        this.dragOption = dragOption;
        this.modal = modal;
        this.dragElementMatcherFunctionArray = [];

        this.setHideOnOtherClick(true);
        this.setBaseHeight(200);
        this.setTypeComponent(Popup.type);
        this.setAttachedBefore(true);
        this.setFixSize(true);
        this.setScrollTypeY(HTMLComponent.ScrollType.Auto);
        this.makePositionable(true);
        this.setZIndex(RegisterComponent.latestZIndex(Popup.type));

        this.requestCaptureEvent_Window(EventFrameWork.event.MouseEvent.mousedown, this.onMouseDown.name, this);
    }

    setHideOnOtherClick(hideOnOtherClick) {
        this.hideOnOtherClick = hideOnOtherClick;
        if (this.getAttached() && hideOnOtherClick) {
            let that = this;
            this.setContainElementMatcherFunction((event) => {
                return that.getResizer() != null ? that.getResizer().containElement(event) : false;
            });
        } else {
            this.setContainElementMatcherFunction(null);
        }
    }

    addDragElementMatcherFunction(dragElementMatcherFunction) {
        this.dragElementMatcherFunctionArray.push(dragElementMatcherFunction);
        if (this.getAttached()) {
            this.resizer.addDragElementMatcherFunction(dragElementMatcherFunction);
        }
    }

    setContainElementMatcherFunction(containElementMatcherFunction) {
        this.containElementMatcherFunction = containElementMatcherFunction;
    }

    onLoad() {
        super.onLoad();
        if (this.resizerActive) {
            this.resizer = new ResizeContainer(this);

            for (let dragElementMatcherFunction of this.dragElementMatcherFunctionArray) {
                this.resizer.addDragElementMatcherFunction(dragElementMatcherFunction);
            }

            this.resizer.syncActivate(this.resizeOption, this.dragOption);
        }
        this.setHideOnOtherClick(this.hideOnOtherClick);
    }

    onDetach() {
        super.onDetach();
        this.setContainElementMatcherFunction(null);
    }

    onMouseDown(event) {
        if ((this.showPopUp && this.hideOnOtherClick) && !this.containElement(event)) {
            this.hide();
        }
    }

    containElement(event) {
        return (this.getElement() != null && this.getElement().contains(event.target)) || super.containElement(event) || (this.containElementMatcherFunction ? this.containElementMatcherFunction(event) : false);
    }

    showAlign(element, width) {
        let elementBounding = DOM.getBoundingClientRect(element);
        let topCompute = elementBounding.top + elementBounding.height;
        width = this.minWidth ? Math.max(width, this.minWidth) : width;
        this.setWidth(width);
        this.show(RegisterComponent.getCurrentLanguage().getIsRTL() ? elementBounding.left : elementBounding.left, topCompute /*+ 200 - document.body.clientHeight*/);
    }

    setMinWidth(minWidth) {
        this.minWidth = minWidth;
    }

    showCenterElement(element, width) {
        let elementBounding = DOM.getBoundingClientRect(element);
        let leftPopUp = elementBounding.left + (elementBounding.width / 2 - width / 2);
        let topPopUp = elementBounding.top + (elementBounding.height / 2 - this.baseHeight / 2);

        this.setWidth(width);
        this.show(leftPopUp, topPopUp/*, RegisterComponent.getCurrentLanguage().getIsRTL()*/);
    }

    setBaseHeight(baseHeight) {
        this.baseHeight = baseHeight;
    }

    setBaseWidth(baseWidth) {
        this.baseWidth = baseWidth;
    }

    show(x, y, isRTL) {
        this.setPosition(x, y, isRTL);

        PopupManager.instance.registerPopup(this);

        let body = BodyElementWidget.get();
        body.addItem(this);
        body.addItem(this.resizer);
        body.onAttach();
        // body.layoutExecute();

        if (this.modal) {
            let rootPanel = RootPanel.get();
            rootPanel.maskBody();
        }

        this.setHeight(0);
        let that = this;
        let popupTimer = setTimeout(() => {
            clearTimeout(popupTimer);
            if (that.baseHeight != null) {
                if (document.firstElementChild.clientHeight < (y + that.baseHeight)) {
                    this.setTop(document.firstElementChild.clientHeight - that.baseHeight);
                }
                if (this.resizerActive) {
                    this.resizer.setSize(rect.width, that.baseHeight);
                }
                that.setHeight(that.baseHeight);
                // that.layoutExecute();
            } else {
                that.removeStyleAttribute("height")
            }
        }, 0);

        this.showPopUp = true;
        let rect = this.getBoundingClientRect();
        if (this.resizerActive) {
            this.resizer.setSize(rect.width, rect.height);
        }
        this.fireEvent(EventFrameWork.event.showPopUp);

        PopupManager.instance.setActivePopUp(this);
    }

    hide() {
        this.setHeight(0);

        PopupManager.instance.unRegister(this);

        let body = BodyElementWidget.get();
        body.removeItem(this);
        body.removeItem(this.resizer);
        // body.layoutExecute();
        if (this.modal) {
            let rootPanel = RootPanel.get();
            rootPanel.unMaskBody();
        }

        this.showPopUp = false;
    }

    onBlur(event) {
        super.onBlur(event);
        this.hide();
    }

    getResizer() {
        return this.resizer;
    }
}
