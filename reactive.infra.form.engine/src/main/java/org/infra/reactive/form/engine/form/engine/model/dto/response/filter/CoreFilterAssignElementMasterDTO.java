package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterAssignElementMasterDTO extends CoreFilterAssignAbstract {
    private long recordId;
    private String uuid;
    private Map<Long, CoreFilterAssignAbstract> coreFilterAssignAbstractMap;
    private Map<Long, CoreButtonAssignElementDTO> coreButtonAssignElementDTOMap;
    private Map<String, CoreTranslateDTO> coreTranslateDTOMap;
}
