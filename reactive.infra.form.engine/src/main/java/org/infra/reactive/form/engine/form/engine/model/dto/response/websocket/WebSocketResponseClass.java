package org.infra.reactive.form.engine.form.engine.model.dto.response.websocket;

import lombok.Data;

import java.io.Serializable;

@Data
public class WebSocketResponseClass implements Serializable {
    private String bodyRegisterKey;
}
