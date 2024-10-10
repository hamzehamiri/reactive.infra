package org.infra.reactive.form.engine.logger.configuration.log4j1;

import org.apache.log4j.*;

public class HamzehLogger extends Logger {
    public HamzehLogger(HamzehLoggerRepository repository, String name) {
        super(name);
        this.repository = repository;
        this.level = Level.ALL;

        ConsoleAppender appenderConsole = new ConsoleAppender();
        appenderConsole.setLayout(new PatternLayout(PatternLayout.TTCC_CONVERSION_PATTERN));
        appenderConsole.setTarget(ConsoleAppender.SYSTEM_OUT);
        appenderConsole.activateOptions();

        FileAppender appenderFile = new FileAppender();
        appenderFile.setFile("D:/Vahid/Test.log");
        appenderFile.setLayout(new PatternLayout(PatternLayout.TTCC_CONVERSION_PATTERN));
        appenderFile.activateOptions();

        addAppender(appenderConsole);
    }
}
