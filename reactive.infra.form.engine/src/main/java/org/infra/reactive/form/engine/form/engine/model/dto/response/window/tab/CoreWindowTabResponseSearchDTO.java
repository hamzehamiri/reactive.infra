package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreWindowTabResponseSearchDTO implements Serializable {
    private String uuidTarget;
    private Long coreWindowTabId;
    private RecordModelDTO recordModelDTO;
}
