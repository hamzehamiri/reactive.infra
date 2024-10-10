import BaseController from "../../../Common/BaseController.js";
import AnalyticReportView from "../View/AnalyticReportView.js";
import AnalyticReportService_Load from "../../../../Communicate/XMLHttpRequest/Services/Analytic/AnalyticReportService_Load.js";
import AnalyticReportRequestDTO from "../../../../Communicate/Models/Request/Analytic/Report/AnalyticReportRequestDTO.js";
import CoreAnalyticReportMetaDataDTO from "../../../../Communicate/Models/Response/Analytic/Report/CoreAnalyticReportMetaDataDTO.js";
import TemplateLayoutData from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Template/TemplateLayoutData.js";
import PivotGridComponent from "../../../../../UIFrameWork/HTML/Cells/Pivot/PivotGridComponent.js";
import CoreAllElementRegisterKeyEnum from "../../../../Communicate/Models/Response/Element/CoreAllElementRegisterKeyEnum.js";
import CoreAllElementDetailEnum from "../../../../Communicate/Models/Response/Element/CoreAllElementDetailEnum.js";
import ButtonUtil from "../../../Common/ButtonUtil.js";
import {RowLayoutData} from "../../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import FormEngineEventFrameWork from "../../../FormEngine/Events/FormEngineEventFrameWork.js";
import {AnalyticReportConstant} from "../Command/AnalyticReportConstant.js";
import TabItem from "../../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";

export default class AnalyticReportController extends BaseController {

    constructor(parentContainer, recordId) {
        super();

        this.recordId = recordId;

        this.setView(new AnalyticReportView());
        this.getView().setParentContainer(parentContainer);
    }

    translateModelInvoke(key, translateValue) {
        if (key && key === CoreAllElementDetailEnum.Name().Items) {

        }
    }

    buttonEvent(buttonEvent) {
        ButtonUtil.ButtonHandleEvent(buttonEvent, this);
    }

    bindModelFromUi() {
        let coreAnalyticReportMetaDataDTO = this.model instanceof CoreAnalyticReportMetaDataDTO ? this.model : new CoreAnalyticReportMetaDataDTO();
        let fieldMap = coreAnalyticReportMetaDataDTO.getCoreAnalyticReportFieldDTOMap();
        if (fieldMap == null) {
            fieldMap = new Map();
        }
        coreAnalyticReportMetaDataDTO.setCoreAnalyticReportFieldDTOMap(fieldMap);

        let fieldDropListView_Filter_Model = this.getFieldDropListView(this.getView().getPivotGridComponent().getFieldDropListView(PivotGridComponent.Region().Filter));
        if (fieldDropListView_Filter_Model.Data.length > 0)
            fieldMap.set(PivotGridComponent.Region().Filter.description, fieldDropListView_Filter_Model.Data);
        let fieldDropListView_Data_Model = this.getFieldDropListView(this.getView().getPivotGridComponent().getFieldDropListView(PivotGridComponent.Region().Data));
        if (fieldDropListView_Data_Model.Data.length > 0)
            fieldMap.set(PivotGridComponent.Region().Data.description, fieldDropListView_Data_Model.Data);
        let fieldDropListView_Column_Model = this.getFieldDropListView(this.getView().getPivotGridComponent().getFieldDropListView(PivotGridComponent.Region().Column));
        if (fieldDropListView_Column_Model.Data.length > 0)
            fieldMap.set(PivotGridComponent.Region().Column.description, fieldDropListView_Column_Model.Data);
        let fieldDropListView_Row_Model = this.getFieldDropListView(this.getView().getPivotGridComponent().getFieldDropListView(PivotGridComponent.Region().Row));
        if (fieldDropListView_Row_Model.Data.length > 0)
            fieldMap.set(PivotGridComponent.Region().Row.description, fieldDropListView_Row_Model.Data);

        return coreAnalyticReportMetaDataDTO;
    }

    bindModelToUI(model) {
        super.bindModelToUI(model);
        if (this.getView().getParentContainer() instanceof TabItem) {
            this.getView().getParentContainer().setTitle("AnalyticReport");
        }
    }

    getFieldDropListView(fieldDropListView) {
        let arrayOfCoreAnalyticReportFieldDTO = [];
        fieldDropListView.getItems().forEach((pivotFieldComponent, uuid) => {
            let coreAnalyticReportFieldDTO = pivotFieldComponent.getData().get(AnalyticReportConstant.CoreAnalyticReportFieldDTO);
            arrayOfCoreAnalyticReportFieldDTO.push(coreAnalyticReportFieldDTO);
        });
        return {
            Region: fieldDropListView.getRegion(),
            Data: arrayOfCoreAnalyticReportFieldDTO
        };
    }

    initWithRecordID() {
        this.translateService(CoreAllElementRegisterKeyEnum.RegisterKey().AnalyticReport.description, this.getView().getPivotGridComponent());

        let analyticReportRequestDTO = new AnalyticReportRequestDTO();
        analyticReportRequestDTO.setId(this.recordId);

        let service = new AnalyticReportService_Load(this.getView());
        service.Load(analyticReportRequestDTO, (coreAnalyticReportMetaDataDTOArray) => {
            if (coreAnalyticReportMetaDataDTOArray instanceof Array) {
                coreAnalyticReportMetaDataDTOArray.forEach(coreAnalyticReportMetaDataDTO => {
                    if (coreAnalyticReportMetaDataDTO instanceof CoreAnalyticReportMetaDataDTO) {
                        this.bindModelToUI(coreAnalyticReportMetaDataDTO);
                        let listView = this.getView().getAnalyticReportSidePanel().getAnalyticReportSidePanelFields().getListView();
                        listView.clearItems();

                        ButtonUtil.createButtonAction(coreAnalyticReportMetaDataDTO.getCoreButtonAssignElementDTOMap(), (id, buttonInstance) => {
                            buttonInstance.addListener(FormEngineEventFrameWork.event.ButtonAction.CommandExecute, this.buttonEvent, this);
                            this.getView().getAnalyticReportToolbar().addItem(buttonInstance, RowLayoutData.factory(48, 1, 0, 3, 0, 0));
                        });

                        let coreAnalyticReportFieldDTOMap = coreAnalyticReportMetaDataDTO.getCoreAnalyticReportFieldDTOMap();
                        coreAnalyticReportFieldDTOMap.forEach((coreAnalyticReportFieldDTOArray, coreAnalyticReportFieldRegionEnumDTOKey) => {
                            switch (coreAnalyticReportFieldRegionEnumDTOKey) {
                                case PivotGridComponent.Region().None.description:
                                    coreAnalyticReportFieldDTOArray.forEach(coreAnalyticReportFieldDTO => {
                                        listView.addItemData([
                                            {
                                                Value: coreAnalyticReportFieldDTO
                                            },
                                            {
                                                Name: 'DisplayName',
                                                Data: {
                                                    id: coreAnalyticReportFieldDTO.getId(),
                                                    Display: coreAnalyticReportFieldDTO.getTitle()
                                                }
                                            }, {
                                                Name: 'ClassName',
                                                Data: {
                                                    Display: "this.getItemTagPClass()"
                                                }
                                            }], TemplateLayoutData.factory('<div> <p class="%ClassName%">%DisplayName%</p </div>'));
                                    });
                                    break;
                            }
                        });
                    }
                });
            }

        });
    }
}