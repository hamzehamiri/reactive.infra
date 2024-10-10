package org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAnalyticReportFieldDTO {
    private long id;
    private String title;
    private CoreTableColumnDTO coreTableColumnDTO;
    private CoreWindowTabFieldDTO coreWindowTabFieldDTO;
    private List<CoreAnalyticReportFieldAggregateModelDTO> coreAnalyticReportFieldAggregateModelDTOS;
}
