import {BaseObservable} from "../Event/BaseObservable.js";
import ScriptManagerUtil from "../Common/ScriptManagerUtil.js";
import {ClientLogger, LogLevel} from "../Logger/ClientLogger.js";
import {DOM} from "../Common/DOM.js";
import {BaseHTMLComponent} from "../../HTML/Component/BaseHTMLComponent.js";
import {RegisterComponent} from "./RegisterComponent.js";
import {EventFrameWork} from "../Event/EventFrameWork.js";
import BaseEvent from "../Event/BaseEvent.js";

export default class BaseSharedComponent extends BaseObservable {
    constructor() {
        super();
        this.data = new Map();
        this.dataElement = new Map();
        this.enableContextMenuBrowser = false;
        this.initialVariables();
        this.setLanguage(RegisterComponent.getCurrentLanguage());
    }

    initialVariables() {
        this.setData(BaseSharedComponent.DataModel, new Map());
    }

    setDataModel(uuid, dataModel) {
        this.getDataModel().set(uuid, dataModel);
    }

    getDataModel() {
        return this.getData().get(BaseSharedComponent.DataModel);
    }

    setData(key, value) {
        this.getData().set(key, value);
    }

    getData() {
        return this.data;
    }

    bindLang(languageModel, fireEvent) {
        this.setLanguage(languageModel);
        if (fireEvent)
            this.fireEvent(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, new BaseEvent(this));
    }

    setLanguage(languageModel) {
        this.languageModel = languageModel;
    }

    getLanguage() {
        return this.languageModel;
    }

    setUUID(uuid) {
        this.uuid = uuid;
    }

    getUUID() {
        return this.uuid;
    }

    setElement(element) {
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }

    setAttached(isAttached) {
        this.isAttached = isAttached;
    }

    getAttached() {
        return this.isAttached;
    }

    getDataElement() {
        return this.dataElement;
    }

    setDataElement(key, element) {
        this.getDataElement().set(key, element);
    }

    startCaptureResource(elementCallBack, finalCallBack) {
        ScriptManagerUtil.startCaptureResource(this, elementCallBack, finalCallBack);
    }

    addMapByComponent(resourceStateModel) {
        ScriptManagerUtil.addMapByComponent(this, resourceStateModel);
    }

    getAttributeElement() {
        let attribute = this.getData().get('attribute');
        if (!attribute) {
            attribute = new Map();
            this.getData().set('attribute', attribute);
        }
        return attribute;
    }

    removeAttribute(attribute) {
        this.getAttributeElement().delete(attribute);
        if (this.isAttached) {
            this.getElement().removeAttribute(attribute);
        }
    }


    requestCaptureEvent_Window(eventName, classMethod, observer, isReadyToCapture) {
        if (!this.eventMap_Window)
            this.eventMap_Window = new Map();
        let classMethod_Observer = {ClassMethod: classMethod, Observer: observer, Bind: false};
        let classMethods_Observer = this.eventMap_Window.get(eventName);
        if (classMethods_Observer) {
            let find = false;
            for (let index = 0; index < classMethods_Observer.length; index++) {
                let classMethod_Observer_old = classMethods_Observer[index];
                if (classMethod_Observer_old.ClassMethod === classMethod_Observer.ClassMethod && classMethod_Observer_old.Observer === classMethod_Observer.Observer) {
                    find = true;
                    break;
                }
            }
            if (!find) {
                classMethods_Observer.push(classMethod_Observer);
                if (isReadyToCapture) {
                    this.startCaptureEvent_WindowPer(classMethod_Observer, eventName)
                }
            }
        } else {
            classMethods_Observer = [classMethod_Observer];
            this.eventMap_Window.set(eventName, classMethods_Observer);
            if (isReadyToCapture) {
                this.startCaptureEvent_WindowPer(classMethod_Observer, eventName)
            }
        }
    }

