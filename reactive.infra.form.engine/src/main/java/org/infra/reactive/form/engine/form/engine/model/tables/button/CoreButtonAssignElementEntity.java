package org.infra.reactive.form.engine.form.engine.model.tables.button;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_button_assign_element")
public class CoreButtonAssignElementEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_tab_field_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_button_id", columnType = CoreColumnType.INT64)
    private Long core_button_id;
    @CoreColumnDefinition(columnName = "core_css_id", columnType = CoreColumnType.INT64)
    private Long core_css_id;
    @CoreColumnDefinition(columnName = "core_all_element_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_id;
    @CoreColumnDefinition(columnName = "record_id", columnType = CoreColumnType.INT64)
    private Long record_id;
    @CoreColumnDefinition(columnName = "button_index", columnType = CoreColumnType.INT32)
    private Integer button_index;
    @CoreColumnDefinition(columnName = "core_all_element_id_module", columnType = CoreColumnType.INT64)
    private Long core_all_element_id_module;
    @CoreColumnDefinition(columnName = "record_id_module", columnType = CoreColumnType.INT64)
    private Long record_id_module;
}
