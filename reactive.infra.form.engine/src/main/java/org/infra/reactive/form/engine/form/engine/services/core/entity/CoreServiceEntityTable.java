package org.infra.reactive.form.engine.form.engine.services.core.entity;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.cache.lru.LRUCache;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportLayoutEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.common.CommonCountryEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.css.CoreCssEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.dashboard.*;
import org.infra.reactive.form.engine.form.engine.model.tables.element.*;
import org.infra.reactive.form.engine.form.engine.model.tables.expression.CoreExpressionAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.expression.CoreExpressionEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.expression.CoreExpressionTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.filter.*;
import org.infra.reactive.form.engine.form.engine.model.tables.host.CoreHostClusterEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.host.CoreHostClusterNodeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.host.CoreHostEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.layout.CoreLayoutAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.layout.CoreLayoutDataAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.layout.CoreLayoutDataEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.layout.CoreLayoutEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.menu.CoreMenuEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.process.CoreProcessEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.process.CoreProcessParamEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.profile.CoreProfileEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.profile.CoreUserTenantProfileEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleAssignUserTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.tenant.CoreTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.tenant.CoreTenantTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.user.CoreUserEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.user.CoreUserTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.user.CoreUserTenantProcessEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableDataSourceEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableDataSourceTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.column.CoreTableColumnEditorEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.column.dataprovider.*;
import org.infra.reactive.form.engine.form.engine.model.tables.translate.CoreTranslateEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.translate.CoreTranslateLanguageEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.view.CoreViewModuleAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.view.CoreViewModuleEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.window.CoreWindowEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.window.tab.*;
import org.infra.reactive.form.engine.form.engine.model.tables.wizard.*;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowActionEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowActionTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.*;

public class CoreServiceEntityTable extends CoreServiceEntityTableBase {

    public static LRUCache<Long, CoreProcessEntity> coreProcessEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreProcessParamEntity> coreProcessParamEntityLRUCache = new LRUCache<>(10000);

    public static LRUCache<Long, CoreRoleEntity> coreRoleEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreRoleAssignElementEntity> coreRoleAssignResourceEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreRoleAssignUserTenantEntity> coreRoleAssignUserTenantEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreRoleAssignUserTenantEntity>> coreRoleAssignUserTenantEntityByCoreUserTenantIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTenantEntity> coreTenantEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTenantTypeEntity> coreTenantTypeEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreUserEntity> coreUserEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreUserTenantEntity> coreUserTenantEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreUserTenantProcessEntity> coreUserTenantProcessEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreUserTenantProfileEntity> coreUserTenantProfileEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreProfileEntity> coreProfileEntityLRUCache = new LRUCache<>(1000);

    public static LRUCache<Long, CoreAllElementEntity> coreAllElementEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<String, CoreAllElementEntity> coreAllElementByKeyEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreAllElementEntity> coreAllElementByCoreTableIdEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreAllElementDetailEntity> coreElementEntityLRUCache = new LRUCache<>(400);
    public static LRUCache<Long, List<CoreAllElementDetailEntity>> coreAllElementDetailEntityByCoreAllElementKeyLRUCache = new LRUCache<>(400);

    public static LRUCache<Long, CoreAllElementExtraAttributeEntity> coreAllElementExtraAttributeEntityLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreAllElementExtraAttributeEntity>> coreAllElementExtraAttributeEntityByCoreAllElementIdLRUCache = new LRUCache<>(10000);

    public static LRUCache<Long, CoreAllElementExtraAttributeValueEntity> coreAllElementExtraAttributeValueEntityLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, Map<Long, CoreAllElementExtraAttributeValueEntity>> coreAllElementExtraAttributeValueEntityByAttributeIdAndRecordIdLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreAllElementPropertiesEntity> coreAllElementPropertiesEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreAllElementPropertiesValueEntity> coreAllElementPropertiesValueEntityLRUCache = new LRUCache<>(1000);

    public static LRUCache<Long, CoreTableColumnDataProviderEntity> coreTableColumnDataProviderEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderSerializerEntity> coreTableColumnDataProviderSerializerEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderAttachmentEntity> coreTableColumnDataProviderAttachmentEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderAttachmentAssignElementEntity> coreTableColumnDataProviderAttachmentAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderListEntity> coreTableColumnDataProviderListEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderListValuesEntity> coreTableColumnDataProviderListValuesEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreTableColumnDataProviderListValuesEntity>> coreTableColumnDataProviderListValuesEntityByListIdLRUCache = new LRUCache<>(1000);

    public static LRUCache<Long, CoreTableColumnDataProviderTableEntity> coreTableColumnDataProviderTableEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderTableColumnsEntity> coreTableColumnDataProviderTableColumnsEntityLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreTableColumnDataProviderTableColumnsEntity>> coreTableColumnDataProviderTableColumnsByTableIdEntityLRUCache = new LRUCache<>(10000);

    public static LRUCache<Long, CoreTableColumnDataProviderTreeEntity> coreTableColumnDataProviderTreeEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderTreeColumnsEntity> coreTableColumnDataProviderTreeColumnsEntityLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreTableColumnDataProviderTreeColumnsEntity>> coreTableColumnDataProviderTreeColumnsByTableIdEntityLRUCache = new LRUCache<>(10000);

    public static LRUCache<Long, CoreTableColumnEditorEntity> coreTableColumnEditorEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderPrimaryEntity> coreTableColumnDataProviderPrimaryEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreHostEntity> coreHostEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreHostClusterEntity> coreHostClusterEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreHostClusterNodeEntity> coreHostClusterNodeEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreTableDataSourceEntity> coreTableDataSourceEntityLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreTableDataSourceTypeEntity> coreTableDataSourceTypeEntityLRUCache = new LRUCache<>(100);

    public static LRUCache<Long, CoreTranslateEntity> coreTranslateEntityLRUCache = new LRUCache<>(1000);

