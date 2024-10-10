package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ServerWebExchange;

import java.io.IOException;

public class FoundState extends State {

    final String location;

    public FoundState(String location) {
        this.location = location;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FOUND;
    }

    @Override
    public void forceResponseStatus(ServerWebExchange exchange) throws IOException {
//        if (response.isCommitted()) return;
//        response.setHeader(HEADER_LOCATION, this.location);
//        super.forceResponseStatus(response);
    }
}