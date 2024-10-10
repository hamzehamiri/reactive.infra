import {DOM} from "../../Shared/Common/DOM.js";
import {RegisterComponent} from "../../Shared/BaseShared/RegisterComponent.js";
import {BaseHTMLComponent} from "./BaseHTMLComponent.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {HeaderElementWidget} from "../Widget/HeaderElementWidget.js";
import ChangePositionEvent from "./Events/ChangePositionEvent.js";
import BaseEvent from "../../Shared/Event/BaseEvent.js";

export class HTMLComponent extends BaseHTMLComponent {

    constructor() {
        super();

        this.setTextSelected('none');
        // this.setTabIndex(-1);
        RegisterComponent.Register(this);
    }

    containElement(event) {
        return this.getElement().contains(event.target);
    }

    setTransitionLayoutExecute(activeTransition, consumerTransitionFunction) {
        this.changeSizeEffected = false;
        this.activeTransition = activeTransition;
        this.consumerTransitionFunction = consumerTransitionFunction;
        if (this.getAttached()) {
            if (activeTransition) {
                this.requestCaptureEvent_DOM(EventFrameWork.event.Transition.TransitionEnd, this.getElement(), this.transitionEnd.name, this);
                this.requestCaptureEvent_DOM(EventFrameWork.event.Transition.TransitionCancel, this.getElement(), this.transitionCancel.name, this);
            } else {
                this.unRegisterEvent(EventFrameWork.event.Transition.TransitionEnd, BaseHTMLComponent.EventType.DOM);
                this.unRegisterEvent(EventFrameWork.event.Transition.TransitionCancel, BaseHTMLComponent.EventType.DOM);
            }
        }
    }

    getTransitionLayoutExecute() {
        return this.activeTransition;
    }

    onLoad() {
        super.onLoad();
        if (this.maskComponent) {
            this.showMaskComponent(this.maskComponent, this.maskComponentJson.height, this.maskComponentJson.width, this.maskComponentJson.elementBlur);
        }
        this.bindLang(this.getLanguage(), false);
        if (this.activeTransition !== undefined)
            this.setTransitionLayoutExecute(this.activeTransition, this.consumerTransitionFunction);
    }

    onDetach() {
        super.onDetach();
        RegisterComponent.UnRegister(this);
    }

    transitionEnd(event) {
        if (!this.changeSizeEffected) {
            this.changeSizeEffected = true;
            if (this.consumerTransitionFunction)
                this.consumerTransitionFunction(this);
        }
    }

    transitionCancel(event) {
        this.changeSizeEffected = true;
    }

    bindLang(languageModel, fireEvent) {
        this.setLanguage(languageModel);
        if (this.languageModel && this.getElement()) {
            DOM.setDirection(this.getElement(), this.languageModel.getIsRTL() ? 'rtl' : 'ltr');
            this.restyle();
        }
        if (fireEvent)
            this.fireEvent(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, new BaseEvent(this));
    }

    setEnable(enable) {
        this.enable = enable;
    }

    setTextSelected(userSelected) {
        this.addStyleAttribute('user-select', userSelected);
    }

    getBoundingClientRect() {
        return DOM.getBoundingClientRect(this.getElement());
    }

    getBoundingClientRect_Style() {
        return DOM.getBoundingClientRect_Style(this.getElement());
    }

    getWidth() {
        return DOM.getWidth(this.element);
    }

    setRequestWidth(requestWidth) {
        this.requestWidth = requestWidth;
    }

    getRequestWidth() {
        return this.requestWidth;
    }

    getOffsetWidth() {
        return DOM.getOffsetWidth(this.element);
    }

    getHeight() {
        return DOM.getHeight(this.element);
    }

    getOffsetHeight() {
        return DOM.getOffsetHeight(this.element);
    }

    setThemeComponent(themeComponent) {
        this.themeComponent = themeComponent;
        if (themeComponent) {
            for (let elementName in themeComponent) {
                this.addClassByElementName(elementName, themeComponent[elementName]);
            }
        }
    }

