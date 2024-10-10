package org.infra.reactive.form.engine.form.engine.model.tables.translate;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_translate_language")
public class CoreTranslateLanguageEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true, sequenceName = "core_translate_metadata_id_seq")
    private Long id;
    @CoreColumnDefinition(columnName = "locale_name", columnType = CoreColumnType.String)
    private String locale_name;
    @CoreColumnDefinition(columnName = "language", columnType = CoreColumnType.String)
    private String language;
    @CoreColumnDefinition(columnName = "common_country_id", columnType = CoreColumnType.INT64)
    private Long common_country_id;
    @CoreColumnDefinition(columnName = "is_rtl", columnType = CoreColumnType.Boolean)
    private Boolean is_rtl;
}
