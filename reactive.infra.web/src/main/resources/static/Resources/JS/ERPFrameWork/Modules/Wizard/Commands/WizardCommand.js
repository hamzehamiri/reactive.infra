import CommandFactory from "../../Common/Factory/CommandFactory.js";
import {CoreButtonConstantButton} from "../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import {ClientLogger, LogLevel} from "../../../../UIFrameWork/Shared/Logger/ClientLogger.js";
import WebWizardLoadService from "../../../Communicate/XMLHttpRequest/Services/Wizard/WebWizardLoadService.js";
import CoreWizardRequestDTO from "../../../Communicate/Models/Request/Wizard/CoreWizardRequestDTO.js";
import ErpWindow from "../../Components/ErpWindow.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {BodyElementWidget} from "../../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";
import WizardController from "../Controller/WizardController.js";
import ConfirmPanel, {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";
import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class WizardCommand {
    static Init() {
        CommandFactory.register(CoreButtonConstantButton().WizardTabButton.description, WizardCommand.WizardTabButton);
    }

    static WizardTabButton(tabController) {
        ClientLogger.Log(LogLevel.Debug, "WizardTabButton");
        let coreWizardRequestDTO = new CoreWizardRequestDTO();
        coreWizardRequestDTO.setCoreAllElementDTO(tabController.getModel().getCoreAllElementDTO());
        coreWizardRequestDTO.setRecordId(tabController.getModel().getId());

        new WebWizardLoadService(tabController.getView()).Load(coreWizardRequestDTO, (coreWizardDTOMap) => {
            ClientLogger.Log(LogLevel.Debug, "PostBack");
            if (coreWizardDTOMap instanceof Map) {
                coreWizardDTOMap.forEach((coreWizardDTO, id) => {
                    let containerWizard = new HTMLContainer();
                    containerWizard.setLayout(new FitLayout());
                    let confirmContainer = new ConfirmPanel();
                    confirmContainer.addListener(ConfirmPanelEvent.CancelEvent, () => {
                        erpWindow.hide();
                    });

                    let erpWindow = new ErpWindow(true, true, true, false);
                    erpWindow.setScrollTypeY(null);
                    erpWindow.setBaseHeight(400);
                    erpWindow.setHideOnOtherClick(false);
                    erpWindow.getContent().setLayout(new FitLayout());
                    erpWindow.showCenterElement(BodyElementWidget.get(), 1200);
                    erpWindow.getContent().setLayout(new RowLayout(RowLayout_Mode.Vertical));
                    erpWindow.getContent().addItem(containerWizard, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
                    erpWindow.getContent().addItem(confirmContainer, RowLayoutData.factory(1, 40, 0, 0, 0, 0, true));
                    erpWindow.addDragElementMatcherFunction((event) => {
                        return !containerWizard.containElement(event);
                    });

                    let wizardController = new WizardController(containerWizard);
                    wizardController.bindModelToUI(coreWizardDTO);
                    wizardController.start();
                });
            }
        });
    }
}