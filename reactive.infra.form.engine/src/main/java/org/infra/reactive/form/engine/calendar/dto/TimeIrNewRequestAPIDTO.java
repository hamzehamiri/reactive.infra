package org.infra.reactive.form.engine.calendar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeIrNewRequestAPIDTO {
    private Integer current_base;
    private Integer year;
    private Integer month;
    private Integer day;
}
