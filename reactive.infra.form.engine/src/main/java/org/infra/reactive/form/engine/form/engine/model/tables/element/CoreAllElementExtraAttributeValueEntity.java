package org.infra.reactive.form.engine.form.engine.model.tables.element;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_all_element_extra_attribute_value")
public class CoreAllElementExtraAttributeValueEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "core_all_element_extra_attribute_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_extra_attribute_id;
    @CoreColumnDefinition(columnName = "values", columnType = CoreColumnType.String)
    private String values;
    @CoreColumnDefinition(columnName = "record_id", columnType = CoreColumnType.INT64)
    private Long record_id;
}
