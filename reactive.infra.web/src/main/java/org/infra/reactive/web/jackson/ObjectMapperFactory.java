package org.infra.reactive.web.jackson;

import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.ConcurrentHashMap;

public class ObjectMapperFactory {
    private static ObjectMapperFactory mapper;

    public static ObjectMapperFactory Instance(ObjectMapper objectMapper) {
        if (mapper == null)
            mapper = new ObjectMapperFactory(objectMapper);
        return mapper;
    }

    private ObjectMapper objectMapper;
    private ConcurrentHashMap<Class<?>, Class<? extends JsonSerializer>> mapSerializer;
    private boolean instanceCreated = false;

    private ObjectMapperFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper == null ? new ObjectMapper() : objectMapper;
        this.mapSerializer = new ConcurrentHashMap<>(100, 0.75f, Runtime.getRuntime().availableProcessors());
    }

    public ObjectMapper getObjectMapper() {
        instanceCreated = true;
        return objectMapper;
    }

    public void addRegisterSerializer(Class<?> clazzModel, Class<? extends JsonSerializer> clazzJacksonSerializer) throws InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchMethodException {
        mapSerializer.put(clazzModel, clazzJacksonSerializer);
        if (instanceCreated) {
            initInject(clazzModel, clazzJacksonSerializer);
        }
    }

    private void initSerializer() {
        if (mapSerializer != null) {
            mapSerializer.forEach((classModel, classSerializer) -> {
                try {
                    initInject(classModel, classSerializer);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
        }
    }

    private void initInject(Class<?> classModel, Class<? extends JsonSerializer> classSerializer) throws InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchMethodException {
        Constructor<? extends JsonSerializer> constructor = classSerializer.getConstructor();
        JsonSerializer objectSerializer = constructor.newInstance();
        SimpleModule module = new SimpleModule();
        module.addSerializer(classModel, objectSerializer);
        objectMapper.registerModule(module);
    }

}
