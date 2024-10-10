package org.infra.reactive.form.engine.form.engine.model.dto.response.host;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CoreHostDTO {
    private long id;
    private String name;
    private String registerKey;
    private String ipv4;
    private String ipv6;
    private String dnsName;

    public CoreHostDTO(String ipv4) {
        this.ipv4 = ipv4;
    }
}
