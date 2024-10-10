package org.infra.reactive.form.engine.form.engine.model.dto.request;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowRequestDTO;

import java.io.Serializable;

@Data
public class CoreTabRequestDTO implements Serializable {
    private Long id;
    private CoreWindowRequestDTO coreWindowRequestDTO;
}
