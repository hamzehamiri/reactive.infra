package org.infra.reactive.form.engine.form.engine.model.dto.response.button;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.css.CoreCssDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementExtraAttributeValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDataAssignElementDTO;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreButtonAssignElementDTO implements Serializable {
    private long id;
    private String name;
    private String translate;
    private CoreButtonDTO coreButtonDTO;
    private CoreCssDTO coreCssDTO;
    private CoreAllElementDTO coreAllElementDTO;
    private Long recordId;
    private Integer buttonIndex;
    private Map<Long, CoreLayoutDataAssignElementDTO> coreLayoutDataAssignElementDTOMap;
    private Map<Long, CoreAllElementExtraAttributeValueDTO> coreAllElementExtraAttributeValueDTOMap;
    private CoreAllElementDTO coreAllElementDTOModule;
    private Long recordIdModule;
}
