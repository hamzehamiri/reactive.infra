package org.infra.reactive.form.engine.form.engine.model.tables.table.column.dataprovider.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;

import java.io.IOException;

public class CoreTableColumnDataProviderTypeEnumJacksonSerializer extends StdSerializer<CoreTableColumnDataProviderTypeEnum> {

    public CoreTableColumnDataProviderTypeEnumJacksonSerializer(){
        this(null);
    }

    public CoreTableColumnDataProviderTypeEnumJacksonSerializer(Class<CoreTableColumnDataProviderTypeEnum> t) {
        super(t);
    }

    @Override
    public void serialize(CoreTableColumnDataProviderTypeEnum dataProviderPrimaryEnum, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeFieldName(CoreTableColumnDataProviderSerializerConstant.keyPropName);
        jsonGenerator.writeString(dataProviderPrimaryEnum.toString());
        jsonGenerator.writeEndObject();
    }
}
