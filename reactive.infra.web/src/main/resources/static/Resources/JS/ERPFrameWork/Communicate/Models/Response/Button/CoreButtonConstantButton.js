export const CoreButtonConstantButton = () => {
    return Object.freeze({
        Refresh: Symbol("refresh"),
        Save: Symbol("save"),
        New: Symbol("new"),
        Print: Symbol("print"),

        NextRecord: Symbol("next_record"),
        NextPage: Symbol("next_page"),
        LastPage: Symbol("last_page"),
        BeforeRecord: Symbol("before_record"),
        BeforePage: Symbol("before_page"),
        FirstPage: Symbol("first_page"),

        TableView: Symbol("table_view"),
        FormView: Symbol("form_view"),
        TableFormView: Symbol("table_form_view"),

        NewAnalytic: Symbol("new_analytic"),
        SaveAnalytic: Symbol("save_analytic"),
        RefreshManualAnalytic: Symbol("refresh_manual_analytic"),

        WebAdvancedGridSortOrder : Symbol("web_advanced_grid_sort_order"),
        WebAdvancedGridFilterColumnConfig : Symbol("web_advanced_grid_filter_column_config"),

        WizardTabButton : Symbol("wizard_tab_button"),
        ChartElementTabButton : Symbol("chart_element"),

        Filter : Symbol("filter"),

        SaveFilter : Symbol("save_filter"),
        AddRowFilter : Symbol("add_row_filter"),
        ResetFilter : Symbol("reset_filter"),
        RedoFilter : Symbol("redo_filter"),
        UndoFilter : Symbol("undo_filter"),

        Pluggable : Symbol("plug_button"),
        Process : Symbol("process_button"),
    });
}