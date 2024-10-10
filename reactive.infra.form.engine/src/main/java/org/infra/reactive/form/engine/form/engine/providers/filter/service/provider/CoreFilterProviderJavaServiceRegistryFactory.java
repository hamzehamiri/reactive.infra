package org.infra.reactive.form.engine.form.engine.providers.filter.service.provider;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterProviderDTO;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CoreFilterProviderJavaServiceRegistryFactory {

    private static CoreFilterProviderJavaServiceRegistryFactory instance;

    public static CoreFilterProviderJavaServiceRegistryFactory Instance() {
        if (instance == null) {
            instance = new CoreFilterProviderJavaServiceRegistryFactory();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends CoreFilterProviderJavaServiceAbstract<?, ?>>> stringClassConcurrentMap = new ConcurrentHashMap<>(100);

    public <T extends CoreFilterProviderJavaServiceAbstract<?, ?>> void registerSerializerClass(String registerKey, Class<T> coreFilterProviderJavaServiceAbstract) {
        stringClassConcurrentMap.put(registerKey, coreFilterProviderJavaServiceAbstract);
    }

    @SafeVarargs
    public final <T extends CoreFilterProviderJavaServiceAbstract<?, SERVICE>, SERVICE extends CoreServiceBaseEntity> T factoryInstance(CoreFilterProviderDTO coreFilterProviderDTO, CoreUserAuthenticateRequestDTO userSecurity, CoreFilterRequestDTO coreFilterRequestDTO, SERVICE... services) {
        Class<? extends CoreFilterProviderJavaServiceAbstract<?, ?>> serializerClass = stringClassConcurrentMap.get(coreFilterProviderDTO.getRegisterKey());
        try {
            Constructor<? extends CoreFilterProviderJavaServiceAbstract<?, ?>> constructor = serializerClass.getConstructor(CoreUserAuthenticateRequestDTO.class, CoreFilterRequestDTO.class, CoreFilterProviderDTO.class);
            T objectInstanceService = (T) constructor.newInstance(userSecurity, coreFilterRequestDTO, coreFilterProviderDTO);
            objectInstanceService.setServices(services);
            return objectInstanceService;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
