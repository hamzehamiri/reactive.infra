package org.infra.reactive.form.engine.form.engine.model.dto.response.table;

import lombok.Data;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;

import java.util.HashMap;
import java.util.Map;

@Data
public class CoreTableDataSourceDTO {

    public final static String dataBaseKey = "DataBase";
    public final static String schemaKey = "Schema";
    public final static String userNameKey = "UserName";
    public final static String passwordKey = "Password";

    private Class<? extends AbstractRDBMSReactorFactory<?, ?>> classRDBMS;
    private Class<? extends AbstractNoSQLReactorFactory<?, ?>> classNoSQL;

    private long id;
    private CoreHostClusterDTO coreHostClusterDTO;
    private CoreTableDataSourceTypeDTO coreTableDataSourceTypeDTO;
    private String registerKey;
    private boolean ssl;
    private Map<String, Object> options = new HashMap<>();

    public CoreTableDataSourceDTO setDataBase(String database) {
        options.put(dataBaseKey, database);
        return this;
    }

    public CoreTableDataSourceDTO setSchema(String schema) {
        options.put(schemaKey, schema);
        return this;
    }

    public CoreTableDataSourceDTO setUserName(String userName) {
        options.put(userNameKey, userName);
        return this;
    }

    public CoreTableDataSourceDTO setPassword(String password) {
        options.put(passwordKey, password);
        return this;
    }

    public String getDataBase() {
        return getValueString(dataBaseKey);
    }

    public String getSchema() {
        return getValueString(schemaKey);
    }

    public String getUserName() {
        return getValueString(userNameKey);
    }

    public String getPassword() {
        return getValueString(passwordKey);
    }

    private String getValueString(String key) {
        Object val = options.get(key);
        return val != null ? val.toString() : "";
    }

}
