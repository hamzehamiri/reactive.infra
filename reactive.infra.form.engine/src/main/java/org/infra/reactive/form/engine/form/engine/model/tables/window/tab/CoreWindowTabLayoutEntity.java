package org.infra.reactive.form.engine.form.engine.model.tables.window.tab;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_window_tab_layout")
public class CoreWindowTabLayoutEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "register_key", columnType = CoreColumnType.String)
    private String register_key;
    @CoreColumnDefinition(columnName = "xml_attribute", columnType = CoreColumnType.String)
    private String xml_attribute;
    @CoreColumnDefinition(columnName = "core_window_tab_id", columnType = CoreColumnType.INT32)
    private Long core_window_tab_id;
}
