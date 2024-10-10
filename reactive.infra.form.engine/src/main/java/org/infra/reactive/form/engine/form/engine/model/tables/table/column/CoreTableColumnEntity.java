package org.infra.reactive.form.engine.form.engine.model.tables.table.column;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table_column")
public class CoreTableColumnEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_table_column_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_table_column_editor_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_editor_id;
    @CoreColumnDefinition(columnName = "core_table_id", columnType = CoreColumnType.INT64)
    private Long core_table_id;
    @CoreColumnDefinition(columnName = "is_pk", columnType = CoreColumnType.Boolean)
    private Boolean is_pk;
    @CoreColumnDefinition(columnName = "core_table_column_dataprovider_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_dataprovider_id;
}
