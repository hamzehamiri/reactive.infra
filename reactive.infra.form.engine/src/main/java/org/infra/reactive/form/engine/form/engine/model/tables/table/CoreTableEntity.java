package org.infra.reactive.form.engine.form.engine.model.tables.table;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table")
public class CoreTableEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_table_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "title", columnType = CoreColumnType.String)
    private String title;
    @CoreColumnDefinition(columnName = "core_table_datasource_id", columnType = CoreColumnType.INT64)
    private Long core_table_datasource_id;
    @CoreColumnDefinition(columnName = "tablename", columnType = CoreColumnType.String)
    private String tablename;
}
