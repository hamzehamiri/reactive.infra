package org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field.CoreAnalyticReportFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field.CoreAnalyticReportFieldRegionEnumDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAnalyticReportMetaDataDTO implements Serializable {
    private CoreAnalyticReportDTO coreAnalyticReportDTO;
    private CoreTranslateLanguageDTO coreTranslateLanguageDTO;
    private Map<CoreAnalyticReportFieldRegionEnumDTO, List<CoreAnalyticReportFieldDTO>> coreAnalyticReportFieldDTOMap;
    private Map<Long, CoreButtonAssignElementDTO> coreButtonAssignElementDTOMap;
    private PagingDTO pagingDTOHorizontal;
    private PagingDTO pagingDTOVertical;
}
