package org.infra.reactive.form.engine.form.engine.model.dto.response.filter.field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterAssignAbstract;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.CoreFilterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterAssignFieldDTO extends CoreFilterAssignAbstract {
    private CoreWindowTabFieldDTO coreWindowTabFieldDTO;
    private Map<Long, CoreFilterDTO> coreFilterDTOMap;
}
