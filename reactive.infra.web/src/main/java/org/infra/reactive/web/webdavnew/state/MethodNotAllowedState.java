package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;

import java.io.IOException;

public class MethodNotAllowedState extends State {

    final String[] allow;

    MethodNotAllowedState(String... allow) {
        this.allow = allow;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.METHOD_NOT_ALLOWED;
    }

    @Override
    public void forceResponseStatus(ServerWebExchange response) throws IOException {
//        if (response.isCommitted()) return;
//        response.setHeader(HEADER_ALLOW, String.join(", ", this.allow));
//        super.forceResponseStatus(response);
    }
}