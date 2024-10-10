package org.infra.reactive.web.webdavnew;

import org.infra.reactive.form.engine.form.engine.security.service.AuthTokenServiceImpl;
import org.infra.reactive.web.webdavnew.common.DateTime;
import org.infra.reactive.web.webdavnew.common.Properties;
import org.infra.reactive.web.webdavnew.common.XmlWriter;
import org.infra.reactive.web.webdavnew.state.NotFoundState;
import org.infra.reactive.web.webdavnew.state.SuccessState;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.util.UriUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import reactor.core.publisher.Mono;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

public class WebDavReactiveFilterServices {
    public static final String WEB_DAV = "webdav";
    public static final String Office = "office";

    public static final String METHOD_OPTIONS = "OPTIONS";
    public static final String METHOD_PROPFIND = "PROPFIND";
    public static final String METHOD_PROPPATCH = "PROPPATCH";
    public static final String METHOD_HEAD = "HEAD";
    public static final String METHOD_GET = "GET";
    public static final String METHOD_MKCOL = "MKCOL";
    public static final String METHOD_COPY = "COPY";
    public static final String METHOD_MOVE = "MOVE";
    public static final String METHOD_LOCK = "LOCK";
    public static final String METHOD_PUT = "PUT";
    public static final String METHOD_UNLOCK = "UNLOCK";
    public static final String METHOD_DELETE = "DELETE";

    public static final String AccessControlAllowOrigin = "Access-Control-Allow-Origin";
    public static final String HEADER_ALLOW = "Allow";
    public static final String HEADER_CONTENT_LOCATION = "Content-Location";
    public static final String HEADER_DAV = "DAV";
    public static final String HEADER_DEPTH = "Depth";
    public static final String HEADER_ETAG = "Etag";
    public static final String HEADER_IF = "If";
    public static final String HEADER_IF_MATCH = "If-Match";
    public static final String HEADER_IF_NONE_MATCH = "If-None-Match";
    public static final String HEADER_LAST_MODIFIED = "Last-Modified";
    public static final String HEADER_LOCATION = "Location";
    public static final String HEADER_LOCK_TOKEN = "Lock-Token";
    public static final String HEADER_MS_AUTHOR_VIA = "MS-Author-Via";
    public static final String HEADER_TIMEOUT = "Timeout";

    public static final String XML_ACTIVELOCK = "activelock";
    public static final String XML_ALLPROP = "allprop";
    public static final String XML_COLLECTION = "collection";
    public static final String XML_CREATIONDATE = "creationdate";
    public static final String XML_DEPTH = "depth";
    public static final String XML_DISPLAYNAME = "displayname";
    public static final String XML_EXCLUSIVE = "exclusive";
    public static final String XML_GETCONTENTLENGTH = "getcontentlength";
    public static final String XML_GETCONTENTTYPE = "getcontenttype";
    public static final String XML_GETETAG = "getetag";
    public static final String XML_GETLASTMODIFIED = "getlastmodified";
    public static final String XML_HREF = "href";
    public static final String XML_ISARCHIVE = "isarchive";
    public static final String XML_ISCOLLECTION = "iscollection";
    public static final String XML_ISHIDDEN = "ishidden";
    public static final String XML_ISREADONLY = "isreadonly";
    public static final String XML_ISSYSTEM = "issystem";
    public static final String XML_LOCKDISCOVERY = "lockdiscovery";
    public static final String XML_LOCKENTRY = "lockentry";
    public static final String XML_LOCKROOT = "lockroot";
    public static final String XML_LOCKSCOPE = "lockscope";
    public static final String XML_LOCKTOKEN = "locktoken";
    public static final String XML_LOCKTYPE = "locktype";
    public static final String XML_MULTISTATUS = "multistatus";
    public static final String XML_PROP = "prop";
    public static final String XML_PROPNAME = "propname";
    public static final String XML_PROPSTAT = "propstat";
    public static final String XML_RESOURCETYPE = "resourcetype";
    public static final String XML_RESPONSE = "response";
    public static final String XML_STATUS = "status";
    public static final String XML_SUPPORTEDLOCK = "supportedlock";
    public static final String XML_TIMEOUT = "timeout";
    public static final String XML_WIN32FILEATTRIBUTES = "Win32FileAttributes";
    public static final String XML_WRITE = "write";

