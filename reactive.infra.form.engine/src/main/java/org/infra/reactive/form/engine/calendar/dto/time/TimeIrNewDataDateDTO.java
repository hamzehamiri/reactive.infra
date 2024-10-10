package org.infra.reactive.form.engine.calendar.dto.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeIrNewDataDateDTO {
    private Integer year;
    private Integer month;
    private Integer day;
    private String day_title;
    private Boolean is_leap_year;
    private String astrological_sign;
    private String intervals;
    private String date_type;
    private String month_title;
    private String year_utf8;
    private String month_utf8;
    private String day_utf8;
}
