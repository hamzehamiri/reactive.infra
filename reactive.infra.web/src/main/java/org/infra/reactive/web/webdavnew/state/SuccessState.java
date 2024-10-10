package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class SuccessState extends State {
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.OK;
    }
}
