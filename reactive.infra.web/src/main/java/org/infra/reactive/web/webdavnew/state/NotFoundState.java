package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class NotFoundState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}