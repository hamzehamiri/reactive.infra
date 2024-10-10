package org.infra.reactive.form.engine.calendar.dto.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeIrNewDataDTO {
    private Integer current_base;
    private Integer year;
    private Integer month;
    private Integer day;
    private List<TimeIrNewDataDateDTO> date_list;
    private String object_name;
}
