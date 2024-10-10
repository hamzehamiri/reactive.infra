package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.jackson;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestOperandEnum;
import org.infra.reactive.form.engine.form.engine.model.jackson.JacksonEnumSerializer;

import java.io.IOException;

public class CoreFilterRequestOperandEnumDeSerializer extends StdDeserializer<CoreFilterRequestOperandEnum> {
    public CoreFilterRequestOperandEnumDeSerializer() {
        this(null);
    }

    protected CoreFilterRequestOperandEnumDeSerializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public CoreFilterRequestOperandEnum deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        return JacksonEnumSerializer.deserialize(jsonParser, CoreFilterRequestOperandEnum.class);
    }
}
