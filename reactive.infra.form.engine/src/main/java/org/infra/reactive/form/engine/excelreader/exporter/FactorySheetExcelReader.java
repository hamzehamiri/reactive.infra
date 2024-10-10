package org.infra.reactive.form.engine.excelreader.exporter;

import org.infra.reactive.form.engine.excelreader.SheetExcelReader;

import java.util.concurrent.ConcurrentHashMap;

public class FactorySheetExcelReader {

    private static ConcurrentHashMap<String, Class<? extends AbstractExcelExporter>> stringExcelExporterInterfaceConcurrentHashMap = new ConcurrentHashMap<>(100);

    public static void register(String key, Class<? extends AbstractExcelExporter> excelExporterInterface) {
        if (!stringExcelExporterInterfaceConcurrentHashMap.containsKey(key)) {
            stringExcelExporterInterfaceConcurrentHashMap.put(key, excelExporterInterface);
        }
    }

    public static <T extends AbstractExcelExporter> T factory(SheetExcelReader sheetExcelReader, String key) {
        Class<? extends AbstractExcelExporter> exporter = stringExcelExporterInterfaceConcurrentHashMap.get(key);
        if (exporter != null) {
            try {
                return (T) exporter.getConstructor(SheetExcelReader.class).newInstance(sheetExcelReader);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }
}
