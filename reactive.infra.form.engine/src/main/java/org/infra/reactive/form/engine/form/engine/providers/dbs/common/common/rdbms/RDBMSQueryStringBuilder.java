package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms;

import lombok.Data;

@Data
public class RDBMSQueryStringBuilder {
    private StringBuilder columnsPart;
    private StringBuilder tablesPart;
    private StringBuilder joinsPart;
    private StringBuilder wheresPart;
    private StringBuilder sortOrdersPart;
    private StringBuilder havingPart;
    private StringBuilder fullQuery;

    public RDBMSQueryStringBuilder() {
        this.columnsPart = new StringBuilder();
        this.tablesPart = new StringBuilder();
        this.joinsPart = new StringBuilder();
        this.wheresPart = new StringBuilder();
        this.sortOrdersPart = new StringBuilder();
        this.havingPart = new StringBuilder();
        this.fullQuery = new StringBuilder();
    }
}
