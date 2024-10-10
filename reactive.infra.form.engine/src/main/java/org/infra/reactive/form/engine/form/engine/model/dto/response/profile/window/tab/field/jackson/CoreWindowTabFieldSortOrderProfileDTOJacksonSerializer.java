package org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.jackson.JacksonEnumSerializer;

import java.io.IOException;

public class CoreWindowTabFieldSortOrderProfileDTOJacksonSerializer extends StdSerializer<CoreWindowTabFieldSortOrderProfileDTO> {

    public CoreWindowTabFieldSortOrderProfileDTOJacksonSerializer() {
        this(null);
    }

    protected CoreWindowTabFieldSortOrderProfileDTOJacksonSerializer(Class<CoreWindowTabFieldSortOrderProfileDTO> t) {
        super(t);
    }

    @Override
    public void serialize(CoreWindowTabFieldSortOrderProfileDTO value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        JacksonEnumSerializer.serialize(jsonGenerator, value.toString());
    }
}
