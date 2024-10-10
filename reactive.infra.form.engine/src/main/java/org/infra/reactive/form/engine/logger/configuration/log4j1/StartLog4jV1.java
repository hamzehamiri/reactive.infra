package org.infra.reactive.form.engine.logger.configuration.log4j1;

import org.apache.log4j.LogManager;

public class StartLog4jV1 {
    public static void StartCustomService() {
        HamzehDefaultRepositorySelector repos = new HamzehDefaultRepositorySelector(new HamzehLoggerRepository());
        LogManager.setRepositorySelector(repos, null);
    }
}
