import BaseView from "../../../../Common/BaseView.js";
import {RowLayout, RowLayout_Mode} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import ConfirmPanel from "../../../../Common/Confirm/ConfirmPanel.js";
import {RowLayoutData} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import FilterViewPanel from "./FilterViewPanel.js";
import FilterViewRowLineGenerator from "./Field/FilterViewRowLineGenerator.js";
import TabUtil from "../../../../Common/TabUtil.js";
import {RegisterComponent} from "../../../../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import CoreFilterAssignAbstract from "../../../../../Communicate/Models/Response/Filter/CoreFilterAssignAbstract.js";
import CoreFilterRequestElementWithOperationParamValueDTO from "../../../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementWithOperationParamValueDTO.js";
import CoreFilterRequestElementWithOperandDTO from "../../../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementWithOperandDTO.js";
import CoreFilterRequestOperandEnum from "../../../../../Communicate/Models/Request/Filter/CoreFilterRequestOperandEnum.js";
import KeyValueDTO from "../../../../../Communicate/Common/DataProvider/Impl/KeyValueDTO.js";
import CoreFilterOperationDTO from "../../../../../Communicate/Models/Response/Filter/CoreFilterOperationDTO.js";
import CoreWindowTabFieldDTO from "../../../../../Communicate/Models/Response/Window/Tab/Field/CoreWindowTabFieldDTO.js";
import CoreFilterRequestElementInterface from "../../../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementInterface.js";
import ButtonUtil from "../../../../Common/ButtonUtil.js";
import FormEngineEventFrameWork from "../../../Events/FormEngineEventFrameWork.js";
import CoreFilterAssignFieldDTO from "../../../../../Communicate/Models/Response/Filter/Field/CoreFilterAssignFieldDTO.js";
import ConvertUtil from "../../../../../Communicate/Common/ConvertUtil.js";
import TabPanelHTML, {TabPanel_Mode} from "../../../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import TabItem from "../../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import CoreFilterAssignElementMasterFieldDTO from "../../../../../Communicate/Models/Response/Filter/Field/CoreFilterAssignElementMasterFieldDTO.js";
import {FitLayout} from "../../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import CoreFilterAssignElementMasterDTO from "../../../../../Communicate/Models/Response/Filter/CoreFilterAssignElementMasterDTO.js";

export default class FilterView extends BaseView {

    constructor() {
        super();

        this.setLayout(new RowLayout(RowLayout_Mode.Vertical));

        this.tabPanel = new TabPanelHTML(TabPanel_Mode.Top);
        this.confirmPanel = new ConfirmPanel();

        this.addItem(this.tabPanel, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));

