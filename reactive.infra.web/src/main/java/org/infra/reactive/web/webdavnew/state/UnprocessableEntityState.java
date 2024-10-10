package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class UnprocessableEntityState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }
}