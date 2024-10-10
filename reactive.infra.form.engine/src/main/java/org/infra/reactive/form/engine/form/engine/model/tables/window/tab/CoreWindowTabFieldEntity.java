package org.infra.reactive.form.engine.form.engine.model.tables.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_window_tab_field")
public class CoreWindowTabFieldEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_tab_field_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_window_tab_id", columnType = CoreColumnType.INT64)
    private Long core_window_tab_id;
    @CoreColumnDefinition(columnName = "core_table_column_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_id;
    @CoreColumnDefinition(columnName = "core_table_column_editor_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_editor_id;
    @CoreColumnDefinition(columnName = "core_table_column_dataprovider_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_dataprovider_id;
    @CoreColumnDefinition(columnName = "active", columnType = CoreColumnType.Boolean)
    private Boolean active;
    @CoreColumnDefinition(columnName = "index", columnType = CoreColumnType.INT32)
    private Integer index;
}
