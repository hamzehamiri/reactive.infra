package org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreWindowTabRequestSaveDTO implements Serializable {
    private String uuidTarget;
    private Long coreWindowTabId;
}
