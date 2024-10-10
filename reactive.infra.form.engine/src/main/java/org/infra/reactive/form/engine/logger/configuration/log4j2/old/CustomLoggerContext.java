package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.core.Logger;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.message.MessageFactory;
import org.apache.logging.log4j.spi.LoggerRegistry;

import java.net.URI;

public class CustomLoggerContext extends LoggerContext {
    private final LoggerRegistry<Logger> loggerRegistry = new LoggerRegistry<>();

    public CustomLoggerContext(String name) {
        super(name);
    }

    public CustomLoggerContext(String name, Object externalContext) {
        super(name, externalContext);
    }

    public CustomLoggerContext(String name, Object externalContext, URI configLocn) {
        super(name, externalContext, configLocn);
    }

    public CustomLoggerContext(String name, Object externalContext, String configLocn) {
        super(name, externalContext, configLocn);
    }

    @Override
    public Object getExternalContext() {
        return null;
    }

    @Override
    public Logger getLogger(final String name) {
        if (!loggerRegistry.hasLogger(name)) {
            CustomLogger customLogger = new CustomLogger(LoggerContext.getContext(), name);
//            customLogger.getContext().getConfiguration().addAppender();
            loggerRegistry.putIfAbsent(name, null, customLogger);
        }
        return loggerRegistry.getLogger(name);
    }

    @Override
    public Logger getLogger(final String name, final MessageFactory messageFactory) {
        if (!loggerRegistry.hasLogger(name, messageFactory)) {
//            loggerRegistry.putIfAbsent(name, messageFactory,
//                    new SLF4JLogger(name, messageFactory, LoggerFactory.getLogger(name)));
        }
        return loggerRegistry.getLogger(name, messageFactory);
    }

    @Override
    public boolean hasLogger(final String name) {
        return loggerRegistry.hasLogger(name);
    }

    @Override
    public boolean hasLogger(final String name, final MessageFactory messageFactory) {
        return loggerRegistry.hasLogger(name, messageFactory);
    }

    @Override
    public boolean hasLogger(final String name, final Class<? extends MessageFactory> messageFactoryClass) {
        return loggerRegistry.hasLogger(name, messageFactoryClass);
    }
}
