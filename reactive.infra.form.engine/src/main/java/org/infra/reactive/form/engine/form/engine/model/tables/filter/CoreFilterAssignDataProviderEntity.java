package org.infra.reactive.form.engine.form.engine.model.tables.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_filter_assign_dataprovider")
public class CoreFilterAssignDataProviderEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_filter_assign_dataprovider_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_filter_id", columnType = CoreColumnType.INT64)
    private Long core_filter_id;
    @CoreColumnDefinition(columnName = "core_table_column_dataprovider_id", columnType = CoreColumnType.INT64)
    private Long core_table_column_dataprovider_id;
}
