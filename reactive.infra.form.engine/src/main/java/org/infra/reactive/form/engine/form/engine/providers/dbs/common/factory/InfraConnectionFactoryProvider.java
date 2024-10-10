package org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.AbstractReactorFactoryRegister;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;

import java.lang.reflect.Constructor;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class InfraConnectionFactoryProvider {

    private final static ConcurrentMap<String, Class<? extends AbstractRDBMSReactorFactory<?, ?>>> infraRDBMSClassFactoryRegister = new ConcurrentHashMap<>(10);
    private final static ConcurrentMap<CoreTableDataSourceDTO, AbstractRDBMSReactorFactory<?, ?>> infraRDBMSConnectionFactoryConcurrentHashMap = new ConcurrentHashMap<>(10);
    private final static ConcurrentMap<CoreTableDataSourceDTO, ConcurrentMap<String, Connection>> infraRDBMSAllConnectionPerDataSourceAndConnectionUnique = new ConcurrentHashMap<>(10);

    private final static ConcurrentMap<String, Class<? extends AbstractNoSQLReactorFactory<?, ?>>> infraNoSQLClassFactoryRegister = new ConcurrentHashMap<>(10);
    private final static ConcurrentMap<CoreTableDataSourceDTO, AbstractNoSQLReactorFactory<?, ?>> infraNoSQLConnectionFactoryConcurrentHashMap = new ConcurrentHashMap<>(10);

    public static void registerConnection(CoreTableDataSourceDTO coreTableDataSourceDTO, String uuid, Connection connectionMono) {
        ConcurrentMap<String, Connection> connectionMonoUUIDMap = infraRDBMSAllConnectionPerDataSourceAndConnectionUnique.get(coreTableDataSourceDTO);
        if (connectionMonoUUIDMap == null) {
            synchronized (InfraConnectionFactoryProvider.class) {
                connectionMonoUUIDMap = new ConcurrentHashMap<>();
                infraRDBMSAllConnectionPerDataSourceAndConnectionUnique.put(coreTableDataSourceDTO, connectionMonoUUIDMap);
            }
        }
        Connection monoConnection = connectionMonoUUIDMap.get(uuid);
        if (monoConnection == null) {
            connectionMonoUUIDMap.put(uuid, connectionMono);
        } else {
            System.out.println("Old Connection UUID is Exist");
        }
    }

    public static void registerRDBMSClassFactory(Class<? extends AbstractRDBMSReactorFactory<?, ?>> classFactory) {
        AbstractReactorFactoryRegister abstractFactoryRegister = classFactory.getAnnotation(AbstractReactorFactoryRegister.class);
        if (!abstractFactoryRegister.registerKey().isEmpty()) {
            infraRDBMSClassFactoryRegister.put(abstractFactoryRegister.registerKey(), classFactory);
        }
    }

    public static void registerNoSQLClassFactory(Class<? extends AbstractNoSQLReactorFactory<?, ?>> classFactory) {
        AbstractReactorFactoryRegister abstractFactoryRegister = classFactory.getAnnotation(AbstractReactorFactoryRegister.class);
        if (!abstractFactoryRegister.registerKey().isEmpty()) {
            infraNoSQLClassFactoryRegister.put(abstractFactoryRegister.registerKey(), classFactory);
        }
    }

    public static Class<? extends AbstractRDBMSReactorFactory<?, ?>> getClassAbstractRDBMSReactorFactory(String registerKey) {
        return infraRDBMSClassFactoryRegister.get(registerKey);
    }

    public static Class<? extends AbstractNoSQLReactorFactory<?, ?>> getClassAbstractNoSQLReactorFactory(String registerKey) {
        return infraNoSQLClassFactoryRegister.get(registerKey);
    }

    public static AbstractRDBMSReactorFactory<?, ?> getRDBMSConnectionFactory(CoreTableDataSourceDTO dataBaseInfoModel) {
        AbstractRDBMSReactorFactory<?, ?> connectionFactory = infraRDBMSConnectionFactoryConcurrentHashMap.get(dataBaseInfoModel);
        if (connectionFactory == null) {
            synchronized (InfraConnectionFactoryProvider.class) {
                connectionFactory = infraRDBMSConnectionFactoryConcurrentHashMap.get(dataBaseInfoModel);
                if (connectionFactory == null) {
                    try {
                        Constructor<? extends AbstractRDBMSReactorFactory<?, ?>> constructor = dataBaseInfoModel.getClassRDBMS().getConstructor();
                        connectionFactory = constructor.newInstance();
                        connectionFactory.setDataBaseInfoModel(dataBaseInfoModel);
                        connectionFactory.buildConnectionFactory();
                        connectionFactory.buildConnectionPool();
                        infraRDBMSConnectionFactoryConcurrentHashMap.put(dataBaseInfoModel, connectionFactory);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
        return connectionFactory;
    }

    public static AbstractNoSQLReactorFactory<?, ?> getNoSQLConnectionFactory(CoreTableDataSourceDTO dataBaseInfoModel) {
        AbstractNoSQLReactorFactory<?, ?> connectionFactory = infraNoSQLConnectionFactoryConcurrentHashMap.get(dataBaseInfoModel);
        if (connectionFactory == null) {
            synchronized (InfraConnectionFactoryProvider.class) {
                connectionFactory = infraNoSQLConnectionFactoryConcurrentHashMap.get(dataBaseInfoModel);
                if (connectionFactory == null) {
                    try {
                        Constructor<? extends AbstractNoSQLReactorFactory<?, ?>> constructor = dataBaseInfoModel.getClassNoSQL().getConstructor();
                        connectionFactory = constructor.newInstance();
                        connectionFactory.setCoreTableDataSourceDTO(dataBaseInfoModel);
                        connectionFactory.buildConnectionFactory();
                        connectionFactory.buildConnectionPool();
                        infraNoSQLConnectionFactoryConcurrentHashMap.put(dataBaseInfoModel, connectionFactory);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
        return connectionFactory;
    }
}
