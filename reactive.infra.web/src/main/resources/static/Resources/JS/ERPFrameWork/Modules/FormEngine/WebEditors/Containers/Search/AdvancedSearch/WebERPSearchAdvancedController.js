import BaseController from "../../../../../Common/BaseController.js";
import {WebERPSearchAdvancedView} from "./WebERPSearchAdvancedView.js";
import CharacterWordGenerator from "../../../../../Common/Character/CharacterWordGenerator.js";
import FilterController, {FilterControllerFunction, FilterControllerFunctionFactory} from "../../../../Filter/Field/FilterController.js";
import CoreFilterRequestDTO from "../../../../../../Communicate/Models/Request/Filter/CoreFilterRequestDTO.js";
import WebElementServiceFindElement from "../../../../../../Communicate/XMLHttpRequest/Services/Element/WebElementServiceFindElement.js";
import CoreAllElementRegisterKeyEnum from "../../../../../../Communicate/Models/Response/Element/CoreAllElementRegisterKeyEnum.js";
import CoreAllElementRequestDTO from "../../../../../../Communicate/Models/Request/Element/CoreAllElementRequestDTO.js";
import CoreAllElementDTO from "../../../../../../Communicate/Models/Response/Element/CoreAllElementDTO.js";
import CoreFilterRequestElementRecordDTO from "../../../../../../Communicate/Models/Request/Filter/CoreFilterRequestElementRecordDTO.js";
import CoreFilterRequestElementWithOperandDTO from "../../../../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementWithOperandDTO.js";
import WebFormEngineTabSearchData from "../../../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineTabSearchData.js";
import CoreWindowTabResponseSearchDTO from "../../../../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import CoreWindowTabRequestSearchDTO from "../../../../../../Communicate/Models/Request/Window/Tab/CoreWindowTabRequestSearchDTO.js";
import WebEnvironment from "../../../../../../Communicate/Common/WebEnvironment.js";
import FilterViewPanel from "../../../../Filter/Field/View/FilterViewPanel.js";
import {FilterViewKeys} from "../../../../Filter/Field/View/FilterView.js";
import FormEngineEventFrameWork from "../../../../Events/FormEngineEventFrameWork.js";
import TabUtil from "../../../../../Common/TabUtil.js";
import {EventFrameWork} from "../../../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";

