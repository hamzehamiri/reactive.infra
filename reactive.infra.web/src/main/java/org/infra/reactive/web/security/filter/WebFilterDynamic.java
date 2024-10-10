package org.infra.reactive.web.security.filter;

import org.infra.reactive.form.engine.form.engine.security.exception.AuthenticationException;
import org.infra.reactive.form.engine.form.engine.security.service.AuthTokenServiceImpl;
import org.infra.reactive.web.formengine.ERPConstants;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityAttributeHolder;
import org.infra.reactive.web.security.filter.context.ReactiveSecurityContextHolder;
import org.infra.reactive.web.security.filter.context.WebErpSecurityContext;
import org.infra.reactive.web.webdavnew.WebDavReactiveFilter;
import org.infra.reactive.web.webdavnew.WebDavReactiveFilterServices;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.ApplicationContext;
import org.springframework.http.server.PathContainer;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

import static org.springframework.util.StringUtils.hasText;

@Component
public class WebFilterDynamic implements WebFilter {

    private final AuthTokenServiceImpl authTokenService;
    private final ApplicationContext applicationContext;
    private final WebDavReactiveFilter webDavReactiveFilter;
    private final ObjectMapperFactory objectMapperFactory;

    public WebFilterDynamic(AuthTokenServiceImpl authTokenService, ApplicationContext applicationContext, ObjectMapperFactory objectMapperFactory) {
        this.authTokenService = authTokenService;
        this.applicationContext = applicationContext;
        this.webDavReactiveFilter = new WebDavReactiveFilter(applicationContext, objectMapperFactory);
        this.objectMapperFactory = objectMapperFactory;
    }

    @NotNull
    @Override
    public Mono<Void> filter(final ServerWebExchange exchange, final WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        if (WebDavReactiveFilterServices.isWebDavActivated(request)) {
            return this.webDavReactiveFilter.filter(exchange, chain);
        } else {
            String hostName = Objects.requireNonNull(request.getRemoteAddress()).getAddress().getHostName();
            if (hostName.equalsIgnoreCase("DESKTOP-4HQTB12") ||
                    hostName.equalsIgnoreCase("Roshana-PC") ||
                    hostName.equalsIgnoreCase("127.0.0.1") ||
                    hostName.equalsIgnoreCase("0:0:0:0:0:0:0:1") ||
                    hostName.equalsIgnoreCase("kubernetes.docker.internal")
            ) {
                List<PathContainer.Element> elements = exchange.getRequest().getPath().elements();
                if (elements.size() > 1 && elements.get(1).value().equalsIgnoreCase(ERPConstants.key_base)) {
                    String authorization = request.getHeaders().getFirst(AuthTokenServiceImpl.keyHeader_Authorization);
                    String ws_type = request.getHeaders().getFirst(AuthTokenServiceImpl.keyWebSocket);
                    String token = null;
                    if (ws_type != null && ws_type.equalsIgnoreCase("websocket")) {
                        String cookie = request.getHeaders().getFirst("Cookie");
                        assert cookie != null;
                        if (!cookie.isEmpty()) {
                            String[] keyValues = cookie.split(";");
                            for (String keyValue : keyValues) {
                                if (keyValue.contains(AuthTokenServiceImpl.key_X_Authorization)) {
                                    token = keyValue.substring(AuthTokenServiceImpl.key_X_Authorization.length() + 2);
                                }
                            }
                        }

                    } else {
                        token = parseToken(authorization);
                    }
                    return authTokenService.verify(token)
                            .flatMap(userAuthHashMapField -> ReactiveSecurityAttributeHolder.saveAuth(exchange, userAuthHashMapField))
                            .then(chain.filter(exchange).contextWrite(context -> {
                                Mono<WebErpSecurityContext> webErpSecurityContextMono = ReactiveSecurityAttributeHolder.loadAuth(exchange);
                                return ReactiveSecurityContextHolder.saveAuth(webErpSecurityContextMono, context);
                            }));
                }
                return chain.filter(exchange);
            }
            System.out.println(hostName);
            return Mono.error(() -> new Throwable("Access Denied"));
        }
    }

    private String parseToken(String authorization) {
        if (!hasText(authorization)) {
            return null;
        }
        String[] arr = authorization.replaceAll("\\s+", " ").trim().split("\\s");
        if (!(arr.length == 2)) {
            throw new AuthenticationException("Invalid token");
        }
        if (!"bearer".equalsIgnoreCase(arr[0])) {
            throw new AuthenticationException("Invalid bearer token");
        }
        return arr[1];
    }
}
