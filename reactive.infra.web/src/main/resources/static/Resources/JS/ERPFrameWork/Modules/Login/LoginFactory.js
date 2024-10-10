import LoginContainer from "./LoginContainer.js";
import {RootPanel} from "../../../UIFrameWork/HTML/Container/RootPanel.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {LayoutContainer} from "../../../UIFrameWork/HTML/Container/LayoutContainer.js";
import FlexLayout, {FlexDirection} from "../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayout.js";
import FlexLayoutData from "../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import LogoContainer from "./LogoContainer.js";
import ErpWindow from "../Components/ErpWindow.js";
import {BodyElementWidget} from "../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {InfraMainPageController} from "../Home/InfraMainPageController.js";
import {PopupManager} from "../../../UIFrameWork/HTML/Popup/PopupManager.js";
import BaseEvent from "../../../UIFrameWork/Shared/Event/BaseEvent.js";

export default class LoginFactory {

    static LoginFactoryWithDefaults(consumer, enableDispatchTranslate, isModal) {
        LoginFactory.LoginFactoryStart({
            isModal: isModal,
            graphicModal: {
                width: 600,
                height: 550,
                x: 100,
                y: 100
            },
            graphicFullView: {
                width: 300,
                side: 'left'
            }
        }, consumer, enableDispatchTranslate);
    }

    static LoginFactoryStart(loginFullAttribute, consumer, enableDispatchTranslate) {
        let loginContainer = new LoginContainer(enableDispatchTranslate);
        let consumerFinal;

        if (loginFullAttribute.isModal) {
            if (!consumer) {
                consumerFinal = (event) => {
                    PopupManager.instance.hideAllPopUp();
                    new InfraMainPageController().start();
                }
            } else {
                consumerFinal = consumer;
            }

            let erpWindow = new ErpWindow(true, true, true, false);
            erpWindow.setScrollTypeY(null);
            erpWindow.setBaseHeight(loginFullAttribute.graphicModal.height);
            erpWindow.setHideOnOtherClick(false);
            erpWindow.getContent().setLayout(new FitLayout());
            erpWindow.getContent().addItem(loginContainer);
            erpWindow.setSize(loginFullAttribute.graphicModal.width, loginFullAttribute.graphicModal.height);
            erpWindow.showCenterElement(BodyElementWidget.get().getElement(), loginFullAttribute.graphicModal.width);
        } else {
            if (!consumer) {
                consumerFinal = (event) => {
                    new InfraMainPageController().start();
                }
            } else {
                consumerFinal = consumer;
            }

            let loginLogo = new LogoContainer();

            let loginScreenFullView = new LayoutContainer();
            loginScreenFullView.setLayout(new FlexLayout(FlexDirection.row));
            loginScreenFullView.addItem(loginContainer, FlexLayoutData.factory(1));
            loginScreenFullView.addItem(loginLogo, FlexLayoutData.factory(2));

            RootPanel.get().clearItems();

            let root = RootPanel.get();
            root.setLayout(new FitLayout());
            root.addItem(loginScreenFullView);
            root.onAttach();
            root.setSize(window.innerWidth, window.innerHeight - 8);
        }
        loginContainer.addListener(EventFrameWork.event.Login.LoginSuccess, consumerFinal, this);
    }

    static AfterLogin(event) {
        if (event instanceof BaseEvent) {
            let loginContainer = event.getSource();
            if (loginContainer instanceof LoginContainer) {
                let erpWindow = ErpWindow.FindParentWindow(loginContainer);
                if (erpWindow instanceof ErpWindow) {
                    erpWindow.hide();
                }
            }
        }
    }
}