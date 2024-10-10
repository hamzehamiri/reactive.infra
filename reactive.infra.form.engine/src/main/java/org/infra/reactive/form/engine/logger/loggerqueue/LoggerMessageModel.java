package org.infra.reactive.form.engine.logger.loggerqueue;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoggerMessageModel {
    private CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO;
    private LocalDateTime localDate;
    private String moduleName;
    private String message;
}
