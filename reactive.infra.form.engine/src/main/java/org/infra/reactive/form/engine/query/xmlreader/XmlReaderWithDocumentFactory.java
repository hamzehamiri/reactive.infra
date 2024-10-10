package org.infra.reactive.form.engine.query.xmlreader;

import org.infra.reactive.form.engine.query.model.QueryModel;
import org.infra.reactive.form.engine.query.model.common.ColumnInterface;
import org.infra.reactive.form.engine.query.model.common.ColumnModel;
import org.infra.reactive.form.engine.query.reader.QueryXmlReader;

public class XmlReaderWithDocumentFactory {

    public static void main(String[] args) {
        try {
            QueryModel query = QueryXmlReader.sample1();

            XmlReaderDocumentFactory.register(ColumnInterface.class, ColumnModel.TAG_NAME, ColumnModel.class);
            XmlReaderDocumentFactory.register(ColumnInterface.class, QueryModel.TAG_NAME, QueryModel.class);
            XmlReaderDocumentFactory xmlReaderDocumentFactory = new XmlReaderDocumentFactory();

            String xmlOutput = xmlReaderDocumentFactory.convertBeanToString(query);
            QueryModel queryModelNew = xmlReaderDocumentFactory.convertStringToBean(QueryModel.class, xmlOutput);

            System.out.println(xmlOutput);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
