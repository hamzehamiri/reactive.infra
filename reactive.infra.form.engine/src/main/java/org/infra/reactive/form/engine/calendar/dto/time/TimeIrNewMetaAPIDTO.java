package org.infra.reactive.form.engine.calendar.dto.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeIrNewMetaAPIDTO {
    private String title;
    private String description;
    private String term_of_use;
    private String copyright;
    private String version;
    private TimeIrNewMetaContactAPIDTO contact;
    private TimeIrNewMetaLicenseAPIDTO license;
}
