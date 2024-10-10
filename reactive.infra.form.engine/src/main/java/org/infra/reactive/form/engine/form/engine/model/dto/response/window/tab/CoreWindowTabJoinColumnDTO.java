package org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab;

import lombok.Data;

import java.io.Serializable;

@Data
public class CoreWindowTabJoinColumnDTO implements Serializable {
    private Long id;
    private Long coreWindowTabMasterId;
    private Long coreWindowTabFieldMasterId;
    private Long coreWindowTabChildId;
    private Long coreWindowTabFieldChildId;
    private CoreWindowTabTypeDTO coreWindowTabTypeDTO;
}
