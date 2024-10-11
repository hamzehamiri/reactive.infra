package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;

import java.io.Serializable;

@Data
public class CoreWindowTabFilterFieldDTO implements Serializable {
    private Long id;
    private CoreWindowTabFieldDTO coreWindowTabFieldDTO;
}
