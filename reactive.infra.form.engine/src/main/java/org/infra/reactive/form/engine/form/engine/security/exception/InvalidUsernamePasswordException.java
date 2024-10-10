package org.infra.reactive.form.engine.form.engine.security.exception;

import org.infra.reactive.form.engine.form.engine.model.dto.response.error.ErrorResponseDTO;

public class InvalidUsernamePasswordException extends ErrorResponseDTO {
    public InvalidUsernamePasswordException() {
        super("invalid_username_or_password" , ERPHttpStatus.UNAUTHORIZED);
    }
}
