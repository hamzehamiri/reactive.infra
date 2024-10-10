package org.infra.reactive.form.engine.logger.loggerqueue.consumer;

import org.infra.reactive.form.engine.calendar.DateConverter;
import org.infra.reactive.form.engine.logger.loggerqueue.LoggerMessageModel;

import java.io.File;
import java.io.FileOutputStream;
import java.io.Writer;
import java.nio.channels.Channels;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Properties;

public class LoggerQueueManagerConsumerFile extends LoggerQueueManagerConsumerAbstract {
    private Map<String, String> stringStringMap;

    @Override
    public void initial(Properties properties) {
        Object basePath = properties.get(keyBasePathLog);
        Path currentWorkingDir = Paths.get("").toAbsolutePath();
    }

    private void writeAppend(StringBuilder sb, Boolean append) throws Exception {
        File file = File.createTempFile("foo", ".txt");

        try (Writer writer = Channels.newWriter(new FileOutputStream(file.getAbsoluteFile(), append).getChannel(), StandardCharsets.UTF_8)) {
            writer.append(sb);
        }
    }

    @Override
    public void consume(LoggerMessageModel loggerMessageModel) {
        if (loggerMessageModel.getLocalDate() != null) {
            int persianDate[] = DateConverter.gregorian_to_jalali(loggerMessageModel.getLocalDate().getYear(), loggerMessageModel.getLocalDate().getMonth().getValue(), loggerMessageModel.getLocalDate().getDayOfMonth());

        }
    }

    @Override
    public void stopConsumer() {

    }
}
