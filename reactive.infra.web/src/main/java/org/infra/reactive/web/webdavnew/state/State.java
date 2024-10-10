package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;

import java.io.IOException;

public abstract class State extends RuntimeException {

    public abstract HttpStatus getHttpStatus();

    public String getStatusLine() {
        final String message = this.getClass().getSimpleName().replaceAll("State$", "").replaceAll("(?<=[a-z])(?=[A-Z])", " ");
        return "HTTP/1.1 " + this.getHttpStatus().value() + " " + message;
    }

    void forceResponseStatus(ServerWebExchange exchange) throws IOException {
//        response.setStatus(this.getHttpStatus().value());
//        response.flushBuffer();
//        response.getOutputStream().close();
    }
}
