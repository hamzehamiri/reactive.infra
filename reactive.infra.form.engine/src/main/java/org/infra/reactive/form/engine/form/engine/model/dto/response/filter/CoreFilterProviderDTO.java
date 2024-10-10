package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterProviderDTO implements Serializable {
    private long id;
    private String name;
    private String translate;
    private String registerKey;
    private CoreAllElementDTO coreAllElementDTO;
}
