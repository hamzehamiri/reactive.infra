package org.infra.reactive.form.engine.form.engine.model.tables.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_filter_operation_param")
public class CoreFilterOperationParamEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_css_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_filter_operation_id", columnType = CoreColumnType.INT64)
    private Long core_filter_operation_id;
    @CoreColumnDefinition(columnName = "refer_original_editor", columnType = CoreColumnType.String)
    private String refer_original_editor;
    @CoreColumnDefinition(columnName = "core_table_column_editor_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_editor_id;
}
