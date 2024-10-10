import ModuleFactory from "./Common/Factory/ModuleFactory.js";
import WindowModule from "./FormEngine/Window/WindowModule.js";
import TabModule from "./FormEngine/Tab/TabModule.js";
import ProcessModule from "./FormEngine/Process/ProcessModule.js";
import DashboardModule from "./Dashboard/DashboardModule.js";
import AnalyticReportModule from "./Analytic/Report/AnalyticReportModule.js";
import AnalyticKPIModule from "./Analytic/KPI/AnalyticKPIModule.js";
import WizardModule from "./Wizard/WizardModule.js";
import WizardValidationFactory from "./Common/Factory/WizardValidationFactory.js";
import UMLDesignerModule from "./UMLDesigner/UMLDesignerModule.js";
import ViewModuleFactory from "./Common/Factory/ViewModuleFactory.js";
import WorkflowDesignerModule from "./Workflow/WorkflowDesignerModule.js";
import KanbanDesignerModule from "./Kanban/KanbanDesignerModule.js";
import WindowGeneratorModule from "./FormEngine/WindowGenerator/WindowGeneratorModule.js";

export default class StandardModules {
    static Init() {
        ModuleFactory.Init();
        ViewModuleFactory.Init();
        WizardValidationFactory.Init();

        TabModule.Init();
        WindowModule.Init();
        ProcessModule.Init();
        DashboardModule.Init();
        WizardModule.Init();
        AnalyticReportModule.Init();
        AnalyticKPIModule.Init();
        UMLDesignerModule.Init();
        WorkflowDesignerModule.Init();
        KanbanDesignerModule.Init();
        WindowGeneratorModule.Init();
    }
}