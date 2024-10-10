package org.infra.reactive.web.formengine.communicate.websocket.services;

import org.infra.reactive.form.engine.form.engine.model.dto.request.process.CoreProcessRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketAbstractAPI;
import org.infra.reactive.form.engine.form.engine.providers.websocket.WebSocketClassRegister;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import reactor.core.publisher.Flux;

@WebSocketClassRegister(serviceKeyRegister = "processExecution", classReq = CoreProcessRequestDTO.class, classRes = CoreProcessResponseDTO.class)
public class WebSocketProcessAPI extends WebSocketAbstractAPI<CoreProcessRequestDTO, CoreProcessResponseDTO> {

    public WebSocketProcessAPI(CoreProcessExecutionService coreProcessExecutionService) {
        super(coreProcessExecutionService);
    }

    @Override
    public Class<?> getClassBodyModel() {
        return CoreProcessRequestDTO.class;
    }

    @Override
    public Flux<CoreProcessResponseDTO> executeCommand(CoreProcessRequestDTO coreProcessRequestDTO) {
        if (coreProcessRequestDTO.getCoreProcessRequestStatusDTO() != null) {
            if (coreProcessRequestDTO.getCoreProcessRequestStatusDTO().getId() == 1L) {
                return coreProcessExecutionService.startStatus_WithCheckCache(null, coreProcessRequestDTO, userSecurity);
            } else if (coreProcessRequestDTO.getCoreProcessRequestStatusDTO().getId() == 2L) {
                return coreProcessExecutionService.pauseStatus(null, coreProcessRequestDTO, userSecurity);
            } else if (coreProcessRequestDTO.getCoreProcessRequestStatusDTO().getId() == 3L) {
                return coreProcessExecutionService.resumeStatus(null, coreProcessRequestDTO, userSecurity);
            } else if (coreProcessRequestDTO.getCoreProcessRequestStatusDTO().getId() == 4L) {
                return coreProcessExecutionService.terminateStatus(null, coreProcessRequestDTO, userSecurity);
            }
        }
        return Flux.just(new CoreProcessResponseDTO());
    }

}
