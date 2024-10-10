package org.infra.reactive.web.webdavnew.state;

import org.springframework.http.HttpStatus;

public class PayloadTooLargeState extends State {

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.PAYLOAD_TOO_LARGE;
    }
}