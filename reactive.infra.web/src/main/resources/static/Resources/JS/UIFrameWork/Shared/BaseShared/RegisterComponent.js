import {UUID} from "../Common/UUID.js";
import {HTMLComponent} from "../../HTML/Component/HTMLComponent.js";
import {HeaderElementWidget} from "../../HTML/Widget/HeaderElementWidget.js";
import {StyleElementWidget} from "../../HTML/Widget/StyleElementWidget.js";
import {UiFrameWorkComponent} from "../../HTML/ThemeLanguage/Theme.js";
import LanguageModel from "../../HTML/ThemeLanguage/LanguageModel.js";
import {BodyElementWidget} from "../../HTML/Widget/BodyElementWidget.js";
import {RootPanel} from "../../HTML/Container/RootPanel.js";
import {PopupManager} from "../../HTML/Popup/PopupManager.js";
import {Popup} from "../../HTML/Popup/Popup.js";
import BaseCanvas2DPath from "../../Canvas/2d/Components/BaseCanvas2DPath.js";
import SVGComponent from "../../SVG/Components/SVGComponent.js";

export class RegisterComponent {

    static Init() {
        RegisterComponent.mapComponent = new Map();
        RegisterComponent.mapBase2DComponent = new Map();
    }

    static Register(component) {
        if (component instanceof HTMLComponent) {
            if (!component.getUUID()) {
                let uuid = UUID.create();
                component.setUUID(uuid);
            }
            RegisterComponent.mapComponent.set(component.getUUID(), component);
        } else if (component instanceof SVGComponent) {
            if (!component.getUUID()) {
                let uuid = UUID.create();
                component.setUUID(uuid);
            }
            RegisterComponent.mapComponent.set(component.getUUID(), component);
        } else if (component instanceof BaseCanvas2DPath) {
            if (!component.getUUID()) {
                let uuid = UUID.create();
                component.setUUID(uuid);
            }
            RegisterComponent.mapBase2DComponent.set(component.getUUID(), component);
        }
    }

    static FindRootParent(component) {
        let beforeComponent = component;
        let rootFind = true;
        let bodyUUID = BodyElementWidget.get().getUUID();
        while (rootFind) {
            if (beforeComponent.getParent() == null || (beforeComponent.getParent() != null && beforeComponent.getParent().getUUID() === bodyUUID))
                rootFind = false;
            else
                beforeComponent = beforeComponent.getParent();
        }
        return beforeComponent;
    }

    static computeRootComponents() {
        let rootComponent = [];
        RegisterComponent.mapComponent.forEach(component => {
            if (component.getParent() == null) rootComponent.push(component);
        });
        return rootComponent;
    }

    static changeLangBindAllComponent(languageModel, fromRoot) {
        if (languageModel instanceof LanguageModel) {
            RegisterComponent.setCurrentLanguage(languageModel);
            if (fromRoot) {
                let rootItems = RootPanel.get().getItems();
                if (rootItems) {
                    rootItems.forEach((item, uuid) => {
                        if (item instanceof HTMLComponent) {
                            item.bindLang(languageModel, true);
                        }
                    });
                }

                PopupManager.map.forEach((popup, uuid) => {
                    if (popup instanceof Popup) {
                        popup.bindLang(languageModel, true);
                    }
                });
            } else {
                RegisterComponent.mapComponent.forEach((component) => {
                    component.bindLang(languageModel, true);
                });
            }
        }
    }

    static UnRegister(component) {
        if (component instanceof HTMLComponent) {
            RegisterComponent.mapComponent.delete(component.getUUID())
        }
    }

    static Get(uuid) {
        return RegisterComponent.mapComponent.get(uuid);
    }

    static getMapComponents() {
        return RegisterComponent.mapComponent;
    }

    static changeTheme(theme, forceRestyle) {
        if (theme != null) {
            HeaderElementWidget.get().clearStyle();
            this.setCurrentTheme(theme);
            RegisterComponent.mapComponent.forEach(component => {
                component.restyle();
            });
        }
    }

    static setCurrentTheme(theme) {
        RegisterComponent.theme = theme;
        if (theme) {
            let generatorStyle = theme[UiFrameWorkComponent.GeneratorStyle.GeneratorStyle];
            if (generatorStyle) {
                let urlStyle = generatorStyle[UiFrameWorkComponent.GeneratorStyle.URL];
                let themeStyleJson = generatorStyle[UiFrameWorkComponent.GeneratorStyle.ThemeStyle];
                if (themeStyleJson) {
                    HeaderElementWidget.get().clearStyle();
                    let styleElement = new StyleElementWidget(false);
                    styleElement.setThemeJson(themeStyleJson);
                    HeaderElementWidget.get().setStyle(styleElement);
                    HeaderElementWidget.get().onAttach();
                }
            }
        }
    }

    static getCurrentTheme() {
        return RegisterComponent.theme;
    }

    static getCurrentThemeByComponentName(name) {
        if (this.getCurrentTheme()) {
            return this.getCurrentTheme().GeneratorStyle.ThemeStyle[name];
        } else {
            return null;
        }
    }

    static setCurrentLanguage(languageModel) {
        if (languageModel instanceof LanguageModel) {
            RegisterComponent.languageModel = languageModel;
        } else {
            console.log("Error");
        }
    }

    static getCurrentLanguage() {
        return RegisterComponent.languageModel;
    }

    static latestZIndex(componentType) {
        let zIndex = 0;
        RegisterComponent.getMapComponents().forEach(function (component, uuid) {
            let type = component.getTypeComponent();
            if (type && type === componentType) {
                if (component.getZIndex() > zIndex) {
                    zIndex = component.getZIndex();
                }
            }
        });
        return zIndex + 1;
    }
}