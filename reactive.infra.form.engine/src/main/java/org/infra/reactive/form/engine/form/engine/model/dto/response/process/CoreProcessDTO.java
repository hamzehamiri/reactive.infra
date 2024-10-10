package org.infra.reactive.form.engine.form.engine.model.dto.response.process;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.RecordModelDTO;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoreProcessDTO {
    private long id;
    private String name;
    private String translate;
    private String serverRegisterKey;
    private String clientRegisterKey;
    private Map<Long, CoreProcessParamDTO> coreProcessParamDTOMap;
    private RecordModelDTO recordModelDTO;
}
