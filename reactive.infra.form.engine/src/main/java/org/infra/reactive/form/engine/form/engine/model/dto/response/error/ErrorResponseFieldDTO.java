package org.infra.reactive.form.engine.form.engine.model.dto.response.error;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseFieldDTO {
    private String name;
    private String code;
    private String description;
}