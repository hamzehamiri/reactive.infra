import {RootPanel} from "../../../UIFrameWork/HTML/Container/RootPanel.js";
import {FitLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {InfraMainPageView} from "./InfraMainPageView.js";
import BaseController from "../Common/BaseController.js";
import CoreAllElementRegisterKeyEnum from "../../Communicate/Models/Response/Element/CoreAllElementRegisterKeyEnum.js";

export class InfraMainPageController extends BaseController {
    constructor() {
        super();

        this.view = new InfraMainPageView();
    }

    start() {
        RootPanel.get().clearItems();

        let root = RootPanel.get();
        root.setLayout(new FitLayout());
        root.addItem(this.view);
        root.onAttach();
        root.setSize(window.innerWidth, window.innerHeight - 8);

        this.translateService(CoreAllElementRegisterKeyEnum.RegisterKey().InfraMainPage.description, this.view);
    }
}