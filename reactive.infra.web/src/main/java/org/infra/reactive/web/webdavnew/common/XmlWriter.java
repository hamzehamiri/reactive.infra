package org.infra.reactive.web.webdavnew.common;

import java.io.Closeable;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class XmlWriter implements Closeable {

    private final OutputStream output;
    private final Charset encoding;

    public enum ElementType {
        OPENING("<", ">"), CLOSING("</", ">"), EMPTY("<", "/>");
        private final String open;
        private final String close;

        ElementType(final String open, final String close) {
            this.open = open;
            this.close = close;
        }
    }

    public XmlWriter(OutputStream output) throws IOException {
        this(output, null);
    }

    public XmlWriter(final OutputStream output, final Charset encoding) throws IOException {

        this.output = output;
        this.encoding = Objects.isNull(encoding) ? StandardCharsets.UTF_8 : encoding;

        this.writeText(String.format("<?xml version=\"1.0\" encoding=\"%s\"?>", this.encoding.name()));
    }

    public void writeProperty(final String namespace, final String uri, final String name, final String value) throws IOException {
        this.writeElement(namespace, uri, name, ElementType.OPENING);
        this.writeText(value);
        this.writeElement(namespace, uri, name, ElementType.CLOSING);
    }

    public void writeProperty(final String namespace, final String name, final String value) throws IOException {
        this.writeElement(namespace, name, ElementType.OPENING);
        this.writeText(value);
        this.writeElement(namespace, name, ElementType.CLOSING);
    }

    public void writePropertyData(final String namespace, final String name, final String value) throws IOException {
        this.writeElement(namespace, name, ElementType.OPENING);
        this.writeText(String.format("<![CDATA[%s]]>", value));
        this.writeElement(namespace, name, ElementType.CLOSING);
    }

    public void writeProperty(final String namespace, final String name) throws IOException {
        this.writeElement(namespace, name, ElementType.EMPTY);
    }

    public void writeElement(final String namespace, final String name, final ElementType type) throws IOException {
        this.writeElement(namespace, null, name, type);
    }

    public void writeElement(final String namespace, final String uri, final String name, final ElementType type) throws IOException {
        this.writeText(Objects.nonNull(type) ? type.open : ElementType.EMPTY.open);
        if (namespace != null && !namespace.isBlank()) {
            this.writeText(String.format("%s:%s", namespace.trim(), name));
            if (uri != null && !uri.isBlank())
                this.writeText(String.format(" xmlns:%s=\"%s\"", namespace.trim(), uri.trim()));
        } else this.writeText(name);
        this.writeText(Objects.nonNull(type) ? type.close : ElementType.EMPTY.close);
    }

    public void writeText(final String text) throws IOException {
        this.output.write(String.valueOf(text).getBytes(this.encoding));
    }

    public void writeData(final String data) throws IOException {
        this.writeText(String.format("<![CDATA[%s]]>", data));
    }

    public void flush() throws IOException {
        this.output.flush();
    }

    @Override
    public void close() throws IOException {
        this.output.flush();
        this.output.close();
    }
}