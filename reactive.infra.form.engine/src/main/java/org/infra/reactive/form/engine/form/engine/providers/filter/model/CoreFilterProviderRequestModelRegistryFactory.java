package org.infra.reactive.form.engine.form.engine.providers.filter.model;

import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementInterface;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CoreFilterProviderRequestModelRegistryFactory {
    private static CoreFilterProviderRequestModelRegistryFactory instance;

    public static CoreFilterProviderRequestModelRegistryFactory Instance() {
        if (instance == null) {
            instance = new CoreFilterProviderRequestModelRegistryFactory();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends CoreFilterRequestElementInterface>> stringClassConcurrentMap = new ConcurrentHashMap<>(100);

    public <T extends CoreFilterRequestElementInterface> void registerSerializerClass(String serviceRegisterKey, Class<T> serializerClassInterface) {
        stringClassConcurrentMap.put(serviceRegisterKey, serializerClassInterface);
    }

    public <T extends CoreFilterRequestElementInterface> T factoryInstance(String registerClass) {
        Class<? extends CoreFilterRequestElementInterface> serializerClass = stringClassConcurrentMap.get(registerClass);
        try {
            Constructor<? extends CoreFilterRequestElementInterface> constructor = serializerClass.getConstructor();
            return (T) constructor.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