    public static final int WEBDAV_INFINITY = 1;
    public static final int WEBDAV_FIND_ALL_PROP = 1;
    public static final int WEBDAV_FIND_BY_PROPERTY = 0;
    public static final int WEBDAV_FIND_PROPERTY_NAMES = 2;
    public static final String WEBDAV_DEFAULT_XML_NAMESPACE = "d";
    public static final String WEBDAV_DEFAULT_XML_NAMESPACE_URI = "DAV:";
    public static final String DATETIME_FORMAT_CREATION_DATE = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    public static final String DATETIME_FORMAT_LAST_MODIFIED = "E, dd MMM yyyy HH:mm:ss z";

    public static boolean isWebDavActivated(ServerHttpRequest request) {
        List<String> userAgent = request.getHeaders().get(AuthTokenServiceImpl.key_UserAgent);
        if (userAgent != null && !userAgent.isEmpty()) {
            String userAgentString = userAgent.getFirst().toLowerCase();
            return userAgentString.contains(WebDavReactiveFilterServices.WEB_DAV) || userAgentString.contains(WebDavReactiveFilterServices.Office);
        }
        return false;
    }

    public static Document readXML(InputStream inputStream) throws Exception {
        final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        return factory.newDocumentBuilder().parse(inputStream);
    }

    public static Mono<Document> createDocumentFromRequest(ServerWebExchange exchange) {
        return exchange.getRequest().getBody().collectList().flatMap(dataBuffers -> {
            StringBuilder bodyBuilder = new StringBuilder();
            dataBuffers.forEach(dataBuffer -> {
                byte[] bytes = new byte[dataBuffer.readableByteCount()];
                dataBuffer.read(bytes);
                bodyBuilder.append(new String(bytes, StandardCharsets.UTF_8));
            });

            try {
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                ByteArrayInputStream inputStream = new ByteArrayInputStream(bodyBuilder.toString().getBytes(StandardCharsets.UTF_8));
                Document document = builder.parse(inputStream);
                return Mono.just(document);
            } catch (Exception e) {
                return Mono.error(e);
            }
        });
    }

