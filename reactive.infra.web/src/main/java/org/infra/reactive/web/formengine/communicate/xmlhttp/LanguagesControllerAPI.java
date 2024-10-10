package org.infra.reactive.web.formengine.communicate.xmlhttp;

import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PageDataDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/language")
public class LanguagesControllerAPI {

    private final CoreServiceDTOForm coreServiceDTOForm;

    public LanguagesControllerAPI(CoreServiceDTOForm coreServiceDTOForm) {
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    @PostMapping("/all_lang")
    public Mono<List<PageDataDTO>> getAllLanguages() {
        return coreServiceDTOForm.getAllLanguages_WithCheckCache();
    }
}
