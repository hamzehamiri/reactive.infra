import BaseController from "../../Common/BaseController.js";
import ChartElementView from "../View/ChartElementView.js";
import CoreAllElementRegisterKeyEnum from "../../../Communicate/Models/Response/Element/CoreAllElementRegisterKeyEnum.js";
import CoreAllElementDetailEnum from "../../../Communicate/Models/Response/Element/CoreAllElementDetailEnum.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import CoreWindowTabResponseSearchDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabResponseSearchDTO.js";
import ChartElementConfigSeriesRowDTO from "../../../Communicate/Models/Response/ChartElement/ChartElementConfigSerieDTO.js";
import DataProviderAbstract from "../../../Communicate/Common/DataProvider/DataProviderAbstract.js";
import Utils from "../../Common/Utils.js";

export default class ChartElementController extends BaseController {
    constructor(parentContainer, coreAllElement, recordId, tabController) {
        super();

        this.coreAllElement = coreAllElement;
        this.recordId = recordId;
        this.tabController = tabController;

        let view = new ChartElementView();
        this.setView(view);
        this.getView().setParentContainer(parentContainer);
    }

    translateModelInvoke(key, translateValue) {
        if (key === CoreAllElementDetailEnum.Name().ConfigData.description) {
            this.view.getChartElementSidePanel().getTabItemConfigData().setTitle(translateValue);
        } else if (key === CoreAllElementDetailEnum.Name().PropertiesChartPanel.description) {
            this.view.getChartElementSidePanel().getTabItemChartProperties().setTitle(translateValue);
        }
    }

    bindModelToUI(coreWindowTabDTO) {
        super.bindModelToUI(coreWindowTabDTO);
        this.translateService(CoreAllElementRegisterKeyEnum.RegisterKey().ChartElement.description, this.getView());
        this.getView().bindModelToUI(coreWindowTabDTO);
        this.getView().getChartElementSidePanel().getChartElementConfigDataContainer().getApplyButton().addListener(EventFrameWork.event.MouseEvent.click, () => {
            this.tabController.refreshCommand((coreWindowTabResponseSearchDTOArray) => {
                this.getView().getHeightChartPanel().removeAddSeries();
                let mapFieldValuesArray = new Map();
                if (coreWindowTabResponseSearchDTOArray instanceof Array) {
                    coreWindowTabResponseSearchDTOArray.forEach((coreWindowTabResponseSearchDTO) => {
                        if (coreWindowTabResponseSearchDTO instanceof CoreWindowTabResponseSearchDTO) {
                            let mapFieldValues = coreWindowTabResponseSearchDTO.getRecordModelDTO().getFieldValues();
                            mapFieldValues.forEach((fieldValue, id) => {
                                let fieldValuesArray = mapFieldValuesArray.get(id);
                                if (!fieldValuesArray) {
                                    fieldValuesArray = []
                                    mapFieldValuesArray.set(id, fieldValuesArray);
                                }
                                if (fieldValue instanceof DataProviderAbstract) {
                                    fieldValuesArray.push(fieldValue.getKey());
                                }
                            });
                        }
                    });
                }

                let chartElementConfigSeriesRowDTOMap = this.getView().getChartElementSidePanel().bindUiToModel();
                chartElementConfigSeriesRowDTOMap.forEach((chartElementConfigSeriesRowDTO, uuid) => {
                    if (chartElementConfigSeriesRowDTO instanceof ChartElementConfigSeriesRowDTO) {
                        let xValueArray = mapFieldValuesArray.get(chartElementConfigSeriesRowDTO.getXField().getId());
                        let yValueArray = mapFieldValuesArray.get(chartElementConfigSeriesRowDTO.getYField().getId());
                        let data = Utils.MergeData(xValueArray, yValueArray);
                        this.getView().getHeightChartPanel().addSeries(chartElementConfigSeriesRowDTO.getSeriesName(), data, chartElementConfigSeriesRowDTO.getDataProviderColorRGBA().getRGBCssColor());
                    }
                });
            });
        }, this);
    }
}