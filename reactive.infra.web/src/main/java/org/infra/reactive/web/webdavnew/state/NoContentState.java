package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class NoContentState extends State {
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NO_CONTENT;
    }
}