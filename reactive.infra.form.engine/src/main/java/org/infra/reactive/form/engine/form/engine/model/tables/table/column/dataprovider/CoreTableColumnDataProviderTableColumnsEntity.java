package org.infra.reactive.form.engine.form.engine.model.tables.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table_column_dataprovider_table_columns")
public class CoreTableColumnDataProviderTableColumnsEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "core_table_column_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_id;
    @CoreColumnDefinition(columnName = "index", columnType = CoreColumnType.INT32)
    private Integer index;
    @CoreColumnDefinition(columnName = "core_table_column_dataprovider_table_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_dataprovider_table_id;
}
