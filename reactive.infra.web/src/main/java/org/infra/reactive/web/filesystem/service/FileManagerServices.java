package org.infra.reactive.web.filesystem.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.buffer.DataBuffer;
import reactor.core.publisher.Flux;

public class FileManagerServices {
    private final Logger logger = LogManager.getLogger(FileManagerServices.class);

    public static Flux<DataBuffer> iconDownloader(String core_All_Element_Id, String record_id) {
        if (core_All_Element_Id != null && record_id != null) {
            return FileManagerServices.iconDownloader(Long.parseLong(core_All_Element_Id), Long.parseLong(record_id));
        } else {
            return Flux.empty();
        }
    }

    public static Flux<DataBuffer> iconDownloader(long core_All_Element_Id, long record_id) {
//        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryPerDataSource(coreTableDataSourceDTO);
//        QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);
        return Flux.empty();
    }
}
