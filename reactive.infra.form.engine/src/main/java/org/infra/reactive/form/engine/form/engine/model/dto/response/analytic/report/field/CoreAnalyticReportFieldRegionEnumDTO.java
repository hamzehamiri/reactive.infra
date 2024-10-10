package org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field;

public enum CoreAnalyticReportFieldRegionEnumDTO {
    Filter("Filter"),
    Data("Data"),
    Column("Column"),
    Row("Row"),
    None("None");

    private final String key;

    CoreAnalyticReportFieldRegionEnumDTO(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return this.key;
    }
}
