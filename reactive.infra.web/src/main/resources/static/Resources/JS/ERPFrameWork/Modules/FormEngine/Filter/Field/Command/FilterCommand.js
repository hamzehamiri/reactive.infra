import CommandFactory from "../../../../Common/Factory/CommandFactory.js";
import {CoreButtonConstantButton} from "../../../../../Communicate/Models/Response/Button/CoreButtonConstantButton.js";
import {ClientLogger, LogLevel} from "../../../../../../UIFrameWork/Shared/Logger/ClientLogger.js";
import FilterController from "../FilterController.js";

export default class FilterCommand {
    static Init() {
        CommandFactory.register(CoreButtonConstantButton().SaveFilter.description, FilterCommand.SaveFilter);
        CommandFactory.register(CoreButtonConstantButton().AddRowFilter.description, FilterCommand.AddRowFilter);
        CommandFactory.register(CoreButtonConstantButton().ResetFilter.description, FilterCommand.ResetFilter);
        CommandFactory.register(CoreButtonConstantButton().RedoFilter.description, FilterCommand.RedoFilter);
        CommandFactory.register(CoreButtonConstantButton().UndoFilter.description, FilterCommand.UndoFilter);
    }

    static SaveFilter(filterController) {
        ClientLogger.Log(LogLevel.Info, "Save Filter");
    }

    static AddRowFilter(filterController) {
        ClientLogger.Log(LogLevel.Info, "Add Row Filter");
    }

    static ResetFilter(filterController) {
        if (filterController instanceof FilterController) {

        }
        ClientLogger.Log(LogLevel.Info, "Reset Filter");
    }

    static RedoFilter(filterController) {
        ClientLogger.Log(LogLevel.Info, "Redo Filter");
    }

    static UndoFilter(filterController) {
        ClientLogger.Log(LogLevel.Info, "Undo Filter");
    }
}