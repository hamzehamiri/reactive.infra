package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestOperandEnum;
import org.infra.reactive.form.engine.form.engine.model.jackson.JacksonEnumSerializer;

import java.io.IOException;

public class CoreFilterRequestOperandEnumSerializer extends StdSerializer<CoreFilterRequestOperandEnum> {

    public CoreFilterRequestOperandEnumSerializer() {
        this(null);
    }

    protected CoreFilterRequestOperandEnumSerializer(Class<CoreFilterRequestOperandEnum> t) {
        super(t);
    }


    @Override
    public void serialize(CoreFilterRequestOperandEnum value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        JacksonEnumSerializer.serialize(gen, value.toString());
    }
}
