package org.infra.reactive.form.engine.form.engine.model.dto.response.filter.field;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignElementMasterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;

@EqualsAndHashCode(callSuper = true)
@Data
public class CoreFilterAssignElementMasterFieldDTO extends CoreFilterAssignElementMasterDTO {
    private CoreWindowTabDTO coreWindowTabDTO;
}
