package org.infra.reactive.web.formengine.modules.wizard;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateValidationRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.validation.CoreWizardValidationMessageDTO;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationAnnotation;
import reactor.core.publisher.Flux;

@WizardValidationAnnotation(registerKey = "CheckTableAndColumnGenerated")
public class WizardValidationCreateTable extends WizardValidationAbstract {
    public WizardValidationCreateTable(CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO) {
        super(coreUserAuthenticateRequestDTO);
    }

    @Override
    public Flux<CoreWizardValidationMessageDTO> checkValidation(CoreWizardStateValidationRequestDTO coreWizardStateValidationRequestDTO) {
        return Flux.just(new CoreWizardValidationMessageDTO("Test"));
    }
}
