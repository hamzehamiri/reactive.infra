package org.infra.reactive.form.engine.calendar.dto.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeIrNewAPIDTO {
    private Integer status_code;
    private String object_type;
    private Integer time_taken;
    private String creation_date;
    private String url;
    private String message;
    private String error;
    private TimeIrNewDataDTO data;
    private TimeIrNewMetaAPIDTO meta;
}
