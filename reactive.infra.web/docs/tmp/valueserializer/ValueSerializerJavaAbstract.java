package org.hamzeh.erp.form.engine.providers.coretableservices.valueserializer;

public abstract class ValueSerializerJavaAbstract<DBValue , MODEL> {
    public abstract MODEL convertFromDBToClient(DBValue dbValue);
}
