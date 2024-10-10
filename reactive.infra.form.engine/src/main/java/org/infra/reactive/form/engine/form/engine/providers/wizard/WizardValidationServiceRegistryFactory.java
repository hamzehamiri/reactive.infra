package org.infra.reactive.form.engine.form.engine.providers.wizard;


import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class WizardValidationServiceRegistryFactory {
    private static WizardValidationServiceRegistryFactory instance;

    public static WizardValidationServiceRegistryFactory Instance() {
        if (instance == null) {
            instance = new WizardValidationServiceRegistryFactory();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends WizardValidationAbstract>> serializerClassRegisterMap = new ConcurrentHashMap<>(100);

    public void register(String registerKey, Class<? extends WizardValidationAbstract> clazz) {
        serializerClassRegisterMap.put(registerKey, clazz);
    }

    public <T extends WizardValidationAbstract> T factoryInstance(String registerKey, CoreUserAuthenticateRequestDTO userSecurity) {
        if (registerKey != null) {
            Class<? extends WizardValidationAbstract> serializerClass = serializerClassRegisterMap.get(registerKey);
            try {
                Constructor<? extends WizardValidationAbstract> constructor = serializerClass.getConstructor(CoreUserAuthenticateRequestDTO.class);
                return (T) constructor.newInstance(userSecurity);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            return null;
        }
    }
}