    requestCaptureEvent_DOM(event, sourceElement, classMethod, observer, isReadyToCapture) {
        if (!this.eventMap_DOM)
            this.eventMap_DOM = new Map();
        let elements_ClassMethod_Map = this.eventMap_DOM.get(event);
        if (elements_ClassMethod_Map) {
            let sourceElementsAndObserver = elements_ClassMethod_Map.get(classMethod);
            if (sourceElementsAndObserver) {
                let elementFind = sourceElementsAndObserver.find(function (element_Observer) {
                    return element_Observer.SourceElement === sourceElement;
                });
                let observerFind = sourceElementsAndObserver.find(function (element_Observer) {
                    return element_Observer.Observer === observer;
                });
                if (!elementFind || !observerFind) {
                    let element_observer = {SourceElement: sourceElement, Observer: observer, Bind: false};
                    sourceElementsAndObserver.push(element_observer);
                    if (isReadyToCapture) {
                        this.startCaptureEvent_DOM_PerElement(element_observer, event, classMethod);
                    }
                }
            } else {
                let element_observer = {SourceElement: sourceElement, Observer: observer, Bind: false};
                elements_ClassMethod_Map.set(classMethod, [element_observer]);
                if (isReadyToCapture) {
                    this.startCaptureEvent_DOM_PerElement(element_observer, event, classMethod);
                }
            }
        } else {
            let element_observer = {SourceElement: sourceElement, Observer: observer, Bind: false};
            elements_ClassMethod_Map = new Map();
            elements_ClassMethod_Map.set(classMethod, [element_observer]);
            this.eventMap_DOM.set(event, elements_ClassMethod_Map);
            if (isReadyToCapture) {
                this.startCaptureEvent_DOM_PerElement(element_observer, event, classMethod);
            }
        }
    }

    startCaptureEvent_DOM_PerElement(element_Observer, eventName, classMethod) {
        let observer = element_Observer.Observer === undefined ? this : element_Observer.Observer;
        if (element_Observer.SourceElement && !element_Observer.Bind) {
            DOM.addEventListener(element_Observer.SourceElement, eventName, this.generateFunctionEventListener(eventName, element_Observer.SourceElement, classMethod, BaseHTMLComponent.EventType.DOM, observer));
            element_Observer.Bind = true;
        }
    }

    startCaptureEvent_WindowPer(classMethod_Observer, eventName) {
        window.addEventListener(eventName, this.generateFunctionEventListener(eventName, window, classMethod_Observer.ClassMethod, BaseHTMLComponent.EventType.Window, classMethod_Observer.Observer));
        classMethod_Observer.Bind = true;
    }

    generateFunctionEventListener(event, sourceElement, classMethod, type, observer) {
        if (!observer)
            ClientLogger.Log(LogLevel.Debug, type);
        let func = function () {
            if (arguments && arguments[0]) {
                if (typeof (classMethod) === 'function') {
                    classMethod(arguments[0]);
                } else {
                    observer[classMethod](arguments[0]);
                }
            }
        };
        if (!this.eventListenerMap_ByType)
            this.eventListenerMap_ByType = new Map();
        let eventNameElementFunction_Map = this.eventListenerMap_ByType.get(type);
        if (eventNameElementFunction_Map) {
            let elementFunction_Map = eventNameElementFunction_Map.get(type);
            if (elementFunction_Map) {
                let functions = elementFunction_Map.get(sourceElement);
                if (functions) {
                    functions.push(func);
                } else {
                    elementFunction_Map.set(sourceElement, [func])
                }
            } else {
                let elementFunction_Map = new Map();
                elementFunction_Map.set(sourceElement, [func]);
                eventNameElementFunction_Map.set(event, elementFunction_Map);
            }
        } else {
            let elementFunction_Map = new Map();
            elementFunction_Map.set(sourceElement, [func]);
            eventNameElementFunction_Map = new Map();
            eventNameElementFunction_Map.set(event, elementFunction_Map);
            this.eventListenerMap_ByType.set(type, eventNameElementFunction_Map);
        }
        return func;
    }

    unRegisterWindowEvent(eventName_filter) {
        this.unRegisterEvent(eventName_filter, BaseHTMLComponent.EventType.Window);
    }

    unRegisterEvent(eventName_filter, type_filter) {
        if (this.eventListenerMap_ByType) {
            let that = this;
            let eventNameElementFunction_Map = this.eventListenerMap_ByType.get(type_filter);
            if (eventNameElementFunction_Map) {
                let elementFunction_Map = eventNameElementFunction_Map.get(eventName_filter);
                if (elementFunction_Map) {
                    elementFunction_Map.forEach((functions, element) => {
                        for (let i = 0; i < functions.length; i++) {
                            let func = functions[i];
                            if (type_filter === BaseHTMLComponent.EventType.DOM) {
                                DOM.removeEventListener(element, eventName_filter, func);
                            } else if (BaseHTMLComponent.EventType.Window) {
                                window.removeEventListener(eventName_filter, func);
                                that.eventMap_Window.delete(eventName_filter);
                            }
                        }
                    });
                    eventNameElementFunction_Map.delete(eventName_filter);
                }
            }
        }
    }
}

BaseSharedComponent.DataModel = "DataModel";