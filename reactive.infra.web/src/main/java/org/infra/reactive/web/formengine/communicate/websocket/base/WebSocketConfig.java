package org.infra.reactive.web.formengine.communicate.websocket.base;

import org.infra.reactive.form.engine.Info;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseClass;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketAbstractAPI;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketClassRegister;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketServiceRegistry;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.formengine.configuration.CoreServiceConfig;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.HandshakeWebSocketService;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Configuration
public class WebSocketConfig {

    @Bean
    public HandlerMapping handlerMapping(ObjectMapperFactory objectMapperFactory) {
        Map<String, WebSocketHandler> urlMap = new HashMap<>();
        urlMap.put(ERPConstants.key_base + "/websocket/router", new WebSocketRouterAPINew(objectMapperFactory));
        return new SimpleUrlHandlerMapping(urlMap, -1);
    }

    @Bean
    public WebSocketServiceRegistry findAllWebSocketAPI() {
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(WebSocketClassRegister.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        WebSocketServiceRegistry webSocketRegistry = WebSocketServiceRegistry.getInstance(CoreServiceConfig.applicationContext.getBean(CoreProcessExecutionService.class));
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<?> clazzBeanObject = Class.forName(beanDefinition.getBeanClassName());
                Class<? extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>> clazzBean = (Class<? extends WebSocketAbstractAPI<Serializable, WebSocketResponseClass>>) clazzBeanObject;
                WebSocketClassRegister webSocketClassRegister = clazzBean.getAnnotation(WebSocketClassRegister.class);
                webSocketRegistry.registerWebSocketServiceAPI(webSocketClassRegister.serviceKeyRegister(), clazzBean);
                webSocketRegistry.registerMetaData(webSocketClassRegister.serviceKeyRegister(), webSocketClassRegister);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return webSocketRegistry;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        WebSocketHandlerAdapter webSocketHandlerAdapter = new WebSocketHandlerAdapter();
        ((HandshakeWebSocketService) webSocketHandlerAdapter.getWebSocketService()).getUpgradeStrategy();
        return webSocketHandlerAdapter;
    }

//    @Bean
//    public WebSocketService webSocketService() {
//        ReactorNettyRequestUpgradeStrategy tomcatRequestUpgradeStrategy = new ReactorNettyRequestUpgradeStrategy();
//        tomcatRequestUpgradeStrategy.set(10000L);
//        tomcatRequestUpgradeStrategy.setAsyncSendTimeout(10000L);
//        return new HandshakeWebSocketService(tomcatRequestUpgradeStrategy);
//    }
}
