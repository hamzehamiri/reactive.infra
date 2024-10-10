import CommandFactory from "../../Common/Factory/CommandFactory.js";
import {CoreButtonConstantButton} from "../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import {ClientLogger, LogLevel} from "../../../../UIFrameWork/Shared/Logger/ClientLogger.js";
import ErpWindow from "../../Components/ErpWindow.js";
import {FitLayout} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Fit/FitLayout.js";
import {BodyElementWidget} from "../../../../UIFrameWork/HTML/Widget/BodyElementWidget.js";
import {RowLayout, RowLayout_Mode} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayout.js";
import {RowLayoutData} from "../../../../UIFrameWork/HTML/Container/Layout/Sizeable/Normal/Row/RowLayoutData.js";
import ChartElementController from "../Controller/ChartElementController.js";
import TabController from "../../FormEngine/Tab/Controller/TabController.js";
import CoreWindowTabDTO from "../../../Communicate/Models/Response/Window/Tab/CoreWindowTabDTO.js";
import ConfirmPanel, {ConfirmPanelEvent} from "../../Common/Confirm/ConfirmPanel.js";
import HTMLContainer from "../../../../UIFrameWork/HTML/Container/HTMLContainer.js";

export default class ChartElementCommand {
    static Init() {
        CommandFactory.register(CoreButtonConstantButton().ChartElementTabButton.description, ChartElementCommand.ChartElementCommandButton);
    }

    static ChartElementCommandButton(tabController) {
        ClientLogger.Log(LogLevel.Debug, "ChartElementTabButton");

        let containerChartElement = new HTMLContainer();
        containerChartElement.setLayout(new FitLayout());

        let confirmContainer = new ConfirmPanel();
        confirmContainer.addListener(ConfirmPanelEvent.CancelEvent, () => {
            erpWindow.hide();
        });

        let erpWindow = new ErpWindow(true, true, true, false);
        erpWindow.setScrollTypeY(null);
        erpWindow.setBaseHeight(400);
        erpWindow.setHideOnOtherClick(false);
        erpWindow.getContent().setLayout(new FitLayout());
        erpWindow.showCenterElement(BodyElementWidget.get(), 1200);
        erpWindow.getContent().setLayout(new RowLayout(RowLayout_Mode.Vertical));
        erpWindow.getContent().addItem(containerChartElement, RowLayoutData.factory(1, 1, 0, 0, 0, 0, true));
        erpWindow.getContent().addItem(confirmContainer, RowLayoutData.factory(1, 40, 0, 0, 0, 0, true));
        erpWindow.addDragElementMatcherFunction((event) => {
            return !containerChartElement.containElement(event);
        });

        if (tabController instanceof TabController) {
            let coreWindowTabDTO = tabController.getModel();
            if (coreWindowTabDTO instanceof CoreWindowTabDTO) {
                let chartElementController = new ChartElementController(containerChartElement, coreWindowTabDTO.getCoreAllElementDTO(), coreWindowTabDTO.getId(), tabController);
                chartElementController.bindModelToUI(coreWindowTabDTO);
            }
        }
    }
}