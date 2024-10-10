package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table;

public interface TableInterface {
    void setAliasTableName(String aliasTableName);
    String getAliasTableName();
    String getID();
    String generateTableExpression();
    boolean isMasterTable();

    void setMasterTable(boolean masterTable);
}
