package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.core.Appender;
import org.apache.logging.log4j.core.Layout;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.appender.FileAppender;
import org.apache.logging.log4j.core.config.*;
import org.apache.logging.log4j.core.layout.PatternLayout;

public class CustomConfiguration extends AbstractConfiguration {

    private static final long serialVersionUID = 1L;
    public static final String CONFIG_NAME = "Custom";
    public static final String DEFAULT_LEVEL = "org.apache.logging.log4j.level";
    public static final String DEFAULT_PATTERN = "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n";

    public CustomConfiguration(final LoggerContext loggerContext) {
        this(loggerContext, ConfigurationSource.NULL_SOURCE);
    }

    public CustomConfiguration(final LoggerContext loggerContext, final ConfigurationSource source) {
        super(loggerContext, source);
    }

    @Override
    protected void doConfigure() {
        Configuration config = getLoggerContext().getConfiguration();
        Layout layout = PatternLayout.createDefaultLayout(config);

        Appender appender = FileAppender.createAppender("target/test.log", "false", "false", "File", "true", "false", "false", "4000", layout, null, "false", null, config);
        appender.start();

        addAppender(appender);

        AppenderRef ref = AppenderRef.createAppenderRef("File", null, null);
        AppenderRef[] refs = new AppenderRef[]{ref};

        LoggerConfig loggerConfig = LoggerConfig.createLogger("false", Level.valueOf("info"), "org.apache.logging.log4j", "true", refs, null, config, null);
        loggerConfig.addAppender(appender, null, null);
        addLogger("org.apache.logging.log4j", loggerConfig);

        getLoggerContext().updateLoggers();
//        setName(CONFIG_NAME);
//        Layout<? extends Serializable> layout = PatternLayout.newBuilder().withPattern(DEFAULT_PATTERN).withConfiguration(this).build();
//
//        Appender appender = FileAppender.createAppender("D://test.log", "false", "false", "File", "true",
//                "false", "false", "4000", layout, null, "false", null, this);
//        appender.start();
//
////        Appender appender = ConsoleAppender.createDefaultAppenderForLayout(layout);
////        appender.start();
//
////        addAppender(appender);
//        addAppender(appender);
//
//        AppenderRef ref = AppenderRef.createAppenderRef("File", null, null);
//        AppenderRef[] refs = new AppenderRef[] {ref};
//
//        LoggerConfig root = getRootLogger();
////        root.addAppender(appender, null, null);
//        root.addAppender(appender, null, null);
//
////        String levelName = PropertiesUtil.getProperties().getStringProperty(DEFAULT_LEVEL);
////        Level level = levelName != null && Level.valueOf(levelName) != null ? Level.valueOf(levelName) : Level.ERROR;
////        root.setLevel(level);
//
//        loggerContext.getConfiguration().addAppender(appender);

    }
}