    public static void collectProperties(ServerWebExchange serverWebExchange, XmlWriter xmlWriter, String contextUrl, WebDavAbstractController webDavAbstractController, int type, Properties properties) throws IOException {
        xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESPONSE, XmlWriter.ElementType.OPENING);
        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_HREF, UriUtils.encodePath(contextUrl + webDavAbstractController.getPath(serverWebExchange), StandardCharsets.UTF_8.name()));

        String displayName = UriUtils.encodePath(webDavAbstractController.getName(serverWebExchange), StandardCharsets.UTF_8.name());

        String creationDate = Objects.nonNull(webDavAbstractController.getCreationDate()) ? DateTime.formatDate(webDavAbstractController.getCreationDate(), DATETIME_FORMAT_CREATION_DATE) : null;
        String lastModified = Objects.nonNull(webDavAbstractController.getLastModified(serverWebExchange)) ? DateTime.formatDate(webDavAbstractController.getLastModified(serverWebExchange), DATETIME_FORMAT_LAST_MODIFIED) : null;
        MediaType contentType = webDavAbstractController.getContentType(serverWebExchange);
        Integer contentLength = webDavAbstractController.getContentLength(serverWebExchange);

        String isCollection = String.valueOf(webDavAbstractController.isFolder(serverWebExchange));
        String isReadOnly = String.valueOf(webDavAbstractController.isReadOnly(serverWebExchange));
        String isHidden = String.valueOf(webDavAbstractController.isHidden());
        String isSystem = Boolean.FALSE.toString();
        String isArchive = Boolean.FALSE.toString();

        String etag = Objects.nonNull(webDavAbstractController.getIdentifier(serverWebExchange)) ? "\"" + webDavAbstractController.getIdentifier(serverWebExchange) + "\"" : "";

        // Win32FileAttributes
        // see also https://docs.microsoft.com/de-de/windows/win32/api/fileapi/nf-fileapi-setfileattributesa?redirectedfrom=MSDN
        // readOnly: 0x01, hidden: 0x02, system: 0x04, directory: 0x10, archive: 0x20
        String win32FileAttributes = Integer.toHexString((webDavAbstractController.isReadOnly(serverWebExchange) ? 0x01 : 0) | (webDavAbstractController.isHidden() ? 0x02 : 0) | (webDavAbstractController.isFolder(serverWebExchange) ? 0x10 : 0));

        switch (type) {
            case WEBDAV_FIND_ALL_PROP:
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.OPENING);

                xmlWriter.writePropertyData(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_DISPLAYNAME, displayName);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISCOLLECTION, isCollection);
                if (Objects.nonNull(creationDate))
                    xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_CREATIONDATE, creationDate);
                if (Objects.nonNull(lastModified))
                    xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETLASTMODIFIED, lastModified);

                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISREADONLY, isReadOnly);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISHIDDEN, isHidden);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISSYSTEM, isSystem);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISARCHIVE, isArchive);

                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_WIN32FILEATTRIBUTES, win32FileAttributes);

                if (webDavAbstractController.isFolder(serverWebExchange)) {
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESOURCETYPE, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_COLLECTION, XmlWriter.ElementType.EMPTY);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESOURCETYPE, XmlWriter.ElementType.CLOSING);
                } else {
                    if (Objects.nonNull(contentType))
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTTYPE, contentType.getType());
                    if (Objects.nonNull(contentLength))
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTLENGTH, String.valueOf(contentLength));
                    xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETETAG, etag);

                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_SUPPORTEDLOCK, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, "DAV:", XML_LOCKENTRY, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_LOCKSCOPE, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_EXCLUSIVE, XmlWriter.ElementType.EMPTY);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_LOCKSCOPE, XmlWriter.ElementType.CLOSING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_LOCKTYPE, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_WRITE, XmlWriter.ElementType.EMPTY);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_LOCKTYPE, XmlWriter.ElementType.CLOSING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_LOCKENTRY, XmlWriter.ElementType.CLOSING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_SUPPORTEDLOCK, XmlWriter.ElementType.CLOSING);
                }

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_STATUS, new SuccessState().getStatusLine());
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.CLOSING);

                break;

            case WEBDAV_FIND_PROPERTY_NAMES:

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.OPENING);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_DISPLAYNAME, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISCOLLECTION, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_CREATIONDATE, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETLASTMODIFIED, XmlWriter.ElementType.EMPTY);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISREADONLY, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISHIDDEN, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISSYSTEM, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISARCHIVE, XmlWriter.ElementType.EMPTY);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_WIN32FILEATTRIBUTES, XmlWriter.ElementType.EMPTY);

                if (webDavAbstractController.isFolder(serverWebExchange)) {
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESOURCETYPE, XmlWriter.ElementType.EMPTY);
                } else {
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTTYPE, XmlWriter.ElementType.EMPTY);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTLENGTH, XmlWriter.ElementType.EMPTY);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETETAG, XmlWriter.ElementType.EMPTY);
                }

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_STATUS, new SuccessState().getStatusLine());
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.CLOSING);

                break;

            case WEBDAV_FIND_BY_PROPERTY:

                List<String> list = new ArrayList<>();

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.OPENING);

                for (String property : properties.keySet()) {

                    if (property.equals(XML_DISPLAYNAME)) {
                        xmlWriter.writePropertyData(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_DISPLAYNAME, displayName);
                    } else if (property.equals(XML_ISCOLLECTION)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISCOLLECTION, isCollection);
                    } else if (property.equals(XML_CREATIONDATE) && Objects.nonNull(creationDate)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_CREATIONDATE, creationDate);
                    } else if (property.equals(XML_GETLASTMODIFIED) && Objects.nonNull(lastModified)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETLASTMODIFIED, lastModified);

                    } else if (property.equals(XML_ISREADONLY)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISREADONLY, isReadOnly);
                    } else if (property.equals(XML_ISHIDDEN)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISHIDDEN, isHidden);
                    } else if (property.equals(XML_ISSYSTEM)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISSYSTEM, isSystem);
                    } else if (property.equals(XML_ISARCHIVE)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_ISARCHIVE, isArchive);

                    } else if (property.equals(XML_WIN32FILEATTRIBUTES)) {
                        xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_WIN32FILEATTRIBUTES, win32FileAttributes);
                    } else {
                        if (webDavAbstractController.isFolder(serverWebExchange) && property.equals(XML_RESOURCETYPE)) {
                            xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESOURCETYPE, XmlWriter.ElementType.OPENING);
                            xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_COLLECTION, XmlWriter.ElementType.EMPTY);
                            xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESOURCETYPE, XmlWriter.ElementType.CLOSING);
                        } else if (!webDavAbstractController.isFolder(serverWebExchange) && property.equals(XML_GETCONTENTLENGTH) && Objects.nonNull(contentLength)) {
                            xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTLENGTH, String.valueOf(contentLength));
                        } else if (!webDavAbstractController.isFolder(serverWebExchange) && property.equals(XML_GETCONTENTTYPE) && Objects.nonNull(contentType)) {
                            xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETCONTENTTYPE, contentType.getType());
                        } else if (!webDavAbstractController.isFolder(serverWebExchange) && property.equals(XML_GETETAG)) {
                            xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_GETETAG, etag);
                        } else list.add(property);
                    }
                }

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_STATUS, new SuccessState().getStatusLine());
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.CLOSING);

                Iterator<String> iterator = list.iterator();
                if (iterator.hasNext()) {
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.OPENING);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.OPENING);

                    while (iterator.hasNext())
                        xmlWriter.writeElement(null, iterator.next(), XmlWriter.ElementType.EMPTY);

                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROP, XmlWriter.ElementType.CLOSING);
                    xmlWriter.writeProperty(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_STATUS, new NotFoundState().getStatusLine());
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_PROPSTAT, XmlWriter.ElementType.CLOSING);
                }

                break;

            default:
        }

        xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, XML_RESPONSE, XmlWriter.ElementType.CLOSING);
    }

    public static void collectProperties(ServerWebExchange serverWebExchange, XmlWriter xmlWriter, String contextUrl, WebDavAbstractController entry, int type, Properties properties, int depth) throws IOException {
        WebDavReactiveFilterServices.collectProperties(serverWebExchange, xmlWriter, contextUrl, entry, type, properties);
//        if (entry.isFile() || depth <= 0) return;
//        for (Mapping.Entry folderEntry : ((Mapping.Folder) entry).getCollection()) {
//            if (folderEntry.isHidden()) continue;
//            WebDavReactiveFilterServices.collectProperties(xmlWriter, contextUrl, folderEntry, type, properties, depth - 1);
//        }
    }

    public static int getDepth(ServerWebExchange serverWebExchange) {
        String depth = serverWebExchange.getRequest().getHeaders().getFirst(HEADER_DEPTH);
        if (Objects.isNull(depth) || !depth.matches("[01]")) return WEBDAV_INFINITY;
        return Integer.parseInt(Objects.requireNonNull(serverWebExchange.getRequest().getHeaders().getFirst(HEADER_DEPTH)));
    }

    public static Properties getPropertiesFromNode(final Node node) {
        Properties properties = new Properties();
        NodeList nodeList = node.getChildNodes();
        IntStream.range(0, nodeList.getLength()).mapToObj(nodeList::item).filter(streamNode -> streamNode.getNodeType() == Node.ELEMENT_NODE).forEach(streamNode -> {
            String streamNodeValue = streamNode.getNodeValue();
            if (Objects.isNull(streamNodeValue)) streamNodeValue = streamNode.getTextContent();
            properties.put(streamNode.getLocalName(), streamNodeValue);
        });
        return properties;
    }
}
