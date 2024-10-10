package org.infra.reactive.form.engine.query.xmlreader;

import java.io.IOException;
import java.io.InputStream;

public class XMLReaderFast {
    public void parse(InputStream xml) throws IOException {

        int c;
        while ((c = xml.read()) != 0) {
            switch (c) {
                case '<':
                case '>':
            }
        }
    }
}
