package org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreDashboardGadgetViewDTO implements Serializable {
    private long id;
    private CoreDashboardGadgetDTO coreDashboardGadgetDTO;
    private Serializable layoutDataJson;
    private CoreDashboardViewDTO coreDashboardViewDTO;
}
