package org.infra.reactive.form.engine.form.engine.model.dto.request.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreDashboardItemRequestDTO implements Serializable {
    private long id;
}
