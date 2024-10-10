package org.infra.reactive.form.engine.form.engine.model.dto.response.expression;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreExpressionDTO {
    private long id;
    private String name;
    private String jsonExpression;
}
