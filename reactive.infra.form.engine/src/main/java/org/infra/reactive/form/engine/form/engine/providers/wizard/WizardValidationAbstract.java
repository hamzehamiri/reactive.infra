package org.infra.reactive.form.engine.form.engine.providers.wizard;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateValidationRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.validation.CoreWizardValidationMessageDTO;
import reactor.core.publisher.Flux;

public abstract class WizardValidationAbstract {
    protected CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO;
    protected CoreWizardStateValidationRequestDTO coreWizardStateValidationRequestDTO;

    public WizardValidationAbstract(CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO) {
        this.coreUserAuthenticateRequestDTO = coreUserAuthenticateRequestDTO;
    }

    public abstract Flux<CoreWizardValidationMessageDTO> checkValidation(CoreWizardStateValidationRequestDTO coreWizardStateValidationRequestDTO);
}
