package org.infra.reactive.form.engine.form.engine.model.dto.request.element;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;
import java.util.List;

@Data
public class CoreAllElementRequestDTO implements Serializable {
    private List<String> registerKeyArray;
}
