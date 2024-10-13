package org.hamzeh.erp.form.engine.providers.coretableservices.valueserializer.primary;

import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.valueserializer.ValueSerializerJavaAbstract;

import java.util.List;

public class ColumnValueSerializer extends ValueSerializerJavaAbstract<Row, KeyValueDTO<Long>> {

    private CoreTableColumnDTO column;
    private String charSeparator;
    private List<ValueSerializerJavaAbstract<Row, ?>> columnSerializers;

    public ColumnValueSerializer(CoreTableColumnDTO column, String charSeparator, List<ValueSerializerJavaAbstract<Row, ?>> columnSerializers) {
        this.column = column;
        this.charSeparator = charSeparator;
        this.columnSerializers = columnSerializers;
    }

    @Override
    public KeyValueDTO<Long> convertFromDBToClient(Row row) {
        return null;
    }
}
