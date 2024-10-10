package org.infra.reactive.form.engine.logger.configuration.log4j2.old;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.core.appender.ConsoleAppender;
import org.apache.logging.log4j.core.config.Configurator;
import org.apache.logging.log4j.core.config.builder.api.*;
import org.apache.logging.log4j.core.config.builder.impl.BuiltConfiguration;
import org.infra.reactive.form.engine.Info;

public class StartLog4jV2 {

    public static void initializeYourLogger(String fileName, String pattern) {
        ConfigurationBuilder<BuiltConfiguration> builder = ConfigurationBuilderFactory.newConfigurationBuilder();

        // create a console appender
        AppenderComponentBuilder appenderBuilder_Console = builder.newAppender("Console", "CONSOLE").addAttribute("target", ConsoleAppender.Target.SYSTEM_OUT);
        appenderBuilder_Console.add(builder.newLayout("PatternLayout").addAttribute("pattern", pattern));

        // create a Debug appender
        AppenderComponentBuilder appenderBuilder_Debug = getAppenderComponentBuilder(builder, "DEBUG", pattern, "LogToRollingRandomAccessFileDebug", "debug_", fileName, "C://Vahid//debug/$${date:yyyy-MM}/");
        // create a ERROR appender
        AppenderComponentBuilder appenderBuilder_ERROR = getAppenderComponentBuilder(builder, "ERROR", pattern, "LogToRollingRandomAccessFileERROR", "error_", fileName, "C://Vahid//error/$${date:yyyy-MM}/");

        AppenderComponentBuilder appenderBuilder_INFO = getAppenderComponentBuilder(builder, "INFO", pattern, "LogToRollingRandomAccessFileINFO", "info_", fileName, "C://Vahid//info/$${date:yyyy-MM}/");

        // create a root logger
        RootLoggerComponentBuilder rootLogger = builder.newRootLogger(Level.ALL);
        rootLogger.add(builder.newAppenderRef("Console"));

        // create a main logger
        LoggerComponentBuilder mainLogger = builder.newLogger("org").addAttribute("additivity", false);
        mainLogger.add(builder.newAppenderRef("LogToRollingRandomAccessFileDebug"));
        mainLogger.add(builder.newAppenderRef("LogToRollingRandomAccessFileERROR"));
        mainLogger.add(builder.newAppenderRef("LogToRollingRandomAccessFileINFO"));
        mainLogger.add(builder.newAppenderRef("Console"));

        builder.add(appenderBuilder_Console);
        builder.add(appenderBuilder_ERROR);
        builder.add(appenderBuilder_Debug);
        builder.add(appenderBuilder_INFO);
        builder.add(mainLogger);
        builder.add(rootLogger);

        BuiltConfiguration build = builder.build();

        Configurator.reconfigure(build);
    }

    private static AppenderComponentBuilder getAppenderComponentBuilder(ConfigurationBuilder<BuiltConfiguration> builder, String DEBUG, String pattern, String LogToRollingRandomAccessFileDebug, String debug_, String fileName, String x) {
        LayoutComponentBuilder levelRangeFilter_DEBUG = builder.newLayout("LevelRangeFilter").addAttribute("minLevel", DEBUG).addAttribute("maxLevel", DEBUG).addAttribute("onMatch", "ACCEPT").addAttribute("onMismatch", "DENY");
        LayoutComponentBuilder layoutBuilder_DEBUG = builder.newLayout("PatternLayout").addAttribute("pattern", pattern);
        ComponentBuilder triggeringPolicy_DEBUG = builder.newComponent("Policies").addComponent(builder.newComponent("SizeBasedTriggeringPolicy").addAttribute("size", "1000KB"));

        AppenderComponentBuilder appenderBuilder_Debug = builder.newAppender(LogToRollingRandomAccessFileDebug, "RollingRandomAccessFile").addAttribute("fileName", "C://Vahid//" + debug_ + fileName).addAttribute("filePattern", x + fileName + "-%d{MM-dd-yyyy}-%i.log.gz").add(layoutBuilder_DEBUG).addComponent(triggeringPolicy_DEBUG).add(levelRangeFilter_DEBUG);
        return appenderBuilder_Debug;
    }
}
