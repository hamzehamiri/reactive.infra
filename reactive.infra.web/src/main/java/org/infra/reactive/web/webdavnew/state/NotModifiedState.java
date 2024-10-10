package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;

import java.io.IOException;

public class NotModifiedState extends State {

    final String identifier;

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_MODIFIED;
    }

    public NotModifiedState(String identifier) {
        this.identifier = identifier;
    }

    @Override
    public void forceResponseStatus(ServerWebExchange exchange) throws IOException {
//        if (response.isCommitted()) return;
//        response.setHeader(HEADER_ETAG, "\"" + this.identifier + "\"");
//        super.forceResponseStatus(response);
    }
}