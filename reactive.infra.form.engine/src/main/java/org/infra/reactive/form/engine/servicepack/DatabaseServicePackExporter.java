package org.infra.reactive.form.engine.servicepack;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import reactor.core.publisher.Flux;

public class DatabaseServicePackExporter {
    private static DatabaseServicePackExporter Instance;

    public static DatabaseServicePackExporter getInstance() {
        if (Instance == null) {
            Instance = new DatabaseServicePackExporter();
        }
        return Instance;
    }

    private final AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory;

    private DatabaseServicePackExporter() {
        this.abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
    }

    public Flux<CoreTableDTO> readAllTables() {
        return abstractRDBMSReactorFactory.fetchAllCoreTables();
    }
}
