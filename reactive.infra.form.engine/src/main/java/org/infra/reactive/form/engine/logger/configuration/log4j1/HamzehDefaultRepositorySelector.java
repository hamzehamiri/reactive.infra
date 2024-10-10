package org.infra.reactive.form.engine.logger.configuration.log4j1;

import org.apache.log4j.spi.LoggerRepository;
import org.apache.log4j.spi.RepositorySelector;

public class HamzehDefaultRepositorySelector implements RepositorySelector {

    final LoggerRepository repository;

    public HamzehDefaultRepositorySelector(LoggerRepository repository) {
        this.repository = repository;
    }

    public LoggerRepository getLoggerRepository() {
        return repository;
    }
}