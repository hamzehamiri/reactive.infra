package org.infra.reactive.form.engine.form.engine.model.dto.response.button;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreButtonDTO implements Serializable {
    private long id;
    private String name;
    private String commandServerKey;
    private String commandClientKey;
    private String clientUiKey;
}
