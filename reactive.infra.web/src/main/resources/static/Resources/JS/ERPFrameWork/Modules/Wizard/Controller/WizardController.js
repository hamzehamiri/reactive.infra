import BaseController from "../../Common/BaseController.js";
import WizardView from "../View/WizardView.js";
import TabItem from "../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import CoreWizardDTO from "../../../Communicate/Models/Response/Wizard/CoreWizardDTO.js";
import CoreWizardStateDTO from "../../../Communicate/Models/Response/Wizard/CoreWizardStateDTO.js";
import WizardComponent from "../Components/WizardComponent.js";
import ModuleFactory from "../../Common/Factory/ModuleFactory.js";

export default class WizardController extends BaseController {
    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;

        this.setView(new WizardView());
        this.getView().setParentContainer(parentContainer);
        if (parentContainer instanceof TabItem)
            parentContainer.setTitle("Wizard");
    }

    start() {
        let coreWizardDTO = this.getModel();
        if (coreWizardDTO instanceof CoreWizardDTO) {
            let wizardComponent = this.getView().getWizardComponent();
            let coreWizardStateDTOMap = coreWizardDTO.getCoreWizardStateDTOMap();
            if (coreWizardStateDTOMap) {
                let coreWizardStateDTOArraySorted = [...coreWizardStateDTOMap.entries()].sort((a, b) => {
                    return a[1].getIndex() - b[1].getIndex();
                });
                coreWizardStateDTOArraySorted.forEach(coreWizardStateDTOJson => {
                    let coreWizardStateDTO = coreWizardStateDTOJson[1];
                    let isFirst = coreWizardStateDTOArraySorted[0][1].getIndex() === coreWizardStateDTO.getIndex();
                    if (coreWizardStateDTO instanceof CoreWizardStateDTO) {
                        let ModuleInvoke = ModuleFactory.factoryByCoreAllElement(coreWizardStateDTO.getCoreAllElementDTO());
                        if (wizardComponent instanceof WizardComponent) {
                            wizardComponent.addStateComponent(
                                isFirst,
                                coreWizardStateDTO.getName(),
                                coreWizardStateDTO.getIndex(),
                                coreWizardStateDTO.getRecordId(),
                                new ModuleInvoke()
                            );
                        }
                    }
                });
            }
        }
    }
}