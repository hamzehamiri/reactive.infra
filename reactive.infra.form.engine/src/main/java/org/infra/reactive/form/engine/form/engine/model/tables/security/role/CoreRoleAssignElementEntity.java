package org.infra.reactive.form.engine.form.engine.model.tables.security.role;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.model.tables.CoreTableConstant;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;

@Data
@CoreTableDefinition(tableName = CoreTableConstant.core_role_assign_element)
public class CoreRoleAssignElementEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_role_assign_resource_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_role_id", columnType = CoreColumnType.INT64)
    private Long core_role_id;
    @CoreColumnDefinition(columnName = "core_all_element_id", columnType = CoreColumnType.INT64)
    private Long core_all_element_id;
    @CoreColumnDefinition(columnName = "record_id", columnType = CoreColumnType.INT64)
    private Long record_id;
    @CoreColumnDefinition(columnName = "core_role_class_attribute_values", columnType = CoreColumnType.String)
    private String core_role_class_attribute_values;
}
