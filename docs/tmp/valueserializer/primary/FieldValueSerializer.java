package org.hamzeh.erp.form.engine.providers.coretableservices.valueserializer.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.valueserializer.ValueSerializerJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.valueserializer.ValueSerializerJavaRegistry;

import java.util.List;

@ValueSerializerJavaRegistry(serviceKeyRegister = "FieldSingle")
public class FieldValueSerializer extends ValueSerializerJavaAbstract<Row, KeyValueDTO<Long>> {

    private CoreWindowTabFieldDTO field;
    private String charSeparator;
    private List<ValueSerializerJavaAbstract<Row, ?>> columnSerializers;

    public FieldValueSerializer(CoreWindowTabFieldDTO field, String charSeparator, List<ValueSerializerJavaAbstract<Row, ?>> columnSerializers) {
        this.field = field;
        this.charSeparator = charSeparator;
        this.columnSerializers = columnSerializers;
    }

    @Override
    public KeyValueDTO<Long> convertFromDBToClient(Row row) {
        KeyValueDTO<Long> longKeyValueDTO = new KeyValueDTO<>();
        StringBuilder fieldDisplay = new StringBuilder();
        if (columnSerializers != null) {
            for (ValueSerializerJavaAbstract<Row, ?> columnSerializer : columnSerializers) {
                Object valueSerialize = columnSerializer.convertFromDBToClient(row);
            }
            longKeyValueDTO.setDisplay(fieldDisplay.toString());
        }
        return longKeyValueDTO;
    }
}