export class WebERPSearchAdvancedController extends BaseController {
    constructor() {
        super();
        let view = new WebERPSearchAdvancedView();
        this.setView(view);

        let functionSearch = () => {
            let functionProvider = functionFilterProvider[FilterControllerFunction.AfterFilterApplyFunction];
            if (functionProvider) {
                let coreFilterRequestElementWithOperandDTO = filterController.getView().bindUiToModel();
                functionProvider(coreFilterRequestElementWithOperandDTO);
            }
        }

        let functionFilterProvider = FilterControllerFunctionFactory.Factory((coreFilterRequestElementWithOperandDTO) => {
            if (coreFilterRequestElementWithOperandDTO instanceof CoreFilterRequestElementWithOperandDTO) {
                let coreWindowTabRequestSearchDTOJson = this.getTabSearchData();
                if (coreWindowTabRequestSearchDTOJson) {
                    view.getGridView().clearColumnConfigs();
                    coreWindowTabRequestSearchDTOJson.coreWindowTabDTO.getCoreWindowTabFieldDTOMap().forEach((coreWindowTabFieldDTO) => {
                        let columnConfig = TabUtil.createColumnConfigWithMetaData(coreWindowTabFieldDTO, coreWindowTabFieldDTO.getColumnIndex());
                        view.getGridView().addColumnConfig(coreWindowTabFieldDTO.getColumnIndex(), columnConfig, coreWindowTabFieldDTO.getCoreTableColumnDTO() != null && coreWindowTabFieldDTO.getCoreTableColumnDTO().getPk(), coreWindowTabFieldDTO.getId());
                    });

                    view.getGridView().getWebGridAdvanced().sortColumnConfigs();
                    view.getGridView().getWebGridAdvanced().rerenderHeader(view.getGridView().getWebGridAdvanced().getColumnConfigMap());

                    new WebFormEngineTabSearchData(view.getFilterViewContainer()).TabSearchData(coreWindowTabRequestSearchDTOJson.coreWindowTabRequestSearchDTO, (coreWindowTabResponseSearchDTOArray) => {
                        view.getGridView().getWebGridAdvanced().clearRecords();
                        if (coreWindowTabResponseSearchDTOArray instanceof Array) {
                            coreWindowTabResponseSearchDTOArray.forEach((coreWindowTabResponseSearchDTO) => {
                                view.getGridView().getWebGridAdvanced().addRecords(coreWindowTabResponseSearchDTO);
                            });
                        } else if (coreWindowTabResponseSearchDTOArray instanceof CoreWindowTabResponseSearchDTO) {

                        }
                    });
                }
            }
        }, () => {
        });

        view.getGridView().getWebGridAdvanced().addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEditorEvent) => {
            functionSearch();
        });

        view.getMagnifyingBtn().addListener(EventFrameWork.event.MouseEvent.click, functionSearch, this);

        let filterController = new FilterController(false);
        filterController.setParentContainer(view.getFilterViewContainer());
        filterController.setFunctionFilterProvider(functionFilterProvider);

        this.setFilterController(filterController);
    }

    getTabSearchData() {
        let filterViewPanel;
        let tabItemActive = this.getFilterController().getView().getTabPanel().getActiveItem();
        tabItemActive.getItems().forEach((item) => {
            if (item instanceof FilterViewPanel) {
                filterViewPanel = item;
            }
        });
        if (filterViewPanel instanceof FilterViewPanel) {
            this.getView().getGridView().bindModelToUI();
            let pagingDTO = this.getView().getGridView().getPageToolbar().bindUiToModel();

            filterViewPanel.getFilterFieldContainer();
            let coreWindowTabDTO = tabItemActive.getData().get(FilterViewKeys.CoreWindowTabDTO);

            let coreWindowTabRequestSearchDTO = new CoreWindowTabRequestSearchDTO();
            coreWindowTabRequestSearchDTO.setCoreWindowTabId(coreWindowTabDTO.getId());
            coreWindowTabRequestSearchDTO.setPagingDTO(pagingDTO);
            coreWindowTabRequestSearchDTO.setSortOrderMap(this.getView().getGridView().getSortOrderMap());
            coreWindowTabRequestSearchDTO.setCoreTranslateLanguageDTO(WebEnvironment.GetCoreTranslateLanguageDTO());
            coreWindowTabRequestSearchDTO.setCoreFilterRequestElementWithOperandDTO(this.getFilterController().getView().bindUiToModel());

            return {
                coreWindowTabRequestSearchDTO: coreWindowTabRequestSearchDTO,
                coreWindowTabDTO: coreWindowTabDTO
            };
        } else {
            return null;
        }
    }

    setAdvanced(isAdvanced) {
        this.isAdvanced = isAdvanced;
    }

    setCoreWindowTabFieldDTO(coreWindowTabFieldDTO) {
        this.coreWindowTabFieldDTO = coreWindowTabFieldDTO;
    }

    bindModelToUI(model) {
        super.bindModelToUI(model);

        let registerKeyArray = [];
        let mapRegisterKeyAndRecordId = new Map();
        if (this.coreWindowTabFieldDTO) {
            mapRegisterKeyAndRecordId.set(CoreAllElementRegisterKeyEnum.RegisterKey().Field.description, this.coreWindowTabFieldDTO.getId());
            registerKeyArray.push(CoreAllElementRegisterKeyEnum.RegisterKey().Field.description);

            if (this.coreWindowTabFieldDTO.getCoreTableColumnDTO()) {
                mapRegisterKeyAndRecordId.set(CoreAllElementRegisterKeyEnum.RegisterKey().Column.description, this.coreWindowTabFieldDTO.getCoreTableColumnDTO().getId());
                registerKeyArray.push(CoreAllElementRegisterKeyEnum.RegisterKey().Column.description);
            }
        } else {
            mapRegisterKeyAndRecordId.set(CoreAllElementRegisterKeyEnum.RegisterKey().CoreProcessParam.description, 1);
            registerKeyArray.push(CoreAllElementRegisterKeyEnum.RegisterKey().CoreProcessParam.description);
        }

        let coreAllElementRequestDTO = new CoreAllElementRequestDTO();
        coreAllElementRequestDTO.setRegisterKeyArray(registerKeyArray);

        new WebElementServiceFindElement(this.getView()).FindElementByRegisterKey(coreAllElementRequestDTO, (coreAllElementDTOArray) => {
            if (coreAllElementDTOArray instanceof Array) {
                let coreFilterRequestElementRecordDTOArray = [];
                coreAllElementDTOArray.forEach((coreAllElementDTO) => {
                    if (coreAllElementDTO instanceof CoreAllElementDTO) {
                        let recordId = mapRegisterKeyAndRecordId.get(coreAllElementDTO.getRegisterKey());
                        let coreFilterRequestElementRecordDTO = new CoreFilterRequestElementRecordDTO();
                        coreFilterRequestElementRecordDTO.setRecordId(recordId);
                        coreFilterRequestElementRecordDTO.setCoreAllElementDTO(coreAllElementDTO);

                        coreFilterRequestElementRecordDTOArray.push(coreFilterRequestElementRecordDTO);
                    }
                });
                let coreFilterRequestDTO = new CoreFilterRequestDTO();
                coreFilterRequestDTO.setCoreTranslateLanguageDTO(this.getView().getLanguage());
                coreFilterRequestDTO.setCoreFilterRequestElementRecordDTOArray(coreFilterRequestElementRecordDTOArray);

                this.getFilterController().bindModelToUI(coreFilterRequestDTO, null);
                CharacterWordGenerator.WordGenerator("AdvancedFilter", CharacterWordGenerator.StandardCharMap());
            }
        });
    }
}