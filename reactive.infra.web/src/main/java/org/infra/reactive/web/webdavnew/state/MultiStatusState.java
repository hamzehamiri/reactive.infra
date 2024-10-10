package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class MultiStatusState extends State {
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.MULTI_STATUS;
    }
}