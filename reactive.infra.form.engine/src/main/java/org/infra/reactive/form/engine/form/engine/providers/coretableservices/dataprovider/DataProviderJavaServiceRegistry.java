package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementWithRecordIdDTO;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class DataProviderJavaServiceRegistry {

    private static DataProviderJavaServiceRegistry instance;

    public static DataProviderJavaServiceRegistry Instance() {
        if (instance == null) {
            instance = new DataProviderJavaServiceRegistry();
        }
        return instance;
    }

    private final ConcurrentMap<String, Class<? extends DataProviderJavaAbstract<?, ?, ?>>> serializerClassRegisterMap = new ConcurrentHashMap<>(100);

    public <T extends DataProviderJavaAbstract<?, ?, ?>> void registerSerializerClass(String coreTableColumnDataProviderTypeEnum, Class<T> serializerClassInterface) {
        serializerClassRegisterMap.put(coreTableColumnDataProviderTypeEnum, serializerClassInterface);
    }

    public Class<? extends DataProviderJavaAbstract<?, ?, ?>> findRegisterSerializerClass(String coreTableColumnDataProviderTypeEnum) {
        Class<? extends DataProviderJavaAbstract<?, ?, ?>> serializerClass = serializerClassRegisterMap.get(coreTableColumnDataProviderTypeEnum);
        return serializerClass;
    }

    public <T extends DataProviderJavaAbstract<?, ?, ?>> T factoryInstance(String coreTableColumnDataProviderTypeEnum, CoreUserAuthenticateRequestDTO userSecurity, CoreAllElementWithRecordIdDTO coreAllElementWithRecordIdDTO) {
        if (coreTableColumnDataProviderTypeEnum != null) {
            Class<? extends DataProviderJavaAbstract<?, ?, ?>> serializerClass = serializerClassRegisterMap.get(coreTableColumnDataProviderTypeEnum);
            try {
                Constructor<? extends DataProviderJavaAbstract<?, ?, ?>> constructor = serializerClass.getConstructor(CoreUserAuthenticateRequestDTO.class);
                T instanceDataProvider = (T) constructor.newInstance(userSecurity);
                instanceDataProvider.setCoreAllElementWithRecordIdDTO(coreAllElementWithRecordIdDTO);
                return instanceDataProvider;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            return null;
        }
    }
}
