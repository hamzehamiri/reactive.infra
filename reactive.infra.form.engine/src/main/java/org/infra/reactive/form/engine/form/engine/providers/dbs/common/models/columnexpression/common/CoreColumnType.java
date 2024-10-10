package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common;

public enum CoreColumnType {
    String("String"),
    INT32("INT32"),
    INT64("INT64"),
    XML("XML"),
    JSON("JSON"),
    Date("Date"),
    DateTime("DateTime"),
    Time("Time"),
    Long("Long"),
    Boolean("Boolean");
    String value;

    CoreColumnType(String value) {
        this.value = value;
    }

    public static CoreColumnType getType(String value) {
        for (int i = 0; i < CoreColumnType.values().length; i++) {
            CoreColumnType val = CoreColumnType.values()[i];
            if (val.value.equals(value))
                return val;
        }
        return CoreColumnType.INT64;
    }
}
