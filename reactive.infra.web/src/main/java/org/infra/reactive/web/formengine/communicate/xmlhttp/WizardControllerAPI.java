package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateValidationRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.validation.CoreWizardValidationMessageDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOWizard;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping(ERPConstants.key_base + "/wizard")
public class WizardControllerAPI {

    private final CoreServiceDTOWizard coreServiceDTOWizard;

    public WizardControllerAPI(CoreServiceDTOWizard coreServiceDTOWizard) {
        this.coreServiceDTOWizard = coreServiceDTOWizard;
    }

    @PostMapping("/load")
    public Mono<Map<Long, CoreWizardDTO>> load(@RequestBody CoreWizardRequestDTO coreWizardRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOWizard.load_WithCheckCache(null, coreWizardRequestDTO, userSecurity);
        });
    }

    @PostMapping("/state-management")
    public Flux<CoreWizardDTO> stateManagement(@RequestBody CoreWizardStateRequestDTO coreWizardStateRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOWizard.stateManagement(null, coreWizardStateRequestDTO, userSecurity);
        });
    }

    @PostMapping("/state-validation")
    public Flux<CoreWizardValidationMessageDTO> stateValidation(@RequestBody CoreWizardStateValidationRequestDTO coreWizardStateValidationRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreServiceDTOWizard.stateValidation(null, coreWizardStateValidationRequestDTO, userSecurity);
        });
    }
}
