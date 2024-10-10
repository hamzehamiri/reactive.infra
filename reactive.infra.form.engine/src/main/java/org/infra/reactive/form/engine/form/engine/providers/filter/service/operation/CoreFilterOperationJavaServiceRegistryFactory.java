package org.infra.reactive.form.engine.form.engine.providers.filter.service.operation;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CoreFilterOperationJavaServiceRegistryFactory {

    private static CoreFilterOperationJavaServiceRegistryFactory instance;

    public static CoreFilterOperationJavaServiceRegistryFactory Instance() {
        if (instance == null) {
            instance = new CoreFilterOperationJavaServiceRegistryFactory();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends CoreFilterOperationAbstract>> stringClassConcurrentMap = new ConcurrentHashMap<>(100);

    public void register(String registerKey, Class<? extends CoreFilterOperationAbstract> coreFilterOperationMethodInvoker) {
        stringClassConcurrentMap.put(registerKey, coreFilterOperationMethodInvoker);
    }

    public <T extends CoreFilterOperationAbstract> T factoryInstance(String registerKey) {
        Class<? extends CoreFilterOperationAbstract> serializerClass = stringClassConcurrentMap.get(registerKey);
        try {
            Constructor<? extends CoreFilterOperationAbstract> constructor = serializerClass.getConstructor();
            T objectInstanceService = (T) constructor.newInstance();
            return objectInstanceService;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
