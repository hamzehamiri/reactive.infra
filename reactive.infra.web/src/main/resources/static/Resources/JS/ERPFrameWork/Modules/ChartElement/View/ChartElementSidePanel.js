import TabPanelHTML from "../../../../UIFrameWork/HTML/TabPanel/TabPanelHTML.js";
import TabItem from "../../../../UIFrameWork/HTML/TabPanel/Containers/TabItem.js";
import ChartElementConfigDataContainer from "./TabItemContainer/ChartElementConfigDataContainer.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import ChartElementPropertiesContainer from "./TabItemContainer/ChartElementPropertiesContainer.js";
import ChartElementSeriesRowContainer from "./TabItemContainer/Series/ChartElementSeriesRowContainer.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import {EventFrameWork} from "../../../../UIFrameWork/Shared/Event/EventFrameWork.js";
import BaseEvent from "../../../../UIFrameWork/Shared/Event/BaseEvent.js";
import TabUtil from "../../Common/TabUtil.js";

export default class ChartElementSidePanel extends TabPanelHTML {
    constructor() {
        super();

        let functionAddCallBack = (baseEvent) => {
            let coreWindowTabFieldPageDataDTOs = TabUtil.ConvertCoreWindowTabToPageDataDTOs(this.model.getCoreWindowTabFieldDTOMap());

            let newChartElementSeriesRowContainer = new ChartElementSeriesRowContainer();
            newChartElementSeriesRowContainer.addListener(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Add, functionAddCallBack);
            newChartElementSeriesRowContainer.addListener(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Remove, functionRemoveCallBack);
            newChartElementSeriesRowContainer.bindModelToUI(coreWindowTabFieldPageDataDTOs);
            this.chartElementConfigDataContainer.getContainerSeries().addItem(newChartElementSeriesRowContainer, RowLayoutData.factory(1, 40, 1, 1, 1, 1, true));
        }

        let functionRemoveCallBack = (baseEvent) => {
            if (baseEvent instanceof BaseEvent) {
                let chartElementSeriesRowContainer = baseEvent.getSource();
                if (this.chartElementConfigDataContainer.getContainerSeries().getItems().size > 1) {
                    if (chartElementSeriesRowContainer instanceof ChartElementSeriesRowContainer) {
                        this.chartElementConfigDataContainer.getContainerSeries().removeItem(chartElementSeriesRowContainer);
                    }
                }
            }
        }

        let firstChartElementSeriesRowContainer = new ChartElementSeriesRowContainer();
        firstChartElementSeriesRowContainer.addListener(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Add, functionAddCallBack);
        firstChartElementSeriesRowContainer.addListener(EventFrameWork.event.Components.ChartElementSeriesRowContainer.ChartElementSeries_Remove, functionRemoveCallBack);

        this.chartElementConfigDataContainer = new ChartElementConfigDataContainer();
        this.chartElementConfigDataContainer.getContainerSeries().addItem(firstChartElementSeriesRowContainer, RowLayoutData.factory(1, 40, 1, 1, 1, 1, true));

        let chartElementPropertiesContainer = new ChartElementPropertiesContainer();

        this.tabItemConfigData = new TabItem();
        this.tabItemConfigData.setTitle("Config Data");
        this.tabItemConfigData.setLayout(new FitLayout(true, 'hidden'));
        this.tabItemConfigData.addItem(this.chartElementConfigDataContainer);

        this.tabItemChartProperties = new TabItem();
        this.tabItemChartProperties.setTitle("Chart Properties");
        this.tabItemChartProperties.setLayout(new FitLayout(true));
        this.tabItemChartProperties.addItem(chartElementPropertiesContainer);

        this.setActiveTabItem(this.tabItemConfigData);

        this.addItem(this.tabItemConfigData);
        this.addItem(this.tabItemChartProperties);
    }

    bindModelToUI(model) {
        this.model = model;
        if (this.chartElementConfigDataContainer.getContainerSeries()) {
            this.chartElementConfigDataContainer.getContainerSeries().getItems().forEach((chartElementSeriesRowContainer) => {
                if (chartElementSeriesRowContainer instanceof ChartElementSeriesRowContainer) {
                    let coreWindowTabFieldPageDataDTOs = TabUtil.ConvertCoreWindowTabToPageDataDTOs(model.getCoreWindowTabFieldDTOMap());
                    chartElementSeriesRowContainer.bindModelToUI(coreWindowTabFieldPageDataDTOs);
                }
            });
        }
    }

    bindUiToModel() {
        let chartElementConfigSeriesRowDTOMap = new Map();
        if (this.chartElementConfigDataContainer.getContainerSeries()) {
            this.chartElementConfigDataContainer.getContainerSeries().getItems().forEach((chartElementSeriesRowContainer) => {
                if (chartElementSeriesRowContainer instanceof ChartElementSeriesRowContainer) {
                    let chartElementConfigSeriesRowDTO = chartElementSeriesRowContainer.bindUiToModel();
                    chartElementConfigSeriesRowDTOMap.set(chartElementConfigSeriesRowDTO.getUUID(), chartElementConfigSeriesRowDTO);
                }
            });
        }
        return chartElementConfigSeriesRowDTOMap;
    }

    getChartElementConfigDataContainer() {
        return this.chartElementConfigDataContainer;
    }

    getTabItemConfigData() {
        return this.tabItemConfigData;
    }

    getTabItemChartProperties() {
        return this.tabItemChartProperties;
    }
}