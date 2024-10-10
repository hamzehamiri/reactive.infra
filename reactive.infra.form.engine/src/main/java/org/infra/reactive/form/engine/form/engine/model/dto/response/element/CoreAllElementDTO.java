package org.infra.reactive.form.engine.form.engine.model.dto.response.element;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAllElementDTO implements Serializable {
    private Long id;
    private String name;
    private String registerKey;
    private Long coreTableId;
}
