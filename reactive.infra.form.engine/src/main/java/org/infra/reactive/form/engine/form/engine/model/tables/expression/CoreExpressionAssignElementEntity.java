package org.infra.reactive.form.engine.form.engine.model.tables.expression;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.model.tables.CoreTableConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = CoreTableConstant.core_expression_assign_element)
public class CoreExpressionAssignElementEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_expression_id", columnType = CoreColumnType.INT64)
    private Long core_expression_id;
    @CoreColumnDefinition(columnName = "core_expression_type_id", columnType = CoreColumnType.INT64)
    private Long core_expression_type_id;
    @CoreColumnDefinition(columnName = "core_all_element_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_id;
    @CoreColumnDefinition(columnName = "record_id", columnType = CoreColumnType.INT64)
    private Long record_id;
}
