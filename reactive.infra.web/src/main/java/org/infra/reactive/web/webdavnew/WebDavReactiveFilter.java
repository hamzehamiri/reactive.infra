package org.infra.reactive.web.webdavnew;

import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.infra.reactive.web.webdavnew.metadata.WebDavMetaData;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpMethod;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

public class WebDavReactiveFilter implements WebFilter {

    private final WebDavMetaData webDavMetaData;
    private final ObjectMapperFactory objectMapperFactory;

    public WebDavReactiveFilter(ApplicationContext applicationContext, ObjectMapperFactory objectMapperFactory) {
        this.webDavMetaData = new WebDavMetaData(applicationContext);
        this.objectMapperFactory = objectMapperFactory;
        this.webDavMetaData.scan();
    }

    @NotNull
    @Override
    public Mono<Void> filter(@NotNull ServerWebExchange exchange, @NotNull WebFilterChain chain) {
        HttpMethod method = exchange.getRequest().getMethod();

        try {
            WebDavAbstractController controller = this.webDavMetaData.factory(exchange, objectMapperFactory);
            return switch (method.name()) {
                case WebDavReactiveFilterServices.METHOD_OPTIONS -> controller.doOptionsReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_PROPFIND -> controller.doPropfindReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_HEAD -> controller.doHeadReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_GET -> controller.doGetReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_LOCK -> controller.doLockReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_PUT -> controller.doPutReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_UNLOCK -> controller.doUnlockReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_PROPPATCH -> controller.doProppatchReactive(exchange);
                case WebDavReactiveFilterServices.METHOD_MKCOL, WebDavReactiveFilterServices.METHOD_COPY,
                        WebDavReactiveFilterServices.METHOD_MOVE, WebDavReactiveFilterServices.METHOD_DELETE ->
                        controller.doDefaultReactive(exchange);
                default -> Mono.empty();
            };
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
