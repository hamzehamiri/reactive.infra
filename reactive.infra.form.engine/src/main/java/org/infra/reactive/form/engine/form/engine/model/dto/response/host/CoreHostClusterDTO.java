package org.infra.reactive.form.engine.form.engine.model.dto.response.host;

import lombok.Data;

import java.util.List;

@Data
public class CoreHostClusterDTO {
    private long id;
    private String name;
    private List<CoreHostClusterNodeDTO> nodes;
}
