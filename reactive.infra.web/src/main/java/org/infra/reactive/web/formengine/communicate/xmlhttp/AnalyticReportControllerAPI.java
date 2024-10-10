package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.analytic.report.AnalyticReportRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportMetaDataDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportPivotGrid;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(ERPConstants.key_base + "/analytic")
public class AnalyticReportControllerAPI {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public AnalyticReportControllerAPI(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping(path = "/report/load")
    public Flux<CoreAnalyticReportMetaDataDTO> load(@RequestBody AnalyticReportRequestDTO analyticReportRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.loadAnalyticByRequest_WithCheckCache(null, analyticReportRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/report/refresh")
    public Flux<CoreAnalyticReportPivotGrid> refresh(@RequestBody CoreAnalyticReportMetaDataDTO coreAnalyticReportMetaDataDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.refreshAnalyticReport_WithCheckCache(null, coreAnalyticReportMetaDataDTO, userSecurity);
        });
    }
}
