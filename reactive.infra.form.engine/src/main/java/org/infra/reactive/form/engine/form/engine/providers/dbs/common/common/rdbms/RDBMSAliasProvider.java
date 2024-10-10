package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class RDBMSAliasProvider {
    private String aliasPrefixNameColumn = "c";
    private String aliasPrefixNameTable = "t";
    private int counterColumn = 0;
    private int counterTable = 0;

    private Lock lockTableName = new ReentrantLock();
    private Lock lockColumnName = new ReentrantLock();

    public void setAliasPrefixNameColumn(String aliasPrefixNameColumn) {
        this.aliasPrefixNameColumn = aliasPrefixNameColumn;
    }

    public void setAliasPrefixNameTable(String aliasPrefixNameTable) {
        this.aliasPrefixNameTable = aliasPrefixNameTable;
    }

    public void setCounterColumn(int counterColumn) {
        this.counterColumn = counterColumn;
    }

    public void setCounterTable(int counterTable) {
        this.counterTable = counterTable;
    }

    public String nextAliasColumnName() {
        lockColumnName.lock();
        String alias = aliasPrefixNameColumn + counterColumn++;
        lockColumnName.unlock();
        return alias;
    }

    public String nextAliasTableName() {
        lockTableName.lock();
        String alias = aliasPrefixNameTable + counterTable++;
        lockTableName.unlock();
        return alias;
    }
}
