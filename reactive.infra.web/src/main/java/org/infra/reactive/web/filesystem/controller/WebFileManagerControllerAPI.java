package org.infra.reactive.web.filesystem.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.http.entity.ContentType;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorAttachmentDTO;
import org.infra.reactive.web.filesystem.service.DownloadUploadFileUtil;
import org.infra.reactive.web.filesystem.service.FileManagerServices;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping(ERPConstants.key_Slash + ERPConstants.key_base + ERPConstants.key_Slash + ERPConstants.key_FileManager)
public class WebFileManagerControllerAPI {

    private final ObjectMapperFactory objectMapperFactory;

    public WebFileManagerControllerAPI(ObjectMapperFactory objectMapperFactory) {
        this.objectMapperFactory = objectMapperFactory;
    }

    @PostMapping(ERPConstants.key_Slash + ERPConstants.key_UploadFile)
    public Flux<String> uploadFile(@RequestPart("file") final Mono<FilePart> filePartOptional, @RequestPart("fileModel") String dataProviderAttachmentDTOJsonString) {
        try {
            EditorAttachmentDTO dataProviderAttachmentDTO = objectMapperFactory.getObjectMapper().readValue(dataProviderAttachmentDTOJsonString, EditorAttachmentDTO.class);
            return filePartOptional.flatMapMany(filePart -> {
                return DownloadUploadFileUtil.saveFile(filePart, dataProviderAttachmentDTO);
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/download-file")
    public Flux<DataBuffer> downloadFile(ServerWebExchange exchange, @RequestParam Map<String, String> allRequestParams) {
        ServerHttpResponse response = exchange.getResponse();
        HttpHeaders headers = response.getHeaders();
//        headers.add(HttpHeaders.CONTENT_DISPOSITION , "attachment; filename=" + "test.pdf");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        Path filePath = Paths.get("D://test.pdf");
        DataBufferFactory dbf = new DefaultDataBufferFactory();
        return DataBufferUtils.read(filePath, dbf, 256 * 256);
    }

    @GetMapping("/icon-downloader")
    public Flux<DataBuffer> iconDownloader(ServerWebExchange exchange, @RequestParam Map<String, String> allRequestParams) {
        ServerHttpResponse response = exchange.getResponse();

        String core_All_Element_Id = allRequestParams.get("core_all_element_id");
        String record_id = allRequestParams.get("record_id");

        HttpHeaders headers = response.getHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, ContentType.IMAGE_PNG.getMimeType());

//        Path filePath = Paths.get("D://BestFolder//MyGit//erp//reactive.erp.web//src//main//resources//static//Resources//Themes//Img//Menu//Analytic.png");
//        DataBufferFactory dbf = new DefaultDataBufferFactory();
//        return DataBufferUtils.read(filePath, dbf, 256 * 256);
        return FileManagerServices.iconDownloader(core_All_Element_Id, record_id);
    }
}
