package org.infra.reactive.web.formengine.configuration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.Info;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementInterface;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.filter.model.CoreFilterProviderRequestModelRegistry;
import org.infra.reactive.form.engine.form.engine.providers.filter.model.CoreFilterProviderRequestModelRegistryFactory;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationAnnotation;
import org.infra.reactive.form.engine.form.engine.providers.wizard.WizardValidationServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOFilter;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOWizard;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import org.infra.reactive.form.engine.form.engine.services.core.process.CoreProcessExecutionService;
import org.infra.reactive.form.engine.logger.loggerqueue.LoggerQueueManager;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.core.task.support.TaskExecutorAdapter;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import java.util.Set;
import java.util.concurrent.Executors;

@Configuration
public class CoreServiceConfig implements ApplicationContextAware {

    public static ApplicationContext applicationContext;
    private final Logger logger = LogManager.getLogger(CoreServiceConfig.class);

    @Bean
    public CoreServiceEntityTable coreServiceTable() {
        LoggerQueueManager.setupDefaultLogger();
        return new CoreServiceEntityTable();
    }

    @Bean
    public CoreServiceDTOTable coreServiceDTOTable(CoreServiceEntityTable coreServiceEntityTable) {
        return new CoreServiceDTOTable(coreServiceEntityTable);
    }

    @Bean
    public CoreServiceDTOFilter coreServiceDTOFilter(CoreServiceDTOTable coreServiceDTOTable, CoreServiceDTOForm coreServiceDTOForm) {
        return new CoreServiceDTOFilter(coreServiceDTOTable, coreServiceDTOForm);
    }

    @Bean
    public CoreServiceDTOWizard coreServiceDTOWizard(CoreServiceDTOTable coreServiceDTOTable) {
        return new CoreServiceDTOWizard(coreServiceDTOTable);
    }

    @Bean
    public CoreServiceDTOForm coreServiceDTOForm(CoreServiceDTOTable coreServiceDTOTable) {
        return new CoreServiceDTOForm(coreServiceDTOTable);
    }

    @Bean
    public CoreProcessExecutionService coreProcessExecutionService(CoreServiceDTOForm coreServiceDTOForm) {
        return new CoreProcessExecutionService(coreServiceDTOForm);
    }

    @Bean(TaskExecutionAutoConfiguration.APPLICATION_TASK_EXECUTOR_BEAN_NAME)
    public AsyncTaskExecutor asyncTaskExecutor() {
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }

//    @Bean
//    public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadExecutorCustomizer() {
//        return Executors.newVirtualThreadPerTaskExecutor();
//    }

    @Bean
    public WizardValidationServiceRegistryFactory findAllWizardValidation() {
        WizardValidationServiceRegistryFactory wizardValidationServiceRegistryFactory = WizardValidationServiceRegistryFactory.Instance();
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(WizardValidationAnnotation.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends WizardValidationAbstract> clazzBean = (Class<? extends WizardValidationAbstract>) Class.forName(beanDefinition.getBeanClassName());
                WizardValidationAnnotation serializerClassRegistry = clazzBean.getAnnotation(WizardValidationAnnotation.class);
                wizardValidationServiceRegistryFactory.register(serializerClassRegistry.registerKey(), clazzBean);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }

        return wizardValidationServiceRegistryFactory;
    }

    @Bean
    public CoreFilterProviderRequestModelRegistryFactory findAllFilterProviderModel() {
        CoreFilterProviderRequestModelRegistryFactory coreFilterProviderModelRegistry = CoreFilterProviderRequestModelRegistryFactory.Instance();

        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(CoreFilterProviderRequestModelRegistry.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends CoreFilterRequestElementInterface> clazzBean = (Class<? extends CoreFilterRequestElementInterface>) Class.forName(beanDefinition.getBeanClassName());
                CoreFilterProviderRequestModelRegistry serializerClassRegistry = clazzBean.getAnnotation(CoreFilterProviderRequestModelRegistry.class);
                coreFilterProviderModelRegistry.registerSerializerClass(serializerClassRegistry.registerKey(), clazzBean);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }

        return coreFilterProviderModelRegistry;
    }

    @Bean
    public CoreFilterOperationJavaServiceRegistryFactory findAllOperationJavaService() {
        CoreFilterOperationJavaServiceRegistryFactory coreFilterOperationJavaServiceRegistryFactory = CoreFilterOperationJavaServiceRegistryFactory.Instance();

        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(CoreFilterOperationJavaServiceRegistry.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<CoreFilterOperationAbstract> clazzBean = (Class<CoreFilterOperationAbstract>) Class.forName(beanDefinition.getBeanClassName());
                CoreFilterOperationJavaServiceRegistry serializerClassRegistry = clazzBean.getAnnotation(CoreFilterOperationJavaServiceRegistry.class);
                coreFilterOperationJavaServiceRegistryFactory.register(serializerClassRegistry.registerKey(), clazzBean);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }
        return coreFilterOperationJavaServiceRegistryFactory;
    }

    @Bean
    public CoreFilterProviderJavaServiceRegistryFactory findAllFilterProviderService() {
        CoreFilterProviderJavaServiceRegistryFactory coreFilterProviderJavaServiceRegistry = CoreFilterProviderJavaServiceRegistryFactory.Instance();

        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(CoreFilterProviderJavaServiceRegistry.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<CoreFilterProviderJavaServiceAbstract<?, ?>> clazzBean = (Class<CoreFilterProviderJavaServiceAbstract<?, ?>>) Class.forName(beanDefinition.getBeanClassName());
                CoreFilterProviderJavaServiceRegistry serializerClassRegistry = clazzBean.getAnnotation(CoreFilterProviderJavaServiceRegistry.class);
                coreFilterProviderJavaServiceRegistry.registerSerializerClass(serializerClassRegistry.registerKey(), clazzBean);
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }

        return coreFilterProviderJavaServiceRegistry;
    }

    @Bean
    public DataProviderJavaServiceRegistry findAllDataProviderJavaSerializerClass() {
        DataProviderJavaServiceRegistry serializerClassServiceRegistry = DataProviderJavaServiceRegistry.Instance();

        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        scanner.addIncludeFilter(new AnnotationTypeFilter(DataProviderJavaRegistry.class));
        Set<BeanDefinition> clazz = scanner.findCandidateComponents(Info.class.getPackageName());
        for (BeanDefinition beanDefinition : clazz) {
            try {
                Class<? extends DataProviderJavaAbstract<?, ?, ?>> clazzBean = (Class<? extends DataProviderJavaAbstract<?, ?, ?>>) Class.forName(beanDefinition.getBeanClassName());
                DataProviderJavaRegistry serializerClassRegistry = clazzBean.getAnnotation(DataProviderJavaRegistry.class);
                if (!serializerClassRegistry.serviceKeyRegister().isEmpty()) {
                    serializerClassServiceRegistry.registerSerializerClass(serializerClassRegistry.serviceKeyRegister(), clazzBean);
                } else if (serializerClassRegistry.coreTableColumnDataProviderTypeEnum() != null) {
                    serializerClassServiceRegistry.registerSerializerClass(serializerClassRegistry.coreTableColumnDataProviderTypeEnum().toString(), clazzBean);
                }
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }

        return serializerClassServiceRegistry;
    }

    @Override
    public void setApplicationContext(@NotNull ApplicationContext applicationContext) throws BeansException {
        CoreServiceConfig.applicationContext = applicationContext;
    }
}
