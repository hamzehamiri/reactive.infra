package org.infra.reactive.form.engine.form.engine.model.tables.table;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table_column_sequence")
public class CoreTableColumnSequenceEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_table_sequence_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_table_id", columnType = CoreColumnType.INT64)
    private Long core_table_id;
    @CoreColumnDefinition(columnName = "core_table_column_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_id;
    @CoreColumnDefinition(columnName = "core_tenant_id", columnType = CoreColumnType.INT64)
    private Long core_tenant_id;
    @CoreColumnDefinition(columnName = "min_value", columnType = CoreColumnType.INT64)
    private Long min_value;
    @CoreColumnDefinition(columnName = "max_value", columnType = CoreColumnType.INT64)
    private Long max_value;
    @CoreColumnDefinition(columnName = "current_value", columnType = CoreColumnType.INT64)
    private Long current_value;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private Long name;
}
