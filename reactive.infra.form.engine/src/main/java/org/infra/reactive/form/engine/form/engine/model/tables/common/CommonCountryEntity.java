package org.infra.reactive.form.engine.form.engine.model.tables.common;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "common_country")
public class CommonCountryEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "common_country_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "flag_pic_path", columnType = CoreColumnType.String)
    private String flag_pic_path;
}
