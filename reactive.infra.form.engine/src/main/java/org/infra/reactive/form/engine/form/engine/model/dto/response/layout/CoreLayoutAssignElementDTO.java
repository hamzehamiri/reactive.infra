package org.infra.reactive.form.engine.form.engine.model.dto.response.layout;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreLayoutAssignElementDTO implements Serializable {
    private long id;
    private String name;
    private CoreLayoutDTO coreLayoutDTO;
    private CoreAllElementDTO coreAllElementDTO;
    private long recordId;
    private String jsonLayout;
}
