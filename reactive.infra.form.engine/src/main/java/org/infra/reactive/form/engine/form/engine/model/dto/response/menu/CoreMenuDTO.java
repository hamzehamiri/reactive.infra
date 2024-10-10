package org.infra.reactive.form.engine.form.engine.model.dto.response.menu;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.model.dto.response.common.CommonBaseCoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class CoreMenuDTO extends CommonBaseCoreAllElementDTO {
    private Long id;
    private String name;
    private String translate;
    private CoreAllElementDTO coreAllElementDTO;
    private Long coreMenuParentId;
    private Serializable coreMenuRecordId;
}
