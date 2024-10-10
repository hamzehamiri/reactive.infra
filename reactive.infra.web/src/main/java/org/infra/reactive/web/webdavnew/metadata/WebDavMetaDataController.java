package org.infra.reactive.web.webdavnew.metadata;

import lombok.Getter;
import org.infra.reactive.web.webdavnew.WebDavAbstractController;
import org.infra.reactive.web.webdavnew.annotations.WebDavReactiveAnnotationController;
import org.infra.reactive.web.webdavnew.annotations.WebDavReactiveAnnotationFileHandlingMethod;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class WebDavMetaDataController {

    @Getter
    protected WebDavReactiveAnnotationController webDavReactiveAnnotationController;
    @Getter
    protected Class<WebDavAbstractController> webDavAbstractControllerClass;
    protected final Map<String, WebDavReactiveAnnotationFileHandlingMethod> webDavReactiveAnnotationFileHandlingMethodMap = new HashMap<>();
    @Getter
    protected final Map<String, Method> mapMethodApiControllerMap = new HashMap<>();


    public WebDavMetaDataController(WebDavReactiveAnnotationController webDavReactiveAnnotationController, Class<WebDavAbstractController> webDavAbstractControllerClass) {
        this.webDavReactiveAnnotationController = webDavReactiveAnnotationController;
        this.webDavAbstractControllerClass = webDavAbstractControllerClass;
    }

    public void scan() {
        for (Method method : webDavAbstractControllerClass.getMethods()) {
            WebDavReactiveAnnotationFileHandlingMethod methodController = method.getAnnotation(WebDavReactiveAnnotationFileHandlingMethod.class);
            if (methodController != null) {
                webDavReactiveAnnotationFileHandlingMethodMap.put(methodController.api(), methodController);
                mapMethodApiControllerMap.put(methodController.api(), method);
            }
        }
    }

    public void registerPath(Map<String, WebDavMetaDataController> metaDataControllerMap) {
        for (Map.Entry<String, WebDavReactiveAnnotationFileHandlingMethod> method : webDavReactiveAnnotationFileHandlingMethodMap.entrySet()) {
            String keyPath = webDavReactiveAnnotationController.baseAPI() + method.getKey() + "/";
            metaDataControllerMap.put(keyPath, this);
        }
    }
}
