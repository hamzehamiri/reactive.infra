package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.ConfigurationFactory;
import org.apache.logging.log4j.core.config.ConfigurationSource;

import java.net.URI;

public class CustomConfigurationFactory extends ConfigurationFactory {

    public static final String[] SUFFIXES = new String[]{"*"};

    @Override
    public Configuration getConfiguration(final LoggerContext loggerContext, final ConfigurationSource source) {
        return new CustomConfiguration(loggerContext, source);
    }

    @Override
    public Configuration getConfiguration(final LoggerContext loggerContext, final String name, final URI configLocation) {
        return new CustomConfiguration(loggerContext);
    }

    @Override
    public String[] getSupportedTypes() {
        return SUFFIXES;
    }
}
