package org.infra.reactive.form.engine.form.engine.model.tables.table.column.dataprovider.jackson;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;

import java.io.IOException;

public class CoreTableColumnDataProviderTypeEnumJacksonDeSerializer extends StdDeserializer<CoreTableColumnDataProviderTypeEnum> {

    public CoreTableColumnDataProviderTypeEnumJacksonDeSerializer() {
        this(null);
    }

    public CoreTableColumnDataProviderTypeEnumJacksonDeSerializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public CoreTableColumnDataProviderTypeEnum deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String key = node.get(CoreTableColumnDataProviderSerializerConstant.keyPropName).asText();

        for (CoreTableColumnDataProviderTypeEnum value : CoreTableColumnDataProviderTypeEnum.values()) {
            if (value.toString().equalsIgnoreCase(key)) {
                return value;
            }
        }

        return null;
    }
}
