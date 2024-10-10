package org.infra.reactive.form.engine.form.engine.model.dto.response.host;

import lombok.Data;

@Data
public class CoreHostClusterNodeDTO {
    private long id;
    private long CoreHostClusterId;
    private CoreHostDTO coreHostDTO;
    private int port;
}
