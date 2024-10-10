package org.infra.reactive.form.engine.form.engine.model.tables.table;

import io.r2dbc.postgresql.codec.Json;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table_datasource")
public class CoreTableDataSourceEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_datasource_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_host_cluster_id", columnType = CoreColumnType.INT64)
    private Long core_host_cluster_id;
    @CoreColumnDefinition(columnName = "core_table_datasource_type_id", columnType = CoreColumnType.INT64)
    private Long core_table_datasource_type_id;
    @CoreColumnDefinition(columnName = "register_key", columnType = CoreColumnType.String)
    private String register_key;
    @CoreColumnDefinition(columnName = "json_config", columnType = CoreColumnType.JSON)
    private Json json_config;
}
