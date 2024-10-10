package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class PreconditionFailedState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.PRECONDITION_FAILED;
    }
}