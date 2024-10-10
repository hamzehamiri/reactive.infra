package org.infra.reactive.form.engine.form.engine.model.tables.security.role;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.model.tables.CoreTableConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = CoreTableConstant.core_role_assign_user_tenant)
public class CoreRoleAssignUserTenantEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_role_assign_user_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_role_id", columnType = CoreColumnType.INT64)
    private Long core_role_id;
    @CoreColumnDefinition(columnName = "core_user_tenant_id", columnType = CoreColumnType.INT64)
    private Long core_user_tenant_id;
    @CoreColumnDefinition(columnName = "active", columnType = CoreColumnType.Boolean)
    private Boolean active;
}
