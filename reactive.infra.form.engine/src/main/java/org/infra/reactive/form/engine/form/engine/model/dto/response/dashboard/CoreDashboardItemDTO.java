package org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreDashboardItemDTO implements Serializable {
    private long id;
    private String name;
    private String translate;
    private CoreDashboardDTO coreDashboardDTO;
    private Long parentId;
}
