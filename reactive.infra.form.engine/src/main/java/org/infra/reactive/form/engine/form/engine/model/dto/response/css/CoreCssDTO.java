package org.infra.reactive.form.engine.form.engine.model.dto.response.css;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreCssDTO implements Serializable {
    private long id;
    private String name;
    private String jsonAttribute;
}
