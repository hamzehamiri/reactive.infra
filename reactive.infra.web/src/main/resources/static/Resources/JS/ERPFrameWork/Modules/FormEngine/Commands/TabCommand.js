import CommandFactory from "../../Common/Factory/CommandFactory.js";
import CoreWindowTabDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabDTO.js";
import {ClientLogger, LogLevel} from "../../../../UIFrameWork/Shared/Logger/ClientLogger.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import RecordDescriptors from "./RecordDescriptors.js";
import ButtonEditorEvent from "../../../../UIFrameWork/HTML/WebEditor/Common/ButtonEditorEvent.js";
import {ButtonHeaderAdvancedKeys} from "../../../../UIFrameWork/HTML/Cells/Grid/Advanced/ButtonHeaderAdvanced.js";
import {WebColumnConfig} from "../../../../UIFrameWork/HTML/Cells/Grid/Standard/WebColumnConfig.js";
import {CoreButtonConstantButton} from "../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import DropDownButton from "../Toolbar/StandardButtons/DropDownButton.js";
import TabUtil from "../../Common/TabUtil.js";
import CoreWindowTabPluggableAssignTabDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabPluggableAssignTabDTO.js";
import ViewModuleFactory from "../../Common/Factory/ViewModuleFactory.js";
import {SideLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {SideLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import BaseSharedComponent from "../../../../UIFrameWork/Shared/BaseShared/BaseSharedComponent.js";
import {FilterTabControllerFunctionFactory} from "../Filter/Tab/FilterTabController.js";
import CoreFilterRequestElementWithOperandDTO from "../../../Communicate/Models/Request/Filter/Element/CoreFilterRequestElementWithOperandDTO.js";
import ButtonUtil from "../../Common/ButtonUtil.js";

export default class TabCommand {

    static Init() {
        CommandFactory.register(CoreButtonConstantButton().Save.description, TabCommand.SaveCommand);
        CommandFactory.register(CoreButtonConstantButton().Refresh.description, TabCommand.RefreshCommand);
        CommandFactory.register(CoreButtonConstantButton().New.description, TabCommand.NewCommand);
        CommandFactory.register(CoreButtonConstantButton().Print.description, TabCommand.PrintCommand);

        CommandFactory.register(CoreButtonConstantButton().NextRecord.description, TabCommand.NextRecordCommand);
        CommandFactory.register(CoreButtonConstantButton().NextPage.description, TabCommand.NextPageCommand);
        CommandFactory.register(CoreButtonConstantButton().LastPage.description, TabCommand.LastPageCommand);

        CommandFactory.register(CoreButtonConstantButton().BeforeRecord.description, TabCommand.BeforeRecordCommand);
        CommandFactory.register(CoreButtonConstantButton().BeforePage.description, TabCommand.BeforePageCommand);
        CommandFactory.register(CoreButtonConstantButton().FirstPage.description, TabCommand.FirstPageCommand);

        CommandFactory.register(CoreButtonConstantButton().FormView.description, TabCommand.FormView);
        CommandFactory.register(CoreButtonConstantButton().TableView.description, TabCommand.TableView);
        CommandFactory.register(CoreButtonConstantButton().TableFormView.description, TabCommand.TableFormView);

        CommandFactory.register(CoreButtonConstantButton().WebAdvancedGridSortOrder.description, TabCommand.SortOrder);
        CommandFactory.register(CoreButtonConstantButton().WebAdvancedGridFilterColumnConfig.description, TabCommand.FilterColumnConfig);

        CommandFactory.register(CoreButtonConstantButton().Filter.description, TabCommand.Filter);
        CommandFactory.register(CoreButtonConstantButton().FilterTab.description, TabCommand.FilterTab);

        CommandFactory.register(CoreButtonConstantButton().Pluggable.description, TabCommand.Pluggable);
        CommandFactory.register(CoreButtonConstantButton().Process.description, TabCommand.Process);
    }

    static Process(tabController, buttonEvent) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            tabController.executeProcess(buttonEvent.getKey())
        }
    }

    static FilterColumnConfig(tabController, buttonEvent) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            let buttonEditor = buttonEvent.getSource();
            let modelColumnConfig = buttonEvent.getExtraAttribute().get(ButtonHeaderAdvancedKeys.DataElement);
            if (buttonEditor instanceof DropDownButton && modelColumnConfig) {
                if (modelColumnConfig.columnConfigModel instanceof WebColumnConfig) {
                    buttonEditor.popUp.clearItems();
                    buttonEditor.showPopUp();
                    tabController.openFilterCommandPerField(modelColumnConfig.columnConfigModel.getEditorModel(), buttonEditor.popUp);
                }
            }
        }
    }

    static FilterTab(tabController, buttonEvent) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            let coreWindowTabFilterDTO = buttonEvent.getValue();

            let filterTabControllerFunction = FilterTabControllerFunctionFactory.Factory((coreFilterRequestElementWithOperandDTO) => {
                if (coreFilterRequestElementWithOperandDTO instanceof CoreFilterRequestElementWithOperandDTO) {
                    tabController.setFilterModel(coreFilterRequestElementWithOperandDTO);
                    ButtonUtil.ButtonHandleEvent(new ButtonEditorEvent(this, CoreButtonConstantButton().Refresh.description), this);
                }
            });
            let filterTabController = tabController.filterTabController;


            filterTabController.setFunctionFilterProvider(filterTabControllerFunction);
            filterTabController.bindModelToUI(coreWindowTabFilterDTO, tabController, tabController.changeFilterTabEditor);
            filterTabController.getView().setEditorsWithLayout(filterTabController.getEditor(), null, TabUtil.startSortField(filterTabController.getEditor()));

            tabController.getView().getGridView().addFilterTabContainer(filterTabController.getView(), TabCommand.ViewPortPlace.Right);
            tabController.getView().layoutExecute();
        }
    }

    static Filter(tabController, buttonEvent) {
        tabController.openFilterCommand();
    }

    static Pluggable(tabController, buttonEvent) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            let coreWindowTabPluggableAssignTabDTO = buttonEvent.getValue();
            if (coreWindowTabPluggableAssignTabDTO instanceof CoreWindowTabPluggableAssignTabDTO) {
                let items = tabController.getView().getItems();

                let generatedItemNow = true;
                let viewInstance;
                let viewPosition = TabCommand.ViewPortPlace.Top;

                if (items != null) {
                    items.forEach((item) => {
                        if (item instanceof BaseSharedComponent) {
                            let dataModelMap = item.getDataModel();
                            if (dataModelMap instanceof Map) {
                                if (dataModelMap.has(coreWindowTabPluggableAssignTabDTO.getId())) {
                                    generatedItemNow = false;
                                    viewInstance = item;
                                }
                            }
                        }
                    });
                }

                if (generatedItemNow) {
                    let ViewClassInvoke = ViewModuleFactory.factory(coreWindowTabPluggableAssignTabDTO.getCoreWindowTabPluggableDTO().getCoreViewModuleDTO().getRegisterKey());
                    if (ViewClassInvoke) {
                        viewInstance = new ViewClassInvoke();
                        viewInstance.setDataModel(coreWindowTabPluggableAssignTabDTO.getId(), coreWindowTabPluggableAssignTabDTO);
                    }
                } else {
                    if (viewInstance) {
                        tabController.getView().clearItems();
                    }
                }

                if (viewInstance) {
                    tabController.getView().setLayout(new SideLayout(true));
                    tabController.getView().addItem(tabController.getView().getGridView(), SideLayoutData.factory(SideLayoutData.Side.Center, 0, true, false, true, false, 0, 0, 0, 0));
                    tabController.getView().addItem(viewInstance, SideLayoutData.factory(SideLayoutData.Side.Bottom, 200, true, false, true, true, 0, 0, 0, 0, 1));
                    tabController.getView().getGridView().bindModelToUI(tabController.getModel());
                }
            }
        }
    }

    static SortOrder(tabController, buttonEvent) {
        if (buttonEvent instanceof ButtonEditorEvent) {
            if (buttonEvent.getExtraAttribute()) {
                let columnConfigModelWithElement = buttonEvent.getExtraAttribute().get(ButtonHeaderAdvancedKeys.DataElement);
                if (columnConfigModelWithElement) {
                    let columnConfig = columnConfigModelWithElement.columnConfigModel;
                    if (columnConfig instanceof WebColumnConfig) {
                        let coreWindowTabDTO = tabController.getModel();
                        if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
                            // let coreWindowTabColumnProfileDTO = coreWindowTabDTO.getCoreWindowTabProfileDTO().getCoreWindowTabColumnProfileMap().get(columnConfig.getEditorModel().getId());
                            // if (!coreWindowTabColumnProfileDTO) {
                            //     coreWindowTabColumnProfileDTO = new CoreWindowTabColumnProfileDTO();
                            //     coreWindowTabColumnProfileDTO.setFieldId(columnConfig.getEditorModel().getId());
                            //     coreWindowTabDTO.getCoreWindowTabProfileDTO().getCoreWindowTabColumnProfileMap().set(columnConfig.getEditorModel().getId(), coreWindowTabColumnProfileDTO);
                            // }
                            // coreWindowTabColumnProfileDTO.setSortOrder(new CoreWindowTabFieldSortOrderProfileDTO(buttonEvent.getValue()));
                            TabCommand.RefreshCommand(tabController);
                        }
                    }
                }
            }
        }
    }

    static FormView(tabController) {
        ClientLogger.Log(LogLevel.Debug, "FormView");
        let coreWindowTabResponseSearchDTO = tabController.getTabRecordChangeHandler().getSelectedRecord();

        tabController.getView().getEditor().forEach((editorInstance, id) => {
            editorInstance.setRecord(coreWindowTabResponseSearchDTO);
        });

        let coreWindowTabDTO = tabController.getModel();
        if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
            let activeCoreLayoutAssignElementDTO;
            coreWindowTabDTO.getCoreLayoutAssignElementDTOMap_Tab().forEach((coreLayoutAssignElementDTO, id) => {
                activeCoreLayoutAssignElementDTO = coreLayoutAssignElementDTO;
            });

            let editorArraySorted = TabUtil.startSortField(tabController.getView().getEditor());

            tabController.getView().setLayout(new FitLayout(true));
            tabController.getView().addItem(tabController.getView().getFormView());
            tabController.getView().getFormView().setEditorsWithLayout(tabController.getView().getEditor(), activeCoreLayoutAssignElementDTO, editorArraySorted);
            tabController.getView().getFormView().bindRecordToUI(RecordDescriptors.WebEditorMapValue(coreWindowTabResponseSearchDTO));
        }
    }

    static TableView(tabController) {
        ClientLogger.Log(LogLevel.Debug, "TableView");

        TabCommand.normalGridView(tabController);

        tabController.getView().getGridView().bindModelToUI(tabController.getModel());
    }

    static normalGridView(tabController) {
        tabController.getView().setLayout(new FitLayout(true));
        tabController.getView().addItem(tabController.getView().getGridView());
    }

    static normalGridViewWithFilterTab(tabController) {

    }

    static TableFormView(tabController) {
        ClientLogger.Log(LogLevel.Debug, "TableFormView");
    }

    static BeforeRecordCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "BeforeRecord");
    }

    static BeforePageCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "BeforePage");

        tabController.getView().getGridView().getPageToolbar().beforePage();
        TabCommand.RefreshCommand(tabController);
    }

    static FirstPageCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "FirstPage");

        tabController.getView().getGridView().getPageToolbar().firstPage();
        TabCommand.RefreshCommand(tabController);
    }

    static LastPageCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "LastPage");

        tabController.getView().getGridView().getPageToolbar().lastPage();
        TabCommand.RefreshCommand(tabController);
    }

    static NextPageCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "NextPage");

        tabController.getView().getGridView().getPageToolbar().nextPage();
        TabCommand.RefreshCommand(tabController);
    }

    static NextRecordCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "NextRecord");
    }

    static SaveCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "Save");
        tabController.saveCommand();
    }

    static PrintCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "Print");
        // let file = new FileManagerRequestDTO();
        // file.setFileName("test");
        // new WebFileManagerServiceDownloadClient(this).Download(file, () => {
        //     debugger;
        //     console.log("ff");
        // });
    }

    static RefreshCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "Refresh");
        tabController.getView().getGridView().getWebGridAdvanced().clearRecords();
        tabController.refreshCommand();
    }

    static NewCommand(tabController) {
        ClientLogger.Log(LogLevel.Debug, "New");
        tabController.newCommand();
    }
}

TabCommand.ViewPortPlace = {
    Top: 'top',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
}