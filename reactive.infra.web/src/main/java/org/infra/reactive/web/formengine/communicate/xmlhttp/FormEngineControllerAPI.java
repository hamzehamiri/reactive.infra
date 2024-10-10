package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PageDataDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowSaveDataRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.editors.DataProviderSearchRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabPluggableRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabRequestSearchDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.CoreWindowProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabPluggableAssignTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabResponseSearchDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(ERPConstants.key_base + ERPConstants.key_Slash + ERPConstants.key_Form_engine)
public class FormEngineControllerAPI {


    private final CoreServiceDTOForm coreServiceDTOForm;

    public FormEngineControllerAPI(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping(path = ERPConstants.key_Slash + ERPConstants.key_Window)
    public Mono<CoreWindowDTO> findWindow(@RequestBody CoreWindowRequestDTO coreWindowRequestModel) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.findWindow_WithCheckCache(null, coreWindowRequestModel, userSecurity);
        });
    }

    @PostMapping(path = "/tab")
    public Mono<CoreWindowTabDTO> findTab(@RequestBody CoreWindowTabRequestDTO coreWindowTabRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.findTab_WithCheckCache(null, coreWindowTabRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/tab-search-data")
    public Flux<CoreWindowTabResponseSearchDTO> searchFormData(@RequestBody CoreWindowTabRequestSearchDTO coreWindowTabRequestSearchDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.searchTabData_WithCheckCache(null, coreWindowTabRequestSearchDTO, userSecurity);
        });
    }

    @PostMapping(path = "/data-provider-search")
    public Flux<PageDataDTO> dataProviderSearch(@RequestBody DataProviderSearchRequestDTO dataProviderSearchRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.dataProviderSearch_WithCheckCache(null, dataProviderSearchRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/tab-new-data")
    public Mono<CoreWindowTabResponseSearchDTO> newTabData(@RequestBody CoreWindowTabRequestDTO coreWindowTabRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.newTabData_WithCheckCache(null, coreWindowTabRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/tab-save-data")
    public Flux<CoreWindowTabResponseSearchDTO> saveTabData(@RequestBody CoreWindowSaveDataRequestDTO coreWindowSaveDataRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.saveTabData(null, coreWindowSaveDataRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/window-save-profile")
    public Flux<CoreWindowProfileDTO> saveWindowProfile(@RequestBody CoreWindowProfileDTO coreWindowProfileDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.saveWindowProfile(null, coreWindowProfileDTO, userSecurity);
        });
    }

    @PostMapping(path = ERPConstants.key_Slash + ERPConstants.key_Window_Tab_Pluggable_List)
    public Flux<CoreWindowTabPluggableAssignTabDTO> windowTabPluggableList(@RequestBody CoreWindowTabPluggableRequestDTO coreWindowTabPluggableRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOForm.windowTabPluggableList(null, coreWindowTabPluggableRequestDTO, userSecurity);
        });
    }
}
