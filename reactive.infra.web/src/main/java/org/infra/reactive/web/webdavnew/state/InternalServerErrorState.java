package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class InternalServerErrorState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