    getThemeComponent() {
        return this.themeComponent;
    }

    bindTheme() {

    }

    restyle() {
        this.bindTheme();
        if (this.elementClass != null) {
            this.elementClass.forEach(value => {
                value.element;
                value.className;
                value.elementName;
            })
        }
    }

    highlighted(className, enable) {
        let jsonTheme = {
            [className]: [className, {
                'border': '1px solid',
                '$hover$': {
                    'background-color': 'rgb(55,10,130)',
                }
            }]
        };
        if (enable) {
            this.addClassByElementNameDynamic(className, jsonTheme);
        } else {
            this.removeClassByElementNameDynamic(className);
        }
    }

    addStyleElement(element, className, elementName) {
        // DOM.addClassName(this.triggerDiv, this.getTriggerClass());
        if (this.elementClass == null)
            this.elementClass = [];
        this.elementClass.push({
            element: element,
            className: className,
            elementName: elementName
        })
    }

    addClassByElementNameDynamic(elementName, componentThemeJson) {
        let map = this.getClassMapByElementName();
        if (map) {
            let classByElementName = map.get(elementName);
            if (!classByElementName) {
                HeaderElementWidget.get().getStyleMapWidget().forEach((styleElementWidget, uuid) => {
                    styleElementWidget.traverse(componentThemeJson, styleElementWidget.getCssTags());
                    styleElementWidget.renderStyle();
                });
            }
            DOM.addClassName(this.getElement(), elementName);
        }
    }

    removeClassByElementNameDynamic(elementName) {
        let map = this.getClassMapByElementName();
        if (map) {
            map.delete(elementName);
        }
        DOM.removeClassName(this.getElement(), elementName);
    }

    addClassByElementName(elementName, className) {
        let map = this.getClassMapByElementName();
        if (map) {
            let classByElementName = map.get(elementName);
            if (!classByElementName) {
                let arrayClassnameByElementName = [className];
                map.set(elementName, arrayClassnameByElementName);
            } else {
                // classByElementName.push(className);
            }
        }
    }

    setSize(width, height) {
        this.changeSizeEffected = false;
        this.width = width;
        this.height = height;
        this.addStyleAttribute('width', width + 'px');
        this.addStyleAttribute('height', height + 'px');
        this.fireEvent(EventFrameWork.event.resize);

        if (this.maskComponent) {
            this.reSyncSize(this.maskComponentJson.height, this.maskComponentJson.width)
        }
    }

    setWidth(width) {
        this.addStyleAttribute('width', width + 'px');
        this.fireEvent(EventFrameWork.event.resize);
    }

    setWidthPercent(percentWidth) {
        this.addStyleAttribute('width', percentWidth + "%");
        this.fireEvent(EventFrameWork.event.resize);
    }

    setHeight(height) {
        this.changeSizeEffected = false;
        this.addStyleAttribute('height', height + 'px');
        this.fireEvent(EventFrameWork.event.resize);
    }

    setHeightPercent(percentHeight) {
        this.addStyleAttribute('height', percentHeight + '%');
        this.fireEvent(EventFrameWork.event.resize);
    }

    setPosition(x, y, isRtl) {
        if (/*RegisterComponent.getCurrentLanguage().getIsRTL() &&*/ isRtl) {
            this.addStyleAttribute('right', x + 'px');
            this.removeStyleAttribute('left');
        } else {
            this.addStyleAttribute('left', x + 'px');
            this.removeStyleAttribute('right');
        }
        this.addStyleAttribute('top', y + 'px');
        this.fireEvent(EventFrameWork.event.Components.BaseComponent.ChangePosition, new ChangePositionEvent(this, x, y));
    }

    setLeft(x) {
        this.addStyleAttribute('left', x + 'px');
    }

