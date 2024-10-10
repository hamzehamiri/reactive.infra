package org.infra.reactive.form.engine.form.engine.model.dto.response.error;

import lombok.*;
import org.infra.reactive.form.engine.form.engine.security.exception.ERPHttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDTO extends RuntimeException {

    private ERPHttpStatus errorStatus;
    private String error;
    private String errorDescription;
    private String errorTraceId;
    private String errorOn;
    private String state;
    private LocalDateTime errorAt;
    private List<ErrorResponseFieldDTO> errorFields;
    private Map<String, Object> errorData;

    public ErrorResponseDTO(String error, ERPHttpStatus errorStatus) {
        this.error = error;
        this.errorStatus = errorStatus;
    }

    public List<ErrorResponseFieldDTO> getErrorFields() {
        if (errorFields == null) {
            errorFields = new ArrayList<>();
        }
        return errorFields;
    }

    public Map<String, Object> getErrorData() {
        if (errorData == null) {
            errorData = new HashMap<>();
        }
        return errorData;
    }
}