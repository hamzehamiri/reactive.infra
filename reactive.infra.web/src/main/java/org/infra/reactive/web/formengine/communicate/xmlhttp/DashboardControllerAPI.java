package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.dashboard.CoreDashboardItemRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.dashboard.CoreDashboardRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardGadgetDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardGadgetViewDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardItemDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardViewDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(ERPConstants.key_base + "/dashboard")
public class DashboardControllerAPI {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public DashboardControllerAPI(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping(path = "/items")
    public Flux<CoreDashboardItemDTO> searchDashboardItems(@RequestBody CoreDashboardRequestDTO coreDashboardRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.searchDashboardItems_WithCheckCache(null, coreDashboardRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/views")
    public Flux<CoreDashboardViewDTO> searchDashboardViews(@RequestBody CoreDashboardRequestDTO coreDashboardRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.searchDashboardViews_WithCheckCache(null, coreDashboardRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/gadget-views")
    public Flux<CoreDashboardGadgetViewDTO> searchDashboardGadgetViews(@RequestBody CoreDashboardItemRequestDTO coreDashboardItemRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.searchDashboardGadgetViews_WithCheckCache(null, coreDashboardItemRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/gadgets")
    public Flux<CoreDashboardGadgetDTO> searchDashboardGadgets(@RequestBody CoreDashboardItemRequestDTO coreDashboardItemRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.searchDashboardGadgets_WithCheckCache(null, coreDashboardItemRequestDTO, userSecurity);
        });
    }
}
