import BaseController from "../../Common/BaseController.js";
import FilterView from "./View/FilterView.js";
import WebFilterLoadService from "../../../Communicate/XMLHttpRequest/Services/Filter/WebFilterLoadService.js";
import CharacterWordGenerator from "../../Common/Character/CharacterWordGenerator.js";
import ButtonUtil from "../../Common/ButtonUtil.js";
import {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";

export default class FilterController extends BaseController {
    constructor(activeConfirmPanel) {
        super();

        let view = new FilterView();
        view.setActiveConfirmPanel(activeConfirmPanel);
        view.getConfirmPanel().addListener(ConfirmPanelEvent.AcceptEvent, () => {
            let functionProvider = this.functionFilterProvider[FilterControllerFunction.AfterFilterApplyFunction];
            if (functionProvider) {
                let coreFilterRequestElementWithOperandDTO = view.bindUiToModel();
                functionProvider(coreFilterRequestElementWithOperandDTO);
            }
        });
        view.getConfirmPanel().addListener(ConfirmPanelEvent.CancelEvent, () => {
            let functionProvider = this.functionFilterProvider[FilterControllerFunction.AfterCloseButton];
            if (functionProvider) {
                functionProvider();
            }
        });

        this.setView(view);
    }

    setFunctionFilterProvider(functionFilterProvider) {
        this.functionFilterProvider = functionFilterProvider;
    }

    setFilterMetaData(coreFilterAssignElementMasterDTOArrays) {
        this.coreFilterAssignElementMasterDTOArrays = coreFilterAssignElementMasterDTOArrays;
    }

    changeLang(coreTranslateLanguageDTO) {
        let coreFilterRequestDTO = this.getModel();
        coreFilterRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);

        new WebFilterLoadService(this.getView()).Load(coreFilterRequestDTO, (coreFilterAssignElementMasterDTOArrays) => {
            if (coreFilterAssignElementMasterDTOArrays instanceof Array) {
                this.setFilterMetaData(coreFilterAssignElementMasterDTOArrays);
                coreFilterAssignElementMasterDTOArrays.forEach((coreFilterAssignElementMasterDTO) => {
                    this.getView().rebindModelToUI(coreFilterAssignElementMasterDTO);
                });
            }
        });
    }

    bindModelToUIPerField(coreFilterRequestDTO, coreFilterRequestElementWithOperandDTO, coreWindowTabDTO, coreWindowTabFieldDTO, filterOptionMap) {
        CharacterWordGenerator.WordGenerator("FilterField", CharacterWordGenerator.StandardCharMap());
        let callBack = (coreFilterAssignElementMasterDTOArrays2D) => {
            this.getView().bindModelToUI(coreFilterAssignElementMasterDTOArrays2D, coreFilterRequestElementWithOperandDTO, coreWindowTabDTO, (buttonEvent) => {
                ButtonUtil.ButtonHandleEvent(buttonEvent, this);
            }, coreWindowTabFieldDTO, filterOptionMap);
        };
        new WebFilterLoadService(this.getView()).Load(coreFilterRequestDTO, callBack);
    }

    bindModelToUI(coreFilterRequestDTO, coreFilterRequestElementWithOperandDTO, coreWindowTabDTO) {
        super.bindModelToUI(coreFilterRequestDTO);
        CharacterWordGenerator.WordGenerator("Roshan", CharacterWordGenerator.StandardCharMap());
        let callBack = (coreFilterAssignElementMasterDTOArrays2D) => {
            this.getView().bindModelToUI(coreFilterAssignElementMasterDTOArrays2D, coreFilterRequestElementWithOperandDTO, coreWindowTabDTO, (buttonEvent) => {
                ButtonUtil.ButtonHandleEvent(buttonEvent, this);
            });
        };
        new WebFilterLoadService(this.getView()).Load(coreFilterRequestDTO, callBack);
    }
}

export const FilterControllerFunction = {
    AfterFilterApplyFunction: 'AfterFilterApplyFunction',
    AfterCloseButton: 'AfterCloseButton'
}

export class FilterControllerFunctionFactory {
    static Factory(AfterFilterApplyFunction, AfterCloseButton) {
        let json = {};
        if (AfterFilterApplyFunction) {
            json[FilterControllerFunction.AfterFilterApplyFunction] = AfterFilterApplyFunction;
        }
        if (AfterCloseButton) {
            json[FilterControllerFunction.AfterCloseButton] = AfterCloseButton;
        }
        return json;
    }
}