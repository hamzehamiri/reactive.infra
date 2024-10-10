import CommandFactory from "../../../Common/Factory/CommandFactory.js";
import {ClientLogger, LogLevel} from "../../../../../UIFrameWork/Shared/Logger/ClientLogger.js";
import AnalyticReportController from "../Controller/AnalyticReportController.js";
import AnalyticReportService_Refresh from "../../../../Communicate/XMLHttpRequest/Services/Analytic/AnalyticReportService_Refresh.js";
import {CoreButtonConstantButton} from "../../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";

export default class AnalyticReportCommand {
    static Init() {
        CommandFactory.register(CoreButtonConstantButton().SaveAnalytic.description, AnalyticReportCommand.SaveAnalyticCommand);
        CommandFactory.register(CoreButtonConstantButton().NewAnalytic.description, AnalyticReportCommand.NewAnalyticCommand);
        CommandFactory.register(CoreButtonConstantButton().RefreshManualAnalytic.description, AnalyticReportCommand.RefreshManualAnalyticCommand);
    }

    static SaveAnalyticCommand(analyticReportController) {
        ClientLogger.Log(LogLevel.Error, "Save Analytic");
        if (analyticReportController instanceof AnalyticReportController) {

        }
    }

    static NewAnalyticCommand(analyticReportController) {
        ClientLogger.Log(LogLevel.Error, "New Analytic");
        if (analyticReportController instanceof AnalyticReportController) {

        }
    }

    static RefreshManualAnalyticCommand(analyticReportController) {
        ClientLogger.Log(LogLevel.Error, "Refresh Manual Analytic");
        if (analyticReportController instanceof AnalyticReportController) {
            let coreAnalyticReportMetaDataDTO = analyticReportController.bindModelFromUi();
            let service = new AnalyticReportService_Refresh(analyticReportController.getView());
            service.Refresh(coreAnalyticReportMetaDataDTO, (coreAnalyticReportPivotGridArray) => {

            });
        }
    }
}