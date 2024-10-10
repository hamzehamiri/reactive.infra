package org.infra.reactive.form.engine.logger;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.logger.configuration.log4j2.old.StartLog4jV2;

public class LoggerTest {

//    private Logger logger = LogManager.getLogger(LoggerTest.class);

    public LoggerTest() {
        Logger logger = LogManager.getLogger(LoggerTest.class);
        logger.error("Test");
        logger.debug("Test");
        logger.info("Test");
        logger.warn("Test");
    }

    public static void main(String[] args) {
//        ConfigurationFactory.setConfigurationFactory(new CustomConfigurationFactory());
//        final Configuration config = ctx.;
//        final Layout layout = PatternLayout.createDefaultLayout(config);
//        Appender appender = FileAppender.createAppender("D://test.log", "false", "false", "File", "true",
//                "false", "false", "4000", layout, null, "false", null, config);
//        appender.start();
//        config.addAppender(appender);
//        AppenderRef ref = AppenderRef.createAppenderRef("File", Level.ERROR, null);
//        AppenderRef[] refs = new AppenderRef[] {ref};
//        LoggerConfig loggerConfig = LoggerConfig.createLogger("false", Level.ERROR, "org.apache.logging.log4j",
//                "true", refs, null, config, null );
//        loggerConfig.addAppender(appender, null, null);
//        config.addLogger("org.apache.logging.log4j", loggerConfig);
//        ctx.updateLoggers();
        StartLog4jV2.initializeYourLogger("app.log", "%d %p %c [%t] %m%n");
        new LoggerTest();
    }
}
