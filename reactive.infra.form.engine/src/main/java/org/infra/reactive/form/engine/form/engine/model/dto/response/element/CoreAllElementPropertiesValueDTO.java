package org.infra.reactive.form.engine.form.engine.model.dto.response.element;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreAllElementPropertiesValueDTO implements Serializable {
    private long id;
    private CoreAllElementPropertiesDTO coreAllElementPropertiesDTO;
    private String value;
}