    setFloatPerLang() {
        this.addStyleAttribute('float', this.languageModel.getIsRTL() ? 'right' : 'left');
    }

    setFloat(float) {
        this.addStyleAttribute('float', float);
    }

    setTop(y) {
        this.addStyleAttribute('top', y + 'px');
    }

    makePositionable(enable) {
        if (enable) {
            this.addStyleAttribute('position', 'absolute');
        } else {
            this.addStyleAttribute('position', 'relative');
        }
    }

    setMargin(left, right, top, bottom) {
        this.addStyleAttribute('marginLeft', left + "px");
        this.addStyleAttribute('marginRight', right + "px");
        this.addStyleAttribute('marginTop', top + "px");
        this.addStyleAttribute('marginBottom', bottom + "px");
    }

    setScrollType(scrollType) {
        this.scrollType = scrollType;
        this.addStyleAttribute('overflow', scrollType);
    }

    setScrollTypeY(scrollTypeY) {
        this.scrollTypeY = scrollTypeY;
        if (scrollTypeY)
            this.addStyleAttribute('overflow-y', scrollTypeY);
        else
            this.removeStyleAttribute('overflow-y');
    }

    setScrollTypeX(scrollTypeX) {
        this.scrollTypeX = scrollTypeX;
        if (scrollTypeX)
            this.addStyleAttribute('overflow-x', scrollTypeX);
        else
            this.removeStyleAttribute('overflow-x');
    }

    setZIndex(zIndex) {
        this.zIndex = zIndex;
        this.addStyleAttribute('z-index', zIndex);
    }

    setTabIndex(tabIndex) {
        if (tabIndex) {
            this.tabIndex = tabIndex;
            this.addAttributeElement('tabindex', this.tabIndex);
        }
    }

    setCursor(cursor) {
        this.addStyleAttribute('cursor', cursor);
    }

    maskBody() {
        let maskComponent = new HTMLComponent();
        let rect = this.getBoundingClientRect();
        this.showMaskComponent(maskComponent, rect.height, rect.width, this.getElement());
    }

    showMaskComponent(maskComponent, height, width, elementBlur) {
        if (!this.maskComponent || (this.maskComponent && this.maskComponent.getUUID() === maskComponent.getUUID())) {
            this.maskComponent = maskComponent;
            this.maskComponentJson = {
                height: height,
                width: width,
                elementBlur: elementBlur
            }
            if (this.getAttached() && elementBlur) {
                this.maskElement = DOM.createElement('div');
                DOM.makePositionable(this.maskElement, true);
                DOM.setPosition(this.maskElement, 0, 0);

                let parentLunch = this.getParent();
                if (parentLunch) {
                    parentLunch.getElement().appendChild(this.maskElement);

                    maskComponent.setParent(parentLunch);
                    maskComponent.onAttach(parentLunch.getElement());
                    maskComponent.makePositionable(true);
                }

                DOM.setBlur(elementBlur, '5px');

                this.reSyncSize(height, width);
            }
        }
    }

    reSyncSize(height, width) {
        let widthItem = this.getOffsetWidth();
        let heightItem = this.getOffsetHeight();

        if (this.maskElement)
            DOM.setSize(this.maskElement, widthItem, heightItem);

        this.maskComponent.setSize(width, height);
        this.maskComponent.setPosition((widthItem - width) / 2, (heightItem - height) / 2);
    }

    unMaskComponent() {
        if (this.maskComponent) {
            this.maskComponent.onDetach();
            if (this.getAttached() && this.maskComponentJson.elementBlur) {
                this.maskElement.remove();
                DOM.setBlur(this.maskComponentJson.elementBlur, null);
            }
            this.maskComponent = null;
        }
    }

    unMaskBody() {
        this.unMaskComponent();
    }
}

HTMLComponent.ScrollType = {
    Auto: "auto",
    Hidden: "hidden",
    Scroll: "scroll",
    Unset: 'unset',
    Overlay: 'overlay'
};