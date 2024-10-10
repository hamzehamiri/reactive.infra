package org.infra.reactive.form.engine.form.engine.model.dto.response.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreFilterAssignDataProviderDTO {
    private long id;
    private String name;
    private CoreFilterDTO coreFilterDTO;
    private long coreTableColumnDataProviderId;
}
