package org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreAnalyticReportLayoutDTO implements Serializable {
    private long id;
    private String name;
    private CoreAnalyticReportDTO coreAnalyticReportDTO;
    private CoreUserTenantDTO coreUserTenantDTO; //TODO Security
    private String layoutJson;
}
