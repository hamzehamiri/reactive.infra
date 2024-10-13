import BaseController from "../../../Common/BaseController.js";
import TabView from "../View/TabView.js";
import CoreWindowTabDTO from "../../../../Communicate/Models/Response/Window/Tab/CoreWindowTabDTO.js";
import {RowLayout, RowLayout_Mode} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import ToolbarBindPleaseEvent from "../../Events/ToolbarBindPleaseEvent.js";
import TabUtil from "../../../Common/TabUtil.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import ButtonUtil from "../../../Common/ButtonUtil.js";
import TabRecordChangeHandler from "./TabRecordChangeHandler.js";
import {WebFormEngineTabServiceClient} from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineTabServiceClient.js";
import CoreWindowTabRequestDTO from "../../../../Communicate/Models/Request/Window/Tab/CoreWindowTabRequestDTO.js";
import TabRecordChangeHandlerEvent from "./TabRecordChangeHandlerEvent.js";
import CoreWindowTabRequestSearchDTO from "../../../../Communicate/Models/Request/Window/Tab/CoreWindowTabRequestSearchDTO.js";
import CoreWindowSaveDataRequestDTO from "../../../../Communicate/Models/Request/Window/CoreWindowSaveDataRequestDTO.js";
import FilterController, {FilterControllerFunctionFactory} from "../../Filter/Field/FilterController.js";
import {BodyElementWidget} from "../../../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";
import CoreFilterRequestDTO from "../../../../Communicate/Models/Request/Filter/CoreFilterRequestDTO.js";
import ErpWindow from "../../../Components/ErpWindow.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import {WebEditor} from "../../../../../UIFrameWork/HTML/WebEditor/Common/WebEditor.js";
import {WebColumnConfig} from "../../../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import CoreFilterRequestElementWithOperandDTO from "../../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementWithOperandDTO.js";
import ButtonEditorEvent from "../../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import {CoreButtonConstantButton} from "../../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import WebFormEngineTabSearchData from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineTabSearchData.js";
import WebFormEngineTabNewData from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineTabNewData.js";
import CoreWindowTabResponseSearchDTO from "../../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import WebFormEngineTabSaveData from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineTabSaveData.js";
import FilterViewRowLineGenerator from "../../Filter/Field/View/Field/FilterViewRowLineGenerator.js";
import WebEnvironment from "../../../../Communicate/Common/WebEnvironment.js";
import CoreFilterRequestElementRecordDTO from "../../../../Communicate/Models/Request/Filter/CoreFilterRequestElementRecordDTO.js";
import ListPlugButton from "../../Toolbar/StandardButtons/ListPlugButton.js";
import CoreWindowTabPluggableRequestDTO from "../../../../Communicate/Models/Request/Window/Tab/CoreWindowTabPluggableRequestDTO.js";
import ModuleFactory from "../../../Common/Factory/ModuleFactory.js";
import Module from "../../../Common/Module.js";
import ErpWindowFactory from "../../../Components/ErpWindowFactory.js";
import CoreButtonAssignElementDTO from "../../../../Communicate/Models/Response/Button/CoreButtonAssignElementDTO.js";
import ModuleFunctionFactory from "../../../Common/ModuleFunctionFactory.js";
import ConvertUtil from "../../../../Communicate/Common/ConvertUtil.js";
import CoreWindowTabFilterDTO from "../../../../Communicate/Models/Response/Window/Tab/Filter/CoreWindowTabFilterDTO.js";
import FilterTabController from "../../Filter/Tab/FilterTabController.js";

