export default class CoreAllElementDetailEnum {

}

CoreAllElementDetailEnum.Name = () => {
    return Object.freeze({
        Items: Symbol("items"),
        Configs: Symbol("configs"),
        DashboardLayout: Symbol("dashboard_layout"),
        DashboardTabItem: Symbol("dashboard_tab_item"),
        ConfigData: Symbol("config_data"),
        PropertiesChartPanel: Symbol("properties_chart_panel")
    });
}