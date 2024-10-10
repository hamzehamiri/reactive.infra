import BaseController from "../../../Common/BaseController.js";
import {WebFormEngineWindowServiceClient} from "../../../../Communicate/XMLHttpRequest/Services/FormEngine/WebFormEngineWindowServiceClient.js";
import {CoreWindowRequestDTO} from "../../../../Communicate/Models/Request/Window/CoreWindowRequestDTO.js";
import {CoreWindowDTO} from "../../../../Communicate/Models/Response/Window/CoreWindowDTO.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import {FitLayout} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import TabController from "../../Tab/Controller/TabController.js";
import FormEngineEventFrameWork from "../../Events/FormEngineEventFrameWork.js";
import ToolbarBindPleaseEvent from "../../Events/ToolbarBindPleaseEvent.js";
import MultiModeButton from "../../Toolbar/StandardButtons/MultiModeButton.js";
import {CoreButtonConstantButton} from "../../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import {EventFrameWork} from "../../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import {HTMLComponent} from "../../../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import WindowTabPanelView from "../View/WindowTabPanelView.js";
import ActiveTabEvent from "../../Tab/Events/ActiveTabEvent.js";
import TabView from "../../Tab/View/TabView.js";
import ViewModuleFactory from "../../../Common/Factory/ViewModuleFactory.js";
import CoreViewModuleDTO from "../../../../Communicate/Models/Response/View/CoreViewModuleDTO.js";
import TabUtil from "../../../Common/TabUtil.js";

export default class WindowController extends BaseController {

    constructor(parentContainer, recordId) {
        super();
        this.recordId = recordId;
        this.parentContainer = parentContainer;
    }

    bindListener() {
        this.view.addListener(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, (baseEvent) => {
            let component = baseEvent.getSource();
            if (component instanceof HTMLComponent) {
                this.setEnableTranslateEventChildController(false);
                this.changeLang(component.getLanguage());
            }
        });
        this.view.addListener(FormEngineEventFrameWork.event.WindowController.ActiveContainerEvent, this.selectedTabChange, this);
        this.view.setParentContainer(this.parentContainer);
    }

    changeLang(coreTranslateLanguageDTO) {
        let coreWindowRequestDTO = new CoreWindowRequestDTO();
        coreWindowRequestDTO.setId(this.recordId);
        coreWindowRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);

