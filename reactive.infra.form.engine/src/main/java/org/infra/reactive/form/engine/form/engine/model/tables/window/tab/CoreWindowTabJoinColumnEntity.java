package org.infra.reactive.form.engine.form.engine.model.tables.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_window_tab_join_column")
public class CoreWindowTabJoinColumnEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_window_tab_join_column_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_window_tab_master_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_master_id;
    @CoreColumnDefinition(columnName = "core_window_tab_field_master_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_field_master_id;
    @CoreColumnDefinition(columnName = "core_window_tab_child_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_child_id;
    @CoreColumnDefinition(columnName = "core_window_tab_field_child_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_field_child_id;
    @CoreColumnDefinition(columnName = "core_window_tab_type_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_type_id;
}
