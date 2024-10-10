package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreTranslateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/translate")
public class TranslateControllerAPI {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public TranslateControllerAPI(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping(path = "/translate_item"/*, produces = MediaType.TEXT_EVENT_STREAM_VALUE*/)
    public Mono<Map<Long, CoreTranslateDTO>> coreTranslateDTOFlux(ServerWebExchange exchange, @RequestBody CoreTranslateRequestDTO coreTranslateRequestDTO) {
        return coreServiceDTOForm.coreTranslateDTOFlux_WithCheckCache(coreTranslateRequestDTO);
    }
}
