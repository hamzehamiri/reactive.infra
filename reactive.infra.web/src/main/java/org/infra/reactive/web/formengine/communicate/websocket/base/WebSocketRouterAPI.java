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
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketRouterAPI implements WebSocketHandler {
    private final Map<String, WebSocketSession> sessionRepository = new ConcurrentHashMap<>();
    private final Map<String, CoreUserAuthenticateRequestDTO> userSessionRepository = new ConcurrentHashMap<>();
    private final ObjectMapperFactory objectMapperFactory;
    private final Logger logger = LogManager.getLogger(WebSocketRouterAPI.class);

    public WebSocketRouterAPI(ObjectMapperFactory objectMapperFactory) {
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
                WebSocketMessage.Type type = webSocketMessage.getType();
                String message = webSocketMessage.getPayloadAsText();
                try {
                    WebSocketRequestRouterDTO webSocketRequestRouterDTO = objectMapperFactory.getObjectMapper().readValue(message, WebSocketRequestRouterDTO.class);
                    WebSocketProcessAPICaller webSocketProcessAPICaller = WebSocketServiceRegistry.getInstance(CoreServiceConfig.applicationContext.getBean(CoreProcessExecutionService.class)).factoryInstance(webSocketRequestRouterDTO, userSecurity);
                    Flux<WebSocketResponseRouterDTO> flexData = webSocketProcessAPICaller.runProcess();
                    return handleProcess(webSocketSession, flexData);
                } catch (Exception e) {
                    return Mono.error(new RuntimeException(e));
                }
            })/*.doOnNext(mono -> {
                System.out.println("WebSocket Next");
            }).doOnComplete(() -> {
                System.out.println("WebSocket Complete");
            }).doFinally(signalType -> {
                System.out.println("WebSocket Finally");
                sessionRepository.remove(webSocketSession.getId());
                userSessionRepository.remove(webSocketSession.getId());
            }).doOnError(throwable -> {
                System.out.println("WebSocket Error");
                logger.error(throwable.getMessage());
                throwable.printStackTrace();
            })*/.then();
//            return storeSession(newSession, userSecurity).flatMap(session ->
//                    session.receive().flatMap(wsMessage -> {
//                                WebSocketMessage.Type type = wsMessage.getType();
//                                String message = wsMessage.getPayloadAsText();
//                                try {
//                                    WebSocketRequestRouterDTO webSocketRequestRouterDTO = objectMapperFactory.getObjectMapper().readValue(message, WebSocketRequestRouterDTO.class);
//                                    WebSocketProcessAPICaller webSocketProcessAPICaller = WebSocketServiceRegistry.getInstance(CoreServiceConfig.applicationContext.getBean(CoreProcessExecutionService.class)).factoryInstance(webSocketRequestRouterDTO, userSecurity);
//                                    Flux<WebSocketResponseRouterDTO> flexData = webSocketProcessAPICaller.runProcess();
//                                    return handleProcess(session, flexData);
//                                } catch (Exception e) {
//                                    return Flux.error(new RuntimeException(e));
//                                }
//                            }).doFinally(signalType -> {
//                                removeSession(newSession).subscribe();
//                            }).doOnError(throwable -> {
//                                logger.error(throwable.getMessage());
//                                throwable.printStackTrace();
//                            })
//                            .then());
        });
    }

//    private Mono<WebSocketSession> storeSession(WebSocketSession session, CoreUserAuthenticateRequestDTO userSecurity) {
//        return Mono.fromCallable(() -> {
//            sessionRepository.put(session.getId(), session);
//            userSessionRepository.put(session.getId(), userSecurity);
//            return session;
//        });
//    }

//    private Mono<Void> removeSession(final WebSocketSession session) {
//        return Mono.fromRunnable(() -> {
//            sessionRepository.remove(session.getId());
//            userSessionRepository.remove(session.getId());
//        });
//    }

//    private Flux<WebSocketSession> findAllSessions() {
//        return Flux.fromIterable(sessionRepository.entrySet()).map(Map.Entry::getValue);
//    }

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

//    private Mono<Void> broadcastMessage(final WebSocketSession sourceSession, final String originMessage) {
//        return findAllSessions().flatMap(session -> {
//            String message = sourceSession.getId() + " : " + originMessage;
//            return session.send(Mono.just(session.textMessage(message))).onErrorResume(AbortedException.class, e -> removeSession(session));
//        }).then();
//    }
}
