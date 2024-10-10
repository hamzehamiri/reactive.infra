package org.infra.reactive.form.engine.form.engine.model.tables.wizard;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_wizard_state_validation")
public class CoreWizardStateValidationEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_wizard_state_validation_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_wizard_state_id", columnType = CoreColumnType.INT64)
    private Long core_wizard_state_id;
    @CoreColumnDefinition(columnName = "core_wizard_validation_id", columnType = CoreColumnType.INT64)
    private Long core_wizard_validation_id;
    @CoreColumnDefinition(columnName = "active", columnType = CoreColumnType.Boolean)
    private Boolean active;
}
