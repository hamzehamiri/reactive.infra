import {DateConverter} from "./UIFrameWork/Shared/Common/Date/DateConverter.js";
import ScriptManagerUtil from "./UIFrameWork/Shared/Common/ScriptManagerUtil.js";
import WebEditorFactory from "./ERPFrameWork/Modules/FormEngine/WebEditors/Factory/WebEditorFactory.js";
import ButtonFactory from "./ERPFrameWork/Modules/FormEngine/WebEditors/Factory/ButtonFactory.js";
import BaseController from "./ERPFrameWork/Modules/Common/BaseController.js";
import StandardButtons from "./ERPFrameWork/Modules/FormEngine/Toolbar/StandardButtons.js";
import GlobalFactoryRegister from "./UIFrameWork/Shared/Common/GlobalFactoryRegister.js";
import CommandFactory from "./ERPFrameWork/Modules/Common/Factory/CommandFactory.js";
import TabCommand from "./ERPFrameWork/Modules/FormEngine/Commands/TabCommand.js";
import StandardModules from "./ERPFrameWork/Modules/StandardModules.js";
import StandardWebService from "./ERPFrameWork/Communicate/WebSocket/NewService/StandardWebService.js";
import WebSocketSingleton from "./ERPFrameWork/Communicate/WebSocket/Base/WebSocketSingleton.js";
import GadgetFactory from "./ERPFrameWork/Modules/Dashboard/View/Gadgets/GadgetFactory.js";
import DataProviderFactory from "./ERPFrameWork/Communicate/Common/DataProvider/DataProviderFactory.js";
import AnalyticReportCommand from "./ERPFrameWork/Modules/Analytic/Report/Command/AnalyticReportCommand.js";
import SerializerFactory from "./ERPFrameWork/Modules/FormEngine/WebEditors/Serializers/SerializerFactory.js";
import {Util} from "./UIFrameWork/Shared/Common/Util.js";
import {PopupManager} from "./UIFrameWork/HTML/Popup/PopupManager.js";
import LayoutDataFactory from "./ERPFrameWork/Modules/Common/Factory/LayoutDataFactory.js";
import LayoutFactory from "./ERPFrameWork/Modules/Common/Factory/LayoutFactory.js";
import WizardCommand from "./ERPFrameWork/Modules/Wizard/Commands/WizardCommand.js";
import FilterCommand from "./ERPFrameWork/Modules/FormEngine/Filter/Field/Command/FilterCommand.js";
import ChartElementCommand from "./ERPFrameWork/Modules/ChartElement/Commands/ChartElementCommand.js";
import {RegisterComponent} from "./UIFrameWork/Shared/BaseShared/RegisterComponent.js";
import WebAttachmentCentralProxy from "./ERPFrameWork/Modules/FormEngine/WebEditors/Containers/Attachment/WebAttachmentCentralProxy.js";

class A {
    foo() {
        console.log('Method from A');
    }
}

// Mixin B
const B = (Base) => class extends Base {
    foo() {
        super.foo(); // Call the method from the base class
        console.log('Method from B');
    }
};

// Mixin C
const C = (Base) => class extends Base {
    foo() {
        super.foo(); // Call the method from the previous mixin or base class
        console.log('Method from C');
    }
};

// Derived class D with multiple inheritance (A, B, and C)
class D extends C(B(A)) {
    foo() {
        super.foo(); // Call the method from the previous mixin or base class
        console.log('Method from D');
    }
}

export default class StartUp {
    static Init() {
        RegisterComponent.Init();
        WebAttachmentCentralProxy.Init();
        Util.Init();
        GlobalFactoryRegister.Init();

        DateConverter.Init();
        ScriptManagerUtil.Init();
        WebEditorFactory.Init();
        ButtonFactory.Init();

        CommandFactory.Init();
        TabCommand.Init();
        WizardCommand.Init();
        ChartElementCommand.Init();
        AnalyticReportCommand.Init();
        FilterCommand.Init();

        BaseController.Init();

        WebSocketSingleton.Init();

        StandardModules.Init()
        StandardButtons.Init();
        StandardWebService.Init();

        GadgetFactory.Init();
        SerializerFactory.Init();
        DataProviderFactory.Init();

        PopupManager.Init();

        LayoutDataFactory.Init();
        LayoutFactory.Init();
    }
}