package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterDTO implements Serializable {
    private long id;
    private String name;
    private String translate;
    private Long coreFilterParentId;
    private Map<Long, CoreFilterOperationDTO> coreFilterOperationDTOMap;
}
