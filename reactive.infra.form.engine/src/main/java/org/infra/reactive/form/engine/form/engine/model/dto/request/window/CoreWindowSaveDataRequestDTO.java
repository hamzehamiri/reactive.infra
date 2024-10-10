package org.infra.reactive.form.engine.form.engine.model.dto.request.window;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabResponseSearchDTO;

import java.util.List;
import java.util.Map;

@Data
public class CoreWindowSaveDataRequestDTO {
    private Long windowId;
    private Map<Long, List<CoreWindowTabResponseSearchDTO>> tabDataMap;
    private Map<Long, List<CoreWindowTabResponseSearchDTO>> tabDataMapOriginal;
}
