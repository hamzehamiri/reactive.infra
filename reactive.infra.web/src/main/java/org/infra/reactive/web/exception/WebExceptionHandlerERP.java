package org.infra.reactive.web.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreTranslateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.error.ErrorResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.security.exception.AuthenticationException;
import org.infra.reactive.form.engine.form.engine.security.exception.ERPHttpStatus;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.CoreElementTranslateQueryJoinerImpl;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityAttributeHolder;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(-2)
public class WebExceptionHandlerERP implements WebExceptionHandler {

    private final ObjectMapper objectMapper;
    private final CoreServiceDTOForm coreServiceDTOForm;

    public WebExceptionHandlerERP(ObjectMapper objectMapper, CoreServiceDTOForm coreServiceDTOForm) {
        this.objectMapper = objectMapper;
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    public Mono<String> getTranslateMessage(CoreTranslateLanguageDTO coreTranslateLanguageMetadataDTO, String keyExceptionForTranslate) {
        Map<String, Object> extraParameter = new HashMap<>();
        extraParameter.put(CoreElementTranslateQueryJoinerImpl.key_core_element_name, keyExceptionForTranslate);
        CoreTranslateRequestDTO coreTranslateMetaDataRequestDTO = new CoreTranslateRequestDTO();
        coreTranslateMetaDataRequestDTO.setRegisterKey(CoreAllElementRegisterKeyEnum.Exception.toString());
        coreTranslateMetaDataRequestDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageMetadataDTO);
        coreTranslateMetaDataRequestDTO.setExtraParameter(extraParameter);
        return coreServiceDTOForm.coreTranslateDTOFlux_WithCheckCache(coreTranslateMetaDataRequestDTO).map(coreTranslateDTOS -> {
            return coreTranslateDTOS.keySet().stream().findFirst().map(aLong -> {
                return coreTranslateDTOS.get(aLong).getTranslateValue();
            }).orElseGet(() -> "");
        });
    }

    @NotNull
    @Override
    public Mono<Void> handle(@NotNull ServerWebExchange exchange, @NotNull Throwable ex) {
        if (ex instanceof AuthenticationException) {
            return coreServiceDTOForm.getAllLanguages_WithCheckCache().flatMap(coreTranslateLanguageDTOS -> {
                return Mono.fromCallable(() -> {
                    return handleException(exchange, (CoreTranslateLanguageDTO) ((KeyValueDTO<?, ?>) coreTranslateLanguageDTOS.get(1).getRecordModelDTO().getFieldValues().get(1L)).getOriginalData(), ex);
                });
            }).flatMap(voidMono -> voidMono);
        } else {
            return ReactiveSecurityAttributeHolder.loadAuth(exchange).flatMap(webErpSecurityContext -> {
                return handleException(exchange, webErpSecurityContext.getUserSecurityModel().getCoreTranslateLanguageDTO(), ex);
            });
        }
    }

    private Mono<Void> handleException(ServerWebExchange exchange, CoreTranslateLanguageDTO coreTranslateLanguageDTO, Throwable ex) {
        if (ex instanceof ErrorResponseDTO errorResponseDTO) {
            Mono<String> translateException = getTranslateMessage(coreTranslateLanguageDTO, errorResponseDTO.getError());
            return translateException.flatMap((tValue) -> {
                errorResponseDTO.setErrorDescription(tValue);
                return produceJson(errorResponseDTO, exchange);
            });
        } else {
            return Mono.defer(() -> {
                ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
                errorResponseDTO.setErrorStatus(ERPHttpStatus.INTERNAL_SERVER_ERROR);
                errorResponseDTO.setErrorDescription(ex.getMessage());
                return produceJson(errorResponseDTO, exchange);
            });
        }
    }

    private void setHeaders(final ErrorResponseDTO err, final ServerHttpResponse response) {
        HttpHeaders headers = response.getHeaders();
        response.setStatusCode(HttpStatus.valueOf(err.getErrorStatus().value()));
        try {
            headers.put(HttpHeaders.CONTENT_TYPE, Collections.singletonList(MediaType.APPLICATION_JSON_VALUE));
        } catch (UnsupportedOperationException e) {
            e.printStackTrace();
        }
    }

    public Mono<Void> produceJson(ErrorResponseDTO err, ServerWebExchange exchange) {
        try {
            ServerHttpResponse response = exchange.getResponse();
            setHeaders(err, response);
            String json = objectMapper.writeValueAsString(err);
            DataBuffer buffer = response.bufferFactory().wrap(json.getBytes(StandardCharsets.UTF_8));
            return response.writeWith(Mono.just(buffer)).doOnError(e -> DataBufferUtils.release(buffer));
        } catch (Exception e) {
            return Mono.error(e);
        }
    }
}
