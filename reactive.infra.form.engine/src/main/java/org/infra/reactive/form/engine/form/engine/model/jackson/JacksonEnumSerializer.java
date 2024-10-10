package org.infra.reactive.form.engine.form.engine.model.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;

import java.io.IOException;

public class JacksonEnumSerializer {
    public static void serialize(JsonGenerator jsonGenerator, String key) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName(CoreTableColumnDataProviderSerializerConstant.keyPropName);
        jsonGenerator.writeString(key);
        jsonGenerator.writeEndObject();
    }

    public static <T> T deserialize(JsonParser jsonParser, Class<?> enumClass) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String key = node.asText()/*node.get(CoreTableColumnDataProviderSerializerConstant.keyPropName).asText()*/;

        Object[] enumConstants = enumClass.getEnumConstants();
        for (Object enumConstant : enumConstants) {
            if (enumConstant.toString().equalsIgnoreCase(key)) {
                return (T) enumConstant;
            }
        }
        return null;
    }
}
