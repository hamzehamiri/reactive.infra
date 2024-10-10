package org.infra.reactive.form.engine.form.engine.model.tables.wizard;

import io.r2dbc.postgresql.codec.Json;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_wizard_state_value")
public class CoreWizardStateValueEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_wizard_state_value_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_wizard_state_id", columnType = CoreColumnType.INT64)
    private Long core_wizard_state_id;
    @CoreColumnDefinition(columnName = "json_value", columnType = CoreColumnType.JSON)
    private Json json_value;
}
