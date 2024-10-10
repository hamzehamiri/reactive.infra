package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.process.CoreProcessRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(ERPConstants.key_base + "/process")
public class ProcessControllerAPI {

    private final CoreProcessExecutionService coreProcessExecutionService;

    public ProcessControllerAPI(CoreProcessExecutionService coreProcessExecutionService) {
        this.coreProcessExecutionService = coreProcessExecutionService;
    }

    @PostMapping(path = "/process")
    public Flux<CoreProcessDTO> findProcess(@RequestBody CoreProcessRequestDTO coreProcessRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreProcessExecutionService.findProcess_WithCheckCache(null, coreProcessRequestDTO, userSecurity);
        });
    }

    @PostMapping(path = "/execute_sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<CoreProcessResponseDTO> executeProcess(@RequestBody CoreProcessRequestDTO coreProcessRequestDTO) {
        return ReactiveSecurityContextHolder.loadAuth().flatMapMany(webErpSecurityContext -> {
            CoreUserAuthenticateRequestDTO userSecurity = webErpSecurityContext.getUserSecurityModel();
            return coreProcessExecutionService.startStatus_WithCheckCache(null, coreProcessRequestDTO, userSecurity);
        });
    }
}
