package org.infra.reactive.form.engine.form.engine.model.tables.dashboard;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_dashboard_item")
public class CoreDashboardItemEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_dashboard_id", columnType = CoreColumnType.INT64)
    private Long core_dashboard_id;
    @CoreColumnDefinition(columnName = "core_dashboard_item_parent_id", columnType = CoreColumnType.INT64)
    private Long core_dashboard_item_parent_id;
}
