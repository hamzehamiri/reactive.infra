package org.infra.reactive.web.formengine.communicate.websocket.base;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.websocket.WebSocketRequestRouterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseRouterDTO;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketProcessAPICaller;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketServiceRegistry;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import org.infra.reactive.web.formengine.configuration.CoreServiceConfig;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketRouterAPINew implements WebSocketHandler {
    private final Map<String, WebSocketSession> sessionRepository = new ConcurrentHashMap<>();
    private final Map<String, CoreUserAuthenticateRequestDTO> userSessionRepository = new ConcurrentHashMap<>();
    private final ObjectMapperFactory objectMapperFactory;
    private final Logger logger = LogManager.getLogger(WebSocketRouterAPINew.class);

    public WebSocketRouterAPINew(ObjectMapperFactory objectMapperFactory) {
        this.objectMapperFactory = objectMapperFactory;
    }

    @NotNull
    @Override
    public Mono<Void> handle(@NotNull WebSocketSession webSocketSession) {
        return ReactiveSecurityContextHolder.loadAuth().flatMap(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();

            sessionRepository.put(webSocketSession.getId(), webSocketSession);
            userSessionRepository.put(webSocketSession.getId(), userSecurity);
            return webSocketSession.receive().flatMap(webSocketMessage -> {
                String message = webSocketMessage.getPayloadAsText();
                try {
                    WebSocketRequestRouterDTO webSocketRequestRouterDTO = objectMapperFactory.getObjectMapper().readValue(message, WebSocketRequestRouterDTO.class);
                    WebSocketProcessAPICaller webSocketProcessAPICaller = WebSocketServiceRegistry.getInstance(CoreServiceConfig.applicationContext.getBean(CoreProcessExecutionService.class)).factoryInstance(webSocketRequestRouterDTO, userSecurity);
                    return handleProcess(webSocketSession, webSocketProcessAPICaller.runProcess());
                } catch (Exception e) {
                    return Mono.error(new RuntimeException(e));
                }
            }).then();
        });
    }

    private Mono<Void> handleProcess(WebSocketSession sourceSession, Flux<WebSocketResponseRouterDTO> webSocketResponseRouterDTOFlux) {
        return webSocketResponseRouterDTOFlux.flatMap(webSocketResponseRouterDTO -> {
            try {
                String jsonString = objectMapperFactory.getObjectMapper().writeValueAsString(webSocketResponseRouterDTO);
                return sourceSession.send(Mono.just(sourceSession.textMessage(jsonString)))/*.onErrorResume(AbortedException.class, e -> removeSession(sourceSession))*/;
            } catch (JsonProcessingException e) {
                return Flux.error(new RuntimeException(e));
            }
        }).then();
    }
}
