package org.infra.reactive.form.engine.form.engine.model.tables.table.column.dataprovider;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_table_column_dataprovider_attachment")
public class CoreTableColumnDataProviderAttachmentEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_attachment_core_table_id", columnType = CoreColumnType.INT64)
    private Long core_attachment_core_table_id;
    @CoreColumnDefinition(columnName = "core_attachment_assign_element_core_table_id", columnType = CoreColumnType.INT64)
    private Long core_attachment_assign_element_core_table_id;
    @CoreColumnDefinition(columnName = "bytes_core_table_datasource_id", columnType = CoreColumnType.INT64)
    private Long bytes_core_table_datasource_id;
    @CoreColumnDefinition(columnName = "core_table_column_dataprovider_serializer_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_dataprovider_serializer_id;
}