        new WebFormEngineWindowServiceClient(this.getView().getParentContainer()).FindWindow(coreWindowRequestDTO, (coreWindowDTO) => {
            this.rebindModelToUi(coreWindowDTO);
            this.setEnableTranslateEventChildController(true);
        });
    }

    rebindModelToUi(coreWindowDTO) {
        if (coreWindowDTO instanceof CoreWindowDTO) {
            coreWindowDTO.getCoreWindowTabDTOMap().forEach((coreWindowTabDTO, uuid) => {
                let tabController = this.childControllersByKeyModel.get(coreWindowTabDTO.getId());
                if (tabController) {
                    tabController.rebindModelToUI(coreWindowTabDTO);
                    this.getView().rebindModelToUI(tabController.getParentContainer(), coreWindowTabDTO.getTranslate());
                }
            });

            if (this.getView().getParentContainer() instanceof TabItem) {
                this.getView().getParentContainer().setTitle(coreWindowDTO.getTranslate());
            }
        }
    }

    initWithRecordID(coreTranslateLanguageDTO) {
        let coreWindowRequestModel = new CoreWindowRequestDTO();
        coreWindowRequestModel.setId(this.recordId);
        coreWindowRequestModel.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);

        new WebFormEngineWindowServiceClient(this.parentContainer).FindWindow(coreWindowRequestModel, (coreWindowDTO) => {
            this.bindModelToUI(coreWindowDTO);
        });
    }

    factoryOfView(coreWindowDTO) {
        if (coreWindowDTO instanceof CoreWindowDTO) {
            let coreViewModuleDTO = coreWindowDTO.getCoreViewModuleDTO();
            if (coreViewModuleDTO instanceof CoreViewModuleDTO) {
                let WindowAbstractViewClazz = ViewModuleFactory.factory(coreViewModuleDTO.getRegisterKey());
                let view;
                if (WindowAbstractViewClazz) {
                    view = new WindowAbstractViewClazz(this);
                } else {
                    view = new WindowTabPanelView(this);
                }
                this.setView(view);
                this.bindListener();
            }
        }
    }

    bindModelToUI(coreWindowDTO) {
        super.bindModelToUI(coreWindowDTO);
        if (coreWindowDTO instanceof CoreWindowDTO) {
            this.factoryOfView(coreWindowDTO);

            this.getView().getParentContainer().setLayout(new FitLayout());
            this.getView().getParentContainer().addItem(this.view);
            this.getView().bindModelToUI(coreWindowDTO);

            let activeController = null;
            let that = this;

            // let coreWindowProfileDTO = coreWindowDTO.getCoreWindowProfileDTO();

            if (coreWindowDTO.getCoreWindowTabDTOMap()) {
                TabUtil.startRefactorTreeTabDTOMap(coreWindowDTO.getCoreWindowTabDTOMap());
                let functionInvoker = coreWindowTabDTO => {
                    let containerOfParent = this.getView().createParentContainerOfTab(coreWindowTabDTO);
                    if (containerOfParent) {
                        let tabController = new TabController();
                        tabController.setCoreWindowDTO(coreWindowDTO);
                        tabController.setParentContainer(containerOfParent);
                        tabController.bindModelToUI(coreWindowTabDTO);
                        tabController.addListener(FormEngineEventFrameWork.event.TabController.ToolbarBindPlease, that.toolbarBindPlease, that);

                        containerOfParent.setData(TabView.Controller, tabController);
                        // tabController.bindProfileModelToUI(coreWindowTabDTO.getCoreWindowTabProfileDTO());

                        if (!activeController)
                            activeController = tabController;

                        this.childControllersByKeyModel.set(coreWindowTabDTO.getId(), tabController);
                        this.childControllersByUUID.set(containerOfParent.getUUID(), tabController);
                        return {
                            [WindowControllerElement.Controller]: tabController,
                            [WindowControllerElement.Container]: containerOfParent
                        }
                    }
                };

                this.getView().generateOfTabContainers(coreWindowDTO, functionInvoker);

                if (activeController) {
                    this.getView().setActiveContainer(activeController.getView().getParentContainer());
                }

                if (this.getView().getParentContainer() instanceof TabItem) {
                    this.getView().getParentContainer().setTitle(coreWindowDTO.getTranslate());
                }
                let multiModeButton = this.getView().findToolbarButton_ByClientUiKey(MultiModeButton.clientUiKey());
                let refreshCommandButton = this.getView().findToolbarButton_ByCommandClientKey(CoreButtonConstantButton().Refresh.description);
                if (multiModeButton) {
                    multiModeButton.fireClickBtn(CoreButtonConstantButton().TableView.description);
                }
                if (refreshCommandButton) {
                    refreshCommandButton.onMouseClick(null);
                }
            }
        }
    }

    toolbarBindPlease(toolbarBindPleaseEvent) {
        if (toolbarBindPleaseEvent instanceof ToolbarBindPleaseEvent) {
            this.getView().setToolbarButtonModel(toolbarBindPleaseEvent.getCoreButtonAssignElementDTOMap());
        }
    }

    selectedTabChange(activeTabEvent) {
        if (activeTabEvent instanceof ActiveTabEvent) {
            let tabController = activeTabEvent.getActiveTabController();
            tabController.fireEventToolbarBindPlease();
        }
    }
}

export const TabMode = {
    NormalTabMode: 'NormalTabMode',
    GraphTabMode: 'GraphTabMode'
}

export const WindowControllerElement = {
    Controller: 'Controller',
    Container: 'Container'
}