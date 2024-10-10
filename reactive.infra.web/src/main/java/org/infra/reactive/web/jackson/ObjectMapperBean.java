package org.infra.reactive.web.jackson;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.infra.reactive.form.engine.form.engine.model.dto.serializer.JacksonCustomDeserializer;
import org.infra.reactive.form.engine.form.engine.model.dto.serializer.JacksonCustomSerializer;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.stereotype.Component;

import java.lang.reflect.Constructor;
import java.util.Set;

@Component
public class ObjectMapperBean {
    @Bean
    public ObjectMapperFactory createObjectMapperFactory(ObjectMapper objectMapper) {
        ObjectMapperFactory objectMapperFactory = ObjectMapperFactory.Instance(objectMapper);

        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(JacksonCustomSerializer.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents("org.hamzeh.erp");
        SimpleModule simpleModule = new SimpleModule();
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends StdSerializer> clazzBean = (Class<? extends StdSerializer>) Class.forName(beanDefinition.getBeanClassName());
                JacksonCustomSerializer serializer = clazzBean.getAnnotation(JacksonCustomSerializer.class);
                Constructor<?> constructor = clazzBean.getConstructor();
                JsonSerializer instanceSerializer = (JsonSerializer) constructor.newInstance();
                simpleModule.addSerializer(serializer.model(), instanceSerializer);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(JacksonCustomDeserializer.class));
        clazz = scanner.findCandidateComponents("org.hamzeh.erp");
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends StdDeserializer> clazzBean = (Class<? extends StdDeserializer>) Class.forName(beanDefinition.getBeanClassName());
                JacksonCustomDeserializer deserializer = clazzBean.getAnnotation(JacksonCustomDeserializer.class);
                Constructor<?> constructor = clazzBean.getConstructor();
                JsonDeserializer instanceSerializer = (JsonDeserializer) constructor.newInstance();
                simpleModule.addDeserializer(deserializer.model(), instanceSerializer);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        objectMapper.registerModule(simpleModule);
        return objectMapperFactory;
    }
}
