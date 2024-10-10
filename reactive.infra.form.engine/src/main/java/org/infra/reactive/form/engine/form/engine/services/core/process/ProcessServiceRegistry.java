package org.infra.reactive.form.engine.form.engine.services.core.process;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.process.CoreProcessRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.process.CoreProcessEntity;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ProcessServiceRegistry {

    private static final class InstanceHolder {
        private static final ProcessServiceRegistry Instance = new ProcessServiceRegistry();
    }

    public static ProcessServiceRegistry getInstance() {
        return InstanceHolder.Instance;
    }

    private ConcurrentMap<String, Class<? extends AbstractProcessCall>> processCallRegister = new ConcurrentHashMap<>(100);
    private ConcurrentMap<String, ProcessClassRegister> processClassRegisterMap = new ConcurrentHashMap<>(100);
    private ConcurrentMap<String, AbstractProcessCall> processInstancePerUUID = new ConcurrentHashMap<>(100);

    public <T extends AbstractProcessCall> void registerProcessCall(String serviceRegisterKey, Class<T> processCallClass) {
        processCallRegister.put(serviceRegisterKey, processCallClass);
    }

    public void registerMetaData(String serviceRegisterKey, ProcessClassRegister processClassRegister) {
        processClassRegisterMap.put(serviceRegisterKey, processClassRegister);
    }

    public AbstractProcessCall factoryInstance(CoreProcessEntity coreProcessEntity, CoreProcessRequestDTO coreProcessRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        Class<? extends AbstractProcessCall> abstractProcessCallClass = processCallRegister.get(coreProcessEntity.getServer_register_key());
        try {
            Constructor<? extends AbstractProcessCall> constructor = abstractProcessCallClass.getConstructor();
            AbstractProcessCall abstractProcessCallInstance = constructor.newInstance();
            abstractProcessCallInstance.setCoreProcessRequestDTO(coreProcessRequestDTO);
            abstractProcessCallInstance.setUserSecurity(userSecurity);
            processInstancePerUUID.put(coreProcessRequestDTO.getUuid(), abstractProcessCallInstance);
            return abstractProcessCallInstance;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public AbstractProcessCall findInstance(CoreProcessRequestDTO coreProcessRequestDTO) {
        return processInstancePerUUID.get(coreProcessRequestDTO.getUuid());
    }

    public void removeProcessInstance(CoreProcessRequestDTO coreProcessRequestDTO) {
        processInstancePerUUID.remove(coreProcessRequestDTO.getUuid());
    }
}
