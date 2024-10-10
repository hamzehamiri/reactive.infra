import BaseView from "../../Common/BaseView.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import WizardComponent from "../Components/WizardComponent.js";

export default class WizardView extends BaseView {
    constructor() {
        super();

        this.wizardComponent = new WizardComponent();

        this.setLayout(new FitLayout());
        this.addItem(this.wizardComponent);
    }

    getWizardComponent() {
        return this.wizardComponent;
    }
}