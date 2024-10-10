package org.infra.reactive.web.jackson.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.request.websocket.WebSocketRequestRouterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.serializer.JacksonCustomSerializer;

import java.io.IOException;

@JacksonCustomSerializer(model = WebSocketRequestRouterDTO.class)
public class WebSocketRequestRouterDTOSerializer extends StdSerializer<WebSocketRequestRouterDTO> {
    public WebSocketRequestRouterDTOSerializer() {
        super((Class<WebSocketRequestRouterDTO>) null);
    }

    public WebSocketRequestRouterDTOSerializer(Class<WebSocketRequestRouterDTO> item) {
        super(item);
    }

    @Override
    public void serialize(WebSocketRequestRouterDTO value, JsonGenerator gen, SerializerProvider provider) throws IOException {

    }
}
