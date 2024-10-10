package org.infra.reactive.form.engine.form.engine.services.core.dto;

import io.r2dbc.spi.Connection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.wizard.CoreWizardStateValidationRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.validation.CoreWizardValidationMessageDTO;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class CoreServiceDTOWizard extends CoreServiceBaseEntity {
    private final Logger logger = LogManager.getLogger(CoreServiceDTOWizard.class);
    private final CoreServiceDTOTable coreServiceDTOTable;

    public CoreServiceDTOWizard(CoreServiceDTOTable coreServiceDTOTable) {
        this.coreServiceDTOTable = coreServiceDTOTable;
    }

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return coreServiceDTOTable.cacheAll(connection);
    }

    public Mono<Map<Long, CoreWizardDTO>> load_WithCheckCache(Mono<Connection> connection, CoreWizardRequestDTO coreWizardRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connection).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMap(objects -> {
            Optional<Map<Long, Map<Long, CoreWizardDTO>>> optionalLongMapMap = CoreServiceDTOTable.coreWizardDTOByElementIdAndRecordIdLRUCache.get(coreWizardRequestDTO.getCoreAllElementDTO().getId());
            return optionalLongMapMap.map(longMapMap -> {
                Map<Long, CoreWizardDTO> dde = longMapMap.get(coreWizardRequestDTO.getRecordId());
                return Mono.just(dde);
            }).orElse(Mono.just(new HashMap<>()));
        });
    }

    public Flux<CoreWizardDTO> stateManagement(Mono<Connection> connection, CoreWizardStateRequestDTO coreWizardStateRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return null;
    }

    public Flux<CoreWizardValidationMessageDTO> stateValidation(Mono<Connection> connection, CoreWizardStateValidationRequestDTO coreWizardStateValidationRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        WizardValidationAbstract coreWizardValidationClass = WizardValidationServiceRegistryFactory.Instance().factoryInstance("Test", userSecurity);
        if (coreWizardValidationClass != null) {
            return coreWizardValidationClass.checkValidation(coreWizardStateValidationRequestDTO);
        } else {
            return Flux.just(new CoreWizardValidationMessageDTO("Class Not Found"));
        }
    }
}
