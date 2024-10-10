package org.infra.reactive.form.engine.form.engine.model.dto.response.websocket;

import lombok.Data;

import java.io.Serializable;

@Data
public class WebSocketResponseRouterDTO implements Serializable {
    private String serviceKeyRegister;
    private String uuid;
    private String bodyRegisterKey;
    private Serializable body;
}
