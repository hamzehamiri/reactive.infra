package org.infra.reactive.form.engine.form.engine.model.tables.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

import java.time.LocalDateTime;

@Data
@CoreTableDefinition(tableName = "core_window_tab")
public class CoreWindowTabEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_tab_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_table_id", columnType = CoreColumnType.INT64)
    private Long core_table_id;
    @CoreColumnDefinition(columnName = "core_window_id", columnType = CoreColumnType.INT64)
    private Long core_window_id;
    @CoreColumnDefinition(columnName = "tab_index", columnType = CoreColumnType.INT32)
    private Integer tab_index;
    @CoreColumnDefinition(columnName = "create_date", columnType = CoreColumnType.Date)
    private LocalDateTime create_date;
    @CoreColumnDefinition(columnName = "create_core_user_tenant_id", columnType = CoreColumnType.INT64)
    private Long create_core_user_tenant_id;
    @CoreColumnDefinition(columnName = "core_workflow_action_id", columnType = CoreColumnType.INT64)
    private Long core_workflow_action_id;
}
