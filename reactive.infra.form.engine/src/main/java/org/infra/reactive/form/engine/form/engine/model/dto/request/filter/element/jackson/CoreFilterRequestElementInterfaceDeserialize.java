package org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.jackson;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementInterface;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementWithOperationParamValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.filter.model.CoreFilterProviderRequestModelRegistryFactory;
import org.infra.reactive.form.engine.form.engine.providers.jackson.JacksonUtil;

import java.io.IOException;

public class CoreFilterRequestElementInterfaceDeserialize extends StdDeserializer<CoreFilterRequestElementInterface> {

    public CoreFilterRequestElementInterfaceDeserialize() {
        this(null);
    }

    public CoreFilterRequestElementInterfaceDeserialize(Class<?> vc) {
        super(vc);
    }

    @Override
    public CoreFilterRequestElementInterface deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode dataModelRegistryJsonNode = node.get(CoreFilterRequestElementInterface.dataModelRegistryPropName);

        if (dataModelRegistryJsonNode != null) {
            String dataRegisterModel = dataModelRegistryJsonNode.asText();
            if (dataRegisterModel != null) {
                CoreFilterRequestElementInterface coreFilterRequestElementValueInterface = CoreFilterProviderRequestModelRegistryFactory.Instance().factoryInstance(dataRegisterModel);
                try {
                    JacksonUtil.startSerializer(objectMapper, node, coreFilterRequestElementValueInterface, false , false);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
                return coreFilterRequestElementValueInterface;
            }
        }
        return new CoreFilterRequestElementWithOperationParamValueDTO();
    }
}
