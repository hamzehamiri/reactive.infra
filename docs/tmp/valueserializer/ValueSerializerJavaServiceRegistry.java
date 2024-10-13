package org.hamzeh.erp.form.engine.providers.coretableservices.valueserializer;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ValueSerializerJavaServiceRegistry {

    private static ValueSerializerJavaServiceRegistry instance;

    public static ValueSerializerJavaServiceRegistry Instance() {
        if (instance == null) {
            instance = new ValueSerializerJavaServiceRegistry();
        }
        return instance;
    }

    private ConcurrentMap<String, Class<? extends ValueSerializerJavaAbstract>> serializerClassRegisterMap = new ConcurrentHashMap<>(100);

    public <T extends ValueSerializerJavaAbstract> void registerSerializerClass(String serviceRegisterKey, Class<T> serializerClassInterface) {
        serializerClassRegisterMap.put(serviceRegisterKey, serializerClassInterface);
    }

    public ValueSerializerJavaAbstract factoryInstance(String registerClass, CoreUserAuthenticateRequestDTO userSecurity) {
        Class<? extends ValueSerializerJavaAbstract> serializerClass = serializerClassRegisterMap.get(registerClass);
        try {
            Constructor<? extends ValueSerializerJavaAbstract> constructor = serializerClass.getConstructor(CoreUserAuthenticateRequestDTO.class);
            ValueSerializerJavaAbstract serializerClassAbstract = constructor.newInstance(userSecurity);
            return serializerClassAbstract;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
