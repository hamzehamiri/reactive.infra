package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWindowTabFilterDTO implements Serializable {
    private Long id;
    private String name;
    private Long coreWindowTabId;
}
