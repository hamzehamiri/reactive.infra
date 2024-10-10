package org.infra.reactive.form.engine.form.engine.model.dto.response.layout;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreLayoutDTO implements Serializable {
    private long id;
    private String name;
    private String registerKey;
}
