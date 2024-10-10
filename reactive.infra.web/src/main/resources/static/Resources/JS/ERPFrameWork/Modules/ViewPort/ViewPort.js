import {SideLayout} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayout.js";
import {DOM} from "../../../UIFrameWork/Shared/Common/DOM.js";
import WebAdvancedTree from "../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/WebAdvancedTree.js";
import {RegisterComponent} from "../../../UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import {UiFrameWorkComponent} from "../../../UIFrameWork/HTML/ThemeLanguage/Theme.js";
import {WebMenuServiceClient} from "../../Communicate/XMLHttpRequest/Services/Menu/WebMenuServiceClient.js";
import TreeGridDescriptor from "../../../UIFrameWork/HTML/Cells/Common/TreeGridDescriptor.js";
import {EventFrameWork} from "../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import AdvancedTreeEvent from "../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/AdvancedTreeEvent.js";
import Module from "../Common/Module.js";
import WebEnvironment from "../../Communicate/Common/WebEnvironment.js";
import ERPTabPanel from "../Components/ERPTabPanel.js";
import ModuleFactory from "../Common/Factory/ModuleFactory.js";
import ProfileContainer from "./ProfileContainer.js";
import {HTMLComponent} from "../../../UIFrameWork/HTML/Component/HTMLComponent.js";
import CoreMenuRequestDTO from "../../Communicate/Models/Request/Menu/CoreMenuRequestDTO.js";
import AdvancedMenu, {AdvancedMenuItem} from "../../../UIFrameWork/HTML/Cells/Tree/AdvancedTree/Menu/AdvancedMenu.js";
import BaseEvent from "../../../UIFrameWork/Shared/Event/BaseEvent.js";
import {SideLayoutData} from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Side/SideLayoutData.js";
import ViewPortLayoutDataDTO from "../../Communicate/Models/Response/Profile/ViewPort/ViewPortLayoutDataDTO.js";
import ItemDataDTO from "../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/ItemData/ItemDataDTO.js";
import MenuFactory from "../Menu/MenuFactory.js";
import HTMLContainer from "../../../UIFrameWork/HTML/Container/HTMLContainer.js";
import CoreAllElementFunctionUtil from "../../../UIFrameWork/HTML/Cells/Common/CoreAllElementFunctionUtil.js";
import FileSystemUtil from "../FileSystem/FileSystemUtil.js";

export default class ViewPort extends HTMLContainer {
    constructor() {
        super();

        let sideLayout = new SideLayout();
        sideLayout.setDistancePercent(10);

        let erpTabPanel = new ERPTabPanel();
        let profileContainer = new ProfileContainer();

        let webAdvancedTreeMenu = new AdvancedMenu();
        webAdvancedTreeMenu.addListener(EventFrameWork.event.Components.MenuEvents.MenuEventsItemSelect, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let itemDataDTO = baseEvent.getDataKey().get(AdvancedMenuItem.ItemData);
                if (itemDataDTO instanceof ItemDataDTO) {
                    this.changeLang(RegisterComponent.getCurrentLanguage());
                }
            }
        });

        this.menu = new WebAdvancedTree();
        this.menu.setContextMenu(webAdvancedTreeMenu);
        this.menu.setTreeGridDescriptor(new TreeGridDescriptor("translate", "id", 'coreMenuParentId', (record, imgTag) => {
            let coreAllElementDTOArrayRecordId = CoreAllElementFunctionUtil.CoreMenuToCoreAllElementFunction(record);
            FileSystemUtil.RequestIconDownload(imgTag, coreAllElementDTOArrayRecordId[0] != null ? coreAllElementDTOArrayRecordId[0].getId() : null, coreAllElementDTOArrayRecordId[1]);
        }));
        this.menu.addListener(EventFrameWork.event.Components.Tree.SelectedTreeNode, (advancedTreeEvent) => {
            if (advancedTreeEvent instanceof AdvancedTreeEvent) {
                let coreMenuDTO = advancedTreeEvent.getTreeNodeSelected();

                this.menu.setSelectedNode(coreMenuDTO);

                let ModuleInvoke = ModuleFactory.factoryByCoreAllElement(coreMenuDTO.getCoreAllElementDTO());
                if (ModuleInvoke) {
                    let module = new ModuleInvoke();
                    if (module instanceof Module) {
                        let tabItem = WebEnvironment.GetERPMainPageView().getViewPort().getERPTabPanel().createTabItem("Initial");
                        module.createAndAttachModule(tabItem, coreMenuDTO.getCoreMenuRecordId(), WebEnvironment.GetCoreTranslateLanguageDTO());

                        erpTabPanel.setActiveTabItem(tabItem);
                    }
                }
            }
        }, this);

        this.setElement(DOM.createElement('div'));
        this.setLayout(sideLayout);
        this.setDataElement(ViewPort.ERPTabPanel, erpTabPanel);
        this.setDataElement(ViewPort.Menu, this.menu);

        let layoutDataViewPort = WebEnvironment.GetLayoutDataViewPort();

        this.addItem(profileContainer, layoutDataViewPort.getTop());
        this.addItem(this.menu, layoutDataViewPort.getLeft());
        this.addItem(erpTabPanel, layoutDataViewPort.getCenter());
        this.bindTheme();
        this.changeLang(RegisterComponent.getCurrentLanguage());

        MenuFactory.CreateMenuItem(this);

        this.addListener(EventFrameWork.event.Components.BaseComponent.ChangeLanguage, (baseEvent) => {
            let component = baseEvent.getSource();
            if (component instanceof HTMLComponent) {
                this.changeLang(component.getLanguage());
            }
        });

        this.addListener(EventFrameWork.event.Components.SideLayoutEvents.SideLayoutEventsResize, (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let layoutData = baseEvent.getSource();
                if (layoutData instanceof SideLayoutData) {
                    if (layoutDataViewPort instanceof ViewPortLayoutDataDTO) {
                        switch (layoutData.getSide()) {
                            case SideLayoutData.Side.Top:
                                layoutDataViewPort.setTop(layoutData);
                                break;
                            case SideLayoutData.Side.Left:
                                layoutDataViewPort.setLeft(layoutData);
                                break;
                            case SideLayoutData.Side.Center:
                                layoutDataViewPort.setCenter(layoutData);
                                break;
                        }
                        WebEnvironment.SetLayoutDataViewPort(layoutDataViewPort);
                    }
                }
            }
        });
    }

    changeLang(coreTranslateLanguageDTO) {
        this.menu.removeNodes();
        let coreMenuRequestDTO = new CoreMenuRequestDTO();
        coreMenuRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);

        new WebMenuServiceClient(this.menu).MenuItems(coreMenuRequestDTO, (menuItemArray) => {
            this.menu.addRecords(menuItemArray);
        });
    }

    bindTheme() {
        super.bindTheme();
        this.setThemeComponent(RegisterComponent.getCurrentThemeByComponentName(UiFrameWorkComponent.Components.ViewPort[0]));
    }

    onLoad() {
        super.onLoad();

        DOM.addClassName(this.getElement(), this.getViewPortMasterDivClass());
    }

    getViewPortMasterDivClass() {
        return this.getClassNamesByElement(UiFrameWorkComponent.Components.ViewPort[1].ViewPortMasterDiv);
    }

    getERPTabPanel() {
        return this.getDataElement().get(ViewPort.ERPTabPanel);
    }

    getERPMenu() {
        return this.getDataElement().get(ViewPort.Menu);
    }
}

ViewPort.ERPTabPanel = 'ERPTabPanel';
ViewPort.Menu = 'Menu';