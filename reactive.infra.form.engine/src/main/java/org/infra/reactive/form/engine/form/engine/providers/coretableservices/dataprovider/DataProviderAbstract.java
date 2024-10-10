package org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderWithSerializerDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.jackson.DataProviderAbstractDeserializer;

import java.io.Serializable;

@Setter
@Getter
@JsonDeserialize(using = DataProviderAbstractDeserializer.class)
public abstract class DataProviderAbstract<KEY extends Serializable, DATA extends Serializable> {

    public static final String dataProviderRegistryModelPropName = "coreTableColumnDataProviderWithSerializerDTO";
    public static final String keyPropName = "key";
    public static final String originalDataPropName = "originalData";

    private CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO;
    private KEY key;
    private DATA originalData;

    public abstract String getDisplay();
}
