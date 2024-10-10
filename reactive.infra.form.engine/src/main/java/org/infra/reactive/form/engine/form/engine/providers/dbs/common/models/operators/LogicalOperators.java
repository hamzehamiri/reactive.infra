package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators;

public enum LogicalOperators {
    AND("AND"),
    OR("OR"),
    BETWEEN("BETWEEN"),
    EXISTS("EXISTS"),
    IN("IN"),
    LIKE("LIKE"),
    NOT("NOT"),
    NOTNULL("NOTNULL");

    String opValue;

    LogicalOperators(String opValue) {
        this.opValue = opValue;
    }

    @Override
    public String toString() {
        return opValue;
    }
}
