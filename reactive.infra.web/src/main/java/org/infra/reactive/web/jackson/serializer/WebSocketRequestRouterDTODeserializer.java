package org.infra.reactive.web.jackson.serializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.websocket.WebSocketRequestRouterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.serializer.JacksonCustomDeserializer;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketServiceRegistry;

import java.io.IOException;
import java.io.Serializable;

@JacksonCustomDeserializer(model = WebSocketRequestRouterDTO.class)
public class WebSocketRequestRouterDTODeserializer extends StdDeserializer<WebSocketRequestRouterDTO> {

    public WebSocketRequestRouterDTODeserializer() {
        super((Class<WebSocketRequestRouterDTO>) null);
    }

    public WebSocketRequestRouterDTODeserializer(Class<WebSocketRequestRouterDTO> vc) {
        super(vc);
    }

    @Override
    public WebSocketRequestRouterDTO deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        String serviceKeyRegister = node.get(WebSocketRequestRouterDTO.keyServiceKeyRegister).asText();
        String uuid = node.get(WebSocketRequestRouterDTO.keyUuid).asText();
        Serializable body = (Serializable) deserializationContext.readTreeAsValue(node.get(WebSocketRequestRouterDTO.keyBody), WebSocketServiceRegistry.getInstance().getMetaData(serviceKeyRegister).classReq());

        WebSocketRequestRouterDTO webSocketRequestRouterDTO = new WebSocketRequestRouterDTO();
        webSocketRequestRouterDTO.setServiceKeyRegister(serviceKeyRegister);
        webSocketRequestRouterDTO.setUuid(uuid);
        webSocketRequestRouterDTO.setBody(body);
        return webSocketRequestRouterDTO;
    }
}
