package org.infra.reactive.form.engine.form.engine.model.dto.request.common;

import lombok.Data;

@Data
public class PagingDTO {
    private long totalRecord;
    private long fromRecord;
    private long toRecord;

    public long getPageSize() {
        return toRecord - fromRecord;
    }
}
