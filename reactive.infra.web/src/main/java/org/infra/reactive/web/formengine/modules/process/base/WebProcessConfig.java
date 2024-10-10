package org.infra.reactive.web.formengine.modules.process.base;

import org.infra.reactive.form.engine.form.engine.services.core.process.AbstractProcessCall;
import org.infra.reactive.form.engine.form.engine.services.core.process.ProcessClassRegister;
import org.infra.reactive.form.engine.form.engine.services.core.process.ProcessServiceRegistry;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import java.util.Set;

@Configuration
public class WebProcessConfig {
    @Bean
    public ProcessServiceRegistry createProcessServiceRegistry() {
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(ProcessClassRegister.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents("org.hamzeh.erp");
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends AbstractProcessCall> clazzBean = (Class<? extends AbstractProcessCall>) Class.forName(beanDefinition.getBeanClassName());
                ProcessClassRegister processClassRegister = clazzBean.getAnnotation(ProcessClassRegister.class);
                ProcessServiceRegistry.getInstance().registerProcessCall(processClassRegister.serverRegisterKey(), clazzBean);
                ProcessServiceRegistry.getInstance().registerMetaData(processClassRegister.serverRegisterKey(), processClassRegister);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return ProcessServiceRegistry.getInstance();
    }
}
