package org.infra.reactive.web.exception;

import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class ERPBaseController {
    protected final WebExceptionHandlerERP webExceptionHandlerERP;
    public ERPBaseController(WebExceptionHandlerERP webExceptionHandlerERP) {
        this.webExceptionHandlerERP = webExceptionHandlerERP;
    }

    protected Mono<Void> handleError(ServerWebExchange exchange, Throwable throwable) {
        return webExceptionHandlerERP.handle(exchange, throwable);
    }
}
