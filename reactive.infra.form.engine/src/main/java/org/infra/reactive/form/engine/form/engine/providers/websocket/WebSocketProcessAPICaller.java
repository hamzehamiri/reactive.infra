package org.infra.reactive.form.engine.form.engine.providers.websocket;

import org.infra.reactive.form.engine.form.engine.model.dto.request.websocket.WebSocketRequestRouterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseClass;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseRouterDTO;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketAbstractAPI;
import reactor.core.publisher.Flux;

import java.io.Serializable;

public class WebSocketProcessAPICaller {

    private WebSocketAbstractAPI<Serializable, WebSocketResponseClass> webSocketAbstractAPI;
    private WebSocketRequestRouterDTO webSocketRequestRouterDTO;

    public void setWebSocketAbstractAPI(WebSocketAbstractAPI<Serializable, WebSocketResponseClass> webSocketAbstractAPI) {
        this.webSocketAbstractAPI = webSocketAbstractAPI;
    }

    public void setWebSocketRequestRouterDTO(WebSocketRequestRouterDTO webSocketRequestRouterDTO) {
        this.webSocketRequestRouterDTO = webSocketRequestRouterDTO;
    }

    public Flux<WebSocketResponseRouterDTO> runProcess() {
        return webSocketAbstractAPI.executeCommand(webSocketRequestRouterDTO.getBody()).flatMap(body -> {
            WebSocketResponseRouterDTO webSocketResponseRouterDTO = new WebSocketResponseRouterDTO();
            webSocketResponseRouterDTO.setUuid(webSocketRequestRouterDTO.getUuid());
            webSocketResponseRouterDTO.setServiceKeyRegister(webSocketRequestRouterDTO.getServiceKeyRegister());
            webSocketResponseRouterDTO.setBody(body);
            return Flux.just(webSocketResponseRouterDTO);
        });
    }
}
