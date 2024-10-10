package org.infra.reactive.form.engine.form.engine.model.tables.layout;

import io.r2dbc.postgresql.codec.Json;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_layout_data_assign_element")
public class CoreLayoutDataAssignElementEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_layout_data_id")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_all_element_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_id;
    @CoreColumnDefinition(columnName = "record_id", columnType = CoreColumnType.INT64)
    private Long record_id;
    @CoreColumnDefinition(columnName = "core_layout_id", columnType = CoreColumnType.INT64)
    private Long core_layout_id;
    @CoreColumnDefinition(columnName = "core_layout_data_id", columnType = CoreColumnType.INT64)
    private Long core_layout_data_id;
    @CoreColumnDefinition(columnName = "json_layout_data", columnType = CoreColumnType.JSON)
    private Json json_layout_data;
}
