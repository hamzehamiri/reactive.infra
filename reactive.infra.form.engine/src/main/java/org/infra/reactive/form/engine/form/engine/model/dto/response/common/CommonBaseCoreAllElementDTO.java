package org.infra.reactive.form.engine.form.engine.model.dto.response.common;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
public class CommonBaseCoreAllElementDTO implements Serializable {
    private CoreAllElementDTO sourceCoreAllElementDTO;
}
