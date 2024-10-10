package org.infra.reactive.form.engine.form.engine.model.tables.table;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

import java.time.LocalDateTime;


@Data
@CoreTableDefinition(tableName = "core_table_column_change")
public class CoreTableColumnChangeEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_change_field_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_table_column_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_id;
    @CoreColumnDefinition(columnName = "old_value", columnType = CoreColumnType.String)
    private Long old_value;
    @CoreColumnDefinition(columnName = "old_value", columnType = CoreColumnType.String)
    private String oldValue;
    @CoreColumnDefinition(columnName = "old_value_type_id", columnType = CoreColumnType.INT64)
    private Long old_value_type_id;
    @CoreColumnDefinition(columnName = "new_value", columnType = CoreColumnType.String)
    private String newValue;
    @CoreColumnDefinition(columnName = "new_value_type_id", columnType = CoreColumnType.INT64)
    private Long new_value_type_id;
    @CoreColumnDefinition(columnName = "core_user_id", columnType = CoreColumnType.INT64)
    private Long core_user_id;
    @CoreColumnDefinition(columnName = "created_time", columnType = CoreColumnType.DateTime)
    private LocalDateTime created_time;
}