export default class TabController extends BaseController {
    constructor(parentContainer, recordId) {
        super();
        this.recordId = recordId;
        this.tabRecordChangeHandler = new TabRecordChangeHandler(this);
        this.tabRecordChangeHandler.addListener(FormEngineEventFrameWork.event.TabController.TabRecordChangeHandler.TabRecordChangeHandler_FieldChangeEvent, (tabRecordChangeHandlerEvent) => {
            if (tabRecordChangeHandlerEvent instanceof TabRecordChangeHandlerEvent) {
                this.getView().getGridView().getWebGridAdvanced().updateValue_RenderTableElementMapWithRecords_ByRecordIdAndColumnId(tabRecordChangeHandlerEvent.getTargetRecord(), tabRecordChangeHandlerEvent.getEditorCoreWindowTabField(), tabRecordChangeHandlerEvent.getEditorValueChangedModel());
            }
        }, this);

        let view = new TabView();
        view.getGridView().setActiveGridEditor(true);
        view.addListener(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, (baseEvent) => {
            let component = baseEvent.getSource();
            if (component instanceof HTMLComponent) {
                this.changeLang(component.getLanguage());
            }
        });
        view.getGridView().getPageToolbar().addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEditorEvent) => {
            this.CommandExecute(buttonEditorEvent);
        });

        view.getGridView().getWebGridAdvanced().addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, (buttonEditorEvent) => {
            this.CommandExecute(buttonEditorEvent);
        });
        if (parentContainer) {
            view.setParentContainer(parentContainer);
        }

        this.filterTabController = new FilterTabController();
        this.setView(view);
        this.setFilterController(new FilterController(true));
    }

    setCoreWindowDTO(coreWindowDTO) {
        this.coreWindowDTO = coreWindowDTO;
    }

    initWithRecordID() {
        let coreWindowTabRequestDTO = new CoreWindowTabRequestDTO();
        coreWindowTabRequestDTO.setId(this.recordId);
        new WebFormEngineTabServiceClient(this.getView().getParentContainer()).FindTab(coreWindowTabRequestDTO, (coreWindowTabDTO) => {
            this.bindModelToUI(coreWindowTabDTO);
        });
    }

    changeLang(coreTranslateLanguageDTO) {
        new WebFormEngineTabServiceClient(this.getView().getParentContainer()).FindTab(this.createCoreWindowTabRequestDTO(coreTranslateLanguageDTO), (coreWindowTabDTO) => {
            this.rebindModelToUI(coreWindowTabDTO);
            this.setEnableTranslateEventChildController(true);
        });
    }

    createCoreWindowTabRequestDTO(coreTranslateLanguageDTO) {
        let coreWindowTabDTO = this.getModel();
        let coreWindowTabRequestDTO = new CoreWindowTabRequestDTO();
        coreWindowTabRequestDTO.setId(coreWindowTabDTO.getId());
        coreWindowTabRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);
        return coreWindowTabRequestDTO;
    }

    rebindModelToUI(coreWindowTabDTO) {
        super.rebindModelToUI(coreWindowTabDTO);
        if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
            coreWindowTabDTO.getCoreWindowTabFieldDTOMap().forEach((coreWindowTabFieldDTO, id) => {
                let editorInstance = this.view.getEditor().get(coreWindowTabFieldDTO.getId());
                let webColumnConfig = this.view.getGridView().getWebGridAdvanced().getColumnConfigMap().get(coreWindowTabFieldDTO.getColumnIndex());
                if (editorInstance instanceof WebEditor) {
                    editorInstance.setGeneratePlaceHolderLabel(coreWindowTabFieldDTO.getTranslate());
                }
                if (webColumnConfig instanceof WebColumnConfig) {
                    webColumnConfig.setDisplay(coreWindowTabFieldDTO.getTranslate());
                    this.view.getGridView().getWebGridAdvanced().updateTranslateColumnConfig(webColumnConfig);
                }
            });
        }
    }

    bindModelToUI(coreWindowTabDTO) {
        super.bindModelToUI(coreWindowTabDTO);
        this.tabRecordChangeHandler.bindStartMonitorChange();
        if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
            this.view.setLayout(new RowLayout(RowLayout_Mode.Vertical));
            this.view.bindModelToUI(coreWindowTabDTO);
            if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
                TabUtil.createEditorFromCoreWindowTabDTO(coreWindowTabDTO, (id, editorInstance) => {
                    this.view.getEditor().set(id, editorInstance);
                    editorInstance.addListener(EventFrameWork.event.Editors.FieldChangeEvent, this.tabRecordChangeHandler.fieldChangeEvent, this.tabRecordChangeHandler);
                }, (columnIndex, columnConfig, isPk, coreWindowTabFieldDTO) => {
                    this.view.getGridView().addColumnConfig(columnIndex, columnConfig, isPk, coreWindowTabFieldDTO.getId());
                });
                ButtonUtil.createButtonAction(coreWindowTabDTO.getCoreButtonAssignElementDTOMap(), (key, buttonInstance) => {
                    this.view.getCoreButtonAssignElementDTOMap().set(key, buttonInstance);
                    buttonInstance.addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, this.CommandExecute, this);
                }, (key, buttonInstance, CustomEventSource) => {
                    this.CommandCustom(CustomEventSource, buttonInstance);
                });

                this.view.getGridView().getWebGridAdvanced().sortColumnConfigs();

                this.processCoreWindowTabFilterDTOContainer(coreWindowTabDTO.getDefaultCoreWindowTabFilterDTO());
            }
        }
    }

    processCoreWindowTabFilterDTOContainer(coreWindowTabFilterDTO) {
        if (coreWindowTabFilterDTO instanceof CoreWindowTabFilterDTO) {
            // this.filterTabController.setParentContainer();
        }
    }

    CommandExecute(buttonEvent) {
        ButtonUtil.ButtonHandleEvent(buttonEvent, this);
    }

    CommandCustom(buttonEvent, buttonInstance) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            if (buttonInstance instanceof ListPlugButton) {
                let coreWindowTabPluggableRequestDTO = new CoreWindowTabPluggableRequestDTO();
                coreWindowTabPluggableRequestDTO.setCoreWindowTabId(this.model.getId());
                buttonInstance.requestPlug(coreWindowTabPluggableRequestDTO);
            }
        }
    }

    newCommand(consumerRecord) {
        let service = new WebFormEngineTabNewData(this.getView());
        service.TabNewData(this.createCoreWindowTabRequestDTO(this.getView().getLanguage()), (coreWindowTabResponseSearchDTO) => {
            if (coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO) {
                let selectTargetLast = this.getView().getGridView().getWebGridAdvanced().getGridModelSelection().getSelectTargetStack().peek();
                let indexBelow = selectTargetLast ? selectTargetLast.Row : 1;
                this.tabRecordChangeHandler.injectNewRecord(coreWindowTabResponseSearchDTO);
                this.getView().getGridView().getWebGridAdvanced().renderRecordWithIndex(coreWindowTabResponseSearchDTO, indexBelow);
                if (consumerRecord)
                    consumerRecord(coreWindowTabResponseSearchDTO);
            }
        });
    }

    refreshCommand(consumerRecord) {
        let functionAfterService = (coreWindowTabResponseSearchDTO) => {
            TabUtil.mergeCoreWindowTabResponseSearchDTOWithTabChangeRecords(coreWindowTabResponseSearchDTO, this.tabRecordChangeHandler, this);
            this.getView().getGridView().getWebGridAdvanced().addRecords(coreWindowTabResponseSearchDTO);
        }
        new WebFormEngineTabSearchData(this.getView()).TabSearchData(this.getTabSearchData(), (coreWindowTabResponseSearchDTOArray) => {
            if (coreWindowTabResponseSearchDTOArray instanceof Array) {
                coreWindowTabResponseSearchDTOArray.forEach((coreWindowTabResponseSearchDTO) => {
                    functionAfterService(coreWindowTabResponseSearchDTO);
                });
            } else if (coreWindowTabResponseSearchDTOArray instanceof CoreWindowTabResponseSearchDTO) {
                functionAfterService(coreWindowTabResponseSearchDTOArray);
            }
            if (consumerRecord)
                consumerRecord(coreWindowTabResponseSearchDTOArray);
        });
    }

    getFilterRequestModel() {
        let coreFilterRequestElementRecordDTO = new CoreFilterRequestElementRecordDTO();
        coreFilterRequestElementRecordDTO.setCoreAllElementDTO(this.getModel().getCoreAllElementDTO());
        coreFilterRequestElementRecordDTO.setRecordId(this.getModel().getId());

        let coreFilterRequestElementRecordDTOList = [];
        coreFilterRequestElementRecordDTOList.push(coreFilterRequestElementRecordDTO);

        let coreFilterRequestDTO = new CoreFilterRequestDTO();
        coreFilterRequestDTO.setCoreFilterRequestElementRecordDTOArray(coreFilterRequestElementRecordDTOList);
        coreFilterRequestDTO.setCoreTranslateLanguageDTO(this.getView().getLanguage());
        return coreFilterRequestDTO;
    }

    openFilterCommandPerField(coreWindowTabFieldDTO, container, consumerFilter) {
        // let coreFilterRequestElementWithOperandDTO = this.getFilterModel();
        // let row = new FilterViewRowLineGenerator();
        // container.addItem(row, RowLayoutData.factory(1, 30, 1, 1, 1, 1, true));
        //
        let functionFilterProvider = FilterControllerFunctionFactory.Factory((coreFilterRequestElementWithOperandDTO) => {

        }, () => {

        });
        this.filterController.setParentContainer(container);
        this.filterController.setFunctionFilterProvider(functionFilterProvider);
        this.filterController.bindModelToUIPerField(this.getFilterRequestModel(), this.getFilterModel(), this.getModel(), coreWindowTabFieldDTO, new Map([
            [FilterViewRowLineGenerator.Options.FieldEditorShow, false]
        ]));
    }

    openFilterTab() {

    }

    executeProcess(coreButtonAssignElementDTO) {
        if (coreButtonAssignElementDTO instanceof CoreButtonAssignElementDTO) {
            let ModuleInvoke = ModuleFactory.factoryByCoreAllElement(coreButtonAssignElementDTO.getCoreAllElementDTOModule());
            if (ModuleInvoke) {
                let module = new ModuleInvoke();
                if (module instanceof Module) {
                    let erpWindow = ErpWindowFactory.ErpWindowCreateCenter(true, 400, false, 800, 400);

                    let coreWindowTabResponseSearchDTOStack = this.getView().getGridView().getWebGridAdvanced().getGridModelSelection().getSelectRecordStack();

                    let functionFactoryModule = ModuleFunctionFactory.Factory(() => {
                        erpWindow.hide();
                    }, () => {
                        return ModuleFunctionFactory.FactoryRequestParentModel(ConvertUtil.ConvertCoreWindowTabResponseSearchDTOStackToRecordModelDTOArray(coreWindowTabResponseSearchDTOStack), this.getModel().getCoreAllElementDTO(), this.getModel().getId());
                    }, (functionChecker) => {
                        erpWindow.addDragElementMatcherFunction((event) => {
                            return functionChecker(event);
                        });
                    });

                    module.setFunctionFactoryModule(functionFactoryModule);
                    module.createAndAttachModule(erpWindow.getContent(), coreButtonAssignElementDTO.getRecordIdModule(), WebEnvironment.GetCoreTranslateLanguageDTO());
                }
            }
        }
    }

    openFilterCommand(consumerFilter) {
        let erpWindow = new ErpWindow(true, true, true, true);
        erpWindow.setTitle("Filter");
        erpWindow.setScrollTypeY(null);
        erpWindow.setHideOnOtherClick(false);
        erpWindow.setBaseHeight(400);
        erpWindow.getContent().setLayout(new FitLayout());
        erpWindow.showCenterElement(BodyElementWidget.get(), 800);

        let functionFilterProvider = FilterControllerFunctionFactory.Factory((coreFilterRequestElementWithOperandDTO) => {
            erpWindow.hide();
            if (coreFilterRequestElementWithOperandDTO instanceof CoreFilterRequestElementWithOperandDTO) {
                this.setFilterModel(coreFilterRequestElementWithOperandDTO);
                ButtonUtil.ButtonHandleEvent(new ButtonEditorEvent(this, CoreButtonConstantButton().Refresh.description), this);
                if (consumerFilter)
                    consumerFilter(coreFilterRequestElementWithOperandDTO);
            }
        }, () => {
            erpWindow.hide();
        });

        this.filterController.setParentContainer(erpWindow.getContent());
        this.filterController.setFunctionFilterProvider(functionFilterProvider);
        this.filterController.bindModelToUI(this.getFilterRequestModel(), this.getFilterModel()/*, this.getModel()*/);

        erpWindow.addDragElementMatcherFunction((event) => {
            return !this.filterController.getView().getTabPanel().containElement(event);
        });
    }

    saveCommand(consumerSave) {
        let service = new WebFormEngineTabSaveData(this.getView());
        service.SaveTabData(this.getTabSaveData(), (coreWindowTabResponseSearchDTOArray) => {
            if (consumerSave)
                consumerSave(coreWindowTabResponseSearchDTOArray);
        });
    }

    getTabSearchData() {
        let pagingDTO = this.getView().getGridView().getPageToolbar().bindUiToModel();

        let coreWindowTabRequestSearchDTO = new CoreWindowTabRequestSearchDTO();
        coreWindowTabRequestSearchDTO.setCoreWindowTabId(this.getModel().getId());
        coreWindowTabRequestSearchDTO.setPagingDTO(pagingDTO);
        coreWindowTabRequestSearchDTO.setSortOrderMap(this.getView().getGridView().getSortOrderMap());
        coreWindowTabRequestSearchDTO.setCoreTranslateLanguageDTO(WebEnvironment.GetCoreTranslateLanguageDTO());
        coreWindowTabRequestSearchDTO.setCoreFilterRequestElementWithOperandDTO(this.getFilterModel());

        return coreWindowTabRequestSearchDTO;
    }

    getTabSaveData() {
        let coreWindowTabDTO = this.getModel();
        let coreWindowTabResponseSearchDTOArrayChanged = this.getTabRecordChangeHandler().getArrayRecordChanged();
        let coreWindowTabResponseSearchDTOArrayChangedOriginal = this.getTabRecordChangeHandler().getArrayRecordChangedOriginal();

        let tabDataMap = new Map();
        tabDataMap.set(coreWindowTabDTO.getId(), coreWindowTabResponseSearchDTOArrayChanged);

        let tabDataMapOriginal = new Map();
        tabDataMapOriginal.set(coreWindowTabDTO.getId(), coreWindowTabResponseSearchDTOArrayChangedOriginal);

        let saveTabData = new CoreWindowSaveDataRequestDTO();
        saveTabData.setWindowId(1);
        saveTabData.setTabDataMap(tabDataMap);
        saveTabData.setTabDataMapOriginal(tabDataMapOriginal);

        return saveTabData;
    }

    fireEventToolbarBindPlease() {
        this.fireEvent(FormEngineEventFrameWork.event.TabController.ToolbarBindPlease, new ToolbarBindPleaseEvent(this, this.view.getCoreButtonAssignElementDTOMap()));
    }

    getTabRecordChangeHandler() {
        return this.tabRecordChangeHandler;
    }
}

TabController.Editors = 'Editors';
TabController.InitVariables = {
    SelectedGridMap: 'SelectedGridMap', SelectedGridArrayKey: 'SelectedGridArrayKey'
}