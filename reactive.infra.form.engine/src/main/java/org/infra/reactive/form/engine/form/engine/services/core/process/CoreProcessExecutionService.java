package org.infra.reactive.form.engine.form.engine.services.core.process;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.process.CoreProcessRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.process.CoreProcessEntity;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

public class CoreProcessExecutionService {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public CoreProcessExecutionService(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    public Flux<CoreProcessDTO> findProcess_WithCheckCache(Mono<Connection> connectionMono, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.merge(coreServiceDTOForm.cacheAll(connectionMono).collectList()).flatMap(objects -> {
            Optional<CoreProcessDTO> coreProcessDTOOptional = CoreServiceDTOTable.coreProcessDTOLRUCache.get(coreProcessRequestDTO.getId());
            return Flux.just(coreProcessDTOOptional.map(coreProcessDTO -> {
                String translateProcess = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Process, coreProcessRequestDTO.getCoreTranslateLanguageDTO(), coreProcessDTO.getId());
                coreProcessDTO.setTranslate(translateProcess);

                coreProcessDTO.getCoreProcessParamDTOMap().forEach((aLong, coreProcessParamDTO) -> {
                    String translateProcessParam = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.CoreProcessParam, coreProcessRequestDTO.getCoreTranslateLanguageDTO(), coreProcessParamDTO.getId());
                    coreProcessParamDTO.setTranslate(translateProcessParam);
                });
                return coreProcessDTO;
            }).orElseGet(CoreProcessDTO::new));
        });
    }

    public Flux<CoreProcessResponseDTO> startStatus_WithCheckCache(Mono<Connection> connectionMono, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.merge(coreServiceDTOForm.cacheAll(connectionMono).collectList()).flatMap(objects -> {
            Optional<CoreProcessEntity> coreProcessEntity = CoreServiceEntityTable.coreProcessEntityLRUCache.get(coreProcessRequestDTO.getId());
            if (coreProcessEntity.isPresent()) {
                AbstractProcessCall abstractProcessCall = ProcessServiceRegistry.getInstance().factoryInstance(coreProcessEntity.get(), coreProcessRequestDTO, userSecurity);
                return abstractProcessCall.executeControllerProxyProcess();
            } else {
                return Flux.merge(coreServiceDTOForm.cacheReset(connectionMono).collectList()).flatMap(o -> {
                    Optional<CoreProcessEntity> coreProcessEntity2 = CoreServiceEntityTable.coreProcessEntityLRUCache.get(coreProcessRequestDTO.getId());
                    if (coreProcessEntity2.isPresent()) {
                        AbstractProcessCall abstractProcessCall = ProcessServiceRegistry.getInstance().factoryInstance(coreProcessEntity2.get(), coreProcessRequestDTO, userSecurity);
                        return abstractProcessCall.executeControllerProxyProcess();
                    }
                    return Flux.just(new CoreProcessResponseDTO());
                });
            }
        });
    }

    public Flux<CoreProcessResponseDTO> pauseStatus(Mono<Connection> connectionMono, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.merge(coreServiceDTOForm.cacheAll(connectionMono).collectList()).flatMap(serializables -> {
            AbstractProcessCall abstractProcessCall = ProcessServiceRegistry.getInstance().findInstance(coreProcessRequestDTO);
            if (abstractProcessCall != null) {
                abstractProcessCall.blocked();
            }
            return Flux.just(new CoreProcessResponseDTO());
        });
    }

    public Flux<CoreProcessResponseDTO> resumeStatus(Mono<Connection> connectionMono, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.merge(coreServiceDTOForm.cacheAll(connectionMono).collectList()).flatMap(serializables -> {
            AbstractProcessCall abstractProcessCall = ProcessServiceRegistry.getInstance().findInstance(coreProcessRequestDTO);
            if (abstractProcessCall != null) {
                abstractProcessCall.resume();
            }
            return Flux.just(new CoreProcessResponseDTO());
        });
    }

    public Flux<CoreProcessResponseDTO> terminateStatus(Mono<Connection> connectionMono, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.merge(coreServiceDTOForm.cacheAll(connectionMono).collectList()).flatMap(serializables -> {
            AbstractProcessCall abstractProcessCall = ProcessServiceRegistry.getInstance().findInstance(coreProcessRequestDTO);
            if (abstractProcessCall != null) {
                abstractProcessCall.terminate();
            }
            CoreProcessResponseDTO coreProcessResponseDTO = new CoreProcessResponseDTO();
            coreProcessResponseDTO.setTotalEstimate(100L);
            coreProcessResponseDTO.setTaskComplete(100L);
            coreProcessResponseDTO.setBodyResponse("Terminate");
            coreProcessResponseDTO.setDateTime(LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

            return Flux.just(coreProcessResponseDTO);
        });
    }
}
