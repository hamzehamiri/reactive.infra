package org.infra.reactive.form.engine.form.engine.services.core.dto;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class CoreServiceDTOAnalytic {
    private final Logger logger = LogManager.getLogger(CoreServiceDTOAnalytic.class);
    private final CoreServiceDTOTable coreServiceDTOTable;

    public CoreServiceDTOAnalytic(CoreServiceDTOTable coreServiceDTOTable) {
        this.coreServiceDTOTable = coreServiceDTOTable;
    }
}
