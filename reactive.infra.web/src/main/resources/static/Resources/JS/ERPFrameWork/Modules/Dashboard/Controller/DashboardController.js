import BaseController from "../../Common/BaseController.js";
import DashboardView from "../View/DashboardView.js";
import CoreDashboardRequestDTO from "../../../Communicate/Models/Request/Dashboard/CoreDashboardRequestDTO.js";
import WebDashboardService_SearchDashboardItems_Client from "../../../Communicate/XMLHttpRequest/Services/Dashboard/WebDashboardService_SearchDashboardItems_Client.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import WebDashboardService_SearchDashboardViews_Client from "../../../Communicate/XMLHttpRequest/Services/Dashboard/WebDashboardService_SearchDashboardViews_Client.js";
import TemplateLayoutData from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import WebDashboardService_SearchDashboardGadgetViews_Client from "../../../Communicate/XMLHttpRequest/Services/Dashboard/WebDashboardService_SearchDashboardGadgetViews_Client.js";
import WebDashboardService_SearchDashboardGadgets_Client from "../../../Communicate/XMLHttpRequest/Services/Dashboard/WebDashboardService_SearchDashboardGadgets_Client.js";
import CoreAllElementRegisterKeyEnum from "../../../Communicate/Models/Response/Element/CoreAllElementRegisterKeyEnum.js";
import CoreAllElementDetailEnum from "../../../Communicate/Models/Response/Element/CoreAllElementDetailEnum.js";

export default class DashboardController extends BaseController {

    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;

        this.setView(new DashboardView());
        this.getView().setParentContainer(parentContainer);
        this.getView().getParentContainer().setTitle("Dashboard");
    }

    translateModelInvoke(key, translateValue) {
        if (key === CoreAllElementDetailEnum.Name().Items.description) {
            this.getView().dashboardSidePanel.getTabItemItems().setTitle(translateValue);
        } else if (key === CoreAllElementDetailEnum.Name().Configs.description) {
            this.getView().dashboardSidePanel.getTabItemConfig().setTitle(translateValue);
        } else if (key === CoreAllElementDetailEnum.Name().DashboardLayout.description) {
            this.getView().dashboardSidePanel.getTabItemDashboardLayoutListView().setTitle(translateValue);
        } else if (key === CoreAllElementDetailEnum.Name().DashboardTabItem.description) {
            this.getView().getParentContainer().setTitle(translateValue);
        }
    }

    initWithRecordID() {
        this.translateService(CoreAllElementRegisterKeyEnum.RegisterKey().Dashboard.description, this.getView().dashboardSidePanel);

        let that = this;
        let coreDashboardRequestDTO = new CoreDashboardRequestDTO();
        coreDashboardRequestDTO.setId(this.recordId);

        new WebDashboardService_SearchDashboardItems_Client(this.getView().dashboardSidePanel).SearchDashboardItems(coreDashboardRequestDTO, (coreDashboardItemDTOArray) => {
            that.getView().dashboardSidePanel.getDashboardSidePanelItems().accordion.renderRecords(coreDashboardItemDTOArray);
            that.getView().dashboardSidePanel.getDashboardSidePanelItems().accordion.addListener(EventFrameWork.event.Components.Accordion.Select, (accordionEvent) => {
                that.bindCoreDashboardItem(accordionEvent.model);
            });
        });

        new WebDashboardService_SearchDashboardViews_Client(this.getView().dashboardSidePanel.getTabItemDashboardLayoutListView()).SearchDashboardViews(coreDashboardRequestDTO, (coreDashboardViewDTOArray) => {
            if (coreDashboardViewDTOArray instanceof Array) {
                coreDashboardViewDTOArray.forEach((coreDashboardViewDTO) => {
                    that.getView().dashboardSidePanel.getTabItemDashboardLayoutListView().addItemData([{
                        Value: coreDashboardViewDTO
                    }, {
                        Name: 'DisplayName', Data: {
                            id: coreDashboardViewDTO.getId(), Display: coreDashboardViewDTO.getTranslate()
                        }
                    }, {
                        Name: 'ClassName', Data: {
                            Display: "Cholmang"
                        }
                    }], TemplateLayoutData.factory('<div> <p class="%ClassName%">%DisplayName%</p </div>'));
                });
            }
        });
    }

    bindCoreDashboardItem(coreDashboardItemDTO) {
        let that = this;
        this.getView().dashboardGadgets.clearItems();
        this.getView().dashboardCenterContainerGadgetViews.clearItems();

        let searchDashboardGadgetViewsClient = new WebDashboardService_SearchDashboardGadgetViews_Client(this.getView().dashboardCenterContainerGadgetViews);
        searchDashboardGadgetViewsClient.SearchDashboardGadgetViews(coreDashboardItemDTO, (coreDashboardGadgetViewDTOArray) => {

        });

        let serviceSearchDashboardGadgetsClient = new WebDashboardService_SearchDashboardGadgets_Client(this.getView().dashboardGadgets);
        serviceSearchDashboardGadgetsClient.SearchDashboardGadgets(coreDashboardItemDTO, (coreDashboardGadgetDTOArray) => {
            if (coreDashboardGadgetDTOArray instanceof Array) {
                coreDashboardGadgetDTOArray.forEach((coreDashboardGadgetDTO) => {
                    that.getView().dashboardGadgets.addItemData([{
                        Value: coreDashboardGadgetDTO
                    }, {
                        Name: 'DisplayName', Data: {
                            id: coreDashboardGadgetDTO.getId(), Display: coreDashboardGadgetDTO.getTranslate()
                        }
                    }, {
                        Name: 'ClassName', Data: {
                            Display: "Cholmang"
                        }
                    }], TemplateLayoutData.factory('<div> <p class="%ClassName%">%DisplayName%</p </div>'));
                });
            }
        });
    }
}