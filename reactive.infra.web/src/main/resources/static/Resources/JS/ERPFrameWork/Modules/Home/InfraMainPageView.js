import {LayoutContainer} from "../../../UIFrameWork/HTML/Container/LayoutContainer.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import ViewPort from "../ViewPort/ViewPort.js";
import {GlobalFloatButtonWidget} from "../../../UIFrameWork/HTML/Widget/GlobalFloatButtonWidget.js";
import WebEnvironment from "../../Communicate/Common/WebEnvironment.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import ChangePositionEvent from "../../../UIFrameWork/HTML/Component/Events/ChangePositionEvent.js";

export class InfraMainPageView extends LayoutContainer {
    constructor() {
        super();

        let viewPort = new ViewPort();

        this.setLayout(new FitLayout());
        this.addItem(viewPort);

        let position = WebEnvironment.GetPositionGlobalFloatButton();

        let globalFloatButton = new GlobalFloatButtonWidget();
        globalFloatButton.addListener(EventFrameWork.event.Components.BaseComponent.ChangePosition, (event) => {
            if (event instanceof ChangePositionEvent) {
                WebEnvironment.SetPositionGlobalFloatButton(event.getPosition());
            }
        }, this);
        globalFloatButton.show(position.x, position.y/*, WebEnvironment.GetCoreTranslateLanguageDTO().getIsRTL()*/);

        this.setDataElement(InfraMainPageView.ViewPort, viewPort);
        this.setDataElement(InfraMainPageView.GlobalFloatButton, globalFloatButton);

        WebEnvironment.SetERPMainPageView(this);
    }

    getViewPort() {
        return this.getDataElement().get(InfraMainPageView.ViewPort);
    }

    getGlobalFloatButton() {
        return this.getDataElement().get(InfraMainPageView.GlobalFloatButton);
    }
}

InfraMainPageView.ViewPort = 'ViewPort';
InfraMainPageView.GlobalFloatButton = 'GlobalFloatButton';
