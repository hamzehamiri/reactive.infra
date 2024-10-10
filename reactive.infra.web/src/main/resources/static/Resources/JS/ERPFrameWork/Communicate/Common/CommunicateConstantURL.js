export default class CommunicateConstantURL {
    static TokenHeaderKey() {
        return "Authorization"
    }

    static BearValue() {
        return "Bearer "
    }


    static key_base() {
        return CommunicateConstantURL.getActiveRestServer() + "/api";
    };

    static getActiveRestServer() {
        return window.location.origin;
    }

    static mainPathSecurity = "security";

    static key_base_menu = "menu";
    static key_form_engine = "form_engine";
    static key_element = "element";
    static key_process = "process";
    static key_languages = "language";
    static key_base_translate = "translate";
    static key_filter = "filter";

    static Login = "/" + CommunicateConstantURL.mainPathSecurity + "/login";
    static GetAllLanguages = "/" + CommunicateConstantURL.key_languages + "/all_lang";
    static TranslateURL = "/" + CommunicateConstantURL.key_base_translate + "/translate_item";

    static WindowURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/window";
    static TabURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/tab";
    static WindowTabPluggableList = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/window-tab-pluggable-list";

    static DataProviderSearchDataURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/data-provider-search";
    static TabSearchDataURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/tab-search-data";
    static TabNewDataURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/tab-new-data";

    static ElementFindByKeyURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_element + "/find-element";

    static TabSaveDataURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/tab-save-data";
    static WindowSaveProfileURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_form_engine + "/window-save-profile";
    static MenuSearchDataURL = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_base_menu + "/menu-search-data";

    static Download = CommunicateConstantURL.key_base() + "/" + "file-manager" + "/download-file";
    static Upload = CommunicateConstantURL.key_base() + "/" + "file-manager" + "/upload-file";
    static IconDownloader = CommunicateConstantURL.key_base() + "/" + "file-manager" + "/icon-downloader";
    static EditFile = CommunicateConstantURL.key_base() + "/" + "file-manager" + "/edit-file";
    static GetFile = CommunicateConstantURL.key_base() + "/" + "file-manager" + "/get-file";

    static DashboardURL = CommunicateConstantURL.key_base() + "/dashboard/";
    static DashboardSearchDashboardItemsURL = CommunicateConstantURL.DashboardURL + "items";
    static DashboardSearchDashboardViewsURL = CommunicateConstantURL.DashboardURL + "views";
    static DashboardSearchDashboardGadgetViewsURL = CommunicateConstantURL.DashboardURL + "gadget-views";
    static DashboardSearchDashboardGadgetsURL = CommunicateConstantURL.DashboardURL + "gadgets";

    static AnalyticURL = CommunicateConstantURL.key_base() + "/analytic/";
    static AnalyticReportLoadURL = CommunicateConstantURL.AnalyticURL + "report/load";
    static AnalyticReportRefreshURL = CommunicateConstantURL.AnalyticURL + "report/refresh";

    static ProcessFind = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_process + "/process";
    static ProcessExecute = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_process + "/execute";
    static WebSocketProcessExecute = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_process + "/execute2";

    static FilterLoad = CommunicateConstantURL.key_base() + "/" + CommunicateConstantURL.key_filter + "/load";

    static Wizard_Load = CommunicateConstantURL.key_base() + "/wizard/load";
    static Wizard_StateManagement = CommunicateConstantURL.key_base() + "/wizard/state-management";
    static Wizard_StateValidation = CommunicateConstantURL.key_base() + "/wizard/state-validation";
}
