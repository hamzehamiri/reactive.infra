package org.infra.reactive.web.webdavnew.metadata;

import org.infra.reactive.web.SpringReactiveErpApplication;
import org.infra.reactive.web.jackson.ObjectMapperFactory;
import org.infra.reactive.web.webdavnew.WebDavAbstractController;
import org.infra.reactive.web.webdavnew.annotations.WebDavReactiveAnnotationController;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.http.server.PathContainer;
import org.springframework.web.server.ServerWebExchange;

import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class WebDavMetaData {

    private final ApplicationContext applicationContext;
    private final Map<String, WebDavMetaDataController> metaDataControllerMap = new HashMap<>();

    public WebDavMetaData(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void scan() {
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(WebDavReactiveAnnotationController.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(SpringReactiveErpApplication.class.getPackageName());

        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<WebDavAbstractController> clazzBean = (Class<WebDavAbstractController>) Class.forName(beanDefinition.getBeanClassName());
                WebDavReactiveAnnotationController webDavReactiveAnnotationController = clazzBean.getAnnotation(WebDavReactiveAnnotationController.class);

                WebDavMetaDataController webDavMetaDataController = new WebDavMetaDataController(webDavReactiveAnnotationController, clazzBean);
                webDavMetaDataController.scan();
                webDavMetaDataController.registerPath(metaDataControllerMap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public WebDavAbstractController factory(ServerWebExchange exchange, ObjectMapperFactory objectMapperFactory) throws Exception {
        String routerPath = computerMainPath(exchange.getRequest().getPath().elements());
        WebDavMetaDataController metaDataController = metaDataControllerMap.get(routerPath);
        Constructor<WebDavAbstractController> constructor = metaDataController.getWebDavAbstractControllerClass().getConstructor(ServerWebExchange.class);
        WebDavAbstractController webDavAbstractController = constructor.newInstance(exchange);
        webDavAbstractController.setMetaDataController(metaDataController);
        webDavAbstractController.setObjectMapperFactory(objectMapperFactory);
        return webDavAbstractController;
    }

    private String computerMainPath(List<PathContainer.Element> elements) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < elements.size() - 1; i++) {
            PathContainer.Element element = elements.get(i);
            stringBuilder.append(element.value());
        }
        if (elements.getLast().value().equals("/")) {
            stringBuilder.append("/");
        }
        return stringBuilder.toString();
    }


    public boolean isReadOnly(ServerWebExchange exchange) {
        return true;
    }

    public boolean isFolder(ServerWebExchange exchange) {
        return true;
    }
}
