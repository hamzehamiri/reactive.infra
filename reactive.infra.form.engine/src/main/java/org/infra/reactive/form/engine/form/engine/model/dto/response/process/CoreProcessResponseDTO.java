package org.infra.reactive.form.engine.form.engine.model.dto.response.process;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.model.dto.response.websocket.WebSocketResponseClass;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class CoreProcessResponseDTO extends WebSocketResponseClass {
    private Long id;
    private Long totalEstimate;
    private Long taskComplete;
    private LocalDateTime dateTime;
    private String bodyResponse;
}
