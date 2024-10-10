package org.infra.reactive.form.engine.form.engine.providers.websocket;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseClass;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import reactor.core.publisher.Flux;

import java.io.Serializable;

public abstract class WebSocketAbstractAPI<REQUEST extends Serializable, RESPONSE extends WebSocketResponseClass> {

    protected CoreUserAuthenticateRequestDTO userSecurity;
    protected CoreProcessExecutionService coreProcessExecutionService;

    public WebSocketAbstractAPI(CoreProcessExecutionService coreProcessExecutionService) {
        this.coreProcessExecutionService = coreProcessExecutionService;
    }

    public void setCoreUserAuthenticateRequestDTO(CoreUserAuthenticateRequestDTO userSecurity) {
        this.userSecurity = userSecurity;
    }

    public abstract Class<?> getClassBodyModel();

    public abstract Flux<RESPONSE> executeCommand(REQUEST model);
}
