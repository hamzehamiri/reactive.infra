package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.jackson;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;

import java.io.IOException;

public class CoreWindowTabFieldSortOrderProfileDTOJacksonDeSerializer extends StdDeserializer<CoreWindowTabFieldSortOrderProfileDTO> {

    public CoreWindowTabFieldSortOrderProfileDTOJacksonDeSerializer() {
        this(null);
    }

    protected CoreWindowTabFieldSortOrderProfileDTOJacksonDeSerializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public CoreWindowTabFieldSortOrderProfileDTO deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String key = node.get(CoreTableColumnDataProviderSerializerConstant.keyPropName).asText();

        for (CoreWindowTabFieldSortOrderProfileDTO value : CoreWindowTabFieldSortOrderProfileDTO.values()) {
            if (value.toString().equalsIgnoreCase(key)) {
                return value;
            }
        }

        return null;
    }
}
