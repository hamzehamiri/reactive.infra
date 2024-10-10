package org.hamzeh.erp.form.engine.model.dto.response.filter.jackson;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignAbstract;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.primary.DataProviderPrimaryString;

import java.io.IOException;

public class CoreFilterAssignAbstractDeserializer extends StdDeserializer<CoreFilterAssignAbstract> {

    public CoreFilterAssignAbstractDeserializer() {
        this(null);
    }

    @Override
    public CoreFilterAssignAbstract deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String keyText = node.get(DataProviderAbstract.keyPropName).asText();
        String displayText = node.get(DataProviderAbstract.displayPropName).asText();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode dataProviderRegistryModelJsonNode = node.get(DataProviderAbstract.dataProviderRegistryModelPropName);
        CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = objectMapper.treeToValue(dataProviderRegistryModelJsonNode, CoreTableColumnDataProviderDTO.class);
        DataProviderJavaAbstract<?, ?> dataProviderJavaAbstract;
        if (coreTableColumnDataProviderDTO != null) {
            dataProviderJavaAbstract = DataProviderJavaServiceRegistry.Instance().factoryInstance(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().getCoreTableColumnDataProviderTypeEnum().toString(), null);
        } else {
            dataProviderJavaAbstract = new DataProviderPrimaryString(null);
            System.out.println("Field Id : " + keyText + " Not DataProvider Set Form Client");
        }

        return new CoreFilterAssignAbstract();
    }

    public CoreFilterAssignAbstractDeserializer(Class<?> vc) {
        super(vc);
    }
}
