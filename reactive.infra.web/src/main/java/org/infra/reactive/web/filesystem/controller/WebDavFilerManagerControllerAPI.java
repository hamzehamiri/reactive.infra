package org.infra.reactive.web.filesystem.controller;

import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorAttachmentDTO;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.webdavnew.WebDavAbstractController;
import org.infra.reactive.web.webdavnew.annotations.WebDavReactiveAnnotationController;
import org.infra.reactive.web.webdavnew.annotations.WebDavReactiveAnnotationFileHandlingMethod;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.nio.file.Paths;

@WebDavReactiveAnnotationController(baseAPI = ERPConstants.key_Slash + ERPConstants.key_base + ERPConstants.key_Slash + ERPConstants.key_FileManager)
public class WebDavFilerManagerControllerAPI extends WebDavAbstractController {
    public WebDavFilerManagerControllerAPI(ServerWebExchange serverWebExchange) {
        super(serverWebExchange);
    }

    @WebDavReactiveAnnotationFileHandlingMethod(api = ERPConstants.key_Slash + ERPConstants.key_GetFile)
    public Flux<DataBuffer> handlingReadFile(ServerWebExchange exchange, EditorAttachmentDTO editorAttachmentDTO) {
        DataBufferFactory bufferFactory = exchange.getResponse().bufferFactory();
        Path path = Paths.get("C:\\Hamzeh\\test.docx");
        int bufferSize = 1024 * 16;
        return DataBufferUtils.read(path, bufferFactory, bufferSize);
    }

    @WebDavReactiveAnnotationFileHandlingMethod(api = ERPConstants.key_Slash + ERPConstants.key_EditFile)
    public Mono<Void> handlingWriteFile(ServerWebExchange exchange, EditorAttachmentDTO editorAttachmentDTO) {
        return Mono.defer(() -> {
           return Mono.empty();
        });
    }
}
