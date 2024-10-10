package org.infra.reactive.form.engine.form.engine.model.dto.request.websocket;

import lombok.Data;

import java.io.Serializable;

@Data
public class WebSocketRequestRouterDTO implements Serializable {
    public final static String keyServiceKeyRegister = "serviceKeyRegister";
    public final static String keyUuid = "uuid";
    public final static String keyBody= "body";

    private String serviceKeyRegister;
    private String uuid;
    private Serializable body;
}
