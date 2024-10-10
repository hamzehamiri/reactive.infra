package org.infra.reactive.form.engine.form.engine.model.tables.button;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_button")
public class CoreButtonEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_tab_field_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "command_server_key", columnType = CoreColumnType.String)
    private String command_server_key;
    @CoreColumnDefinition(columnName = "command_client_key", columnType = CoreColumnType.String)
    private String command_client_key;
    @CoreColumnDefinition(columnName = "client_ui_key", columnType = CoreColumnType.String)
    private String client_ui_key;
}
