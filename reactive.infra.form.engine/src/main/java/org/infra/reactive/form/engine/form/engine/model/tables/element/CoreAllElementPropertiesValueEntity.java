package org.infra.reactive.form.engine.form.engine.model.tables.element;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_all_element_properties_value")
public class CoreAllElementPropertiesValueEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "core_all_element_properties_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_properties_id;
    @CoreColumnDefinition(columnName = "value", columnType = CoreColumnType.String)
    private String value;
}
