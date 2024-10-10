package org.infra.reactive.form.engine.excelreader.exporter;

import org.infra.reactive.form.engine.excelreader.SheetExcelReader;

public abstract class AbstractExcelExporter {
    static String registerKey() {
        return null;
    }

    protected SheetExcelReader sheetExcelReader;

    public AbstractExcelExporter(SheetExcelReader sheetExcelReader) {
        this.sheetExcelReader = sheetExcelReader;
    }

    public abstract void export();

}
