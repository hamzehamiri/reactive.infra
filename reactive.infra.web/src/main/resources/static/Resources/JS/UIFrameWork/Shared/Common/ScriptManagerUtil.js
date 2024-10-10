import {HTMLComponent} from "../../HTML/Component/HTMLComponent.js";
import ResourceStateModel from "./ResourceStateModel.js";

export default class ScriptManagerUtil {

    static Init() {
        ScriptManagerUtil.urlJsMap = new Map();
        ScriptManagerUtil.urlCssMap = new Map();
    }

    static startCaptureResource(component, elementCallBack, finalCallBack) {
        this.startCaptureResourceAllType(component, elementCallBack, finalCallBack, ScriptManagerUtil.urlJsMap);
        this.startCaptureResourceAllType(component, null, null, ScriptManagerUtil.urlCssMap);
    }

    static startCaptureResourceAllType(component, elementCallBack, finalCallBack, map) {
        if (component instanceof HTMLComponent) {
            let mapOfResourceStateModel = map.get(component.getUUID());
            if (mapOfResourceStateModel) {
                mapOfResourceStateModel.forEach((resourceStateModel) => {
                    if (resourceStateModel instanceof ResourceStateModel) {
                        if (resourceStateModel.isLoaded()) {
                            if (elementCallBack)
                                elementCallBack(resourceStateModel);
                            if (finalCallBack && this.processJsFinalCallBack(component)) {
                                finalCallBack();
                            }
                        } else {
                            if (resourceStateModel.getType() === ScriptManagerUtil.Type.JavaScript) {
                                ScriptManagerUtil.addJs(resourceStateModel.getUrl(), (event) => {
                                    let pathSplit = event.srcElement.src.split('/Resources/');
                                    if (pathSplit.length > 1) {
                                        let pathMap = './Resources/' + pathSplit[1];
                                        let resourceStateModel = mapOfResourceStateModel.get(pathMap);
                                        if (resourceStateModel) {
                                            resourceStateModel.setLoaded(true);
                                            resourceStateModel.setTimeLoaded(Date.now());

                                            if (elementCallBack)
                                                elementCallBack(resourceStateModel);
                                            if (finalCallBack && this.processJsFinalCallBack(component, map)) {
                                                finalCallBack();
                                            }
                                        }
                                    }
                                });
                            } else {
                                ScriptManagerUtil.addCss(resourceStateModel.getUrl());
                            }
                        }
                    }
                });
            }
        }
    }

    static processJsFinalCallBack(component, map) {
        let mapOfResourceStateModel = map.get(component.getUUID());
        if (mapOfResourceStateModel) {
            let fullLoaded = true;
            mapOfResourceStateModel.forEach((resourceStateModel) => {
                if (resourceStateModel instanceof ResourceStateModel) {
                    if (!resourceStateModel.isLoaded()) {
                        fullLoaded = false;
                    }
                }
            });
            return fullLoaded;
        }
        return true;
    }

    static addMapByComponent(component, resourceStateModel) {
        if (component instanceof HTMLComponent) {
            if (resourceStateModel.getType() === ScriptManagerUtil.Type.JavaScript) {
                let mapOfResourceStateModel = ScriptManagerUtil.urlJsMap.get(component.getUUID());
                if (mapOfResourceStateModel == null) {
                    mapOfResourceStateModel = new Map();
                    ScriptManagerUtil.urlJsMap.set(component.getUUID(), mapOfResourceStateModel);
                }
                mapOfResourceStateModel.set(resourceStateModel.getUrl(), resourceStateModel);
            } else {
                let mapOfResourceStateModel = ScriptManagerUtil.urlCssMap.get(component.getUUID());
                if (mapOfResourceStateModel == null) {
                    mapOfResourceStateModel = new Map();
                    ScriptManagerUtil.urlCssMap.set(component.getUUID(), mapOfResourceStateModel);
                }
                mapOfResourceStateModel.set(resourceStateModel.getUrl(), resourceStateModel);
            }
        }
    }

    static addJs(url, callback) {
        let e = document.createElement("script");
        e.src = url;
        e.type = "text/javascript";
        e.addEventListener('load', callback);
        document.getElementsByTagName("head")[0].appendChild(e);
    }

    static addCss(url, callback) {
        let e = document.createElement("link");
        e.href = url;
        e.rel = 'stylesheet';
        e.type = 'text/css';
        e.media = 'all';
        e.addEventListener('load', callback);
        document.getElementsByTagName("head")[0].appendChild(e);
    }
}

ScriptManagerUtil.Type = {
    JavaScript: 'JavaScript',
    Css: 'Css'
}