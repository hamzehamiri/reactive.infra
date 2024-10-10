package org.infra.reactive.form.engine.form.jasper.dynamic;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.design.*;
import net.sf.jasperreports.engine.type.HorizontalTextAlignEnum;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
//import org.apache.log4j.BasicConfigurator;
//import org.apache.log4j.Logger;
import net.sf.jasperreports.pdf.JRPdfExporter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.logger.LoggerTest;
import org.infra.reactive.form.engine.logger.configuration.log4j1.StartLog4jV1;
import org.infra.reactive.form.engine.logger.configuration.log4j2.old.StartLog4jV2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CoreDynamicJasperReport {

    public static class BeanTest {
        private String name;
        private String title;

        public BeanTest() {
        }

        public BeanTest(String name, String title) {
            this.name = name;
            this.title = title;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }

    public static void main(String[] args) {
//        BasicConfigurator.configure();
        StartLog4jV2.initializeYourLogger("Jasper.log" , "%d %p %c [%t] %m%n");
        StartLog4jV1.StartCustomService();
        org.apache.log4j.Logger loggerv1 = org.apache.log4j.Logger.getLogger(CoreDynamicJasperReport.class);
        loggerv1.info("Test");

        Logger loggerv2 = LogManager.getLogger(LoggerTest.class);
        loggerv2.info("Test");
//        String onlineStringJasper = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
//                "<!-- Created with Jaspersoft Studio version 6.20.3.final using JasperReports Library version 6.20.3-415f9428cffdb6805c6f85bbb29ebaf18813a2ab  -->\n" +
//                "<jasperReport xmlns=\"http://jasperreports.sourceforge.net/jasperreports\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://jasperreports.sourceforge.net/jasperreports http://jasperreports.sourceforge.net/xsd/jasperreport.xsd\" name=\"CoreTestBean\" pageWidth=\"595\" pageHeight=\"842\" columnWidth=\"555\" leftMargin=\"20\" rightMargin=\"20\" topMargin=\"20\" bottomMargin=\"20\" uuid=\"2b096811-0597-49f3-810d-727ef3003166\">\n" +
//                "</jasperReport>\n";

//        ByteArrayInputStream fileInputStream = new ByteArrayInputStream(onlineStringJasper.getBytes(Charset.forName("UTF-8")));
        try {
            List<BeanTest> beanTests = new ArrayList<>();
            beanTests.add(new BeanTest("Test1", "Title1"));
            beanTests.add(new BeanTest("Test2", "Title2"));
            beanTests.add(new BeanTest("Test3", "Title3"));

            JRBeanArrayDataSource ds = new JRBeanArrayDataSource(beanTests.toArray());

            Map<String, Object> para = new HashMap<>();
            para.put("P1", "Header");

//            JasperDesign jasperDesign = JRXmlLoader.load(fileInputStream);
//            jasperDesign.setMainDataset(new JRDesignDataset(true));

            JasperDesign jasperDesign = new JasperDesign(DefaultJasperReportsContext.getInstance());
            jasperDesign.setJasperReportsContext(DefaultJasperReportsContext.getInstance());
            jasperDesign.setName("JasperReport");
//            jasperDesign.setLanguage("En");

            JRDesignBand detailBand = new JRDesignBand();
            detailBand.setHeight(30);
            JRDesignBand headerBand = new JRDesignBand();
            headerBand.setHeight(30);
            JRDesignBand footerBand = new JRDesignBand();
            footerBand.setHeight(30);

            JRDesignStyle normalStyle = getNormalStyle();
            JRDesignStyle columnHeaderStyle = getColumnHeaderStyle();

            JRDesignField field = new JRDesignField();
            field.setName("name");
            field.setValueClass(String.class);
            jasperDesign.addField(field);

            JRDesignField headerField = new JRDesignField();
            headerField.setName("title");
            headerField.setValueClass(String.class);
            jasperDesign.addField(headerField);

            createCell(0 , 0 , 100 , 30 , "name" , detailBand);
            createCell(100 , 0 , 100 , 30 , "title" , detailBand);

            jasperDesign.setColumnHeader(headerBand);
            jasperDesign.setColumnFooter(footerBand);
            ((JRDesignSection) jasperDesign.getDetailSection()).addBand(detailBand);

            jasperDesign.addStyle(normalStyle);
            jasperDesign.addStyle(columnHeaderStyle);

            JasperReport report = JasperCompileManager.compileReport(jasperDesign);
            JasperPrint jasperPrint = JasperFillManager.fillReport(report, para, ds);

            JRPdfExporter exporter = new JRPdfExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput("employeeReport.pdf"));
            exporter.exportReport();
        } catch (JRException e) {
            throw new RuntimeException(e);
        }
    }

    private static void createCell(int x, int y, int width, int height , String fieldName ,JRDesignBand band) {
        JRDesignStyle normalStyle = getNormalStyle();
        JRDesignExpression expression = new JRDesignExpression();
//        expression.setValueClass(java.lang.String.class);
        expression.setText("$F{" + fieldName + "}");

        JRDesignTextField textField = new JRDesignTextField();
        textField.setX(x);
        textField.setY(y);
        textField.setWidth(width);
        textField.setHeight(height);
        textField.setHorizontalTextAlign(HorizontalTextAlignEnum.LEFT);
        textField.setStyle(normalStyle);
        textField.setExpression(expression);

        JRDesignRectangle jrRectangle = new JRDesignRectangle();
        jrRectangle.setX(x);
        jrRectangle.setY(y);
        jrRectangle.setWidth(width);
        jrRectangle.setHeight(height);
        jrRectangle.setStyle(normalStyle);

        band.addElement(jrRectangle);
        band.addElement(textField);
    }

    private static JRDesignStyle getNormalStyle() {
        JRDesignStyle normalStyle = new JRDesignStyle();
        normalStyle.setName("Sans_Normal");
        normalStyle.setDefault(true);
        normalStyle.setFontName("SansSerif");
        normalStyle.setFontSize(8F);
        normalStyle.setPdfFontName("Helvetica");
        normalStyle.setPdfEncoding("Cp1252");
        normalStyle.setPdfEmbedded(false);
        return normalStyle;
    }

    private static JRDesignStyle getColumnHeaderStyle() {
        JRDesignStyle columnHeaderStyle = new JRDesignStyle();
        columnHeaderStyle.setName("Sans_Header");
        columnHeaderStyle.setDefault(false);
        columnHeaderStyle.setFontName("SansSerif");
        columnHeaderStyle.setFontSize(10F);
        columnHeaderStyle.setBold(true);
        columnHeaderStyle.setPdfFontName("Helvetica");
        columnHeaderStyle.setPdfEncoding("Cp1252");
        columnHeaderStyle.setPdfEmbedded(false);
        return columnHeaderStyle;
    }
}
