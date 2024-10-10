package org.infra.reactive.form.engine.form.engine.model.tables.dashboard;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_dashboard_gadget_view")
public class CoreDashboardGadgetViewEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "core_dashboard_gadget_id", columnType = CoreColumnType.INT64)
    private Long core_dashboard_gadget_id;
    @CoreColumnDefinition(columnName = "layout_data_json", columnType = CoreColumnType.String)
    private String layout_data_json;
    @CoreColumnDefinition(columnName = "core_dashboard_view_id", columnType = CoreColumnType.INT64)
    private Long core_dashboard_view_id;
}
