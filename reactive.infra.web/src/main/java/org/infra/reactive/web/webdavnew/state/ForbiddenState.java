package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class ForbiddenState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}