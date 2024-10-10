package org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory;

import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterNodeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceTypeDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.nosql.mongo.MongoDBFactoryProviderReactive;
import org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.mysql.MySQLFactoryProviderReactive;
import org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.oracle.OracleFactoryProviderReactive;
import org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.postgres.PostgresFactoryProviderReactive;
import org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.sqlserver.SqlServerFactoryProviderReactive;

import java.util.List;
import java.util.Properties;

public class ConnectionStartup {

    private static Properties infraConnectionProps;
    private static CoreTableDataSourceDTO defaultConnection;

    static {
        InfraConnectionFactoryProvider.registerRDBMSClassFactory(PostgresFactoryProviderReactive.class);
        InfraConnectionFactoryProvider.registerRDBMSClassFactory(MySQLFactoryProviderReactive.class);
        InfraConnectionFactoryProvider.registerRDBMSClassFactory(OracleFactoryProviderReactive.class);
        InfraConnectionFactoryProvider.registerRDBMSClassFactory(SqlServerFactoryProviderReactive.class);

        InfraConnectionFactoryProvider.registerNoSQLClassFactory(MongoDBFactoryProviderReactive.class);

        defaultConnectionSetup();
    }

    public static void defaultConnectionSetup() {
        infraConnectionProps = ConnectionReadConfig.readFile("application.properties");
        Object hostIp = infraConnectionProps.get("erp.rdbms.connection.hostIp");
        Object port = infraConnectionProps.get("erp.rdbms.connection.port");
        Object userName = infraConnectionProps.get("erp.rdbms.connection.userName");
        Object password = infraConnectionProps.get("erp.rdbms.connection.password");
        Object dataBaseName = infraConnectionProps.get("erp.rdbms.connection.databaseName");
        Object schemaName = infraConnectionProps.get("erp.rdbms.connection.schemaName");
        Object registerKey = infraConnectionProps.get("erp.rdbms.connection.registerKey");
        Object ssl = infraConnectionProps.get("erp.rdbms.connection.ssl");

        String registerKeyString = registerKey != null ? registerKey.toString() : PostgresFactoryProviderReactive.registerKey;

        CoreHostClusterNodeDTO coreHostClusterNodeDTO = new CoreHostClusterNodeDTO();
        coreHostClusterNodeDTO.setCoreHostDTO(new CoreHostDTO(hostIp != null ? hostIp.toString() : "localhost"));
        coreHostClusterNodeDTO.setPort(null != port ? Integer.parseInt(port.toString()) : 5432);

        CoreHostClusterDTO coreHostClusterDTO = new CoreHostClusterDTO();
        coreHostClusterDTO.setName("DefaultDBConnection");
        coreHostClusterDTO.setNodes(List.of(coreHostClusterNodeDTO));

        CoreTableDataSourceTypeDTO coreTableDataSourceTypeDTO = new CoreTableDataSourceTypeDTO();
        coreTableDataSourceTypeDTO.setRdbms(true);
        coreTableDataSourceTypeDTO.setName("Postgres");

        defaultConnection = new CoreTableDataSourceDTO();
        defaultConnection.setClassRDBMS(InfraConnectionFactoryProvider.getClassAbstractRDBMSReactorFactory(registerKeyString));
        defaultConnection.setRegisterKey(registerKeyString);
        defaultConnection.setCoreHostClusterDTO(coreHostClusterDTO);
        defaultConnection.setCoreTableDataSourceTypeDTO(coreTableDataSourceTypeDTO);
        defaultConnection.setDataBase(dataBaseName != null ? dataBaseName.toString() : "erp");
        defaultConnection.setSchema(schemaName != null ? schemaName.toString() : "hamzehschema");
        defaultConnection.setUserName(userName != null ? userName.toString() : "postgres");
        defaultConnection.setPassword(password != null ? password.toString() : "1");
        defaultConnection.setSsl(ssl != null && ssl.toString().equalsIgnoreCase("true"));
    }

    public static AbstractRDBMSReactorFactory<?, ?> createRDBMSReactorFactoryDefault() {
        return createRDBMSReactorFactoryPerDataSource(defaultConnection);
    }

    public static AbstractRDBMSReactorFactory<?, ?> createRDBMSReactorFactoryPerDataSource(CoreTableDataSourceDTO coreTableDataSourceDTO) {
        return InfraConnectionFactoryProvider.getRDBMSConnectionFactory(coreTableDataSourceDTO);
    }

    public static AbstractNoSQLReactorFactory<?, ?> createNoSQLReactorFactoryPerDataSource(CoreTableDataSourceDTO coreTableDataSourceDTO) {
        return InfraConnectionFactoryProvider.getNoSQLConnectionFactory(coreTableDataSourceDTO);
    }

}
