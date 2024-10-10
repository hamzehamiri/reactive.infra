package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.spi.LoggerContext;
import org.apache.logging.log4j.spi.LoggerContextFactory;
import org.apache.logging.log4j.status.StatusLogger;
import org.apache.logging.log4j.util.LoaderUtil;

import java.net.URI;

public class CustomLoggerContextFactory implements LoggerContextFactory {
    private static StatusLogger LOGGER = StatusLogger.getLogger();
    private static LoggerContext context;

    public CustomLoggerContextFactory() {
        boolean misconfigured = false;
        try {
            LoaderUtil.loadClass("org.slf4j.helpers.Log4jLoggerFactory");
            misconfigured = true;
        } catch (final ClassNotFoundException classNotFoundIsGood) {
            LOGGER.debug("org.slf4j.helpers.Log4jLoggerFactory is not on classpath. Good!");
        }
        if (misconfigured) {
            throw new IllegalStateException("slf4j-impl jar is mutually exclusive with log4j-to-slf4j jar " + "(the first routes calls from SLF4J to Log4j, the second from Log4j to SLF4J)");
        }
    }

    @Override
    public LoggerContext getContext(final String fqcn, final ClassLoader loader, final Object externalContext, final boolean currentContext) {
        context = new CustomLoggerContext(fqcn);
        return context;
    }

    @Override
    public LoggerContext getContext(final String fqcn, final ClassLoader loader, final Object externalContext, final boolean currentContext, final URI configLocation, final String name) {
        context = new CustomLoggerContext(fqcn);
        return context;
    }

    @Override
    public void removeContext(final LoggerContext ignored) {
    }

    @Override
    public boolean isClassLoaderDependent() {
        return false;
    }
}
