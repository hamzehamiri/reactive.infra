package org.infra.reactive.web.webdavnew;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.EditorAttachmentDTO;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.infra.reactive.web.webdavnew.common.Properties;
import org.infra.reactive.web.webdavnew.common.XmlWriter;
import org.infra.reactive.web.webdavnew.metadata.WebDavMetaDataController;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public abstract class WebDavAbstractController {

    protected ServerWebExchange serverWebExchange;
    @Setter
    @Getter
    protected WebDavMetaDataController metaDataController;
    @Setter
    @Getter
    protected ObjectMapperFactory objectMapperFactory;
    protected Collection<String> filterUrlPatternMappings;

    public WebDavAbstractController(ServerWebExchange serverWebExchange) {
        this.serverWebExchange = serverWebExchange;
        this.filterUrlPatternMappings = new ArrayList<>();
    }

    public boolean isFolder(ServerWebExchange exchange) {
        return true;
    }

    public String getIdentifier(ServerWebExchange exchange) {
        Date lastModified = this.getLastModified(exchange);
        if (Objects.isNull(lastModified)) lastModified = new Date();
        return (Long.toString(lastModified.getTime(), 16));
    }

    public Date getCreationDate() {
        return new Date();
    }

    public String getPath(ServerWebExchange exchange) {
        return "Path";
    }

    public String getName(ServerWebExchange exchange) {
        return "Name";
    }

    public boolean isHidden() {
        return false;
    }

    public Date getLastModified(ServerWebExchange exchange) {
        return new Date();
    }

    public Integer getContentLength(ServerWebExchange exchange) {
        return 100;
    }

    public MediaType getContentType(ServerWebExchange exchange) {
        return MediaType.APPLICATION_JSON;
    }

    public Mono<Void> invokeMainProxyMethod() throws InvocationTargetException, IllegalAccessException {
        Method method = null;
        for (Map.Entry<String, Method> stringMethodEntry : metaDataController.getMapMethodApiControllerMap().entrySet()) {
            method = stringMethodEntry.getValue();
        }
        if (method != null) {
            return (Mono<Void>) method.invoke(this, serverWebExchange, null);
        } else {
            return Mono.empty();
        }
    }

    public boolean isReadOnly(ServerWebExchange exchange) {
        return true;
    }

    public Mono<Void> doOptionsReactive(ServerWebExchange exchange) { // OK
        return Mono.defer(() -> {
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.AccessControlAllowOrigin, "*");
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.HEADER_DAV, "1, 2");
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.HEADER_MS_AUTHOR_VIA, "DAV");

            List<String> allows = new ArrayList<>();
            allows.add(WebDavReactiveFilterServices.METHOD_OPTIONS);
            allows.add(WebDavReactiveFilterServices.METHOD_HEAD);
            allows.add(WebDavReactiveFilterServices.METHOD_GET);
            allows.add(WebDavReactiveFilterServices.METHOD_PROPFIND);

            boolean writable = this.isFolder(exchange) || !this.isReadOnly(exchange);
            if (writable) {
                allows.add(WebDavReactiveFilterServices.METHOD_PROPPATCH);
                allows.add(WebDavReactiveFilterServices.METHOD_LOCK);
                allows.add(WebDavReactiveFilterServices.METHOD_PUT);
                allows.add(WebDavReactiveFilterServices.METHOD_UNLOCK);
            }

            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.HEADER_ALLOW, String.join(", ", allows.toArray(new String[0])));

            return Mono.empty();
        });
    }

    public Mono<Void> doPropfindReactive(ServerWebExchange exchange) { // OK
        return Mono.defer(() -> {
            return WebDavReactiveFilterServices.createDocumentFromRequest(exchange).flatMap(document -> {
                String contextPath = "/";
                Properties properties = new Properties();
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                try {
                    XmlWriter xmlWriter = new XmlWriter(buffer);
                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE_URI, WebDavReactiveFilterServices.XML_MULTISTATUS, XmlWriter.ElementType.OPENING);

                    int depth = WebDavReactiveFilterServices.getDepth(exchange);

                    if (Objects.nonNull(document)) {
                        Element root = document.getDocumentElement();
                        NodeList nodeList = root.getChildNodes();
                        Set<Node> nodeSet = IntStream.range(0, nodeList.getLength()).mapToObj(nodeList::item).filter(streamNode -> streamNode.getNodeType() == Node.ELEMENT_NODE).collect(Collectors.toSet());

                        if (nodeSet.stream().anyMatch(streamNode -> streamNode.getLocalName().equalsIgnoreCase(WebDavReactiveFilterServices.XML_ALLPROP))) {
                            WebDavReactiveFilterServices.collectProperties(exchange, xmlWriter, contextPath, this, WebDavReactiveFilterServices.WEBDAV_FIND_ALL_PROP, properties, depth);
                        } else if (nodeSet.stream().anyMatch(streamNode -> streamNode.getLocalName().equalsIgnoreCase(WebDavReactiveFilterServices.XML_PROP))) {
                            Node propNode = nodeSet.stream().filter(streamNode -> streamNode.getLocalName().equalsIgnoreCase(WebDavReactiveFilterServices.XML_PROP)).findFirst().get();
                            properties.putAll(WebDavReactiveFilterServices.getPropertiesFromNode(propNode));
                            WebDavReactiveFilterServices.collectProperties(exchange, xmlWriter, contextPath, this, WebDavReactiveFilterServices.WEBDAV_FIND_BY_PROPERTY, properties, depth);
                        } else if (nodeSet.stream().anyMatch(streamNode -> streamNode.getLocalName().equalsIgnoreCase(WebDavReactiveFilterServices.XML_PROPNAME))) {
                            WebDavReactiveFilterServices.collectProperties(exchange, xmlWriter, contextPath, this, WebDavReactiveFilterServices.WEBDAV_FIND_PROPERTY_NAMES, properties, depth);
                        } else {
                            WebDavReactiveFilterServices.collectProperties(exchange, xmlWriter, contextPath, this, WebDavReactiveFilterServices.WEBDAV_FIND_ALL_PROP, properties, depth);
                        }

                    } else
                        WebDavReactiveFilterServices.collectProperties(exchange, xmlWriter, contextPath, this, WebDavReactiveFilterServices.WEBDAV_FIND_ALL_PROP, properties, depth);

                    xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_MULTISTATUS, XmlWriter.ElementType.CLOSING);
                    xmlWriter.flush();

                } catch (Exception e) {
                    return Mono.error(new RuntimeException(e));
                }
                return Mono.empty();
            });
        });
    }


    public Mono<Void> doHeadReactive(ServerWebExchange exchange) { // OK
        return Mono.defer(() -> {
            String identifier = this.getIdentifier(exchange);
            Date lastModified = this.getLastModified(exchange);
            Integer contentLength = this.getContentLength(exchange);
            MediaType contentType = this.getContentType(exchange);

            if (Objects.nonNull(identifier))
                exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.HEADER_ETAG, "\"" + identifier + "\"");
            if (Objects.nonNull(lastModified))
                exchange.getResponse().getHeaders().setDate(WebDavReactiveFilterServices.HEADER_LAST_MODIFIED, lastModified.getTime());
            if (Objects.nonNull(contentLength)) exchange.getResponse().getHeaders().setContentLength(contentLength);
            if (Objects.nonNull(contentType)) exchange.getResponse().getHeaders().setContentType(contentType);

            return Mono.empty();
        });
    }

    public Mono<Void> doGetReactive(ServerWebExchange exchange) { // OK
        return Mono.defer(() -> { //TODO Important Service DMS File Manager Per DataSource
            String attachmentJson = exchange.getRequest().getQueryParams().getFirst("attachment");
            try {
                EditorAttachmentDTO editorAttachmentDTO = objectMapperFactory.getObjectMapper().readValue(attachmentJson, EditorAttachmentDTO.class);
                Method method = metaDataController.getMapMethodApiControllerMap().get(ERPConstants.key_Slash + ERPConstants.key_GetFile);
                Flux<DataBuffer> dataBufferFlux = (Flux<DataBuffer>) method.invoke(this, exchange, editorAttachmentDTO);
                return exchange.getResponse().writeWith(dataBufferFlux);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    public Mono<Void> doLockReactive(ServerWebExchange exchange) { // OK
        return Mono.defer(() -> {
            ServerHttpRequest request = exchange.getRequest();
            String token = request.getHeaders().getFirst(WebDavReactiveFilterServices.HEADER_IF);
            if (Objects.nonNull(token) && token.matches("^\\((.*)\\)$")) token = token.replaceAll("^\\((.*)\\)$", "$1");
            if (Objects.nonNull(token) && token.matches("(?i)^<([a-z0-9]+(?:-[a-z0-9]+)+)>$"))
                token = token.replaceAll("(?i)^<([a-z0-9]+(?:-[a-z0-9]+)+)>$", "$1");
            else token = UUID.randomUUID().toString();

            String timeout = request.getHeaders().getFirst(WebDavReactiveFilterServices.HEADER_TIMEOUT);
            if (Objects.isNull(timeout) || !timeout.matches("(?i)^[a-z]-\\d+"))
                timeout = String.format("Second-%s", 60 * 60 * 24 * 7);

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            try (XmlWriter xmlWriter = new XmlWriter(buffer)) {
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE_URI, WebDavReactiveFilterServices.XML_PROP, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKDISCOVERY, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_ACTIVELOCK, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKTYPE, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_WRITE, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKTYPE, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKSCOPE, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_EXCLUSIVE, XmlWriter.ElementType.EMPTY);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKSCOPE, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_DEPTH, XmlWriter.ElementType.OPENING);
                xmlWriter.writeText("Infinity");
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_DEPTH, XmlWriter.ElementType.CLOSING);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_TIMEOUT, XmlWriter.ElementType.OPENING);
                xmlWriter.writeText(timeout);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_TIMEOUT, XmlWriter.ElementType.CLOSING);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKTOKEN, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_HREF, XmlWriter.ElementType.OPENING);
                xmlWriter.writeText(token);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_HREF, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKTOKEN, XmlWriter.ElementType.CLOSING);

                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKROOT, XmlWriter.ElementType.OPENING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_HREF, XmlWriter.ElementType.OPENING);
                xmlWriter.writeText(this.locateMappingPath(exchange));
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_HREF, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKROOT, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_ACTIVELOCK, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_LOCKDISCOVERY, XmlWriter.ElementType.CLOSING);
                xmlWriter.writeElement(WebDavReactiveFilterServices.WEBDAV_DEFAULT_XML_NAMESPACE, WebDavReactiveFilterServices.XML_PROP, XmlWriter.ElementType.CLOSING);
                xmlWriter.flush();
            } catch (Exception e) {
                e.printStackTrace();
            }

            String markup = buffer.toString(StandardCharsets.UTF_8);

            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.HEADER_LOCK_TOKEN, "<" + token + ">");
            exchange.getResponse().getHeaders().setContentType(MediaType.TEXT_XML);
            exchange.getResponse().getHeaders().setContentLength(markup.length());

            byte[] bytesFile = markup.getBytes(StandardCharsets.UTF_8);

            DataBufferFactory bufferFactory = new DefaultDataBufferFactory();
            DataBuffer dataBuffer = bufferFactory.allocateBuffer(bytesFile.length);
            return exchange.getResponse().writeWith(Flux.just(dataBuffer));
        });
    }

    public Mono<Void> doPutReactive(ServerWebExchange exchange) {
        return Mono.defer(() -> {
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.AccessControlAllowOrigin, "*");


            return Mono.empty();
        });
    }

    public Mono<Void> doUnlockReactive(ServerWebExchange exchange) {
        return Mono.defer(() -> {
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.AccessControlAllowOrigin, "*");


            return Mono.empty();
        });
    }

    public Mono<Void> doProppatchReactive(ServerWebExchange exchange) {
        return Mono.defer(() -> {
            exchange.getResponse().getHeaders().add(WebDavReactiveFilterServices.AccessControlAllowOrigin, "*");


            return Mono.empty();
        });
    }

    public Mono<Void> doDefaultReactive(ServerWebExchange exchange) {
        return Mono.defer(() -> {
            return Mono.empty();
        });
    }

    public String locateMappingPath(ServerWebExchange exchange) {
        String requestURI = this.locateRequestPath(exchange);
        if (this.filterUrlPatternMappings.isEmpty())
            return requestURI;
        for (String urlPatternMapping : this.filterUrlPatternMappings) {
            urlPatternMapping = urlPatternMapping.replaceAll("\\*?$", "");
            if (requestURI.startsWith(urlPatternMapping))
                return requestURI.substring(urlPatternMapping.length() - 1);
            if ((requestURI + "/").equals(urlPatternMapping))
                return "/";
        }
        return null;
    }

    public String locateRequestPath(ServerWebExchange exchange) {
        String contextPath = exchange.getRequest().getPath().toString();
        String requestURI = URLDecoder.decode(exchange.getRequest().getURI().getPath(), StandardCharsets.UTF_8);
        if (requestURI.startsWith(contextPath + "/"))
            return requestURI.substring(contextPath.length());
        if (requestURI.equals(contextPath))
            return "/";
        return requestURI;
    }
}
