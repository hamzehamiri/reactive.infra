package org.infra.reactive.form.engine.form.engine.model.tables.host;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_host")
public class CoreHostEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_host_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "register_key", columnType = CoreColumnType.String)
    private String register_key;
    @CoreColumnDefinition(columnName = "ipv4", columnType = CoreColumnType.String)
    private String ipv4;
    @CoreColumnDefinition(columnName = "ipv6", columnType = CoreColumnType.String)
    private String ipv6;
    @CoreColumnDefinition(columnName = "dns_name", columnType = CoreColumnType.String)
    private String dns_name;
}
