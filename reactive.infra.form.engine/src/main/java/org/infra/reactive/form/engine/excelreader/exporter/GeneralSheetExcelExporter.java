package org.infra.reactive.form.engine.excelreader.exporter;

import org.infra.reactive.form.engine.excelreader.SheetExcelReader;

public class GeneralSheetExcelExporter extends AbstractExcelExporter {

    static String registerKey() {
        return "general";
    }

    public GeneralSheetExcelExporter(SheetExcelReader sheetExcelReader) {
        super(sheetExcelReader);
    }

    @Override
    public void export() {
        
    }
}
