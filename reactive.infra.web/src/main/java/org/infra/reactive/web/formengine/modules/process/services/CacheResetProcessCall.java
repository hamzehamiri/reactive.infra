package org.infra.reactive.web.formengine.modules.process.services;

import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.services.core.entity.*;
import org.infra.reactive.form.engine.form.engine.services.core.process.AbstractProcessCall;
import org.infra.reactive.form.engine.form.engine.services.core.process.ProcessClassRegister;
import org.infra.reactive.web.formengine.configuration.CoreServiceConfig;
import reactor.core.publisher.Flux;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ProcessClassRegister(serverRegisterKey = "full_cache_reset")
public class CacheResetProcessCall extends AbstractProcessCall {

    private Map<String, CoreServiceBaseEntity> allCacheClass;
    private CoreServiceEntityTable coreServiceEntityTable;

    public CacheResetProcessCall() {
        super();
        this.coreServiceEntityTable = CoreServiceConfig.applicationContext.getBean(CoreServiceEntityTable.class);
        this.allCacheClass = CoreServiceConfig.applicationContext.getBeansOfType(CoreServiceBaseEntity.class);
    }

    @Override
    public Flux<CoreProcessResponseDTO> executeProcess() {
        return Flux.merge(coreServiceEntityTable.cacheReset(null).collectList()).flatMap(object -> {
            List<Flux<? extends Serializable>> listCachePublisher = new ArrayList<>();
            this.allCacheClass.forEach((s, coreServiceBaseEntity) -> {
                if (coreServiceBaseEntity != this.coreServiceEntityTable) {
                    listCachePublisher.add(coreServiceBaseEntity.cacheReset(null));
                }
            });
            return Flux.merge(
                    listCachePublisher
            ).flatMap(objects -> {
                CoreProcessResponseDTO coreProcessResponseDTO = new CoreProcessResponseDTO();
                coreProcessResponseDTO.setId(coreProcessRequestDTO.getId());
                coreProcessResponseDTO.setTotalEstimate(1L);
                coreProcessResponseDTO.setTaskComplete(1L);
                return Flux.just(coreProcessResponseDTO);
            }).doOnError(throwable -> {
                throwable.printStackTrace();
            });
        });
    }
}
