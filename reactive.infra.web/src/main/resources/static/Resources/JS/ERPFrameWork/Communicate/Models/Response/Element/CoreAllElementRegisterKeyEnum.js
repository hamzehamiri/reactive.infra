export default class CoreAllElementRegisterKeyEnum {

}

CoreAllElementRegisterKeyEnum.RegisterKey = () => {
    return Object.freeze({
        Window: Symbol("Window"),
        Tab: Symbol("Tab"),
        Field: Symbol("Field"),
        CoreProcessParam: Symbol("CoreProcessParam"),
        Column: Symbol("Column"),
        Button: Symbol("Button"),
        Exception: Symbol("Exception"),
        Dashboard: Symbol("Dashboard"),
        Table: Symbol("Table"),
        AnalyticReport: Symbol("AnalyticReport"),
        ChartElement: Symbol("ChartElement"),
        InfraMainPage: Symbol("InfraMainPage"),
        CoreWindowTabButton: Symbol("CoreWindowTabButton")
    });
}