    // core_translate_lang_id => core_all_element_id => core_translate_record_id => translate_value
    public static LRUCache<Long, HashMap<Long, HashMap<Long, CoreTranslateEntity>>> cacheTranslate = new LRUCache<>(10);
    public static LRUCache<Long, CoreTranslateLanguageEntity> coreTranslateLanguageEntityLRUCache = new LRUCache<>(1000);

    public static LRUCache<Long, CommonCountryEntity> commonCountryEntityLRUCache = new LRUCache<>(2000);
    public static LRUCache<Long, CoreMenuEntity> coreMenuEntityLRUCache = new LRUCache<>(2000);

    public static LRUCache<Long, CoreWindowEntity> coreWindowEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabEntity> coreWindowTabEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFieldEntity> coreWindowTabFieldEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFilterEntity> coreWindowTabFilterEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFilterFieldEntity> coreWindowTabFilterFieldEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabJoinColumnEntity> coreWindowTabJoinColumnEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabTypeEntity> coreWindowTabTypeEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardEntity> coreDashboardEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardGadgetEntity> coreDashboardGadgetEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreDashboardGadgetEntity>> coreDashboardGadgetEntitysByCoreDashbordItemIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardGadgetViewEntity> coreDashboardGadgetViewEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreDashboardGadgetViewEntity>> coreDashboardGadgetViewEntitysByCoreDashbordItemIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardItemEntity> coreDashboardItemEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardViewEntity> coreDashboardViewEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreAnalyticReportEntity> coreAnalyticReportEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreAnalyticReportLayoutEntity> coreAnalyticReportLayoutEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreCssEntity> coreCssEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreButtonEntity> coreButtonEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreButtonAssignElementEntity> coreButtonAssignElementRecordEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, List<CoreButtonAssignElementEntity>>> coreButtonAssignElementRecordEntityByCoreElementAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreExpressionAssignElementEntity> coreExpressionAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, Map<Long, CoreExpressionAssignElementEntity>>> coreExpressionAssignElementEntityBy_ElementId_RecordId_ExpressionTypeId_LRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreExpressionEntity> coreExpressionEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreExpressionTypeEntity> coreExpressionTypeEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterEntity> coreFilterEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterAssignDataProviderEntity> coreFilterAssignDataProviderEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterAssignElementEntity> coreFilterAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterLayoutEntity> coreFilterLayoutEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterOperationEntity> coreFilterOperationEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterOperationParamEntity> coreFilterOperationParamEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterProviderEntity> coreFilterProviderEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutEntity> coreLayoutEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutDataEntity> coreLayoutDataEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutAssignElementEntity> coreLayoutAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutDataAssignElementEntity> coreLayoutDataAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardEntity> coreWizardEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardStateEntity> coreWizardStateEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardStateValidationEntity> coreWizardStateValidationEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardStateValueEntity> coreWizardStateValueEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardValidationEntity> coreWizardValidationEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreViewModuleEntity> coreViewModuleEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreViewModuleAssignElementEntity> coreViewModuleAssignElementEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabPluggableEntity> coreWindowTabPluggableEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabPluggableAssignTabEntity> coreWindowTabPluggableAssignTabEntityLRUCache = new LRUCache<>(1000);

    public static LRUCache<Long, CoreWorkflowEntity> coreWorkflowEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWorkflowActionEntity> coreWorkflowActionEntityLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWorkflowActionTypeEntity> coreWorkflowActionTypeEntityLRUCache = new LRUCache<>(1000);

