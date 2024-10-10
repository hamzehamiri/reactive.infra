import {DOM} from "../../Shared/Common/DOM.js";
import {EventFrameWork} from "../../Shared/Event/EventFrameWork.js";
import {UiFrameWorkComponent} from "../ThemeLanguage/Theme.js";
import BaseEvent from "../../Shared/Event/BaseEvent.js";
import BaseSharedComponent from "../../Shared/BaseShared/BaseSharedComponent.js";

export class BaseHTMLComponent extends BaseSharedComponent {
    constructor() {
        super();
    }

    findParentWithValidElement(parent) {
        if (parent) {
            if (parent instanceof BaseHTMLComponent) {
                if (!parent.getNoElement()) {
                    return parent;
                } else {
                    return this.findParentWithValidElement(parent.getParent())
                }
            }
        }
    }

    setHtml(html) {
        this.html = html;
    }

    reAttach(parentElement) {
        if (this.parentElement) {
            this.parentElement.remove();
            this.parentElement = parentElement;
            if (!this.getElement())
                this.setElement(document.createElement("div"));
            parentElement.appendChild(this.getElement());
        }
    }

    onAttach(parentElement, appenderFunction) {
        this.parentElement = parentElement;
        if (!this.isAttached) {
            if (this.getParent()) {
                if (this.getParent() instanceof BaseHTMLComponent) {
                    if (parentElement !== undefined) {
                        if (!this.getElement())
                            this.setElement(DOM.createElement("div"));
                        if (appenderFunction) {
                            appenderFunction(parentElement, this.getElement());
                        } else {
                            parentElement.appendChild(this.getElement());
                        }
                    } else if (!this.getNoElement()) {
                        if (!this.getElement())
                            this.setElement(DOM.createElement("div"));
                        if (this.getParent().getNoElement()) {
                            let parent = this.findParentWithValidElement(this.getParent());
                            if (parent.getAttached()) {
                                if (appenderFunction) {
                                    appenderFunction(parent.getElement(), this.getElement());
                                } else {
                                    parent.getElement().appendChild(this.getElement());
                                }
                            }
                        } else {
                            if (this.getParent().getAttached() || this.getParent().getAttachedBefore()) {
                                if (appenderFunction) {
                                    appenderFunction(this.getParent().getElement(), this.getElement());
                                } else {
                                    this.getParent().getElement().appendChild(this.getElement());
                                }
                            }
                        }
                        if (this.html) {
                            this.getElement().innerHTML = this.getElement().innerHTML ? this.getElement().innerHTML + this.html : this.html;
                        }
                    }
                } else if (this.getParent() instanceof Element) {
                    if (this.html) {
                        this.getParent().innerHTML = this.html;
                    } else {
                        if (appenderFunction) {
                            appenderFunction(this.getParent(), this.getElement());
                        } else {
                            this.getParent().appendChild(this.getElement());
                        }
                    }
                }
                this.isAttached = true;
            } else if (this.getAttachedBefore()) {
                this.isAttached = true;
            }
            this.bindBaseClassToElement();
            this.bindBaseEventToElement();
            this.startCaptureEvent_DOM();
            this.startCaptureEvent_Window();
            this.pushStyleAttributesToElement();
            this.pushAttributeElement();

            this.onLoad();

            this.fireEvent(EventFrameWork.event.Components.BaseComponent.OnAfterLoad);
        }
    }

