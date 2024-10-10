package org.infra.reactive.form.engine.excelreader;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class SheetExcelReader {

    public final static String startKey = "start";
    public final static String tableNameKey = "tablename";
    public final static String sheetKey = "sheet";
    public final static String converterKey = "converter";

    private Map<Integer, Object> mainSheet_ColumnValue = new HashMap<>();
    private List<Map<Integer, Object>> mainSheet_records = new ArrayList<>();
    private Map<Integer, Set<Object>> distinctColumnValue = new HashMap<>();
    private Map<String, Object> templateSheet_Data = new HashMap<>();
    private Map<String, Object> templateSheet_ColumnMapping = new HashMap<>();

    private InputStream inputStream;
    private XSSFWorkbook sheets;
    private String metaSheetPage;

    public SheetExcelReader(InputStream inputStream, String metaSheetPage) {
        this.inputStream = inputStream;
        this.metaSheetPage = metaSheetPage;

        try {
            sheets = new XSSFWorkbook(this.inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void readMainSheet() {
        Object startValue = templateSheet_Data.get(startKey);
        Object sheetKeyValue = templateSheet_Data.get(sheetKey);
        Object tableNameKeyValue = templateSheet_Data.get(tableNameKey);
        Object converterKeyValue = templateSheet_Data.get(converterKey);
        String startNumber = startValue != null ? startValue.toString().replaceAll("[^\\d.]", "") : null;
        int startColumnIndex = startNumber != null ? Integer.parseInt(startNumber) : 0;
        Integer maxRow = 1000;

        if (sheetKeyValue != null) {
            XSSFSheet sheetExport = sheets.getSheet(sheetKeyValue.toString());
            Iterator<Row> it = sheetExport.iterator();
            startColumnIndex = startColumnIndex > 0 ? startColumnIndex + 1 : 0;
            int maxColumnIndex = 0;
            int columnIndexIncrement = startColumnIndex;
            boolean isColumnReader = true;
            while (it.hasNext()) {
                Row row = it.next();
                Cell cell = row.getCell(columnIndexIncrement);
                while (isColumnReader && cell != null) {
                    if (isColumnReader) {
                        mainSheet_ColumnValue.put(columnIndexIncrement, cell.getStringCellValue());
                    }
                    cell = row.getCell(++columnIndexIncrement);
                }

                if (!isColumnReader) {
                    Map<Integer, Object> columnValue = new HashMap<>();

                    while (columnIndexIncrement <= maxColumnIndex) {
                        if (cell != null) {
                            Object value = null;
                            switch (cell.getCellType()) {
                                case NUMERIC -> {
                                    value = cell.getNumericCellValue();
                                }
                                case STRING -> {
                                    value = cell.getStringCellValue();
                                }
                                case FORMULA -> {
                                    value = cell.getCellFormula();
                                }
                            }
                            columnValue.put(columnIndexIncrement, value);
                            Set<Object> distinctColumn = distinctColumnValue.computeIfAbsent(columnIndexIncrement, k -> new HashSet<>());
                            distinctColumn.add(value);
                        }

                        columnIndexIncrement++;
                        cell = row.getCell(columnIndexIncrement);
                    }

                    mainSheet_records.add(columnValue);
                }

                if (isColumnReader)
                    maxColumnIndex = columnIndexIncrement;

                columnIndexIncrement = startColumnIndex;
                isColumnReader = false;
            }
            System.out.println("Final");
        }
    }

    public void readTemplateSheet() throws IOException {
        XSSFSheet sheetExport = sheets.getSheet(this.metaSheetPage);
        Iterator<Row> iteratorRow = sheetExport.iterator();
        boolean columnMappingStart = false;
        while (iteratorRow.hasNext()) {
            Row row = iteratorRow.next();

            Cell cellKey = row.getCell(0);
            Cell cellValue = row.getCell(1);

            if (cellKey == null || cellKey.getStringCellValue() == null || cellKey.getStringCellValue().equalsIgnoreCase("columns")) {
                columnMappingStart = true;
                continue;
            }

            if (cellKey.getStringCellValue() != null) {
                if (columnMappingStart) {
                    templateSheet_ColumnMapping.put(cellKey.getStringCellValue(), cellValue.getStringCellValue());
                } else {
                    templateSheet_Data.put(cellKey.getStringCellValue(), cellValue.getStringCellValue());
                }
            }
        }
    }

    public Map<Integer, Object> getMainSheet_ColumnValue() {
        return mainSheet_ColumnValue;
    }

    public List<Map<Integer, Object>> getMainSheet_records() {
        return mainSheet_records;
    }

    public Map<Integer, Set<Object>> getDistinctColumnValue() {
        return distinctColumnValue;
    }

    public static void main(String[] args) {
        FileInputStream file = null;
        try {
            file = new FileInputStream(new File("D://Book1.xlsx"));
            SheetExcelReader sheetReader = new SheetExcelReader(file, "template");
            sheetReader.readTemplateSheet();
            sheetReader.readMainSheet();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
