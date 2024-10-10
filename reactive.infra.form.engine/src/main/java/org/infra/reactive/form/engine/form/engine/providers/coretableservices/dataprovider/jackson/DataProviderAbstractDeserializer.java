package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderWithSerializerDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary.DataProviderPrimaryString;
import org.infra.reactive.form.engine.form.engine.providers.jackson.JacksonUtil;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public class DataProviderAbstractDeserializer extends StdDeserializer<DataProviderAbstract<?, ?>> {

    public DataProviderAbstractDeserializer() {
        this(null);
    }

    public DataProviderAbstractDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public DataProviderAbstract<?, ?> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode coreTableColumnDataProviderWithSerializerDTOJsonNode = node.get(DataProviderAbstract.dataProviderRegistryModelPropName);

        if (coreTableColumnDataProviderWithSerializerDTOJsonNode != null) {
            CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO = objectMapper.treeToValue(coreTableColumnDataProviderWithSerializerDTOJsonNode, CoreTableColumnDataProviderWithSerializerDTO.class);
            if (coreTableColumnDataProviderWithSerializerDTO != null) {
                try {
                    Class<? extends DataProviderJavaAbstract<?, ?, ?>> dataProviderJavaAbstract = DataProviderJavaServiceRegistry.Instance().findRegisterSerializerClass(coreTableColumnDataProviderWithSerializerDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey());
                    Class<? extends DataProviderAbstract<?, ?>> clazzDataProviderAbstract = findDataProviderAbstract(dataProviderJavaAbstract)/*(Class<? extends DataProviderAbstract<?, ?>>) ((ParameterizedType) dataProviderJavaAbstract.getGenericSuperclass()).getActualTypeArguments()[0]*/;

                    Constructor<? extends DataProviderAbstract<?, ?>> con = clazzDataProviderAbstract.getConstructor();
                    DataProviderAbstract<?, ?> dataProviderAbstractInstance = con.newInstance();
                    JacksonUtil.startSerializer(objectMapper, node, dataProviderAbstractInstance, true, true);
                    return dataProviderAbstractInstance;
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return new DataProviderPrimaryString(null).convertFromRawData(null);
    }

    private Class<? extends DataProviderAbstract<?, ?>> findDataProviderAbstract(Class<? extends DataProviderJavaAbstract<?, ?, ?>> clazzDataProviderJavaAbstract) {
        Type[] actualType = ((ParameterizedType) clazzDataProviderJavaAbstract.getGenericSuperclass()).getActualTypeArguments();
        return find(actualType);
    }

    private Class<? extends DataProviderAbstract<?, ?>> find(Type[] actualType) {
        for (Type type : actualType) {
            if (type.getClass().isAssignableFrom(Class.class)) {
                if (DataProviderAbstract.class.isAssignableFrom((Class<?>) type)) {
                    return (Class<? extends DataProviderAbstract<?, ?>>) type;
                }
            } else if (ParameterizedType.class.isAssignableFrom(type.getClass())) {
                if (DataProviderAbstract.class.isAssignableFrom(((Class<?>) ((ParameterizedType) type).getRawType()))) {
                    return (Class<? extends DataProviderAbstract<?, ?>>) ((ParameterizedType) type).getRawType();
                } else {
                    Type[] actualTypeInner = ((ParameterizedType) type).getActualTypeArguments();
                    Class<? extends DataProviderAbstract<?, ?>> abstractFind = find(actualTypeInner);
                    if (abstractFind != null) {
                        return abstractFind;
                    }
                }
            }
        }
        return null;
    }

}