    @Override
    public Flux<? extends Serializable> cacheReset(Mono<Connection> connection) {
        coreProcessEntityLRUCache.clear();
        coreProcessParamEntityLRUCache.clear();
        coreRoleEntityLRUCache.clear();
        coreRoleAssignResourceEntityLRUCache.clear();
        coreRoleAssignUserTenantEntityLRUCache.clear();
        coreRoleAssignUserTenantEntityByCoreUserTenantIdLRUCache.clear();
        coreTenantEntityLRUCache.clear();
        coreTenantTypeEntityLRUCache.clear();
        coreUserEntityLRUCache.clear();
        coreUserTenantEntityLRUCache.clear();

        coreTableColumnDataProviderListEntityLRUCache.clear();
        coreTableColumnDataProviderAttachmentEntityLRUCache.clear();
        coreTableColumnDataProviderAttachmentAssignElementEntityLRUCache.clear();
        coreTableColumnDataProviderListValuesEntityLRUCache.clear();
        coreTableColumnDataProviderListValuesEntityByListIdLRUCache.clear();
        coreAllElementExtraAttributeValueEntityLRUCache.clear();
        coreAllElementExtraAttributeValueEntityByAttributeIdAndRecordIdLRUCache.clear();

        coreAllElementPropertiesEntityLRUCache.clear();
        coreAllElementPropertiesValueEntityLRUCache.clear();

        coreUserTenantProcessEntityLRUCache.clear();
        coreUserTenantProfileEntityLRUCache.clear();
        coreProfileEntityLRUCache.clear();
        coreAllElementEntityLRUCache.clear();
        coreAllElementByKeyEntityLRUCache.clear();
        coreAllElementByCoreTableIdEntityLRUCache.clear();
        coreElementEntityLRUCache.clear();
        coreAllElementDetailEntityByCoreAllElementKeyLRUCache.clear();
        coreAllElementExtraAttributeEntityLRUCache.clear();
        coreAllElementExtraAttributeEntityByCoreAllElementIdLRUCache.clear();
        coreTableColumnDataProviderEntityLRUCache.clear();
        coreTableColumnDataProviderSerializerEntityLRUCache.clear();

        coreTableColumnDataProviderTableEntityLRUCache.clear();
        coreTableColumnDataProviderTableColumnsEntityLRUCache.clear();
        coreTableColumnDataProviderTableColumnsByTableIdEntityLRUCache.clear();
        coreTableColumnDataProviderTreeEntityLRUCache.clear();
        coreTableColumnDataProviderTreeColumnsEntityLRUCache.clear();
        coreTableColumnDataProviderTreeColumnsByTableIdEntityLRUCache.clear();

        coreTableColumnEditorEntityLRUCache.clear();
        coreTableColumnDataProviderPrimaryEntityLRUCache.clear();

        coreHostEntityLRUCache.clear();
        coreHostClusterEntityLRUCache.clear();
        coreHostClusterNodeEntityLRUCache.clear();
        coreTableDataSourceEntityLRUCache.clear();
        coreTableDataSourceTypeEntityLRUCache.clear();
        coreTranslateEntityLRUCache.clear();
        cacheTranslate.clear();

        coreTranslateLanguageEntityLRUCache.clear();
        commonCountryEntityLRUCache.clear();

        coreMenuEntityLRUCache.clear();
        coreWindowEntityLRUCache.clear();
        coreWindowTabEntityLRUCache.clear();
        coreWindowTabFieldEntityLRUCache.clear();
        coreWindowTabFilterEntityLRUCache.clear();
        coreWindowTabFilterFieldEntityLRUCache.clear();
        coreWindowTabJoinColumnEntityLRUCache.clear();
        coreWindowTabTypeEntityLRUCache.clear();

        coreDashboardEntityLRUCache.clear();
        coreDashboardGadgetEntityLRUCache.clear();
        coreDashboardGadgetViewEntityLRUCache.clear();
        coreDashboardItemEntityLRUCache.clear();
        coreDashboardViewEntityLRUCache.clear();

        coreDashboardGadgetEntitysByCoreDashbordItemIdLRUCache.clear();
        coreDashboardGadgetViewEntitysByCoreDashbordItemIdLRUCache.clear();

        coreAnalyticReportEntityLRUCache.clear();
        coreAnalyticReportLayoutEntityLRUCache.clear();

        coreCssEntityLRUCache.clear();
        coreButtonEntityLRUCache.clear();
        coreButtonAssignElementRecordEntityLRUCache.clear();
        coreButtonAssignElementRecordEntityByCoreElementAndRecordIdLRUCache.clear();

        coreExpressionAssignElementEntityBy_ElementId_RecordId_ExpressionTypeId_LRUCache.clear();
        coreExpressionAssignElementEntityLRUCache.clear();
        coreExpressionEntityLRUCache.clear();
        coreExpressionTypeEntityLRUCache.clear();

        coreFilterEntityLRUCache.clear();
        coreFilterAssignDataProviderEntityLRUCache.clear();
        coreFilterAssignElementEntityLRUCache.clear();
        coreFilterLayoutEntityLRUCache.clear();
        coreFilterOperationEntityLRUCache.clear();
        coreFilterOperationParamEntityLRUCache.clear();
        coreFilterProviderEntityLRUCache.clear();

        coreLayoutEntityLRUCache.clear();
        coreLayoutDataEntityLRUCache.clear();
        coreLayoutAssignElementEntityLRUCache.clear();
        coreLayoutDataAssignElementEntityLRUCache.clear();

        coreWizardEntityLRUCache.clear();
        coreWizardStateEntityLRUCache.clear();
        coreWizardStateValidationEntityLRUCache.clear();
        coreWizardStateValueEntityLRUCache.clear();
        coreWizardValidationEntityLRUCache.clear();

        coreViewModuleEntityLRUCache.clear();
        coreViewModuleAssignElementEntityLRUCache.clear();

        coreWindowTabPluggableEntityLRUCache.clear();
        coreWindowTabPluggableAssignTabEntityLRUCache.clear();

        coreWorkflowEntityLRUCache.clear();
        coreWorkflowActionEntityLRUCache.clear();
        coreWorkflowActionTypeEntityLRUCache.clear();

        return super.cacheReset(connection);
    }

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return Flux.merge(super.checkCache(connection).collectList()).flatMap(serializable -> Flux.merge(
                        coreAllElement(connection),
                        coreElement(connection),
                        coreAllElementExtraAttributeEntity(connection),
                        coreAllElementExtraAttributeValueEntity(connection),
                        coreTableColumnDataProvider(connection),
                        coreTableColumnDataProviderSerializerEntity(connection),
                        coreTableColumnDataProviderAttachment(connection),
                        coreTableColumnDataProviderAttachmentAssignElement(connection),
                        coreTableColumnDataProviderList(connection),
                        coreTableColumnDataProviderListValues(connection),
                        coreTableColumnDataProviderTable(connection),
                        coreTableColumnDataProviderTableColumn(connection),
                        coreTableColumnDataProviderTree(connection),
                        coreTableColumnDataProviderTreeColumn(connection),
                        coreTableColumnEditor(connection),
                        coreTableColumnDataProviderPrimary(connection),
                        coreHost(connection),
                        coreHostCluster(connection),
                        coreHostClusterNode(connection),
                        coreTableDataSource(connection),
                        coreTableDataSourceType(connection),
                        coreRoleEntity(connection),
                        coreRoleAssignElementEntity(connection),
                        coreRoleAssignUserTenantEntity(connection),
                        coreTenantEntity(connection),
                        coreTenantTypeEntity(connection),
                        coreUserEntity(connection),
                        coreUserTenantEntity(connection),
                        coreUserTenantProcessEntity(connection),
                        coreUserTenantProfileEntity(connection),
                        coreProfileEntity(connection),
                        coreProcess(connection),
                        coreProcessParam(connection),
                        coreTranslate(connection),
                        coreTranslateLanguage(connection),
                        commonCountryEntity(connection),
                        coreMenuEntity(connection),
                        windowCache(connection),
                        windowTabCache(connection),
                        coreButtonEntity(connection),
                        coreCssEntity(connection),
                        coreButtonAssignElementRecordEntityCache(connection),
                        windowTabFieldCache(connection),
                        coreWindowTabFilterEntityLRUCache(connection),
                        coreWindowTabFilterFieldEntityLRUCache(connection),
                        coreWindowTabJoinColumnEntityLRUCache(connection),
                        coreWindowTabTypeEntityLRUCache(connection),
                        coreDashboardEntity(connection),
                        coreDashboardGadgetEntity(connection),
                        coreDashboardGadgetViewEntity(connection),
                        coreDashboardItemEntity(connection),
                        coreDashboardViewEntity(connection),
                        coreAnalyticReportEntity(connection),
                        coreAnalyticReportLayoutEntity(connection),
                        coreExpressionAssignElementEntityLRUCache(connection),
                        coreExpressionEntityLRUCache(connection),
                        coreExpressionTypeEntityLRUCache(connection),
                        coreFilterEntityLRUCache(connection),
                        coreFilterAssignDataProviderEntityLRUCache(connection),
                        coreFilterAssignElementEntityLRUCache(connection),
                        coreFilterLayoutEntityLRUCache(connection),
                        coreFilterOperationEntityLRUCache(connection),
                        coreFilterOperationParamEntityLRUCache(connection),
                        coreFilterProviderEntityLRUCache(connection),
                        coreLayoutEntityCache(connection),
                        coreLayoutDataEntityLRUCacheCache(connection),
                        coreLayoutAssignElementEntityFlux(connection),
                        coreLayoutDataAssignElementEntityFlux(connection),
                        coreWizardEntityLRUCache(connection),
                        coreWizardStateEntityLRUCache(connection),
                        coreWizardStateValidationEntityLRUCache(connection),
                        coreWizardStateValueEntityLRUCache(connection),
                        coreWizardValidationEntityLRUCache(connection),
                        coreViewModuleEntityLRUCache(connection),
                        coreViewModuleAssignElementEntityLRUCache(connection),
                        coreWindowTabPluggableEntityLRUCache(connection),
                        coreWindowTabPluggableAssignTabEntityLRUCache(connection),
                        coreWorkflowEntityLRUCache(connection),
                        coreWorkflowActionEntityLRUCache(connection),
                        coreWorkflowActionTypeEntityLRUCache(connection),
                        coreAllElementPropertiesEntityLRUCache(connection),
                        coreAllElementPropertiesValueEntityLRUCache(connection)
                )
                .doFinally(doFinallyCache())
                .doOnError(doException()));
    }

    public Flux<CoreAllElementPropertiesEntity> coreAllElementPropertiesEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreAllElementPropertiesEntity.class, rowEntity -> coreAllElementPropertiesEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreAllElementPropertiesValueEntity> coreAllElementPropertiesValueEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreAllElementPropertiesValueEntity.class, rowEntity -> coreAllElementPropertiesValueEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWorkflowEntity> coreWorkflowEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWorkflowEntity.class, rowEntity -> coreWorkflowEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWorkflowActionEntity> coreWorkflowActionEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWorkflowActionEntity.class, rowEntity -> coreWorkflowActionEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWorkflowActionTypeEntity> coreWorkflowActionTypeEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWorkflowActionTypeEntity.class, rowEntity -> coreWorkflowActionTypeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabPluggableEntity> coreWindowTabPluggableEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWindowTabPluggableEntity.class, rowEntity -> coreWindowTabPluggableEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabPluggableAssignTabEntity> coreWindowTabPluggableAssignTabEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWindowTabPluggableAssignTabEntity.class, rowEntity -> coreWindowTabPluggableAssignTabEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreViewModuleEntity> coreViewModuleEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreViewModuleEntity.class, rowEntity -> coreViewModuleEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreViewModuleAssignElementEntity> coreViewModuleAssignElementEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreViewModuleAssignElementEntity.class, rowEntity -> coreViewModuleAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWizardEntity> coreWizardEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWizardEntity.class, rowEntity -> coreWizardEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWizardStateEntity> coreWizardStateEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWizardStateEntity.class, rowEntity -> coreWizardStateEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWizardStateValidationEntity> coreWizardStateValidationEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWizardStateValidationEntity.class, rowEntity -> coreWizardStateValidationEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWizardStateValueEntity> coreWizardStateValueEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWizardStateValueEntity.class, rowEntity -> coreWizardStateValueEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWizardValidationEntity> coreWizardValidationEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWizardValidationEntity.class, rowEntity -> coreWizardValidationEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }


    public Flux<CoreLayoutAssignElementEntity> coreLayoutAssignElementEntityFlux(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreLayoutAssignElementEntity.class, rowEntity -> coreLayoutAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreLayoutDataAssignElementEntity> coreLayoutDataAssignElementEntityFlux(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreLayoutDataAssignElementEntity.class, rowEntity -> coreLayoutDataAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreLayoutDataEntity> coreLayoutDataEntityLRUCacheCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreLayoutDataEntity.class, rowEntity -> coreLayoutDataEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreLayoutEntity> coreLayoutEntityCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreLayoutEntity.class, rowEntity -> coreLayoutEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterEntity> coreFilterEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterEntity.class, rowEntity -> coreFilterEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterAssignDataProviderEntity> coreFilterAssignDataProviderEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterAssignDataProviderEntity.class, rowEntity -> coreFilterAssignDataProviderEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterAssignElementEntity> coreFilterAssignElementEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterAssignElementEntity.class, rowEntity -> coreFilterAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterLayoutEntity> coreFilterLayoutEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterLayoutEntity.class, rowEntity -> coreFilterLayoutEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterOperationEntity> coreFilterOperationEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterOperationEntity.class, rowEntity -> coreFilterOperationEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterOperationParamEntity> coreFilterOperationParamEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterOperationParamEntity.class, rowEntity -> coreFilterOperationParamEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreFilterProviderEntity> coreFilterProviderEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreFilterProviderEntity.class, rowEntity -> coreFilterProviderEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreExpressionAssignElementEntity> coreExpressionAssignElementEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreExpressionAssignElementEntity.class, rowEntity -> {
            coreExpressionAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Map<Long, Map<Long, CoreExpressionAssignElementEntity>> RecordId_ExpressionTypeId = coreExpressionAssignElementEntityBy_ElementId_RecordId_ExpressionTypeId_LRUCache.get(rowEntity.getCore_all_element_id()).orElseGet(HashMap::new);
            Map<Long, CoreExpressionAssignElementEntity> ExpressionTypeId = RecordId_ExpressionTypeId.computeIfAbsent(rowEntity.getRecord_id(), k -> new HashMap<>());
            ExpressionTypeId.put(rowEntity.getCore_expression_type_id(), rowEntity);
        });
    }

    public Flux<CoreExpressionEntity> coreExpressionEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreExpressionEntity.class, rowEntity -> coreExpressionEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreExpressionTypeEntity> coreExpressionTypeEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreExpressionTypeEntity.class, rowEntity -> coreExpressionTypeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowEntity> windowCache(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreWindowEntity.class, rowEntity -> coreWindowEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabEntity> windowTabCache(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreWindowTabEntity.class, rowEntity -> coreWindowTabEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreButtonEntity> coreButtonEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreButtonEntity.class, rowEntity -> coreButtonEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreCssEntity> coreCssEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreCssEntity.class, rowEntity -> coreCssEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreButtonAssignElementEntity> coreButtonAssignElementRecordEntityCache(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreButtonAssignElementEntity.class, rowEntity -> {
            Map<Long, List<CoreButtonAssignElementEntity>> coreButtonAssignElementRecordEntities = coreButtonAssignElementRecordEntityByCoreElementAndRecordIdLRUCache.get(rowEntity.getCore_all_element_id()).orElseGet(() -> {
                Map<Long, List<CoreButtonAssignElementEntity>> coreButtonAssignElementRecordEntitiesNew = new HashMap<>();
                coreButtonAssignElementRecordEntityByCoreElementAndRecordIdLRUCache.put(rowEntity.getCore_all_element_id(), coreButtonAssignElementRecordEntitiesNew);
                return coreButtonAssignElementRecordEntitiesNew;
            });

            List<CoreButtonAssignElementEntity> listButtonPerRecord = coreButtonAssignElementRecordEntities.computeIfAbsent(rowEntity.getRecord_id(), k -> new ArrayList<>());
            listButtonPerRecord.add(rowEntity);

            coreButtonAssignElementRecordEntityLRUCache.put(rowEntity.getId(), rowEntity);
        });
    }

    public static List<CoreButtonAssignElementEntity> coreButtonAssignElementRecordDTOByElementTypeAndRecordIdEnum(CoreAllElementRegisterKeyEnum coreAllElementRegisterKeyEnum, long recordId) {
        Optional<Long> coreElementIdOptional = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(coreAllElementRegisterKeyEnum.toString()).map(CoreAllElementEntity::getId);
        return coreElementIdOptional.map(coreElementId -> coreButtonAssignElementRecordEntityByCoreElementAndRecordIdLRUCache.get(coreElementId).map(longListMap -> longListMap.get(recordId)).orElseGet(ArrayList::new)).orElseGet(ArrayList::new);
    }

    public Flux<CoreWindowTabFieldEntity> windowTabFieldCache(Mono<Connection> connection) {
        return createDataTable(connection, 4L, CoreWindowTabFieldEntity.class, rowEntity -> coreWindowTabFieldEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabFilterEntity> coreWindowTabFilterEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 4L, CoreWindowTabFilterEntity.class, rowEntity -> coreWindowTabFilterEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabFilterFieldEntity> coreWindowTabFilterFieldEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 4L, CoreWindowTabFilterFieldEntity.class, rowEntity -> coreWindowTabFilterFieldEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabJoinColumnEntity> coreWindowTabJoinColumnEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 5L, CoreWindowTabJoinColumnEntity.class, rowEntity -> coreWindowTabJoinColumnEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreWindowTabTypeEntity> coreWindowTabTypeEntityLRUCache(Mono<Connection> connection) {
        return createDataTable(connection, 5L, CoreWindowTabTypeEntity.class, rowEntity -> coreWindowTabTypeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CommonCountryEntity> commonCountryEntity(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CommonCountryEntity.class, commonCountryEntity -> commonCountryEntityLRUCache.put(commonCountryEntity.getId(), commonCountryEntity));
    }

    public Flux<CoreMenuEntity> coreMenuEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreMenuEntity.class, coreMenuEntity -> coreMenuEntityLRUCache.put(coreMenuEntity.getId(), coreMenuEntity));
    }

    public Flux<CoreDashboardEntity> coreDashboardEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreDashboardEntity.class, coreMenuEntity -> coreDashboardEntityLRUCache.put(coreMenuEntity.getId(), coreMenuEntity));
    }

    public Flux<CoreDashboardGadgetEntity> coreDashboardGadgetEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreDashboardGadgetEntity.class, coreDashboardGadgetEntity -> {
            coreDashboardGadgetEntityLRUCache.put(coreDashboardGadgetEntity.getId(), coreDashboardGadgetEntity);
            Optional<List<CoreDashboardGadgetEntity>> coreDashboardGadgetEntities = coreDashboardGadgetEntitysByCoreDashbordItemIdLRUCache.get(coreDashboardGadgetEntity.getId());

            List<CoreDashboardGadgetEntity> coreDashboardGadgetEntities1;
            if (coreDashboardGadgetEntities.isEmpty()) {
                coreDashboardGadgetEntities1 = new ArrayList<>();
                coreDashboardGadgetEntitysByCoreDashbordItemIdLRUCache.put(coreDashboardGadgetEntity.getId(), coreDashboardGadgetEntities1);
            } else {
                coreDashboardGadgetEntities1 = coreDashboardGadgetEntities.get();
            }
            coreDashboardGadgetEntities1.add(coreDashboardGadgetEntity);
        });
    }

    public Flux<CoreDashboardGadgetViewEntity> coreDashboardGadgetViewEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreDashboardGadgetViewEntity.class, coreDashboardGadgetViewEntity -> {
            coreDashboardGadgetViewEntityLRUCache.put(coreDashboardGadgetViewEntity.getId(), coreDashboardGadgetViewEntity);

            Optional<List<CoreDashboardGadgetViewEntity>> coreDashboardGadgetViewEntities = coreDashboardGadgetViewEntitysByCoreDashbordItemIdLRUCache.get(coreDashboardGadgetViewEntity.getId());

            List<CoreDashboardGadgetViewEntity> dashboardGadgetViewEntities;
            if (coreDashboardGadgetViewEntities.isEmpty()) {
                dashboardGadgetViewEntities = new ArrayList<>();
                coreDashboardGadgetViewEntitysByCoreDashbordItemIdLRUCache.put(coreDashboardGadgetViewEntity.getId(), dashboardGadgetViewEntities);
            } else {
                dashboardGadgetViewEntities = coreDashboardGadgetViewEntities.get();
            }
            dashboardGadgetViewEntities.add(coreDashboardGadgetViewEntity);
        });
    }

    public Flux<CoreDashboardItemEntity> coreDashboardItemEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreDashboardItemEntity.class, coreMenuEntity -> coreDashboardItemEntityLRUCache.put(coreMenuEntity.getId(), coreMenuEntity));
    }

    public Flux<CoreDashboardViewEntity> coreDashboardViewEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreDashboardViewEntity.class, coreMenuEntity -> coreDashboardViewEntityLRUCache.put(coreMenuEntity.getId(), coreMenuEntity));
    }

    public Flux<CoreAnalyticReportEntity> coreAnalyticReportEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreAnalyticReportEntity.class, coreAnalyticReportEntity -> coreAnalyticReportEntityLRUCache.put(coreAnalyticReportEntity.getId(), coreAnalyticReportEntity));
    }

    public Flux<CoreAnalyticReportLayoutEntity> coreAnalyticReportLayoutEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreAnalyticReportLayoutEntity.class, coreAnalyticReportLayoutEntity -> coreAnalyticReportLayoutEntityLRUCache.put(coreAnalyticReportLayoutEntity.getId(), coreAnalyticReportLayoutEntity));
    }

    public Flux<CoreTranslateEntity> coreTranslate(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreTranslateEntity.class, rowEntity -> {
            Optional<HashMap<Long, HashMap<Long, CoreTranslateEntity>>> mapOneLevel = cacheTranslate.get(rowEntity.getCore_translate_language_id());
            if (rowEntity.getCore_all_element_id() != null && rowEntity.getTranslate_value() != null && rowEntity.getRecord_id() != null) {
                HashMap<Long, HashMap<Long, CoreTranslateEntity>> longHashMapHashMap;
                if (mapOneLevel.isEmpty()) {
                    longHashMapHashMap = new HashMap<>();
                    cacheTranslate.put(rowEntity.getCore_translate_language_id(), longHashMapHashMap);
                } else {
                    longHashMapHashMap = mapOneLevel.get();
                }
                HashMap<Long, CoreTranslateEntity> twoLevelMap = longHashMapHashMap.computeIfAbsent(rowEntity.getCore_all_element_id(), k -> new HashMap<>());
                twoLevelMap.put(rowEntity.getRecord_id(), rowEntity);
            }

            coreTranslateEntityLRUCache.put(rowEntity.getId(), rowEntity);
        });
    }

    public Flux<CoreTranslateLanguageEntity> coreTranslateLanguage(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreTranslateLanguageEntity.class, rowEntity -> coreTranslateLanguageEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public static String translateElement(CoreAllElementRegisterKeyEnum elementType, CoreTranslateLanguageDTO coreTranslateLanguageDTO, Long recordId) {
        Optional<Long> coreElementId = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(elementType.toString()).map(CoreAllElementEntity::getId);
        if (coreElementId.isPresent()) {
            CoreTranslateEntity translateValue = translate(coreTranslateLanguageDTO.getId(), coreElementId.get(), recordId);
            return translateValue != null ? translateValue.getTranslate_value() : null;
        } else {
            return null;
        }
    }

    public static CoreTranslateEntity translate(Long core_translate_language_id, Long core_all_element_id, Long recordId) {
        HashMap<Long, CoreTranslateEntity> translateMapWithRecordId = translateWithOutRecordId(core_translate_language_id, core_all_element_id);
        if (translateMapWithRecordId != null) {
            return translateMapWithRecordId.get(recordId);
        } else {
            return null;
        }
    }

    public static HashMap<Long, CoreTranslateEntity> translateWithOutRecordId(Long core_translate_language_id, Long core_all_element_id) {
        Optional<HashMap<Long, HashMap<Long, CoreTranslateEntity>>> hashmapHashmap = cacheTranslate.get(core_translate_language_id);
        return hashmapHashmap.map(longHashMapHashMap -> {
            HashMap<Long, CoreTranslateEntity> mapLongTranslate = longHashMapHashMap.get(core_all_element_id);
            return mapLongTranslate;
        }).orElse(null);
    }

    public Flux<CoreProcessEntity> coreProcess(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreProcessEntity.class, rowEntity -> coreProcessEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreProcessParamEntity> coreProcessParam(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreProcessParamEntity.class, rowEntity -> coreProcessParamEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreAllElementEntity> coreAllElement(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreAllElementEntity.class, rowEntity -> {
            coreAllElementEntityLRUCache.put(rowEntity.getId(), rowEntity);
            coreAllElementByKeyEntityLRUCache.put(rowEntity.getRegister_key(), rowEntity);
            coreAllElementByCoreTableIdEntityLRUCache.put(rowEntity.getCore_table_id(), rowEntity);
        });
    }

    public Flux<CoreAllElementDetailEntity> coreElement(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreAllElementDetailEntity.class, rowEntity -> {
            coreElementEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<List<CoreAllElementDetailEntity>> optionListElement = coreAllElementDetailEntityByCoreAllElementKeyLRUCache.get(rowEntity.getCore_all_element_id());
            List<CoreAllElementDetailEntity> listElement = optionListElement.orElseGet(() -> {
                List<CoreAllElementDetailEntity> res = new ArrayList<>();
                coreAllElementDetailEntityByCoreAllElementKeyLRUCache.put(rowEntity.getCore_all_element_id(), res);
                return res;
            });
            listElement.add(rowEntity);
        });
    }

    public Flux<CoreAllElementExtraAttributeValueEntity> coreAllElementExtraAttributeValueEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreAllElementExtraAttributeValueEntity.class, rowEntity -> {
            coreAllElementExtraAttributeValueEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<Map<Long, CoreAllElementExtraAttributeValueEntity>> optionMapAttributeValueByRecordId = coreAllElementExtraAttributeValueEntityByAttributeIdAndRecordIdLRUCache.get(rowEntity.getCore_all_element_extra_attribute_id());
            Map<Long, CoreAllElementExtraAttributeValueEntity> mapAttributeValueByRecordId = optionMapAttributeValueByRecordId.orElseGet(() -> {
                Map<Long, CoreAllElementExtraAttributeValueEntity> res = new HashMap<>();
                coreAllElementExtraAttributeValueEntityByAttributeIdAndRecordIdLRUCache.put(rowEntity.getCore_all_element_extra_attribute_id(), res);
                return res;
            });
            if (rowEntity.getRecord_id() != null) {
                mapAttributeValueByRecordId.put(rowEntity.getRecord_id(), rowEntity);
            }
        });
    }

    public Flux<CoreAllElementExtraAttributeEntity> coreAllElementExtraAttributeEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreAllElementExtraAttributeEntity.class, rowEntity -> {
            coreAllElementExtraAttributeEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<List<CoreAllElementExtraAttributeEntity>> optionListExtraAttr = coreAllElementExtraAttributeEntityByCoreAllElementIdLRUCache.get(rowEntity.getCore_all_element_id());
            List<CoreAllElementExtraAttributeEntity> listExtraAttr = optionListExtraAttr.orElseGet(() -> {
                List<CoreAllElementExtraAttributeEntity> res = new ArrayList<>();
                coreAllElementExtraAttributeEntityByCoreAllElementIdLRUCache.put(rowEntity.getCore_all_element_id(), res);
                return res;
            });
            listExtraAttr.add(rowEntity);
        });
    }

    public Flux<CoreTableColumnDataProviderEntity> coreTableColumnDataProvider(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderEntity.class, rowEntity -> coreTableColumnDataProviderEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderSerializerEntity> coreTableColumnDataProviderSerializerEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderSerializerEntity.class, rowEntity -> coreTableColumnDataProviderSerializerEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderAttachmentEntity> coreTableColumnDataProviderAttachment(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderAttachmentEntity.class, rowEntity -> coreTableColumnDataProviderAttachmentEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderAttachmentAssignElementEntity> coreTableColumnDataProviderAttachmentAssignElement(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderAttachmentAssignElementEntity.class, rowEntity -> coreTableColumnDataProviderAttachmentAssignElementEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderListEntity> coreTableColumnDataProviderList(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderListEntity.class, rowEntity -> coreTableColumnDataProviderListEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderListValuesEntity> coreTableColumnDataProviderListValues(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreTableColumnDataProviderListValuesEntity.class, rowEntity -> {
            coreTableColumnDataProviderListValuesEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<List<CoreTableColumnDataProviderListValuesEntity>> optionListValues = coreTableColumnDataProviderListValuesEntityByListIdLRUCache.get(rowEntity.getCore_table_column_dataprovider_list_id());
            List<CoreTableColumnDataProviderListValuesEntity> listValues = optionListValues.orElseGet(() -> {
                List<CoreTableColumnDataProviderListValuesEntity> res = new ArrayList<>();
                coreTableColumnDataProviderListValuesEntityByListIdLRUCache.put(rowEntity.getCore_table_column_dataprovider_list_id(), res);
                return res;
            });
            listValues.add(rowEntity);
        });
    }

    public Flux<CoreTableColumnDataProviderTableEntity> coreTableColumnDataProviderTable(Mono<Connection> connection) {
        return createDataTable(connection, 4L, CoreTableColumnDataProviderTableEntity.class, rowEntity -> coreTableColumnDataProviderTableEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderTableColumnsEntity> coreTableColumnDataProviderTableColumn(Mono<Connection> connection) {
        return createDataTable(connection, 5L, CoreTableColumnDataProviderTableColumnsEntity.class, rowEntity -> {
            coreTableColumnDataProviderTableColumnsEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<List<CoreTableColumnDataProviderTableColumnsEntity>> optionalCoreTableColumnDataProviderTableColumnsEntityList = coreTableColumnDataProviderTableColumnsByTableIdEntityLRUCache.get(rowEntity.getCore_table_column_dataprovider_table_id());
            List<CoreTableColumnDataProviderTableColumnsEntity> listColumn = optionalCoreTableColumnDataProviderTableColumnsEntityList.orElseGet(() -> {
                List<CoreTableColumnDataProviderTableColumnsEntity> res = new ArrayList<>();
                coreTableColumnDataProviderTableColumnsByTableIdEntityLRUCache.put(rowEntity.getCore_table_column_dataprovider_table_id(), res);
                return res;
            });
            listColumn.add(rowEntity);
        });
    }


    public Flux<CoreTableColumnDataProviderTreeEntity> coreTableColumnDataProviderTree(Mono<Connection> connection) {
        return createDataTable(connection, 4L, CoreTableColumnDataProviderTreeEntity.class, rowEntity -> coreTableColumnDataProviderTreeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderTreeColumnsEntity> coreTableColumnDataProviderTreeColumn(Mono<Connection> connection) {
        return createDataTable(connection, 5L, CoreTableColumnDataProviderTreeColumnsEntity.class, rowEntity -> {
            coreTableColumnDataProviderTreeColumnsEntityLRUCache.put(rowEntity.getId(), rowEntity);
            Optional<List<CoreTableColumnDataProviderTreeColumnsEntity>> optionalCoreTableColumnDataProviderTreeColumnsEntityList = coreTableColumnDataProviderTreeColumnsByTableIdEntityLRUCache.get(rowEntity.getCore_table_column_dataprovider_tree_id());
            List<CoreTableColumnDataProviderTreeColumnsEntity> listColumn = optionalCoreTableColumnDataProviderTreeColumnsEntityList.orElseGet(() -> {
                List<CoreTableColumnDataProviderTreeColumnsEntity> res = new ArrayList<>();
                coreTableColumnDataProviderTreeColumnsByTableIdEntityLRUCache.put(rowEntity.getCore_table_column_dataprovider_tree_id(), res);
                return res;
            });
            listColumn.add(rowEntity);
        });
    }


    public Flux<CoreTableColumnEditorEntity> coreTableColumnEditor(Mono<Connection> connection) {
        return createDataTable(connection, 6L, CoreTableColumnEditorEntity.class, rowEntity -> coreTableColumnEditorEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableColumnDataProviderPrimaryEntity> coreTableColumnDataProviderPrimary(Mono<Connection> connection) {
        return createDataTable(connection, 7L, CoreTableColumnDataProviderPrimaryEntity.class, rowEntity -> coreTableColumnDataProviderPrimaryEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreHostEntity> coreHost(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreHostEntity.class, rowEntity -> coreHostEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreHostClusterEntity> coreHostCluster(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreHostClusterEntity.class, rowEntity -> coreHostClusterEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreHostClusterNodeEntity> coreHostClusterNode(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreHostClusterNodeEntity.class, rowEntity -> coreHostClusterNodeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableDataSourceEntity> coreTableDataSource(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreTableDataSourceEntity.class, rowEntity -> coreTableDataSourceEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreTableDataSourceTypeEntity> coreTableDataSourceType(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreTableDataSourceTypeEntity.class, rowEntity -> coreTableDataSourceTypeEntityLRUCache.put(rowEntity.getId(), rowEntity));
    }

    public Flux<CoreRoleEntity> coreRoleEntity(Mono<Connection> connection) {
        return createDataTable(connection, 1L, CoreRoleEntity.class, coreRoleEntity -> coreRoleEntityLRUCache.put(coreRoleEntity.getId(), coreRoleEntity));
    }

    public Flux<CoreRoleAssignElementEntity> coreRoleAssignElementEntity(Mono<Connection> connection) {
        return createDataTable(connection, 2L, CoreRoleAssignElementEntity.class, coreRoleAssignElementEntity -> coreRoleAssignResourceEntityLRUCache.put(coreRoleAssignElementEntity.getId(), coreRoleAssignElementEntity));
    }

    public Flux<CoreRoleAssignUserTenantEntity> coreRoleAssignUserTenantEntity(Mono<Connection> connection) {
        return createDataTable(connection, 3L, CoreRoleAssignUserTenantEntity.class, coreRoleAssignUserTenantEntity -> {
            coreRoleAssignUserTenantEntityLRUCache.put(coreRoleAssignUserTenantEntity.getId(), coreRoleAssignUserTenantEntity);
            Optional<List<CoreRoleAssignUserTenantEntity>> coreRoleAssignUserTenants = coreRoleAssignUserTenantEntityByCoreUserTenantIdLRUCache.get(coreRoleAssignUserTenantEntity.getCore_user_tenant_id());
            List<CoreRoleAssignUserTenantEntity> coreRoleAssignUserTenantEntities;
            if (coreRoleAssignUserTenants.isEmpty()) {
                coreRoleAssignUserTenantEntities = new ArrayList<>();
                coreRoleAssignUserTenantEntityByCoreUserTenantIdLRUCache.put(coreRoleAssignUserTenantEntity.getCore_user_tenant_id(), coreRoleAssignUserTenantEntities);
            } else {
                coreRoleAssignUserTenantEntities = coreRoleAssignUserTenants.get();
            }
            coreRoleAssignUserTenantEntities.add(coreRoleAssignUserTenantEntity);
        });
    }

    public Flux<CoreTenantEntity> coreTenantEntity(Mono<Connection> connection) {
        return createDataTable(connection, 5L, CoreTenantEntity.class, coreTenantEntity -> coreTenantEntityLRUCache.put(coreTenantEntity.getId(), coreTenantEntity));
    }

    public Flux<CoreTenantTypeEntity> coreTenantTypeEntity(Mono<Connection> connection) {
        return createDataTable(connection, 6L, CoreTenantTypeEntity.class, coreTenantTypeEntity -> coreTenantTypeEntityLRUCache.put(coreTenantTypeEntity.getId(), coreTenantTypeEntity));
    }

    public Flux<CoreUserEntity> coreUserEntity(Mono<Connection> connection) {
        return createDataTable(connection, 7L, CoreUserEntity.class, coreUserEntity -> coreUserEntityLRUCache.put(coreUserEntity.getId(), coreUserEntity));
    }

    public Flux<CoreUserTenantEntity> coreUserTenantEntity(Mono<Connection> connection) {
        return createDataTable(connection, 8L, CoreUserTenantEntity.class, coreUserTenantEntity -> coreUserTenantEntityLRUCache.put(coreUserTenantEntity.getId(), coreUserTenantEntity));
    }

    public Flux<CoreUserTenantProcessEntity> coreUserTenantProcessEntity(Mono<Connection> connection) {
        return createDataTable(connection, 9L, CoreUserTenantProcessEntity.class, coreUserTenantProcessEntity -> coreUserTenantProcessEntityLRUCache.put(coreUserTenantProcessEntity.getId(), coreUserTenantProcessEntity));
    }

    public Flux<CoreUserTenantProfileEntity> coreUserTenantProfileEntity(Mono<Connection> connection) {
        return createDataTable(connection, 10L, CoreUserTenantProfileEntity.class, coreUserTenantProfileEntity -> coreUserTenantProfileEntityLRUCache.put(coreUserTenantProfileEntity.getId(), coreUserTenantProfileEntity));
    }

    public Flux<CoreProfileEntity> coreProfileEntity(Mono<Connection> connection) {
        return createDataTable(connection, 110L, CoreProfileEntity.class, coreProfileEntity -> coreProfileEntityLRUCache.put(coreProfileEntity.getId(), coreProfileEntity));
    }
}
