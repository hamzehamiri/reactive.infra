package org.infra.reactive.form.engine.form.engine.services.core.dto;

import io.r2dbc.spi.Connection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CoreServiceDTOFilter extends CoreServiceBaseEntity {
    private final Logger logger = LogManager.getLogger(CoreServiceDTOForm.class);
    private final CoreServiceDTOTable coreServiceDTOTable;
    private final CoreServiceDTOForm coreServiceDTOForm;

    public CoreServiceDTOFilter(CoreServiceDTOTable coreServiceDTOTable, CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOTable = coreServiceDTOTable;
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return coreServiceDTOForm.cacheAll(connection)
                .doFinally(doFinallyCache())
                .doOnError(doException());
    }

    public Flux<List<CoreFilterAssignElementMasterDTO>> load_WithCheckCache(CoreFilterRequestDTO coreFilterRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.zip(cacheAll(null), Flux.just(complete)).flatMap(objects -> {
            if (coreFilterRequestDTO.getCoreFilterRequestElementRecordDTOArray() != null) {
                return Flux.create((FluxSink<List<CoreFilterAssignElementMasterDTO>> fluxSinkCoreFilterAssignElementMasterDTO) -> {
                    coreFilterRequestDTO.getCoreFilterRequestElementRecordDTOArray().forEach(coreFilterRequestElementRecordDTO -> {
                        Optional<List<CoreFilterProviderDTO>> coreFilterProviderDTOListOptional = CoreServiceDTOTable.coreFilterProviderDTOByCoreAllElementIdLRUCache.get(coreFilterRequestElementRecordDTO.getCoreAllElementDTO().getId());
                        coreFilterProviderDTOListOptional.ifPresent(coreFilterProviderDTOS -> {
                            coreFilterProviderDTOS.forEach(coreFilterProviderDTO -> {
                                CoreFilterProviderJavaServiceAbstract<CoreFilterAssignElementMasterDTO, CoreServiceBaseEntity> coreFilterProviderJavaServiceAbstract = CoreFilterProviderJavaServiceRegistryFactory.Instance().factoryInstance(coreFilterProviderDTO, userSecurity, coreFilterRequestDTO, this, coreServiceDTOForm, coreServiceDTOTable);
                                List<CoreFilterAssignElementMasterDTO> coreFilterAssignElementMasterDTOFlux = coreFilterProviderJavaServiceAbstract.load(coreFilterRequestElementRecordDTO.getRecordId());
                                fluxSinkCoreFilterAssignElementMasterDTO.next(coreFilterAssignElementMasterDTOFlux);
                            });
                        });
                    });
                    fluxSinkCoreFilterAssignElementMasterDTO.complete();
                });
            }
            return Flux.just(new ArrayList<>());
        });
    }
}
