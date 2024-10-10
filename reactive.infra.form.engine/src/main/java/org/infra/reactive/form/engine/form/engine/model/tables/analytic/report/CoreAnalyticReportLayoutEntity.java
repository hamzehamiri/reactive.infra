package org.infra.reactive.form.engine.form.engine.model.tables.analytic.report;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreColumnDefinition;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;

@Data
@CoreTableDefinition(tableName = "core_analytic_report_layout")
public class CoreAnalyticReportLayoutEntity implements BaseEntityInterface<Long> {
    @CoreColumnDefinition(columnName = "id", columnType = CoreColumnType.INT64, isPk = true)
    private Long id;
    @CoreColumnDefinition(columnName = "name", columnType = CoreColumnType.String)
    private String name;
    @CoreColumnDefinition(columnName = "core_analytic_report_id", columnType = CoreColumnType.INT64)
    private Long core_analytic_report_id;
    @CoreColumnDefinition(columnName = "core_user_tenant_id", columnType = CoreColumnType.INT64)
    private Long core_user_tenant_id;
    @CoreColumnDefinition(columnName = "layout_json", columnType = CoreColumnType.JSON)
    private String layout_json;
}