    setContextMenu(contextMenu, enableContextMenuBrowser) {
        this.enableContextMenuBrowser = enableContextMenuBrowser;
        this.contextMenu = contextMenu;
        if (this.getAttached()) {
            if (this.contextMenu) {
                this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.contextmenu, this.getElement(), this.onContextMenuEvent.name, this);
            } else if (!this.enableContextMenuBrowser) {
                this.requestCaptureEvent_DOM(EventFrameWork.event.MouseEvent.contextmenu, this.getElement(), this.disableContextMenuBrowser.name, this);
            }
        }
    }

    getContextMenu() {
        return this.contextMenu;
    }

    onContextMenuEvent(event) {
        this.contextMenu.show(event.x, event.y);
        // this.contextMenu.setSize(200 , 200);
        event.preventDefault();
    }

    disableContextMenuBrowser(event) {
        event.preventDefault();
    }

    onLoad() {
        this.loaded = true;

        this.setContextMenu(this.contextMenu, this.enableContextMenuBrowser);
    }

    onDetach() {
        this.isAttached = false;
        // this.unRegisterAllEvent();
        if (!this.getNoElement()) {
            if (this.getParent()) {
                if (this.getParent() instanceof BaseHTMLComponent) {
                    if (this.getParent().getNoElement()) {
                        let parent = this.findParentWithValidElement(this.getParent());
                        if (parent && parent.getElement() === this.getElement().parentNode) {
                            parent.getElement().removeChild(this.getElement());
                        }
                    } else {
                        if (this.getElement().parentNode === this.getParent().getElement()) {
                            this.getParent().getElement().removeChild(this.getElement());
                        } else if (this.parentElement && this.getElement().parentNode === this.getElement().parentNode) {
                            this.parentElement.removeChild(this.getElement());
                        }
                    }
                }
            }
        }
        delete this.html;
        this.fireEvent(EventFrameWork.event.Components.BaseComponent.OnDetach, new BaseEvent(this));
    }

    bindBaseClassToElement() {
        let classNames = this.getClassNamesByElement(UiFrameWorkComponent.GeneratorStyle.BaseComponent);
        if (classNames)
            DOM.addClassName(this.getElement(), classNames);
    }

    bindBaseEventToElement() {
        this.requestCaptureEvent_DOM(EventFrameWork.event.FocusEvent, this.getElement(), this.onBrowserEvent.name);
        this.requestCaptureEvent_DOM(EventFrameWork.event.BlurEvent, this.getElement(), this.onBrowserEvent.name);

        this.addListener(EventFrameWork.event.FocusEvent, this.onFocus, this);
        this.addListener(EventFrameWork.event.BlurEvent, this.onBlur, this);
    }

    onFocus(event) {

    }

    onBlur(event) {

    }

    requestCaptureEvent_DOM(event, sourceElement, classMethod, observer) {
        return super.requestCaptureEvent_DOM(event, sourceElement, classMethod, observer, this.getAttached());
    }

    requestCaptureEvent_Window(eventName, classMethod, observer) {
        super.requestCaptureEvent_Window(eventName, classMethod, observer, this.getAttached());
    }


    startCaptureEvent_DOM() {
        if (this.isAttached && this.eventMap_DOM) {
            let that = this;
            this.eventMap_DOM.forEach((elements_ClassMethod_observer_Map, eventName) => {
                if (elements_ClassMethod_observer_Map) {
                    elements_ClassMethod_observer_Map.forEach((sourceElement_Observer, classMethod) => {
                        if (sourceElement_Observer) {
                            sourceElement_Observer.forEach((element_Observer) => {
                                that.startCaptureEvent_DOM_PerElement(element_Observer, eventName, classMethod);
                            });
                        }
                    });
                }
            })
        }
    }

    startCaptureEvent_Window() {
        if (this.isAttached && this.eventMap_Window) {
            let that = this;
            this.eventMap_Window.forEach(function (classMethods_Observer, eventName) {
                if (classMethods_Observer) {
                    classMethods_Observer.forEach(function (classMethod_Observer, index) {
                        that.startCaptureEvent_WindowPer(classMethod_Observer, eventName);
                    });
                }
            });
        }
    }

    unRegisterAllEvent() {
        if (this.eventListenerMap_ByType) {
            this.eventListenerMap_ByType.forEach((eventNameElementFunction_Map, type) => {
                if (eventNameElementFunction_Map) {
                    eventNameElementFunction_Map.forEach((elementFunction_Map, eventName) => {
                        if (elementFunction_Map) {
                            elementFunction_Map.forEach((functions, element) => {
                                functions.forEach((func) => {
                                    if (type === BaseHTMLComponent.EventType.DOM) {
                                        DOM.removeEventListener(element, eventName, func);
                                    } else if (BaseHTMLComponent.EventType.Window) {
                                        window.removeEventListener(eventName, func);
                                    }
                                });
                            });
                        }
                    });
                }
            });
            this.eventListenerMap_ByType.clear();
        }
    }

    getClassMapByElementName() {
        if (!this.classMapByElementName)
            this.classMapByElementName = new Map();
        return this.classMapByElementName;
    }

    getClassNamesByElement(elementName) {
        let classNames = '';
        if (this.getClassMapByElementName()) {
            let mapClassByElementName = this.getClassMapByElementName().get(elementName);
            if (mapClassByElementName) {
                for (let indexClassName = 0; indexClassName < mapClassByElementName.length; indexClassName++) {
                    classNames += classNames ? " " + mapClassByElementName[indexClassName][0] : mapClassByElementName[indexClassName][0];
                }
            }
        }
        return classNames;
    }

    onBrowserEvent(event) {
        let eventName = event.type;
        this.fireEvent(eventName, event);
    }

    setAttachedBefore(attachedBefore) {
        this.attachedBefore = attachedBefore;
    }

    setNoElement(noElement) {
        this.noElement = noElement;
    }

    getNoElement() {
        return this.noElement;
    }

    getAttachedBefore() {
        return this.attachedBefore;
    }

    getEventBindElement() {
        return this.element;
    }

    getStyleAttribute() {
        let styles = this.getData().get('style');
        if (!styles) {
            styles = new Map();
            this.getData().set('style', styles);
        }
        return styles;
    }

    addStyleAttribute(attrib, value) {
        this.getStyleAttribute().set(attrib, value);
        if (this.isAttached && this.getElement()) {
            this.getElement().style[attrib] = value;
        }
    }

    removeStyleAttribute(attrib) {
        this.getStyleAttribute().delete(attrib);
        if (this.isAttached && this.getElement()) {
            this.getElement().style[attrib] = null;
        }
    }

    addAttributeElement(attrib, value) {
        this.getAttributeElement().set(attrib, value);
        if (this.isAttached) {
            this.getElement().setAttribute(attrib, value);
        }
    }

    pushStyleAttributesToElement() {
        let that = this;
        if (this.getElement()) {
            this.getStyleAttribute().forEach(function (value, attribute) {
                that.getElement().style[attribute] = value;
            });
        }
    }

    pushAttributeElement() {
        let that = this;
        if (this.getElement()) {
            this.getAttributeElement().forEach(function (value, attribute) {
                that.getElement().setAttribute(attribute, value);
            });
        }
    }

    setTypeComponent(typeComponent) {
        this.getData().set(BaseHTMLComponent.TypeComponent, typeComponent);
    }

    getTypeComponent() {
        return this.getData().get(BaseHTMLComponent.TypeComponent);
    }

    getZIndex() {
        let zIndex = DOM.getZIndex(this.getElement());
        return parseInt(zIndex);
    }

    getTabIndex() {
        return this.tabIndex;
    }

    focus() {
        this.getEventBindElement().focus();
    }

    offsetScrollHeight() {
        return this.getElement().offsetHeight - this.getElement().clientHeight;
    }

    offsetScrollWidth() {
        return this.getElement().offsetWidth - this.getElement().clientWidth;
    }
}

BaseHTMLComponent.EventType = {
    DOM: 'DOM',
    Window: 'Window'
};
BaseHTMLComponent.TypeComponent = 'TypeComponent';
