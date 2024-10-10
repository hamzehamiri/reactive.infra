import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import WizardStateTitle from "./WizardStateTitle.js";
import WizardStateSlider from "./WizardStateSlider.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import WizardStateTitleItem from "./WizardStateTitleItem.js";
import FlexLayoutData from "../../../../UIFrameWork/HTML/Container/Layout/WithoutSize/Flex/FlexLayoutData.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import Module from "../../Common/Module.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import WizardStateTitleEvent from "./Events/WizardStateTitleEvent.js";
import {WizardStateEnum} from "./WizardStateEnum.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class WizardComponent extends HTMLContainer {
    constructor() {
        super();

        this.wizardPanelSlider = new WizardStateSlider();
        this.wizardPanelSlider.setLayout(new FitLayout());
        this.wizardItemTitle = new WizardStateTitle();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));
        this.addItem(this.wizardPanelSlider, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        this.addItem(this.wizardItemTitle, RowLayoutData.factory(1, 40, 0, 0, 0, 0, true));
    }

    addStateComponent(startStateFlag, stateTitle, stateCount, recordId, module) {
        let item = new WizardStateTitleItem();
        item.setStateCount(stateCount);
        item.setStateTitle(stateTitle);
        item.setFirstState(startStateFlag);
        item.setState(WizardStateEnum.None);
        item.setModule({
            module: module,
            recordId: recordId
        });
        item.addListener(EventFrameWork.event.Components.WizardStateTitleComponent.WizardStateTitleComponentTitleClick, (wizardStateTitleEvent) => {
            if (wizardStateTitleEvent instanceof WizardStateTitleEvent) {
                let wizardStateTitleItem = wizardStateTitleEvent.getSource();
                this.deselectStateItemTitle();
                wizardStateTitleItem.selectItemTitle(true);
                let moduleJson = wizardStateTitleItem.getModule();
                if (moduleJson.module instanceof Module) {
                    if (moduleJson.module.getController()) {
                        this.wizardPanelSlider.addItem(moduleJson.module.getController().getView());
                    } else {
                        moduleJson.module.createAndAttachModule(this.wizardPanelSlider, moduleJson.recordId);
                    }
                }
            }
        }, this);

        this.wizardItemTitle.addItem(item, FlexLayoutData.factory(1));
    }

    deselectStateItemTitle() {
        this.wizardItemTitle.getItems().forEach((wizardStateTitleItem) => {
            if (wizardStateTitleItem instanceof WizardStateTitleItem) {
                if (wizardStateTitleItem.getSelectItemTitle()) {
                    wizardStateTitleItem.selectItemTitle(false);
                    this.wizardPanelSlider.removeItem(wizardStateTitleItem.getModule().module.getController().getView());
                }
            }
        });
    }
}