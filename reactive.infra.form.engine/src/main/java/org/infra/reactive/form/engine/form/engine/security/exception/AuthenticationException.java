package org.infra.reactive.form.engine.form.engine.security.exception;

import org.infra.reactive.form.engine.form.engine.model.dto.response.error.ErrorResponseDTO;

public class AuthenticationException extends ErrorResponseDTO {

    public AuthenticationException(String message) {
        super(message , ERPHttpStatus.UNAUTHORIZED);
    }
}
