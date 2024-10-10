package org.infra.reactive.form.engine.form.engine.model.tables.host;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_host_cluster_node")
public class CoreHostClusterNodeEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_host_cluster_node_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "core_host_id", columnType = CoreColumnType.INT64)
    private Long core_host_id;
    @CoreColumnDefinition(columnName = "core_host_cluster_id", columnType = CoreColumnType.INT64)
    private Long core_host_cluster_id;
    @CoreColumnDefinition(columnName = "port", columnType = CoreColumnType.INT32)
    private Integer port;
}
