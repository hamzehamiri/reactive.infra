package org.infra.reactive.form.engine.form.engine.providers.websocket;

import lombok.Getter;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.websocket.WebSocketRequestRouterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseClass;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class WebSocketServiceRegistry {

    @Getter
    private static WebSocketServiceRegistry Instance;

    public static WebSocketServiceRegistry getInstance(CoreProcessExecutionService coreProcessExecutionService) {
        if (Instance == null)
            Instance = new WebSocketServiceRegistry(coreProcessExecutionService);
        return Instance;
    }

    private final CoreProcessExecutionService coreProcessExecutionService;
    private final ConcurrentMap<String, Class<? extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>>> websocketRegisterMap = new ConcurrentHashMap<>(100);
    private final ConcurrentMap<String, WebSocketClassRegister> webSocketMetaData = new ConcurrentHashMap<>(100);


    public WebSocketServiceRegistry(CoreProcessExecutionService coreProcessExecutionService) {
        this.coreProcessExecutionService = coreProcessExecutionService;
    }

    public <T extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>> void registerWebSocketServiceAPI(String serviceRegisterKey, Class<T> webSocketAbstractAPIClass) {
        websocketRegisterMap.put(serviceRegisterKey, webSocketAbstractAPIClass);
    }

    public void registerMetaData(String serviceRegisterKey, WebSocketClassRegister webSocketClassRegister) {
        webSocketMetaData.put(serviceRegisterKey, webSocketClassRegister);
    }

    public WebSocketClassRegister getMetaData(String serviceRegisterKey) {
        return webSocketMetaData.get(serviceRegisterKey);
    }

    public WebSocketProcessAPICaller factoryInstance(WebSocketRequestRouterDTO webSocketRequestRouterDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        Class<? extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>> webSocket = websocketRegisterMap.get(webSocketRequestRouterDTO.getServiceKeyRegister());
        try {
            Constructor<? extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>> constructor = webSocket.getConstructor(CoreProcessExecutionService.class);
            WebSocketAbstractAPI<Serializable, WebSocketResponseClass> webSocketAbstractAPI = constructor.newInstance(coreProcessExecutionService);
            webSocketAbstractAPI.setCoreUserAuthenticateRequestDTO(userSecurity);

            WebSocketProcessAPICaller webSocketProcessAPICaller = new WebSocketProcessAPICaller();
            webSocketProcessAPICaller.setWebSocketAbstractAPI(webSocketAbstractAPI);
            webSocketProcessAPICaller.setWebSocketRequestRouterDTO(webSocketRequestRouterDTO);
            return webSocketProcessAPICaller;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