        this.bindTheme();
    }

    setActiveConfirmPanel(active) {
        if (active) {
            this.addItem(this.confirmPanel, RowLayoutData.factory(1, 30, 0, 0, 0, 0, true));
        } else {
            if (this.getAttached())
                this.removeItem(this.confirmPanel);
        }
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Modules.WebFilter[0]));
    }

    bindUiToModel() {
        let coreFilterAssignElementMasterDTOArrays2D = this.model;
        let coreFilterRequestElementValueInterfaceList = [];

        let coreFilterRequestElementWithOperandDTO = new CoreFilterRequestElementWithOperandDTO();
        coreFilterRequestElementWithOperandDTO.setCoreFilterRequestOperandEnum(CoreFilterRequestOperandEnum.Name().AND.description);
        coreFilterRequestElementWithOperandDTO.setCoreFilterRequestElementValueInterfaceList(coreFilterRequestElementValueInterfaceList);
        coreFilterRequestElementWithOperandDTO.setDataModelRegistry(CoreFilterRequestElementInterface.Register().registerKey_ElementWithOperand.description);

        for (let [uuidFilterViewPanel, filterViewPanel] of this.tabPanel.getActiveItem().getItems()) {
            if (filterViewPanel instanceof FilterViewPanel) {
                for (let [uuidRow, filterViewRowLineGenerator] of filterViewPanel.getFilterFieldContainer().getItems()) {
                    let rowFilter = filterViewRowLineGenerator.bindUiToModel();

                    let fieldValue = rowFilter[FilterViewRowLineGenerator.Constant.ModelFieldEditorValue];
                    let operationValue = rowFilter[FilterViewRowLineGenerator.Constant.ModelFilterOperationEditorValue];
                    let operationParamValueMap = rowFilter[FilterViewRowLineGenerator.Constant.ModelFilterOperationParamValueMap];

                    if (operationValue instanceof KeyValueDTO && fieldValue instanceof KeyValueDTO) {
                        let coreWindowTabFieldDTO = fieldValue.getKey();
                        let coreFilterOperationDTO = operationValue.getKey();
                        if (coreFilterOperationDTO instanceof CoreFilterOperationDTO && coreWindowTabFieldDTO instanceof CoreWindowTabFieldDTO) {
                            if (coreFilterAssignElementMasterDTOArrays2D instanceof Array) {
                                for (let coreFilterAssignElementMasterDTOArrays of coreFilterAssignElementMasterDTOArrays2D) {
                                    for (let coreFilterAssignElementMasterDTOJson of coreFilterAssignElementMasterDTOArrays) {
                                        let coreFilterAssignElementMasterDTO = ConvertUtil.ConvertGeneral(CoreFilterAssignElementMasterDTO, coreFilterAssignElementMasterDTOJson);
                                        let coreFilterAssignAbstract = coreFilterAssignElementMasterDTO.getCoreFilterAssignAbstractMap().get(coreWindowTabFieldDTO.getId().toString());
                                        let coreFilterRequestElementWithOperationParamValueDTO = new CoreFilterRequestElementWithOperationParamValueDTO();
                                        coreFilterRequestElementWithOperationParamValueDTO.setCoreAllElementDTO(coreFilterAssignAbstract.getCoreAllElementDTO());
                                        coreFilterRequestElementWithOperationParamValueDTO.setRecordId(coreWindowTabFieldDTO.getId());
                                        coreFilterRequestElementWithOperationParamValueDTO.setCoreFilterOperationId(coreFilterOperationDTO.getId());
                                        coreFilterRequestElementWithOperationParamValueDTO.setOperationParamValueMap(operationParamValueMap);
                                        coreFilterRequestElementWithOperationParamValueDTO.setDataModelRegistry(CoreFilterRequestElementInterface.Register().registerKey_ElementWithOperationParamValue.description);

                                        coreFilterRequestElementValueInterfaceList.push(coreFilterRequestElementWithOperationParamValueDTO);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // this.tabPanel.getActiveItem().getItems().forEach((filterViewRowLineGenerator) => {
        //
        // });
        return coreFilterRequestElementWithOperandDTO;
    }

    rebindModelToUI(coreFilterAssignElementMasterDTO) {
        super.rebindModelToUI(coreFilterAssignElementMasterDTO);

        let coreFilterAssignAbstractMap = coreFilterAssignElementMasterDTO.getCoreFilterAssignAbstractMap();
        let coreTranslateDTOMap = coreFilterAssignElementMasterDTO.getCoreTranslateDTOMap();
        let baseModeForFilter = TabUtil.ConvertCoreFilterAssignAbstractMapToBaseModeForFilter(coreFilterAssignAbstractMap);

        this.tabPanel.getActiveItem().getItems().forEach((filterViewRowLineGenerator) => {
            if (filterViewRowLineGenerator instanceof FilterViewRowLineGenerator) {
                let dataFromUi = filterViewRowLineGenerator.bindUiToModel();

                let coreWindowTabFieldDTO_Old = dataFromUi[FilterViewRowLineGenerator.Constant.ModelFieldEditorValue];
                let coreFilterOperationDTO_Old = dataFromUi[FilterViewRowLineGenerator.Constant.ModelFilterOperationEditorValue];
                let coreFilterOperationParamValueMap_Old = dataFromUi[FilterViewRowLineGenerator.Constant.ModelFilterOperationParamValueMap];

                let filterOperationDTOMap = baseModeForFilter.FilterOperationsMap.get(coreWindowTabFieldDTO_Old.getId());

                let coreWindowTabFieldDTO_New = baseModeForFilter.FieldMap.get(coreWindowTabFieldDTO_Old.getId());
                let coreFilterOperationDTO_New = filterOperationDTOMap != null && coreFilterOperationDTO_Old != null ? filterOperationDTOMap.get(coreFilterOperationDTO_Old.getId()) : null;

                let coreFilterAssignAbstract = filterViewRowLineGenerator.getData().get(FilterViewRowLineGenerator.Constant.ModelData);
                let key = filterViewRowLineGenerator.getData().get(FilterViewRowLineGenerator.Constant.ModelDataKey);
                if (coreFilterAssignAbstract instanceof CoreFilterAssignAbstract) {
                    let newCoreFilterAssignAbstract = coreFilterAssignAbstractMap.get(key);
                    filterViewRowLineGenerator.setCoreTranslateDTOMap(coreTranslateDTOMap);
                    filterViewRowLineGenerator.rebindModelToUI(coreWindowTabFieldDTO_New, coreFilterOperationDTO_New, coreFilterOperationParamValueMap_Old);
                    filterViewRowLineGenerator.setData(FilterViewRowLineGenerator.Constant.ModelData, coreFilterAssignAbstract);
                    filterViewRowLineGenerator.setData(FilterViewRowLineGenerator.Constant.ModelDataKey, key);
                }
            }
        });
    }

    bindModelToUI(coreFilterAssignElementMasterDTOArrays2D, coreFilterRequestElementWithOperandDTO, coreWindowTabDTO, buttonConsumerFunction, coreWindowTabFieldDTO, filterOptionMap) {
        super.bindModelToUI(coreFilterAssignElementMasterDTOArrays2D);

        this.getTabPanel().clearItems();

        let activeTabItem;

        if (coreFilterAssignElementMasterDTOArrays2D instanceof Array) {
            for (let coreFilterAssignElementMasterDTOArrays of coreFilterAssignElementMasterDTOArrays2D) {
                let coreFilterAssignElementMasterFieldDTOArraysModel = ConvertUtil.ConvertGeneralWithArray(CoreFilterAssignElementMasterFieldDTO, coreFilterAssignElementMasterDTOArrays);
                for (let coreFilterAssignElementMasterFieldDTO of coreFilterAssignElementMasterFieldDTOArraysModel) {
                    if (coreFilterAssignElementMasterFieldDTO instanceof CoreFilterAssignElementMasterFieldDTO && coreFilterAssignElementMasterFieldDTO.getCoreFilterAssignAbstractMap()) {
                        let coreFilterAssignAbstractMap = coreFilterAssignElementMasterFieldDTO.getCoreFilterAssignAbstractMap();
                        let coreTranslateDTOMap = coreFilterAssignElementMasterFieldDTO.getCoreTranslateDTOMap();
                        let baseModeForFilter = TabUtil.ConvertCoreFilterAssignAbstractMapToBaseModeForFilter(coreFilterAssignAbstractMap);

                        let filterViewPanel = new FilterViewPanel();

                        let tabItem = new TabItem();
                        tabItem.setLayout(new FitLayout());
                        tabItem.addItem(filterViewPanel);

                        if (!activeTabItem)
                            activeTabItem = tabItem;

                        if (coreFilterAssignElementMasterFieldDTO.getCoreWindowTabDTO()) {
                            tabItem.setTitle(coreFilterAssignElementMasterFieldDTO.getCoreWindowTabDTO().getTranslate());
                            tabItem.setData(FilterViewKeys.CoreWindowTabDTO, coreFilterAssignElementMasterFieldDTO.getCoreWindowTabDTO());
                        } else {
                            tabItem.setTitle("Main");
                        }

                        if (coreFilterRequestElementWithOperandDTO instanceof CoreFilterRequestElementWithOperandDTO) {
                            if (coreFilterRequestElementWithOperandDTO.getCoreFilterRequestElementValueInterfaceList()) {
                                for (let coreFilterRequestElementInterface of coreFilterRequestElementWithOperandDTO.getCoreFilterRequestElementValueInterfaceList()) {
                                    if (coreFilterRequestElementInterface instanceof CoreFilterRequestElementWithOperationParamValueDTO) {
                                        let coreWindowTabFieldDTOCurrent = baseModeForFilter.FieldMap.get(coreFilterRequestElementInterface.getRecordId());
                                        let matchedField = (coreWindowTabFieldDTO && coreWindowTabFieldDTOCurrent.getId() === coreWindowTabFieldDTO.getId()) || !coreWindowTabFieldDTO;
                                        let matchedColumnPkNot = !(coreWindowTabFieldDTOCurrent.getCoreTableColumnDTO() && coreWindowTabFieldDTOCurrent.getCoreTableColumnDTO().getPk());

                                        if (matchedField && matchedColumnPkNot) {
                                            let coreFilterOperationDTO = baseModeForFilter.FilterOperationsMap.get(coreFilterRequestElementInterface.getRecordId()).get(coreFilterRequestElementInterface.getCoreFilterOperationId());

                                            let filterViewRowLineGenerator = new FilterViewRowLineGenerator(filterOptionMap);
                                            filterViewRowLineGenerator.setCoreTranslateDTOMap(coreTranslateDTOMap);
                                            filterViewRowLineGenerator.bindFinalModelToUi(coreWindowTabFieldDTOCurrent, coreFilterOperationDTO, coreFilterRequestElementInterface.getOperationParamValueMap(), baseModeForFilter);

                                            filterViewPanel.getFilterFieldContainer().addItem(filterViewRowLineGenerator, RowLayoutData.factory(1, 50, 2, 2, 2, 2, true));
                                        }
                                    }
                                }
                            }
                        } else {
                            coreFilterAssignAbstractMap.forEach((coreFilterAssignAbstract, key) => {
                                coreFilterAssignAbstract = TabUtil.ConvertCoreFilterAssignAbstract(coreFilterAssignAbstract);
                                if (coreFilterAssignAbstract instanceof CoreFilterAssignFieldDTO) {
                                    if (coreFilterAssignAbstract.getCoreWindowTabFieldDTO()) {
                                        if ((coreWindowTabFieldDTO && coreFilterAssignAbstract.getCoreWindowTabFieldDTO().getId() === coreWindowTabFieldDTO.getId()) || !coreWindowTabFieldDTO) {
                                            let filterViewRowLineGenerator = new FilterViewRowLineGenerator(filterOptionMap);
                                            filterViewRowLineGenerator.setCoreTranslateDTOMap(coreTranslateDTOMap);
                                            filterViewRowLineGenerator.bindModelToUi(coreFilterAssignAbstract, key, baseModeForFilter);
                                            filterViewRowLineGenerator.setData(FilterViewRowLineGenerator.Constant.ModelData, coreFilterAssignAbstract);
                                            filterViewRowLineGenerator.setData(FilterViewRowLineGenerator.Constant.ModelDataKey, key);

                                            filterViewPanel.getFilterFieldContainer().addItem(filterViewRowLineGenerator, RowLayoutData.factory(1, 50, 2, 2, 2, 2, true));
                                        }
                                    }
                                }
                            });
                        }

                        let coreButtonAssignElementDTOMap = coreFilterAssignElementMasterFieldDTO.getCoreButtonAssignElementDTOMap();
                        if (coreButtonAssignElementDTOMap) {
                            ButtonUtil.createButtonAction(coreButtonAssignElementDTOMap, (key, buttonInstance) => {
                                buttonInstance.addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEvent) => {
                                    buttonConsumerFunction(buttonEvent);
                                }, this);
                                filterViewPanel.getFilterToolbar().addItem(buttonInstance, RowLayoutData.factory(32, 1, 0, 3, 0, 0));
                            });
                        }

                        this.tabPanel.addItem(tabItem);
                    }
                }
            }
        }

        if (activeTabItem)
            this.getTabPanel().setActiveTabItem(activeTabItem);
    }

    getTabPanel() {
        return this.tabPanel;
    }

    getConfirmPanel() {
        return this.confirmPanel;
    }
}

export const FilterViewKeys = {
    CoreWindowTabDTO: 'CoreWindowTabDTO'
}