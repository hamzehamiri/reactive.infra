package org.infra.reactive.form.engine.form.engine.model.tables.view;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_view_module")
public class CoreViewModuleEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_view_module_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "register_key", columnType = CoreColumnType.String)
    private String register_key;
}
