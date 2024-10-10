package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class BadRequestState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
