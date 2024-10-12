package org.infra.reactive.form.engine.form.engine.services.core.dto;

import io.r2dbc.spi.Connection;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.cache.lru.LRUCache;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportLayoutDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.css.CoreCssDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementPropertiesDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementPropertiesValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostClusterNodeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.host.CoreHostDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDataAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.layout.CoreLayoutDataDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.menu.CoreMenuDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessParamDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.CoreProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.CoreUserTenantProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantTypeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceTypeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CommonCountryDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.view.CoreViewModuleAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.view.CoreViewModuleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter.CoreWindowTabFilterDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.filter.CoreWindowTabFilterFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardStateDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardStateValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.wizard.CoreWizardValidationDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.workflow.CoreWorkflowActionDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.workflow.CoreWorkflowActionTypeDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.workflow.CoreWorkflowDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.BaseEntityInterface;
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportLayoutEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.common.CommonCountryEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.css.CoreCssEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.dashboard.*;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementDetailEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementPropertiesEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementPropertiesValueEntity;
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
import org.infra.reactive.form.engine.form.engine.model.tables.security.tenant.CoreTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.tenant.CoreTenantTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.user.CoreUserEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.user.CoreUserTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableDataSourceEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableDataSourceTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.CoreTableEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.column.CoreTableColumnEditorEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.table.column.CoreTableColumnEntity;
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
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.nosql.AbstractNoSQLReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.InfraConnectionFactoryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.querybuilder.annotations.CoreTableDefinition;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.CoreElementTranslateQueryJoinerImpl;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.*;

public class CoreServiceDTOTable extends CoreServiceBaseEntity {

    static {
        // Find TranslateQueryJoiner With Bean Of Spring And Call Init Method
        new CoreElementTranslateQueryJoinerImpl().init();
    }

    private final Logger logger = LogManager.getLogger(CoreServiceDTOTable.class);

    public static LRUCache<Long, CoreTableColumnDataProviderSerializerDTO> coreTableColumnDataProviderSerializerDTOLRUCache = new LRUCache<>(1000);
    // Level 1 ***********************************
    public static LRUCache<Long, CoreAllElementDTO> coreAllElementDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<String, CoreAllElementDTO> coreAllElementDTOByKeyLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreAllElementDTO> coreAllElementDTOByCoreTableIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CommonCountryDTO> commonCountryDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreHostDTO> coreHostDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreHostClusterDTO> coreHostClusterDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreHostClusterNodeDTO> coreHostClusterNodeDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableDataSourceDTO> coreTableDataSourceDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<String, CoreTableDataSourceDTO> coreTableDataSourceDTOByRegisterKeyLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderDTO> coreTableColumnDataProviderDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreProfileDTO> coreProfileDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreTableColumnDataProviderPrimaryDTO> coreTableColumnDataProviderPrimaryDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnEditorDTO> coreTableColumnEditorDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTenantTypeDTO> coreTenantTypeDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreUserDTO> coreUserDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreButtonDTO> coreButtonDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreCssDTO> coreCssDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutDTO> coreLayoutDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreLayoutDataDTO> coreLayoutDataDTOLRUCache = new LRUCache<>(1000);
    // ***********************************

    // Level 2 ***********************************
    public static LRUCache<Long, CoreTableColumnDTO> coreTableColumnDTOLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreMenuDTO> coreMenuDTOLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreAnalyticReportDTO> coreAnalyticReportDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreAnalyticReportLayoutDTO>> coreAnalyticReportLayoutDTOByAnalyticIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardDTO> coreDashboardDTOsRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreDashboardViewDTO> coreDashboardViewDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardGadgetDTO> coreDashboardGadgetDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreDashboardItemDTO> coreDashboardItemDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreDashboardItemDTO>> coreDashboardItemDTOsByDashboardIdRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreDashboardViewDTO>> coreDashboardViewDTOsByDashboardIdDTORUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreDashboardGadgetDTO>> coreDashboardGadgetDTOsByDashboardItemIdDTORUCache = new LRUCache<>(10000);
    public static LRUCache<Long, List<CoreDashboardGadgetViewDTO>> coreDashboardGadgetViewDTOsByDashboardItemIdDTORUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreTranslateLanguageDTO> coreTranslateLanguageDTOLRUCache = new LRUCache<>(1000);
    // core_user_tenant_id => core_all_element_id => record_id => CoreUserTenantProfileDTO
    public static LRUCache<Long, Map<Long, Map<Long, CoreUserTenantProfileDTO>>> coreUserTenantProfileDTOsLRUCache = new LRUCache<>(10000);
    public static LRUCache<Long, CoreTenantDTO> coreTenantDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, Map<Long, Map<Long, CoreLayoutAssignElementDTO>>> coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, Map<Long, CoreLayoutDataAssignElementDTO>>> coreLayoutDataAssignElementDTOByElementIdAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreProcessParamDTO> coreProcessParamDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreProcessDTO> coreProcessDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreViewModuleDTO> coreViewModuleDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, Map<Long, CoreViewModuleAssignElementDTO>>> coreViewModelAssignElementDTOByCoreAllElementAndRecordIdLRUCache = new LRUCache<>(1000);
    // ***********************************

    public static LRUCache<Long, CoreAllElementPropertiesDTO> coreAllElementPropertiesDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, List<CoreAllElementPropertiesDTO>>> coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, Map<String, CoreAllElementPropertiesDTO>>> coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdMapLRUCache = new LRUCache<>(1000);
    public static LRUCache<String, CoreAllElementPropertiesDTO> coreAllElementPropertiesDTOByRegisterKeyLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, List<CoreAllElementPropertiesValueDTO>>> coreAllElementPropertiesValueByCoreAllElementIdAndRecordIdDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<String, Map<Long, Map<Long, List<CoreAllElementPropertiesValueDTO>>>> coreAllElementPropertiesValueByRegisterKeyAndCoreAllElementIdAndRecordIdDTOLRUCache = new LRUCache<>(1000);

    // Level 3 ***********************************
    public static LRUCache<Long, CoreUserTenantDTO> coreUserTenantDTOLRUCache = new LRUCache<>(100);
    public static LRUCache<Long, CoreTableDTO> coreTableDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<String, CoreTableDTO>> coreTableDTOByDataSourceIdAndTableNameLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabTypeDTO> coreWindowTabTypeDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreWindowTabJoinColumnDTO>> coreWindowTabJoinColumnDTOPerChildTabIdLRUCache = new LRUCache<>(1000);
    // ***********************************

    // Level 4 ***********************************
    public static LRUCache<Long, CoreTableColumnDataProviderTableDTO> coreTableColumnDataProviderTableDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderListDTO> coreTableColumnDataProviderListDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreTableColumnDataProviderAttachmentDTO> coreTableColumnDataProviderAttachmentDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreTableColumnDataProviderAttachmentAssignElementDTO>> coreTableColumnDataProviderAttachmentAssignElementDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreTableColumnDataProviderListValuesDTO>> coreTableColumnDataProviderListValuesDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowDTO> coreWindowDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabDTO> coreWindowTabDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreWindowTabDTO>> coreWindowTabDTOByCoreTableIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFieldDTO> coreWindowTabFieldDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabPluggableDTO> coreWindowTabPluggableDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabPluggableAssignTabDTO> coreWindowTabPluggableAssignTabDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreWindowTabPluggableAssignTabDTO>> coreWindowTabPluggableAssignTabDTOsLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFilterFieldDTO> coreWindowTabFilterFieldDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWindowTabFilterDTO> coreWindowTabFilterDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreWindowTabFilterDTO>> coreWindowTabFilterDTOPerTabIdLRUCache = new LRUCache<>(1000);
    // ***********************************

    public static LRUCache<Long, CoreFilterLayoutDTO> coreFilterLayoutDTOLRUCache = new LRUCache<>(1000); //TODO in Next Time Please Online With Query
    public static LRUCache<Long, Map<Long, List<CoreFilterLayoutDTO>>> coreFilterLayoutByAllElementIdAndRecordIdDTOLRUCache = new LRUCache<>(1000); //TODO in Next Time Please Online With Query
    public static LRUCache<Long, CoreFilterProviderDTO> coreFilterProviderDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreFilterProviderDTO>> coreFilterProviderDTOByCoreAllElementIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterOperationDTO> coreFilterOperationDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterDTO> coreFilterDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterOperationParamDTO> coreFilterOperationParamDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreFilterAssignElementDTO> coreFilterAssignElementDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, List<CoreFilterAssignElementDTO>>> coreFilterAssignElementDTOByCoreAllElementIdAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, List<CoreFilterAssignDataProviderDTO>> coreFilterAssignDataProviderDTOByCoreTableColumnDataProviderIdLRUCache = new LRUCache<>(1000);

    // *******************************************
    public static LRUCache<Long, Map<Long, Map<Long, CoreWizardDTO>>> coreWizardDTOByElementIdAndRecordIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreWizardStateDTO>> coreWizardStateDTOByCoreWizardIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWizardValidationDTO> coreWizardValidationDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreWizardValidationDTO>> coreWizardValidationDTOByCoreWizardStateIdLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, Map<Long, CoreWizardStateValueDTO>> coreWizardStateValueDTOByCoreWizardStateIdLRUCache = new LRUCache<>(1000);
    // *******************************************
    public static LRUCache<Long, CoreWorkflowDTO> coreWorkflowDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWorkflowActionDTO> coreWorkflowActionDTOLRUCache = new LRUCache<>(1000);
    public static LRUCache<Long, CoreWorkflowActionTypeDTO> coreWorkflowActionTypeDTOLRUCache = new LRUCache<>(1000);
    // *******************************************

    private final CoreServiceEntityTable coreServiceEntityTable;

    public CoreServiceDTOTable(CoreServiceEntityTable coreServiceEntityTable) {
        this.coreServiceEntityTable = coreServiceEntityTable;
    }

    @Override
    public Flux<? extends Serializable> cacheReset(Mono<Connection> connection) {
        coreTableColumnDataProviderSerializerDTOLRUCache.clear();

        coreAllElementDTOLRUCache.clear();
        coreAllElementDTOByKeyLRUCache.clear();
        coreAllElementDTOByCoreTableIdLRUCache.clear();
        commonCountryDTOLRUCache.clear();
        coreHostDTOLRUCache.clear();
        coreHostClusterDTOLRUCache.clear();
        coreHostClusterNodeDTOLRUCache.clear();
        coreTableDataSourceDTOLRUCache.clear();
        coreTableColumnDataProviderDTOLRUCache.clear();
        coreProfileDTOLRUCache.clear();
        coreTableColumnDataProviderPrimaryDTOLRUCache.clear();
        coreTableColumnEditorDTOLRUCache.clear();
        coreTenantTypeDTOLRUCache.clear();
        coreUserDTOLRUCache.clear();
        coreButtonDTOLRUCache.clear();
        coreCssDTOLRUCache.clear();

        coreTableColumnDTOLRUCache.clear();
        coreAnalyticReportDTOLRUCache.clear();
        coreAnalyticReportLayoutDTOByAnalyticIdLRUCache.clear();
        coreMenuDTOLRUCache.clear();
        // Dashboard
        coreDashboardDTOsRUCache.clear();
        coreDashboardItemDTOLRUCache.clear();
        coreDashboardItemDTOsByDashboardIdRUCache.clear();
        coreDashboardViewDTOsByDashboardIdDTORUCache.clear();
        coreDashboardViewDTOLRUCache.clear();
        coreDashboardGadgetDTOsByDashboardItemIdDTORUCache.clear();
        coreDashboardGadgetViewDTOsByDashboardItemIdDTORUCache.clear();
        // Dashboard
        coreTranslateLanguageDTOLRUCache.clear();
        coreUserTenantProfileDTOsLRUCache.clear();
        coreTenantDTOLRUCache.clear();

        coreTableDTOLRUCache.clear();
        coreTableDTOByDataSourceIdAndTableNameLRUCache.clear();
        coreWindowTabTypeDTOLRUCache.clear();
        coreWindowTabJoinColumnDTOPerChildTabIdLRUCache.clear();

        coreTableColumnDataProviderTableDTOLRUCache.clear();
        coreTableColumnDataProviderListDTOLRUCache.clear();
        coreTableColumnDataProviderAttachmentDTOLRUCache.clear();
        coreTableColumnDataProviderListValuesDTOLRUCache.clear();
        coreWindowDTOLRUCache.clear();
        coreWindowTabFilterFieldDTOLRUCache.clear();
        coreWindowTabFilterDTOLRUCache.clear();
        coreWindowTabFilterDTOPerTabIdLRUCache.clear();
        coreWindowTabDTOLRUCache.clear();
        coreWindowTabDTOByCoreTableIdLRUCache.clear();
        coreWindowTabFieldDTOLRUCache.clear();
        coreWindowTabPluggableDTOLRUCache.clear();
        coreWindowTabPluggableAssignTabDTOLRUCache.clear();
        coreWindowTabPluggableAssignTabDTOsLRUCache.clear();

        coreUserTenantDTOLRUCache.clear();

        coreFilterProviderDTOLRUCache.clear();
        coreFilterProviderDTOByCoreAllElementIdLRUCache.clear();
        coreFilterLayoutDTOLRUCache.clear();
        coreFilterLayoutByAllElementIdAndRecordIdDTOLRUCache.clear();
        coreFilterOperationDTOLRUCache.clear();
        coreFilterDTOLRUCache.clear();
        coreFilterOperationParamDTOLRUCache.clear();
        coreFilterAssignElementDTOLRUCache.clear();
        coreFilterAssignElementDTOByCoreAllElementIdAndRecordIdLRUCache.clear();
        coreFilterAssignDataProviderDTOByCoreTableColumnDataProviderIdLRUCache.clear();

        coreLayoutDTOLRUCache.clear();
        coreLayoutDataDTOLRUCache.clear();
        coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache.clear();
        coreLayoutDataAssignElementDTOByElementIdAndRecordIdLRUCache.clear();
        coreProcessDTOLRUCache.clear();
        coreProcessParamDTOLRUCache.clear();

        coreViewModuleDTOLRUCache.clear();
        coreViewModelAssignElementDTOByCoreAllElementAndRecordIdLRUCache.clear();

        coreAllElementPropertiesDTOLRUCache.clear();
        coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdLRUCache.clear();
        coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdMapLRUCache.clear();
        coreAllElementPropertiesDTOByRegisterKeyLRUCache.clear();
        coreAllElementPropertiesValueByCoreAllElementIdAndRecordIdDTOLRUCache.clear();
        coreAllElementPropertiesValueByRegisterKeyAndCoreAllElementIdAndRecordIdDTOLRUCache.clear();

        coreWizardDTOByElementIdAndRecordIdLRUCache.clear();
        coreWizardStateDTOByCoreWizardIdLRUCache.clear();
        coreWizardValidationDTOLRUCache.clear();
        coreWizardValidationDTOByCoreWizardStateIdLRUCache.clear();
        coreWizardStateValueDTOByCoreWizardStateIdLRUCache.clear();

        coreWorkflowDTOLRUCache.clear();
        coreWorkflowActionDTOLRUCache.clear();
        coreWorkflowActionTypeDTOLRUCache.clear();
        return super.cacheReset(connection);
    }

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return Flux.merge(coreServiceEntityTable.cacheAll(connection).collectList())
                .map(serializers -> Flux.merge(
                        coreTableColumnDataProviderSerializer(), //OK
                        coreAllElementDTO(), //OK
                        commonCountryDTO(), //OK
                        coreTableDataSourceDTO(), // OK
                        coreTableColumnDataProviderDTO(), //OK
                        coreProfileDTO(), //OK
                        coreTableColumnDataProviderPrimaryDTO(), //OK
                        coreTableColumnEditorDTO(), //OK
                        coreTenantTypeDTO(), //OK
                        coreUserDTO(), //OK
                        coreButtonDTO(), //OK
                        coreCssDTO(),//OK
                        coreLayoutDTO(),//OK
                        coreLayoutDataDTO(), //OK
                        coreWorkFlowDTO()
                ))
                .map(serializable -> Flux.merge(
                        coreTableColumnDTO(), //OK  => CoreTableColumnEditorDTO and CoreTableColumnDataProviderDTO
                        coreTableDTO(), //OK  => CoreTableColumnDTO
                        coreWizardDTOLRUCache(), //OK => CoreAllElementDTO
                        coreFilterDTOLRUCache(), //OK => CoreAllElementDTO
                        coreMenuDTO(), //OK Depend => CoreAllElementDTO
                        coreAnalyticReport(), //OK Depend => CoreAllElementDTO
                        coreDashboardDTOs(), //OK Depend => CoreAllElementDTO
                        coreTranslateLanguageDTO(), //OK  => CommonCountryDTO
                        coreTenantDTO(), //OK Depend => CoreTenantTypeDTO
                        coreUserTenantDTO(), //OK  => CoreUserDTO and CoreTenantDTO
                        coreLayoutDataAssignElementEntityByElementAndRecordIdLRUCache(), //OK => CoreAllElementDTO
                        coreLayoutAssignElementEntityByElementAndRecordIdLRUCache(),//OK => CoreAllElementDTO
                        coreProcessDTOLRUCache(),
                        coreViewModuleDTOLRUCache()
                ))
                .flatMap(serializable -> Flux.merge(
                        coreAnalyticReportLayout(), //OK  => CoreAnalyticReport and CoreUserTenant
                        coreUserTenantProfileDTO(), //OK  => CoreProfileDTO and CoreAllElementDTO and CoreUserTenantDTO
                        coreTableColumnDataProviderTableDTO(), //OK   => CoreTableDTO
                        coreTableColumnDataProviderListDTOLRUCache(),
                        coreTableColumnDataProviderAttachmentDTOLRUCache(),
                        coreWindowTabDTO(), // OK  => CoreTableDTO
                        coreWindowTabPluggableAssignTabDTO(),
                        coreAllElementPropertiesDTO() //OK
                ))
                .doFinally(doFinallyCache())
                .doOnError(doException());
    }

    public Mono<Serializable> coreWorkFlowDTO() {
        for (Long l : CoreServiceEntityTable.coreWorkflowEntityLRUCache.getKeySet()) {
            Optional<CoreWorkflowEntity> coreWorkflowEntityOptional = CoreServiceEntityTable.coreWorkflowEntityLRUCache.get(l);
            if (coreWorkflowEntityOptional.isPresent()) {
                CoreWorkflowEntity coreWorkflowEntity = coreWorkflowEntityOptional.get();
                CoreWorkflowDTO coreWorkflowDTO = ConvertUtil.convert(coreWorkflowEntity);
                coreWorkflowDTOLRUCache.put(coreWorkflowDTO.getId(), coreWorkflowDTO);
            }
        }

        for (Long l : CoreServiceEntityTable.coreWorkflowActionTypeEntityLRUCache.getKeySet()) {
            Optional<CoreWorkflowActionTypeEntity> coreWorkflowActionTypeEntityOptional = CoreServiceEntityTable.coreWorkflowActionTypeEntityLRUCache.get(l);
            if (coreWorkflowActionTypeEntityOptional.isPresent()) {
                CoreWorkflowActionTypeEntity coreWorkflowActionTypeEntity = coreWorkflowActionTypeEntityOptional.get();
                CoreWorkflowActionTypeDTO coreWorkflowActionTypeDTO = ConvertUtil.convert(coreWorkflowActionTypeEntity);
                coreWorkflowActionTypeDTOLRUCache.put(coreWorkflowActionTypeDTO.getId(), coreWorkflowActionTypeDTO);
            }
        }

        for (Long l : CoreServiceEntityTable.coreWorkflowActionEntityLRUCache.getKeySet()) {
            Optional<CoreWorkflowActionEntity> coreWorkflowActionEntityOptional = CoreServiceEntityTable.coreWorkflowActionEntityLRUCache.get(l);
            if (coreWorkflowActionEntityOptional.isPresent()) {
                CoreWorkflowActionEntity coreWorkflowActionEntity = coreWorkflowActionEntityOptional.get();
                CoreWorkflowActionDTO coreWorkflowActionDTO = ConvertUtil.convert(coreWorkflowActionEntity);
                coreWorkflowActionTypeDTOLRUCache.get(coreWorkflowActionEntity.getCore_workflow_action_type_id()).ifPresent(coreWorkflowActionDTO::setCoreWorkflowActionTypeDTO);

                coreWorkflowActionDTOLRUCache.put(coreWorkflowActionDTO.getId(), coreWorkflowActionDTO);
            }
        }

        return Mono.just(complete);
    }

    public Mono<Serializable> coreWindowTabPluggableAssignTabDTO() {
        for (Long id : CoreServiceEntityTable.coreWindowTabPluggableEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabPluggableEntity> coreWindowTabPluggableEntityOptional = CoreServiceEntityTable.coreWindowTabPluggableEntityLRUCache.get(id);
            if (coreWindowTabPluggableEntityOptional.isPresent()) {
                CoreWindowTabPluggableEntity coreWindowTabPluggableEntity = coreWindowTabPluggableEntityOptional.get();

                CoreWindowTabPluggableDTO coreWindowTabPluggableDTO = ConvertUtil.convert(coreWindowTabPluggableEntity);
                coreViewModuleDTOLRUCache.get(coreWindowTabPluggableEntity.getCore_view_module_id()).ifPresent(coreWindowTabPluggableDTO::setCoreViewModuleDTO);

                coreWindowTabPluggableDTOLRUCache.put(coreWindowTabPluggableDTO.getId(), coreWindowTabPluggableDTO);
            }
        }

        for (Long id : CoreServiceEntityTable.coreWindowTabPluggableAssignTabEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabPluggableAssignTabEntity> coreWindowTabPluggableAssignTabEntityOptional = CoreServiceEntityTable.coreWindowTabPluggableAssignTabEntityLRUCache.get(id);
            if (coreWindowTabPluggableAssignTabEntityOptional.isPresent()) {
                CoreWindowTabPluggableAssignTabEntity coreWindowTabPluggableAssignTabEntity = coreWindowTabPluggableAssignTabEntityOptional.get();

                CoreWindowTabPluggableAssignTabDTO coreWindowTabPluggableAssignTabDTO = ConvertUtil.convert(coreWindowTabPluggableAssignTabEntity);
                coreWindowTabPluggableDTOLRUCache.get(coreWindowTabPluggableAssignTabEntity.getCore_window_tab_pluggable_id()).ifPresent(coreWindowTabPluggableAssignTabDTO::setCoreWindowTabPluggableDTO);

                coreWindowTabPluggableAssignTabDTOLRUCache.put(coreWindowTabPluggableAssignTabDTO.getId(), coreWindowTabPluggableAssignTabDTO);

                List<CoreWindowTabPluggableAssignTabDTO> listPluggable = coreWindowTabPluggableAssignTabDTOsLRUCache.get(coreWindowTabPluggableAssignTabEntity.getCore_window_tab_id()).orElseGet(() -> {
                    List<CoreWindowTabPluggableAssignTabDTO> coreWindowTabPluggableAssignTabDTOS = new ArrayList<>();
                    coreWindowTabPluggableAssignTabDTOsLRUCache.put(coreWindowTabPluggableAssignTabEntity.getCore_window_tab_id(), coreWindowTabPluggableAssignTabDTOS);
                    return coreWindowTabPluggableAssignTabDTOS;
                });
                listPluggable.add(coreWindowTabPluggableAssignTabDTO);
            }
        }

        return Mono.just(complete);
    }

    public Mono<Serializable> coreViewModuleDTOLRUCache() {
        for (Long coreViewModuleId : CoreServiceEntityTable.coreViewModuleEntityLRUCache.getKeySet()) {
            Optional<CoreViewModuleEntity> coreViewModuleEntityOptional = CoreServiceEntityTable.coreViewModuleEntityLRUCache.get(coreViewModuleId);
            coreViewModuleEntityOptional.ifPresent(coreViewModuleEntity -> {
                CoreViewModuleDTO coreViewModuleDTO = ConvertUtil.convert(coreViewModuleEntity);
                coreViewModuleDTOLRUCache.put(coreViewModuleEntity.getId(), coreViewModuleDTO);
            });
        }
        for (Long coreViewModuleAssignElementId : CoreServiceEntityTable.coreViewModuleAssignElementEntityLRUCache.getKeySet()) {
            Optional<CoreViewModuleAssignElementEntity> coreViewModuleAssignElementEntityOptional = CoreServiceEntityTable.coreViewModuleAssignElementEntityLRUCache.get(coreViewModuleAssignElementId);
            coreViewModuleAssignElementEntityOptional.ifPresent(coreViewModuleAssignElementEntity -> {
                CoreViewModuleAssignElementDTO coreViewModuleAssignElementDTO = ConvertUtil.convert(coreViewModuleAssignElementEntity);
                coreAllElementDTOLRUCache.get(coreViewModuleAssignElementEntity.getCore_all_element_id()).ifPresent(coreViewModuleAssignElementDTO::setCoreAllElementDTO);
                coreViewModuleDTOLRUCache.get(coreViewModuleAssignElementEntity.getCore_view_module_id()).ifPresent(coreViewModuleAssignElementDTO::setCoreViewModuleDTO);

                Map<Long, Map<Long, CoreViewModuleAssignElementDTO>> coreViewModuleAssignElementDTOMap = coreViewModelAssignElementDTOByCoreAllElementAndRecordIdLRUCache.get(coreViewModuleAssignElementDTO.getCoreAllElementDTO().getId()).orElseGet(() -> {
                    Map<Long, Map<Long, CoreViewModuleAssignElementDTO>> longMapMap = new HashMap<>();
                    coreViewModelAssignElementDTOByCoreAllElementAndRecordIdLRUCache.put(coreViewModuleAssignElementEntity.getId(), longMapMap);
                    return longMapMap;
                });
                Map<Long, CoreViewModuleAssignElementDTO> longCoreViewModuleAssignElementDTOMap = coreViewModuleAssignElementDTOMap.computeIfAbsent(coreViewModuleAssignElementDTO.getRecordId(), k -> new HashMap<>());
                longCoreViewModuleAssignElementDTOMap.put(coreViewModuleAssignElementDTO.getId(), coreViewModuleAssignElementDTO);
            });
        }
        return Mono.just(complete);
    }

    public Mono<Serializable> coreWizardDTOLRUCache() {
        for (Long coreWizardValidationEntityId : CoreServiceEntityTable.coreWizardValidationEntityLRUCache.getKeySet()) {
            Optional<CoreWizardValidationEntity> coreWizardValidationEntityOptional = CoreServiceEntityTable.coreWizardValidationEntityLRUCache.get(coreWizardValidationEntityId);
            coreWizardValidationEntityOptional.ifPresent(coreWizardValidationEntity -> {
                CoreWizardValidationDTO coreWizardValidationDTO = ConvertUtil.convert(coreWizardValidationEntity);
                coreAllElementDTOLRUCache.get(coreWizardValidationEntity.getCore_all_element_id()).ifPresent(coreWizardValidationDTO::setCoreAllElementDTO);

                coreWizardValidationDTOLRUCache.put(coreWizardValidationEntity.getId(), coreWizardValidationDTO);
            });
        }

        for (Long coreWizardStateValueEntityId : CoreServiceEntityTable.coreWizardStateValueEntityLRUCache.getKeySet()) {
            Optional<CoreWizardStateValueEntity> coreWizardStateValueEntityOptional = CoreServiceEntityTable.coreWizardStateValueEntityLRUCache.get(coreWizardStateValueEntityId);
            coreWizardStateValueEntityOptional.ifPresent(coreWizardStateValueEntity -> {
                CoreWizardStateValueDTO coreWizardStateValueDTO = ConvertUtil.convert(coreWizardStateValueEntity);

                Map<Long, CoreWizardStateValueDTO> longCoreWizardStateValueDTOMap = coreWizardStateValueDTOByCoreWizardStateIdLRUCache.get(coreWizardStateValueEntity.getCore_wizard_state_id()).orElseGet(() -> {
                    Map<Long, CoreWizardStateValueDTO> coreWizardStateValueDTOMap = new HashMap<>();
                    coreWizardStateValueDTOByCoreWizardStateIdLRUCache.put(coreWizardStateValueEntity.getCore_wizard_state_id(), coreWizardStateValueDTOMap);
                    return coreWizardStateValueDTOMap;
                });
                longCoreWizardStateValueDTOMap.put(coreWizardStateValueDTO.getId(), coreWizardStateValueDTO);
            });
        }
        for (Long coreWizardStateValidationEntityId : CoreServiceEntityTable.coreWizardStateValidationEntityLRUCache.getKeySet()) {
            Optional<CoreWizardStateValidationEntity> coreWizardStateValidationEntityOptional = CoreServiceEntityTable.coreWizardStateValidationEntityLRUCache.get(coreWizardStateValidationEntityId);
            coreWizardStateValidationEntityOptional.ifPresent(coreWizardStateValidationEntity -> {
                coreWizardValidationDTOLRUCache.get(coreWizardStateValidationEntity.getCore_wizard_validation_id()).ifPresent(coreWizardValidationDTO -> {
                    coreWizardValidationDTO.setActive(coreWizardStateValidationEntity.getActive());
                    Map<Long, CoreWizardValidationDTO> longCoreWizardValidationDTOMap = coreWizardValidationDTOByCoreWizardStateIdLRUCache.get(coreWizardStateValidationEntity.getCore_wizard_state_id()).orElseGet(() -> {
                        Map<Long, CoreWizardValidationDTO> coreWizardValidationDTOMap = new HashMap<>();
                        coreWizardValidationDTOByCoreWizardStateIdLRUCache.put(coreWizardStateValidationEntity.getCore_wizard_state_id(), coreWizardValidationDTOMap);
                        return coreWizardValidationDTOMap;
                    });
                    longCoreWizardValidationDTOMap.put(coreWizardValidationDTO.getId(), coreWizardValidationDTO);
                });
            });
        }

        for (Long coreWizardStateEntityId : CoreServiceEntityTable.coreWizardStateEntityLRUCache.getKeySet()) {
            Optional<CoreWizardStateEntity> coreWizardStateEntityOptional = CoreServiceEntityTable.coreWizardStateEntityLRUCache.get(coreWizardStateEntityId);
            coreWizardStateEntityOptional.ifPresent(coreWizardStateEntity -> {
                CoreWizardStateDTO coreWizardStateDTO = ConvertUtil.convert(coreWizardStateEntity);
                coreAllElementDTOLRUCache.get(coreWizardStateEntity.getCore_all_element_id()).ifPresent(coreWizardStateDTO::setCoreAllElementDTO);
                coreWizardStateValueDTOByCoreWizardStateIdLRUCache.get(coreWizardStateEntity.getId()).ifPresent(coreWizardStateDTO::setCoreWizardStateValueDTOMap);
                coreWizardValidationDTOByCoreWizardStateIdLRUCache.get(coreWizardStateEntity.getId()).ifPresent(coreWizardStateDTO::setCoreWizardValidationDTOMap);

                Map<Long, CoreWizardStateDTO> longCoreWizardStateDTOMap = coreWizardStateDTOByCoreWizardIdLRUCache.get(coreWizardStateDTO.getCoreWizardId()).orElseGet(() -> {
                    Map<Long, CoreWizardStateDTO> coreWizardStateDTOMap = new HashMap<>();
                    coreWizardStateDTOByCoreWizardIdLRUCache.put(coreWizardStateDTO.getCoreWizardId(), coreWizardStateDTOMap);
                    return coreWizardStateDTOMap;
                });
                longCoreWizardStateDTOMap.put(coreWizardStateDTO.getId(), coreWizardStateDTO);
            });
        }

        for (Long coreWizardEntityId : CoreServiceEntityTable.coreWizardEntityLRUCache.getKeySet()) {
            Optional<CoreWizardEntity> coreWizardEntityOptional = CoreServiceEntityTable.coreWizardEntityLRUCache.get(coreWizardEntityId);
            coreWizardEntityOptional.ifPresent(coreWizardEntity -> {
                CoreWizardDTO coreWizardDTO = ConvertUtil.convert(coreWizardEntity);
                coreAllElementDTOLRUCache.get(coreWizardEntity.getCore_all_element_id()).ifPresent(coreWizardDTO::setCoreAllElementDTO);
                coreWizardStateDTOByCoreWizardIdLRUCache.get(coreWizardEntity.getId()).ifPresent(coreWizardDTO::setCoreWizardStateDTOMap);

                Map<Long, Map<Long, CoreWizardDTO>> coreWizardElementIdAndRecordId = coreWizardDTOByElementIdAndRecordIdLRUCache.get(coreWizardEntity.getCore_all_element_id()).orElseGet(() -> {
                    Map<Long, Map<Long, CoreWizardDTO>> longMapMap = new HashMap<>();
                    coreWizardDTOByElementIdAndRecordIdLRUCache.put(coreWizardEntity.getCore_all_element_id(), longMapMap);
                    return longMapMap;
                });
                Map<Long, CoreWizardDTO> coreWizardByRecordId = coreWizardElementIdAndRecordId.computeIfAbsent(coreWizardEntity.getRecord_id(), aLong -> new HashMap<>());

                coreWizardByRecordId.put(coreWizardEntity.getId(), coreWizardDTO);
            });
        }
        return Mono.just(complete);
    }

    public Mono<Serializable> coreLayoutDataAssignElementEntityByElementAndRecordIdLRUCache() {
        for (Long coreLayoutDataAssignElementEntityId : CoreServiceEntityTable.coreLayoutDataAssignElementEntityLRUCache.getKeySet()) {
            Optional<CoreLayoutDataAssignElementEntity> coreLayoutDataAssignElementEntityOptional = CoreServiceEntityTable.coreLayoutDataAssignElementEntityLRUCache.get(coreLayoutDataAssignElementEntityId);
            coreLayoutDataAssignElementEntityOptional.ifPresent(coreLayoutDataAssignElementEntity -> {
                Map<Long, Map<Long, CoreLayoutDataAssignElementDTO>> coreLayoutDataAssignElementDTOByElementIdAndRecordId = coreLayoutDataAssignElementDTOByElementIdAndRecordIdLRUCache.get(coreLayoutDataAssignElementEntity.getCore_all_element_id()).orElseGet(() -> {
                    Map<Long, Map<Long, CoreLayoutDataAssignElementDTO>> longMapMap = new HashMap<>();
                    coreLayoutDataAssignElementDTOByElementIdAndRecordIdLRUCache.put(coreLayoutDataAssignElementEntity.getCore_all_element_id(), longMapMap);
                    return longMapMap;
                });
                Map<Long, CoreLayoutDataAssignElementDTO> coreLayoutDataAssignElementByElementAndRecordId = coreLayoutDataAssignElementDTOByElementIdAndRecordId.computeIfAbsent(coreLayoutDataAssignElementEntity.getRecord_id(), k -> new HashMap<>());

                CoreLayoutDataAssignElementDTO coreLayoutDataAssignElementDTO = ConvertUtil.convert(coreLayoutDataAssignElementEntity);
                coreAllElementDTOLRUCache.get(coreLayoutDataAssignElementEntity.getCore_all_element_id()).ifPresent(coreLayoutDataAssignElementDTO::setCoreAllElementDTO);
                coreLayoutDTOLRUCache.get(coreLayoutDataAssignElementEntity.getCore_layout_id()).ifPresent(coreLayoutDataAssignElementDTO::setCoreLayoutDTO);
                coreLayoutDataDTOLRUCache.get(coreLayoutDataAssignElementEntity.getCore_layout_data_id()).ifPresent(coreLayoutDataAssignElementDTO::setCoreLayoutDataDTO);

                coreLayoutDataAssignElementByElementAndRecordId.put(coreLayoutDataAssignElementEntity.getId(), coreLayoutDataAssignElementDTO);
            });
        }
        return Mono.just(complete);
    }

    public Mono<Serializable> coreProcessDTOLRUCache() {
        for (Long coreProcessEntityId : CoreServiceEntityTable.coreProcessEntityLRUCache.getKeySet()) {
            Optional<CoreProcessEntity> coreProcessEntityOptional = CoreServiceEntityTable.coreProcessEntityLRUCache.get(coreProcessEntityId);
            coreProcessEntityOptional.ifPresent(coreProcessEntity -> {
                CoreProcessDTO coreProcessDTO = ConvertUtil.convert(coreProcessEntity);
                coreProcessDTOLRUCache.put(coreProcessEntity.getId(), coreProcessDTO);
            });
        }

        for (Long coreProcessParamEntityId : CoreServiceEntityTable.coreProcessParamEntityLRUCache.getKeySet()) {
            Optional<CoreProcessParamEntity> coreProcessParamEntityOptional = CoreServiceEntityTable.coreProcessParamEntityLRUCache.get(coreProcessParamEntityId);
            coreProcessParamEntityOptional.ifPresent(coreProcessParamEntity -> {
                Optional<CoreTableColumnEditorDTO> coreTableColumnEditorDTOOptional = coreTableColumnEditorDTOLRUCache.get(coreProcessParamEntity.getCore_table_column_editor_id());
                Optional<CoreTableColumnDataProviderDTO> coreTableColumnDataProviderDTOOptional = coreTableColumnDataProviderDTOLRUCache.get(coreProcessParamEntity.getCore_table_column_dataprovider_id());

                CoreProcessParamDTO coreProcessParamDTO = ConvertUtil.convert(coreProcessParamEntity);
                coreTableColumnEditorDTOOptional.ifPresent(coreProcessParamDTO::setCoreTableColumnEditorDTO);
                coreTableColumnDataProviderDTOOptional.ifPresent(coreProcessParamDTO::setCoreTableColumnDataProviderDTO);

                coreProcessParamDTOLRUCache.put(coreProcessParamEntity.getId(), coreProcessParamDTO);

                Optional<CoreProcessDTO> coreProcessDTOOptional = coreProcessDTOLRUCache.get(coreProcessParamEntity.getCore_process_id());
                coreProcessDTOOptional.ifPresent(coreProcessDTO -> {
                    coreProcessDTO.getCoreProcessParamDTOMap().put(coreProcessParamDTO.getId(), coreProcessParamDTO);
                });
            });
        }

        return Mono.just(complete);
    }

    public Mono<Serializable> coreLayoutAssignElementEntityByElementAndRecordIdLRUCache() {
        for (Long coreLayoutAssignElementEntityId : CoreServiceEntityTable.coreLayoutAssignElementEntityLRUCache.getKeySet()) {
            Optional<CoreLayoutAssignElementEntity> coreLayoutAssignElementEntityOptional = CoreServiceEntityTable.coreLayoutAssignElementEntityLRUCache.get(coreLayoutAssignElementEntityId);
            coreLayoutAssignElementEntityOptional.ifPresent(coreLayoutAssignElementEntity -> {
                Map<Long, Map<Long, CoreLayoutAssignElementDTO>> coreLayoutAssignElementDTOByElementIdAndRecordId = coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache.get(coreLayoutAssignElementEntity.getCore_all_element_id()).orElseGet(() -> {
                    Map<Long, Map<Long, CoreLayoutAssignElementDTO>> longMapMap = new HashMap<>();
                    coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache.put(coreLayoutAssignElementEntity.getCore_all_element_id(), longMapMap);
                    return longMapMap;
                });
                Map<Long, CoreLayoutAssignElementDTO> coreLayoutAssignElementByElementAndRecordId = coreLayoutAssignElementDTOByElementIdAndRecordId.computeIfAbsent(coreLayoutAssignElementEntity.getRecord_id(), k -> new HashMap<>());

                CoreLayoutAssignElementDTO coreLayoutAssignElementDTO = ConvertUtil.convert(coreLayoutAssignElementEntity);
                coreAllElementDTOLRUCache.get(coreLayoutAssignElementEntity.getCore_all_element_id()).ifPresent(coreLayoutAssignElementDTO::setCoreAllElementDTO);
                coreLayoutDTOLRUCache.get(coreLayoutAssignElementEntity.getCore_layout_id()).ifPresent(coreLayoutAssignElementDTO::setCoreLayoutDTO);

                coreLayoutAssignElementByElementAndRecordId.put(coreLayoutAssignElementEntity.getId(), coreLayoutAssignElementDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreLayoutDTO() {
        for (Long coreLayoutEntityId : CoreServiceEntityTable.coreLayoutEntityLRUCache.getKeySet()) {
            Optional<CoreLayoutEntity> coreLayoutEntityOptional = CoreServiceEntityTable.coreLayoutEntityLRUCache.get(coreLayoutEntityId);
            coreLayoutEntityOptional.ifPresent(coreLayoutEntity -> {
                coreLayoutDTOLRUCache.put(coreLayoutEntity.getId(), ConvertUtil.convert(coreLayoutEntity));
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreLayoutDataDTO() {
        for (Long coreLayoutDataEntityId : CoreServiceEntityTable.coreLayoutDataEntityLRUCache.getKeySet()) {
            Optional<CoreLayoutDataEntity> coreLayoutDataEntityOptional = CoreServiceEntityTable.coreLayoutDataEntityLRUCache.get(coreLayoutDataEntityId);
            coreLayoutDataEntityOptional.ifPresent(coreLayoutDataEntity -> {
                coreLayoutDataDTOLRUCache.put(coreLayoutDataEntity.getId(), ConvertUtil.convert(coreLayoutDataEntity));
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreFilterDTOLRUCache() {
        for (Long coreFilterProviderId : CoreServiceEntityTable.coreFilterProviderEntityLRUCache.getKeySet()) {
            Optional<CoreFilterProviderEntity> coreFilterProviderEntityOptional = CoreServiceEntityTable.coreFilterProviderEntityLRUCache.get(coreFilterProviderId);
            coreFilterProviderEntityOptional.ifPresent(coreFilterProviderEntity -> {
                CoreFilterProviderDTO coreFilterProviderDTO = ConvertUtil.convert(coreFilterProviderEntity);
                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreFilterProviderEntity.getCore_all_element_id());
                coreAllElementDTOOptional.ifPresent(coreAllElementDTO -> {
                    coreFilterProviderDTO.setCoreAllElementDTO(coreAllElementDTO);
                    Optional<List<CoreFilterProviderDTO>> coreFilterProviderList = coreFilterProviderDTOByCoreAllElementIdLRUCache.get(coreAllElementDTO.getId());
                    List<CoreFilterProviderDTO> coreFilterProviderDTOS = coreFilterProviderList.orElseGet(() -> {
                        List<CoreFilterProviderDTO> coreFilterProviderDTOArrayList = new ArrayList<>();
                        coreFilterProviderDTOByCoreAllElementIdLRUCache.put(coreAllElementDTO.getId(), coreFilterProviderDTOArrayList);
                        return coreFilterProviderDTOArrayList;
                    });
                    coreFilterProviderDTOS.add(coreFilterProviderDTO);
                });

                coreFilterProviderDTOLRUCache.put(coreFilterProviderDTO.getId(), coreFilterProviderDTO);
            });
        }

        for (Long coreFilterLayoutId : CoreServiceEntityTable.coreFilterLayoutEntityLRUCache.getKeySet()) {
            Optional<CoreFilterLayoutEntity> coreFilterLayoutEntityOptional = CoreServiceEntityTable.coreFilterLayoutEntityLRUCache.get(coreFilterLayoutId);
            coreFilterLayoutEntityOptional.ifPresent(coreFilterLayoutEntity -> {
                CoreFilterLayoutDTO coreFilterLayoutDTO = ConvertUtil.convert(coreFilterLayoutEntity);
                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreFilterLayoutEntity.getCore_all_element_id());
                coreAllElementDTOOptional.ifPresent(coreAllElementDTO -> {
                    coreFilterLayoutDTO.setCoreAllElementDTO(coreAllElementDTO);

                    Map<Long, List<CoreFilterLayoutDTO>> mapFieldExist = coreFilterLayoutByAllElementIdAndRecordIdDTOLRUCache.get(coreAllElementDTO.getId()).orElseGet(() -> {
                        Map<Long, List<CoreFilterLayoutDTO>> coreFilterLayoutDTOMap = new HashMap<>();
                        coreFilterLayoutByAllElementIdAndRecordIdDTOLRUCache.put(coreAllElementDTO.getId(), coreFilterLayoutDTOMap);
                        return coreFilterLayoutDTOMap;
                    });

                    List<CoreFilterLayoutDTO> list = mapFieldExist.computeIfAbsent(coreFilterLayoutDTO.getRecordId(), k -> new ArrayList<>());
                    list.add(coreFilterLayoutDTO);
                });


                coreFilterLayoutDTOLRUCache.put(coreFilterLayoutDTO.getId(), coreFilterLayoutDTO);
            });
        }

        for (Long coreFilterEntityId : CoreServiceEntityTable.coreFilterEntityLRUCache.getKeySet()) {
            Optional<CoreFilterEntity> coreFilterEntityOptional = CoreServiceEntityTable.coreFilterEntityLRUCache.get(coreFilterEntityId);
            coreFilterEntityOptional.ifPresent(coreFilterEntity -> {
                CoreFilterDTO coreFilterDTO = ConvertUtil.convert(coreFilterEntity);
                coreFilterDTO.setCoreFilterOperationDTOMap(new HashMap<>());
                coreFilterDTOLRUCache.put(coreFilterDTO.getId(), coreFilterDTO);
            });
        }
        for (Long coreFilterOperationId : CoreServiceEntityTable.coreFilterOperationEntityLRUCache.getKeySet()) {
            Optional<CoreFilterOperationEntity> coreFilterOperationEntityOptional = CoreServiceEntityTable.coreFilterOperationEntityLRUCache.get(coreFilterOperationId);
            coreFilterOperationEntityOptional.ifPresent(coreFilterOperationEntity -> {
                CoreFilterOperationDTO coreFilterOperationDTO = ConvertUtil.convert(coreFilterOperationEntity);
                coreFilterOperationDTO.setCoreFilterOperationParamDTOMap(new HashMap<>());

                Optional<CoreFilterDTO> coreFilterDTOOptional = coreFilterDTOLRUCache.get(coreFilterOperationEntity.getCore_filter_id());
                coreFilterDTOOptional.ifPresent(coreFilterDTO -> {
                    coreFilterDTO.getCoreFilterOperationDTOMap().put(coreFilterOperationDTO.getId(), coreFilterOperationDTO);
                });

                coreFilterOperationDTOLRUCache.put(coreFilterOperationDTO.getId(), coreFilterOperationDTO);
            });
        }
        for (Long coreFilterOperationParamId : CoreServiceEntityTable.coreFilterOperationParamEntityLRUCache.getKeySet()) {
            Optional<CoreFilterOperationParamEntity> coreFilterOperationParamEntityoptional = CoreServiceEntityTable.coreFilterOperationParamEntityLRUCache.get(coreFilterOperationParamId);
            coreFilterOperationParamEntityoptional.ifPresent(coreFilterOperationParamEntity -> {
                CoreFilterOperationParamDTO coreFilterOperationParamDTO = ConvertUtil.convert(coreFilterOperationParamEntity);

                Optional<CoreTableColumnEditorDTO> coreTableColumnEditorDTOOptional = coreTableColumnEditorDTOLRUCache.get(coreFilterOperationParamEntity.getCore_table_column_editor_id());
                coreTableColumnEditorDTOOptional.ifPresent(coreFilterOperationParamDTO::setCoreTableColumnEditorDTO);

                Optional<CoreFilterOperationDTO> coreFilterOperationDTOOptional = coreFilterOperationDTOLRUCache.get(coreFilterOperationParamEntity.getCore_filter_operation_id());
                coreFilterOperationDTOOptional.ifPresent(coreFilterOperationDTO -> {
                    coreFilterOperationDTO.getCoreFilterOperationParamDTOMap().put(coreFilterOperationParamDTO.getId(), coreFilterOperationParamDTO);
                });

                coreFilterOperationParamDTOLRUCache.put(coreFilterOperationParamDTO.getId(), coreFilterOperationParamDTO);
            });
        }

        for (Long coreFilterAssignElementId : CoreServiceEntityTable.coreFilterAssignElementEntityLRUCache.getKeySet()) {
            Optional<CoreFilterAssignElementEntity> coreFilterAssignElementEntityOptional = CoreServiceEntityTable.coreFilterAssignElementEntityLRUCache.get(coreFilterAssignElementId);
            coreFilterAssignElementEntityOptional.ifPresent(coreFilterAssignElementEntity -> {
                CoreFilterAssignElementDTO coreFilterAssignElementDTO = ConvertUtil.convert(coreFilterAssignElementEntity);

                Map<Long, List<CoreFilterAssignElementDTO>> coreFilterAssignElementDTOMapListOptional = coreFilterAssignElementDTOByCoreAllElementIdAndRecordIdLRUCache.get(coreFilterAssignElementEntity.getCore_all_element_id()).orElseGet(() -> {
                    Map<Long, List<CoreFilterAssignElementDTO>> mapList = new HashMap<>();
                    coreFilterAssignElementDTOByCoreAllElementIdAndRecordIdLRUCache.put(coreFilterAssignElementEntity.getCore_all_element_id(), mapList);
                    return mapList;
                });

                List<CoreFilterAssignElementDTO> coreFilterAssignElementDTOS = coreFilterAssignElementDTOMapListOptional.computeIfAbsent(coreFilterAssignElementEntity.getRecord_id(), k -> new ArrayList<>());
                coreFilterAssignElementDTOS.add(coreFilterAssignElementDTO);

                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreFilterAssignElementEntity.getCore_all_element_id());
                coreAllElementDTOOptional.ifPresent(coreFilterAssignElementDTO::setCoreAllElementDTO);

                Optional<CoreFilterDTO> coreFilterDTOOptional = coreFilterDTOLRUCache.get(coreFilterAssignElementEntity.getCore_filter_id());
                coreFilterDTOOptional.ifPresent(coreFilterAssignElementDTO::setCoreFilterDTO);

                coreFilterAssignElementDTOLRUCache.put(coreFilterAssignElementEntity.getId(), coreFilterAssignElementDTO);
            });
        }

        for (Long coreFilterAssignDataProviderEntityId : CoreServiceEntityTable.coreFilterAssignDataProviderEntityLRUCache.getKeySet()) {
            Optional<CoreFilterAssignDataProviderEntity> coreFilterAssignDataProviderEntityOptional = CoreServiceEntityTable.coreFilterAssignDataProviderEntityLRUCache.get(coreFilterAssignDataProviderEntityId);
            coreFilterAssignDataProviderEntityOptional.ifPresent(coreFilterAssignDataProviderEntity -> {
                CoreFilterAssignDataProviderDTO coreFilterAssignDataProviderDTO = ConvertUtil.convert(coreFilterAssignDataProviderEntity);
                coreFilterDTOLRUCache.get(coreFilterAssignDataProviderEntity.getCore_filter_id()).ifPresent(coreFilterAssignDataProviderDTO::setCoreFilterDTO);

                List<CoreFilterAssignDataProviderDTO> coreFilterAssignDataProviderDTOS = coreFilterAssignDataProviderDTOByCoreTableColumnDataProviderIdLRUCache.get(coreFilterAssignDataProviderEntity.getCore_table_column_dataprovider_id()).orElseGet(() -> {
                    List<CoreFilterAssignDataProviderDTO> coreFilterAssignDataProviderDTOSNew = new ArrayList<>();
                    coreFilterAssignDataProviderDTOByCoreTableColumnDataProviderIdLRUCache.put(coreFilterAssignDataProviderEntity.getCore_table_column_dataprovider_id(), coreFilterAssignDataProviderDTOSNew);
                    return coreFilterAssignDataProviderDTOSNew;
                });

                coreFilterAssignDataProviderDTOS.add(coreFilterAssignDataProviderDTO);
            });
        }

        return Mono.just(complete);
    }

    private Mono<Serializable> coreAnalyticReportLayout() {
        for (Long coreAnalyticReportLayoutId : CoreServiceEntityTable.coreAnalyticReportLayoutEntityLRUCache.getKeySet()) {
            Optional<CoreAnalyticReportLayoutEntity> coreAnalyticReportLayoutEntityOptional = CoreServiceEntityTable.coreAnalyticReportLayoutEntityLRUCache.get(coreAnalyticReportLayoutId);
            coreAnalyticReportLayoutEntityOptional.ifPresent(coreAnalyticReportLayoutEntity -> {
                CoreAnalyticReportLayoutDTO coreAnalyticReportLayoutDTO = ConvertUtil.convert(coreAnalyticReportLayoutEntity);

                Optional<CoreAnalyticReportDTO> coreAnalyticReportDTOOptional = coreAnalyticReportDTOLRUCache.get(coreAnalyticReportLayoutEntity.getCore_analytic_report_id());
                coreAnalyticReportDTOOptional.ifPresent(coreAnalyticReportLayoutDTO::setCoreAnalyticReportDTO);

                Optional<CoreUserTenantDTO> coreUserTenantDTOOptional = coreUserTenantDTOLRUCache.get(coreAnalyticReportLayoutEntity.getCore_user_tenant_id());
                coreUserTenantDTOOptional.ifPresent(coreAnalyticReportLayoutDTO::setCoreUserTenantDTO);

                Optional<List<CoreAnalyticReportLayoutDTO>> listLayoutOptional = coreAnalyticReportLayoutDTOByAnalyticIdLRUCache.get(coreAnalyticReportLayoutEntity.getCore_analytic_report_id());
                List<CoreAnalyticReportLayoutDTO> listLayout = listLayoutOptional.orElseGet(() -> {
                    List<CoreAnalyticReportLayoutDTO> coreAnalyticReportLayoutEntities = new ArrayList<>();
                    coreAnalyticReportLayoutDTOByAnalyticIdLRUCache.put(coreAnalyticReportLayoutEntity.getCore_analytic_report_id(), coreAnalyticReportLayoutEntities);
                    return coreAnalyticReportLayoutEntities;
                });
                listLayout.add(coreAnalyticReportLayoutDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreAnalyticReport() {
        for (Long coreAnalyticReportId : CoreServiceEntityTable.coreAnalyticReportEntityLRUCache.getKeySet()) {
            Optional<CoreAnalyticReportEntity> coreAnalyticReportEntityOptional = CoreServiceEntityTable.coreAnalyticReportEntityLRUCache.get(coreAnalyticReportId);
            coreAnalyticReportEntityOptional.ifPresent(coreAnalyticReportEntity -> {
                CoreAnalyticReportDTO coreAnalyticReportDTO = ConvertUtil.convert(coreAnalyticReportEntity);

                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreAnalyticReportEntity.getCore_all_element_id());
                coreAllElementDTOOptional.ifPresent(coreAnalyticReportDTO::setCoreAllElementDTO);

                coreAnalyticReportDTOLRUCache.put(coreAnalyticReportId, coreAnalyticReportDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreUserTenantDTO() {
        for (Long coreUserTenantEntityId : CoreServiceEntityTable.coreUserTenantEntityLRUCache.getKeySet()) {
            Optional<CoreUserTenantEntity> coreUserTenantEntityOptional = CoreServiceEntityTable.coreUserTenantEntityLRUCache.get(coreUserTenantEntityId);
            coreUserTenantEntityOptional.ifPresent(coreUserTenantEntity -> {
                Optional<CoreUserDTO> coreUserDTOOptional = coreUserDTOLRUCache.get(coreUserTenantEntity.getCore_user_id());
                Optional<CoreTenantDTO> coreTenantDTOOptional = coreTenantDTOLRUCache.get(coreUserTenantEntity.getCore_tenant_id());

                CoreUserTenantDTO coreUserTenantDTO = ConvertUtil.convert(coreUserTenantEntity);
                coreUserDTOOptional.ifPresent(coreUserTenantDTO::setCoreUserDTO);
                coreTenantDTOOptional.ifPresent(coreUserTenantDTO::setCoreTenantDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTenantTypeDTO() {
        for (Long coreTenantTypeEntityId : CoreServiceEntityTable.coreTenantTypeEntityLRUCache.getKeySet()) {
            Optional<CoreTenantTypeEntity> coreTenantTypeEntityOptional = CoreServiceEntityTable.coreTenantTypeEntityLRUCache.get(coreTenantTypeEntityId);
            coreTenantTypeEntityOptional.ifPresent(coreTenantTypeEntity -> {
                CoreTenantTypeDTO coreTenantTypeDTO = ConvertUtil.convert(coreTenantTypeEntity);
                coreTenantTypeDTOLRUCache.put(coreTenantTypeEntityId, coreTenantTypeDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreUserDTO() {
        for (Long coreUserEntityId : CoreServiceEntityTable.coreUserEntityLRUCache.getKeySet()) {
            Optional<CoreUserEntity> coreUserEntityOptional = CoreServiceEntityTable.coreUserEntityLRUCache.get(coreUserEntityId);
            coreUserEntityOptional.ifPresent(coreUserEntity -> {
                CoreUserDTO coreUserDTO = ConvertUtil.convert(coreUserEntity);
                coreUserDTOLRUCache.put(coreUserDTO.getId(), coreUserDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreButtonDTO() {
        for (Long coreButtonEntityId : CoreServiceEntityTable.coreButtonEntityLRUCache.getKeySet()) {
            Optional<CoreButtonEntity> coreButtonEntityOptional = CoreServiceEntityTable.coreButtonEntityLRUCache.get(coreButtonEntityId);
            coreButtonEntityOptional.ifPresent(coreButtonEntity -> {
                CoreButtonDTO coreButtonDTO = ConvertUtil.convert(coreButtonEntity);
                coreButtonDTOLRUCache.put(coreButtonDTO.getId(), coreButtonDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreCssDTO() {
        for (Long coreCssEntityId : CoreServiceEntityTable.coreCssEntityLRUCache.getKeySet()) {
            Optional<CoreCssEntity> coreCssEntityOptional = CoreServiceEntityTable.coreCssEntityLRUCache.get(coreCssEntityId);
            coreCssEntityOptional.ifPresent(coreCssEntity -> {
                CoreCssDTO coreCssDTO = ConvertUtil.convert(coreCssEntity);
                coreCssDTOLRUCache.put(coreCssDTO.getId(), coreCssDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTenantDTO() {
        for (Long coreTenantEntityId : CoreServiceEntityTable.coreTenantEntityLRUCache.getKeySet()) {
            Optional<CoreTenantEntity> coreTenantEntityOptional = CoreServiceEntityTable.coreTenantEntityLRUCache.get(coreTenantEntityId);
            coreTenantEntityOptional.ifPresent(coreTenantEntity -> {
                Optional<CoreTenantTypeDTO> coreTenantTypeDTOOptional = coreTenantTypeDTOLRUCache.get(coreTenantEntity.getCore_tenant_type_id());

                CoreTenantDTO coreTenantDTO = ConvertUtil.convert(coreTenantEntity);
                coreTenantTypeDTOOptional.ifPresent(coreTenantDTO::setCoreTenantTypeDTO);

                coreTenantDTOLRUCache.put(coreTenantEntityId, coreTenantDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDTO() {
        for (Long coreTableColumnEntityId : CoreServiceEntityTable.coreTableColumnEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnEntity> coreTableColumnEntityOptional = CoreServiceEntityTable.coreTableColumnEntityLRUCache.get(coreTableColumnEntityId);

            coreTableColumnEntityOptional.ifPresent(coreTableColumnEntity -> {
                CoreTableColumnDTO coreTableColumnDTO = ConvertUtil.convert(coreTableColumnEntity);

                List<CoreAllElementPropertiesValueDTO> coreAllElementPropertiesValueDTOS = findPropertiesValueByElementIdAndRecordIdListOf(findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Column).getId(), coreTableColumnDTO.getId());
                if (coreAllElementPropertiesValueDTOS != null)
                    coreTableColumnDTO.setCoreAllElementPropertiesValueDTOS(coreAllElementPropertiesValueDTOS);

                Optional<CoreTableColumnEditorDTO> coreTableColumnEditorDTOOptional = coreTableColumnEditorDTOLRUCache.get(coreTableColumnEntity.getCore_table_column_editor_id());
                coreTableColumnEditorDTOOptional.ifPresent(coreTableColumnDTO::setCoreTableColumnEditorDTO);

                Optional<CoreTableColumnDataProviderDTO> coreTableColumnDataProviderDTOOptional = coreTableColumnDataProviderDTOLRUCache.get(coreTableColumnEntity.getCore_table_column_dataprovider_id());
                coreTableColumnDataProviderDTOOptional.ifPresent(coreTableColumnDTO::setCoreTableColumnDataProviderDTO);

                coreTableColumnDTOLRUCache.put(coreTableColumnEntityId, coreTableColumnDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnEditorDTO() {
        for (Long coreTableColumnEditorEntityId : CoreServiceEntityTable.coreTableColumnEditorEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnEditorEntity> coreTableColumnEditorEntityOptional = CoreServiceEntityTable.coreTableColumnEditorEntityLRUCache.get(coreTableColumnEditorEntityId);
            coreTableColumnEditorEntityOptional.ifPresent(coreTableColumnEditorEntity -> {
                CoreTableColumnEditorDTO coreTableColumnEditorDTO = ConvertUtil.convert(coreTableColumnEditorEntity);
                coreTableColumnEditorDTOLRUCache.put(coreTableColumnEditorEntityId, coreTableColumnEditorDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> commonCountryDTO() {
        for (Long commonCountryId : CoreServiceEntityTable.commonCountryEntityLRUCache.getKeySet()) {
            Optional<CommonCountryEntity> commonCountryEntityOptional = CoreServiceEntityTable.commonCountryEntityLRUCache.get(commonCountryId);
            commonCountryEntityOptional.ifPresent(commonCountryEntity -> {
                CommonCountryDTO commonCountryDTO = ConvertUtil.convert(commonCountryEntity);
                commonCountryDTOLRUCache.put(commonCountryId, commonCountryDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderSerializer() {
        for (Long coreTableColumnDataProviderSerializerId : CoreServiceEntityTable.coreTableColumnDataProviderSerializerEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderSerializerEntity> coreTableColumnDataProviderSerializerOptional = CoreServiceEntityTable.coreTableColumnDataProviderSerializerEntityLRUCache.get(coreTableColumnDataProviderSerializerId);
            coreTableColumnDataProviderSerializerOptional.ifPresent(coreTableColumnDataProviderSerializerEntity -> {
                CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO = ConvertUtil.convert(coreTableColumnDataProviderSerializerEntity);
                coreTableColumnDataProviderSerializerDTOLRUCache.put(coreTableColumnDataProviderSerializerId, coreTableColumnDataProviderSerializerDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreAllElementDTO() {
        for (Long coreAllElementEntityId : CoreServiceEntityTable.coreAllElementEntityLRUCache.getKeySet()) {
            Optional<CoreAllElementEntity> coreAllElementEntityOptional = CoreServiceEntityTable.coreAllElementEntityLRUCache.get(coreAllElementEntityId);
            coreAllElementEntityOptional.ifPresent(coreAllElementEntity -> {
                CoreAllElementDTO coreAllElementDTO = ConvertUtil.convert(coreAllElementEntity);
                coreAllElementDTOLRUCache.put(coreAllElementEntityId, coreAllElementDTO);
                coreAllElementDTOByKeyLRUCache.put(coreAllElementDTO.getRegisterKey().toLowerCase(), coreAllElementDTO);
                if (coreAllElementDTO.getCoreTableId() != null)
                    coreAllElementDTOByCoreTableIdLRUCache.put(coreAllElementDTO.getCoreTableId(), coreAllElementDTO);
            });
        }
        return Mono.just(complete);
    }

//    public static List<CoreAttributeAssignElementDTO> findAttributeByElementIdAndRecordIdAndAttributeRegisterKey(long coreAllElementId, long recordId, String... attributeRegisterKey) {
//        List<CoreAttributeAssignElementDTO> allAttribute = findAttributeByElementIdAndRecordIdListOf(coreAllElementId, recordId);
//
//        if (allAttribute != null) {
//            HashSet<String> registerKeySet = new HashSet<>(List.of(attributeRegisterKey));
//            return allAttribute.stream().filter(coreAttributeAssignElementDTO -> {
//                return registerKeySet.contains(coreAttributeAssignElementDTO.getCoreAttributeDTO().getRegisterKey());
//            }).toList();
//        }
//
//        return null;
//    }

    public static List<CoreAllElementPropertiesDTO> findPropertiesByElementIdAndRecordIdListOf(long coreAllElementId, long recordId) {
        Optional<Map<Long, List<CoreAllElementPropertiesDTO>>> mapOf = coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdLRUCache.get(coreAllElementId);
        return mapOf.map(longListMap -> longListMap.get(recordId)).orElse(null);
    }

    public static Map<String, CoreAllElementPropertiesDTO> findPropertiesByElementIdAndRecordIdMapOf(long coreAllElementId, long recordId) {
        Optional<Map<Long, Map<String, CoreAllElementPropertiesDTO>>> mapOf = coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdMapLRUCache.get(coreAllElementId);
        return mapOf.map(longListMap -> longListMap.get(recordId)).orElse(null);
    }

    public static List<CoreAllElementPropertiesValueDTO> findPropertiesValueByElementIdAndRecordIdListOf(long coreAllElementId, long recordId) {
        Optional<Map<Long, List<CoreAllElementPropertiesValueDTO>>> mapOf = coreAllElementPropertiesValueByCoreAllElementIdAndRecordIdDTOLRUCache.get(coreAllElementId);
        return mapOf.map(longListMap -> longListMap.get(recordId)).orElse(null);
    }

    private Mono<Serializable> coreAllElementPropertiesDTO() {
        for (Long l : CoreServiceEntityTable.coreAllElementPropertiesEntityLRUCache.getKeySet()) {
            Optional<CoreAllElementPropertiesEntity> coreAllElementPropertiesEntityOptional = CoreServiceEntityTable.coreAllElementPropertiesEntityLRUCache.get(l);
            if (coreAllElementPropertiesEntityOptional.isPresent()) {
                CoreAllElementPropertiesEntity coreAllElementPropertiesEntity = coreAllElementPropertiesEntityOptional.get();

                CoreAllElementPropertiesDTO coreAllElementPropertiesDTO = ConvertUtil.convert(coreAllElementPropertiesEntity);
                coreAllElementDTOLRUCache.get(coreAllElementPropertiesEntity.getCore_all_element_id()).ifPresent(coreAllElementPropertiesDTO::setCoreAllElementDTO);
                coreTableColumnEditorDTOLRUCache.get(coreAllElementPropertiesEntity.getCore_table_column_editor_id()).ifPresent(coreAllElementPropertiesDTO::setCoreTableColumnEditorDTO);
                coreTableColumnDataProviderDTOLRUCache.get(coreAllElementPropertiesEntity.getCore_table_column_dataprovider_id()).ifPresent(coreAllElementPropertiesDTO::setCoreTableColumnDataProviderDTO);

                coreAllElementPropertiesDTOByRegisterKeyLRUCache.put(coreAllElementPropertiesEntity.getRegister_key(), coreAllElementPropertiesDTO);
                coreAllElementPropertiesDTOLRUCache.put(coreAllElementPropertiesEntity.getId(), coreAllElementPropertiesDTO);

                Map<Long, List<CoreAllElementPropertiesDTO>> mapOf = coreAllElementPropertiesDTOByCoreAllElementIdAndRecordIdLRUCache.get(coreAllElementPropertiesEntity.getCore_all_element_id()).orElseGet(HashMap::new);
                List<CoreAllElementPropertiesDTO> listOf = mapOf.computeIfAbsent(coreAllElementPropertiesEntity.getRecord_id(), aLong -> new ArrayList<>());
                listOf.add(coreAllElementPropertiesDTO);
            }
        }
        for (Long l : CoreServiceEntityTable.coreAllElementPropertiesValueEntityLRUCache.getKeySet()) {
            Optional<CoreAllElementPropertiesValueEntity> coreAllElementPropertiesValueEntityOptional = CoreServiceEntityTable.coreAllElementPropertiesValueEntityLRUCache.get(l);
            if (coreAllElementPropertiesValueEntityOptional.isPresent()) {
                CoreAllElementPropertiesValueEntity coreAllElementPropertiesValueEntity = coreAllElementPropertiesValueEntityOptional.get();
                CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = ConvertUtil.convert(coreAllElementPropertiesValueEntity);
                coreAllElementPropertiesDTOLRUCache.get(coreAllElementPropertiesValueEntity.getCore_all_element_properties_id()).ifPresent(coreAllElementPropertiesValueDTO::setCoreAllElementPropertiesDTO);

                Map<Long, List<CoreAllElementPropertiesValueDTO>> mapOf = coreAllElementPropertiesValueByCoreAllElementIdAndRecordIdDTOLRUCache.get(coreAllElementPropertiesValueDTO.getCoreAllElementPropertiesDTO().getCoreAllElementDTO().getId()).orElseGet(HashMap::new);
                List<CoreAllElementPropertiesValueDTO> listOf = mapOf.computeIfAbsent(coreAllElementPropertiesValueDTO.getCoreAllElementPropertiesDTO().getRecordId(), aLong -> new ArrayList<>());

                listOf.add(coreAllElementPropertiesValueDTO);
            }
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreProfileDTO() {
        for (Long coreProfileEntityId : CoreServiceEntityTable.coreProfileEntityLRUCache.getKeySet()) {
            Optional<CoreProfileEntity> coreProfileEntityOptional = CoreServiceEntityTable.coreProfileEntityLRUCache.get(coreProfileEntityId);
            coreProfileEntityOptional.ifPresent(coreProfileEntity -> {
                CoreProfileDTO coreProfileDTO = ConvertUtil.convert(coreProfileEntity);
                coreProfileDTOLRUCache.put(coreProfileEntityId, coreProfileDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreUserTenantProfileDTO() {
        for (Long coreUserTenantProfileId : CoreServiceEntityTable.coreUserTenantProfileEntityLRUCache.getKeySet()) {
            Optional<CoreUserTenantProfileEntity> coreUserTenantProfileEntityOptional = CoreServiceEntityTable.coreUserTenantProfileEntityLRUCache.get(coreUserTenantProfileId);
            coreUserTenantProfileEntityOptional.ifPresent(coreUserTenantProfileEntity -> {
                CoreUserTenantProfileDTO coreUserTenantProfileDTO = ConvertUtil.convert(coreUserTenantProfileEntity);

                Optional<CoreProfileDTO> coreProfileDTOOptional = coreProfileDTOLRUCache.get(coreUserTenantProfileEntity.getCore_profile_id());
                coreProfileDTOOptional.ifPresent(coreUserTenantProfileDTO::setCoreProfileDTO);

                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreUserTenantProfileEntity.getCore_all_element_id());
                coreAllElementDTOOptional.ifPresent(coreUserTenantProfileDTO::setCoreAllElementDTO);

                Optional<CoreUserTenantDTO> coreUserTenantDTOOptional = coreUserTenantDTOLRUCache.get(coreUserTenantProfileEntity.getCore_user_tenant_id());
                coreUserTenantDTOOptional.ifPresent(coreUserTenantProfileDTO::setCoreUserTenantDTO);

                if (coreUserTenantProfileEntity.getCore_user_tenant_id() != null) {
                    Optional<Map<Long, Map<Long, CoreUserTenantProfileDTO>>> result = coreUserTenantProfileDTOsLRUCache.get(coreUserTenantProfileEntity.getCore_user_tenant_id());
                    Map<Long, Map<Long, CoreUserTenantProfileDTO>> resultMap;
                    if (result.isEmpty()) {
                        resultMap = new HashMap<>();
                        coreUserTenantProfileDTOsLRUCache.put(coreUserTenantProfileEntity.getCore_user_tenant_id(), resultMap);
                    } else {
                        resultMap = result.get();
                    }

                    if (coreUserTenantProfileEntity.getCore_all_element_id() != null) {
                        Map<Long, CoreUserTenantProfileDTO> result2Map = resultMap.computeIfAbsent(coreUserTenantProfileEntity.getCore_all_element_id(), k -> new HashMap<>());
                        if (coreUserTenantProfileEntity.getRecord_id() != null) {
                            result2Map.put(coreUserTenantProfileEntity.getRecord_id(), coreUserTenantProfileDTO);
                        }
                    }
                }
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreDashboardDTOs() {
        for (Long coreDashboardId : CoreServiceEntityTable.coreDashboardEntityLRUCache.getKeySet()) {
            Optional<CoreDashboardEntity> entity = CoreServiceEntityTable.coreDashboardEntityLRUCache.get(coreDashboardId);
            entity.ifPresent(coreDashboardEntity -> {
                CoreDashboardDTO coreDashboardDTO = ConvertUtil.convert(coreDashboardEntity);
                coreDashboardDTOsRUCache.put(coreDashboardId, coreDashboardDTO);
            });
        }
        for (Long coreDashboardItemId : CoreServiceEntityTable.coreDashboardItemEntityLRUCache.getKeySet()) {
            Optional<CoreDashboardItemEntity> entityDashboardItem = CoreServiceEntityTable.coreDashboardItemEntityLRUCache.get(coreDashboardItemId);
            entityDashboardItem.ifPresent(coreDashboardItemEntity -> {
                Optional<CoreDashboardDTO> coreDashboardDTOs = coreDashboardDTOsRUCache.get(coreDashboardItemEntity.getCore_dashboard_id());
                coreDashboardDTOs.ifPresent(coreDashboardDTO -> {
                    CoreDashboardItemDTO coreDashboardItemDTO = ConvertUtil.convert(coreDashboardItemEntity);
                    coreDashboardItemDTO.setCoreDashboardDTO(coreDashboardDTO);

                    Optional<List<CoreDashboardItemDTO>> coreDashboardItem = coreDashboardItemDTOsByDashboardIdRUCache.get(coreDashboardItemEntity.getCore_dashboard_id());

                    List<CoreDashboardItemDTO> coreDashboardItemDTOS;
                    if (coreDashboardItem.isEmpty()) {
                        coreDashboardItemDTOS = new ArrayList<>();
                        coreDashboardItemDTOsByDashboardIdRUCache.put(coreDashboardItemEntity.getCore_dashboard_id(), coreDashboardItemDTOS);
                    } else {
                        coreDashboardItemDTOS = coreDashboardItem.get();
                    }
                    coreDashboardItemDTOS.add(coreDashboardItemDTO);

                    coreDashboardItemDTOLRUCache.put(coreDashboardItemDTO.getId(), coreDashboardItemDTO);
                });
            });
        }

        for (Long coreDashboardViewId : CoreServiceEntityTable.coreDashboardViewEntityLRUCache.getKeySet()) {
            Optional<CoreDashboardViewEntity> coreDashboardViewEntity = CoreServiceEntityTable.coreDashboardViewEntityLRUCache.get(coreDashboardViewId);
            coreDashboardViewEntity.ifPresent(dashboardViewEntity -> {
                Optional<CoreDashboardDTO> coreDashboardDTOs = coreDashboardDTOsRUCache.get(dashboardViewEntity.getCore_dashboard_id());
                if (coreDashboardDTOs.isPresent()) {
                    CoreDashboardViewDTO coreDashboardViewDTO = ConvertUtil.convert(dashboardViewEntity);
                    coreDashboardViewDTO.setCoreDashboardDTO(coreDashboardDTOs.get());

                    Optional<List<CoreDashboardViewDTO>> coreDashboardViewDTOs = coreDashboardViewDTOsByDashboardIdDTORUCache.get(dashboardViewEntity.getCore_dashboard_id());

                    List<CoreDashboardViewDTO> coreDashboardViewDTOS;
                    if (coreDashboardViewDTOs.isEmpty()) {
                        coreDashboardViewDTOS = new ArrayList<>();
                        coreDashboardViewDTOsByDashboardIdDTORUCache.put(dashboardViewEntity.getCore_dashboard_id(), coreDashboardViewDTOS);
                    } else {
                        coreDashboardViewDTOS = coreDashboardViewDTOs.get();
                    }
                    coreDashboardViewDTOS.add(coreDashboardViewDTO);

                    coreDashboardViewDTOLRUCache.put(coreDashboardViewDTO.getId(), coreDashboardViewDTO);
                }
            });
        }

        for (Long coreDashboardGadgetId : CoreServiceEntityTable.coreDashboardGadgetEntityLRUCache.getKeySet()) {
            Optional<CoreDashboardGadgetEntity> coreDashboadGadgetEntityOptional = CoreServiceEntityTable.coreDashboardGadgetEntityLRUCache.get(coreDashboardGadgetId);
            coreDashboadGadgetEntityOptional.ifPresent(coreDashboardGadgetEntity -> {
                Optional<CoreDashboardItemDTO> coreDashboardItemDTOOptional = coreDashboardItemDTOLRUCache.get(coreDashboardGadgetEntity.getCore_dashboard_item_id());
                coreDashboardItemDTOOptional.ifPresent(coreDashboardItemDTO -> {
                    CoreDashboardGadgetDTO coreDashboardGadgetDTO = ConvertUtil.convert(coreDashboardGadgetEntity);

                    Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreDashboardGadgetEntity.getCore_all_element_id());
                    coreAllElementDTOOptional.ifPresent(coreDashboardGadgetDTO::setCoreAllElementDTO);

                    coreDashboardGadgetDTO.setCoreDashboardItemDTO(coreDashboardItemDTO);

                    Optional<List<CoreDashboardGadgetDTO>> coreDashboardGadgetDTOsOptional = coreDashboardGadgetDTOsByDashboardItemIdDTORUCache.get(coreDashboardItemDTO.getId());

                    List<CoreDashboardGadgetDTO> coreDashboardGadgetDTOS;
                    if (coreDashboardGadgetDTOsOptional.isEmpty()) {
                        coreDashboardGadgetDTOS = new ArrayList<>();
                        coreDashboardGadgetDTOsByDashboardItemIdDTORUCache.put(coreDashboardItemDTO.getId(), coreDashboardGadgetDTOS);
                    } else {
                        coreDashboardGadgetDTOS = coreDashboardGadgetDTOsOptional.get();
                    }
                    coreDashboardGadgetDTOS.add(coreDashboardGadgetDTO);

                    coreDashboardGadgetDTOLRUCache.put(coreDashboardGadgetDTO.getId(), coreDashboardGadgetDTO);
                });
            });
        }

        for (Long coreDashboardGadgetViewId : CoreServiceEntityTable.coreDashboardGadgetViewEntityLRUCache.getKeySet()) {
            Optional<CoreDashboardGadgetViewEntity> coreDashboardGadgetViewEntityOptional = CoreServiceEntityTable.coreDashboardGadgetViewEntityLRUCache.get(coreDashboardGadgetViewId);
            if (coreDashboardGadgetViewEntityOptional.isPresent()) {
                CoreDashboardGadgetViewEntity coreDashboardGadgetViewEntity = coreDashboardGadgetViewEntityOptional.get();
                Optional<CoreDashboardGadgetDTO> coreDashboardGadgetDTOOptional = coreDashboardGadgetDTOLRUCache.get(coreDashboardGadgetViewEntity.getCore_dashboard_gadget_id());
                Optional<CoreDashboardViewDTO> coreDashboardViewDTOOptional = coreDashboardViewDTOLRUCache.get(coreDashboardGadgetViewEntity.getCore_dashboard_view_id());
                if (coreDashboardGadgetDTOOptional.isPresent() && coreDashboardViewDTOOptional.isPresent()) {
                    CoreDashboardGadgetDTO coreDashboardGadgetDTO = coreDashboardGadgetDTOOptional.get();
                    CoreDashboardViewDTO coreDashboardViewDTO = coreDashboardViewDTOOptional.get();

                    CoreDashboardGadgetViewDTO coreDashboardGadgetViewDTO = ConvertUtil.convert(coreDashboardGadgetViewEntity);
                    coreDashboardGadgetViewDTO.setCoreDashboardGadgetDTO(coreDashboardGadgetDTO);
                    coreDashboardGadgetViewDTO.setCoreDashboardViewDTO(coreDashboardViewDTO);

                    Optional<List<CoreDashboardGadgetViewDTO>> coreDashboardGadgetViewsDTO = coreDashboardGadgetViewDTOsByDashboardItemIdDTORUCache.get(coreDashboardGadgetDTO.getCoreDashboardItemDTO().getId());
                    List<CoreDashboardGadgetViewDTO> coreDashboardGadgetViewDTOS;
                    if (coreDashboardGadgetViewsDTO.isEmpty()) {
                        coreDashboardGadgetViewDTOS = new ArrayList<>();
                        coreDashboardGadgetViewDTOsByDashboardItemIdDTORUCache.put(coreDashboardGadgetDTO.getCoreDashboardItemDTO().getId(), coreDashboardGadgetViewDTOS);
                    } else {
                        coreDashboardGadgetViewDTOS = coreDashboardGadgetViewsDTO.get();
                    }
                    coreDashboardGadgetViewDTOS.add(coreDashboardGadgetViewDTO);
                }
            }
        }

        return Mono.just(complete);
    }

    public static <T extends Class<? extends BaseEntityInterface>> CoreAllElementDTO findFromEntityClass(T entity) {
        CoreTableDefinition coreTableDefinition = entity.getAnnotation(CoreTableDefinition.class);
        Optional<CoreTableDataSourceDTO> coreTableDataSourceDTOOptional = coreTableDataSourceDTOByRegisterKeyLRUCache.get(coreTableDefinition.register_key());
        CoreTableDTO coreTable = null;
        if (coreTableDataSourceDTOOptional.isPresent()) {
            CoreTableDataSourceDTO coreTableDataSourceDTO = coreTableDataSourceDTOOptional.get();
            Optional<Map<String, CoreTableDTO>> optionalStringCoreTableDTOMap = coreTableDTOByDataSourceIdAndTableNameLRUCache.get(coreTableDataSourceDTO.getId());

            if (optionalStringCoreTableDTOMap.isPresent()) {
                coreTable = optionalStringCoreTableDTOMap.get().get(coreTableDefinition.tableName());
            }
        }

        if (coreTable != null) {
            return findCoreAllElementByCoreTableId(coreTable.getId());
        } else {
            return null;
        }
    }

    private Mono<Serializable> coreMenuDTO() {
        CoreAllElementDTO sourceCoreAllElement = findFromEntityClass(CoreMenuEntity.class);
        for (Long aLong : CoreServiceEntityTable.coreMenuEntityLRUCache.getKeySet()) {
            Optional<CoreMenuEntity> optionCoreMenuEntity = CoreServiceEntityTable.coreMenuEntityLRUCache.get(aLong);
            if (optionCoreMenuEntity.isPresent()) {
                CoreMenuEntity coreMenuEntity = optionCoreMenuEntity.get();
                Optional<CoreAllElementDTO> coreAllElementDTOOptional = coreAllElementDTOLRUCache.get(coreMenuEntity.getCore_all_element_id());

                CoreMenuDTO coreMenuDTO = ConvertUtil.convert(coreMenuEntity);
                coreAllElementDTOOptional.ifPresent(coreMenuDTO::setCoreAllElementDTO);
                if (sourceCoreAllElement != null) {
                    coreMenuDTO.setSourceCoreAllElementDTO(sourceCoreAllElement);
                }

                coreMenuDTOLRUCache.put(aLong, coreMenuDTO);
            }
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTranslateLanguageDTO() {
        for (Long coreTranslateLanguageEntityId : CoreServiceEntityTable.coreTranslateLanguageEntityLRUCache.getKeySet()) {
            Optional<CoreTranslateLanguageEntity> coreTranslateLanguageEntityOptional = CoreServiceEntityTable.coreTranslateLanguageEntityLRUCache.get(coreTranslateLanguageEntityId);
            coreTranslateLanguageEntityOptional.ifPresent(coreTranslateLanguageEntity -> {
                Optional<CommonCountryDTO> commonCountryDTOOptional = commonCountryDTOLRUCache.get(coreTranslateLanguageEntity.getCommon_country_id());

                CoreTranslateLanguageDTO coreTranslateLanguageDTO = ConvertUtil.convert(coreTranslateLanguageEntity);
                commonCountryDTOOptional.ifPresent(coreTranslateLanguageDTO::setCommonCountry);

                coreTranslateLanguageDTOLRUCache.put(coreTranslateLanguageDTO.getId(), coreTranslateLanguageDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderDTO() {
        for (Long aLong : CoreServiceEntityTable.coreTableColumnDataProviderEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderEntity> entity = CoreServiceEntityTable.coreTableColumnDataProviderEntityLRUCache.get(aLong);
            entity.ifPresent(coreTableColumnDataProviderEntity -> {
                // TODO Convert CoreTableColumnDataProviderWithSerializerDTO
                CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum = CoreTableColumnDataProviderTypeEnum.findType(coreTableColumnDataProviderEntity.getCore_table_column_dataprovider_type_id());

                CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO = new CoreTableColumnDataProviderWithSerializerDTO();
                coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderTypeEnum(coreTableColumnDataProviderTypeEnum);
                coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderSerializerDTO(null);

                CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = ConvertUtil.convert(coreTableColumnDataProviderEntity);
                coreTableColumnDataProviderDTO.setCoreTableColumnDataProviderWithSerializerDTO(coreTableColumnDataProviderWithSerializerDTO);
                coreTableColumnDataProviderDTOLRUCache.put(aLong, coreTableColumnDataProviderDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableDataSourceDTO() {
        for (Long aLong : CoreServiceEntityTable.coreHostEntityLRUCache.getKeySet()) {
            Optional<CoreHostEntity> coreHostEntityOptional = CoreServiceEntityTable.coreHostEntityLRUCache.get(aLong);
            coreHostEntityOptional.ifPresent(coreHostEntity -> {
                CoreHostDTO coreHostDTO = ConvertUtil.convert(coreHostEntity);
                coreHostDTOLRUCache.put(coreHostDTO.getId(), coreHostDTO);
            });
        }

        Map<Long, List<CoreHostClusterNodeDTO>> longListMap = new HashMap<>();

        for (Long l : CoreServiceEntityTable.coreHostClusterNodeEntityLRUCache.getKeySet()) {
            Optional<CoreHostClusterNodeEntity> coreHostClusterNodeEntityOptional = CoreServiceEntityTable.coreHostClusterNodeEntityLRUCache.get(l);
            coreHostClusterNodeEntityOptional.ifPresent(coreHostClusterNodeEntity -> {
                CoreHostClusterNodeDTO coreHostClusterNodeDTO = ConvertUtil.convert(coreHostClusterNodeEntity);

                long index = coreHostClusterNodeEntity.getCore_host_cluster_id();
                coreHostDTOLRUCache.get(index).ifPresent(coreHostClusterNodeDTO::setCoreHostDTO);

                List<CoreHostClusterNodeDTO> nodes = longListMap.computeIfAbsent(index, k -> new ArrayList<>());
                nodes.add(coreHostClusterNodeDTO);

                coreHostClusterNodeDTOLRUCache.put(coreHostClusterNodeDTO.getId(), coreHostClusterNodeDTO);
            });
        }

        for (Long l : CoreServiceEntityTable.coreHostClusterEntityLRUCache.getKeySet()) {
            Optional<CoreHostClusterEntity> coreHostClusterEntityOptional = CoreServiceEntityTable.coreHostClusterEntityLRUCache.get(l);
            coreHostClusterEntityOptional.ifPresent(coreHostClusterEntity -> {
                CoreHostClusterDTO coreHostClusterDTO = ConvertUtil.convert(coreHostClusterEntity);

                List<CoreHostClusterNodeDTO> nodes = longListMap.get(coreHostClusterEntity.getId());
                if (nodes != null) {
                    coreHostClusterDTO.setNodes(nodes);
                }

                coreHostClusterDTOLRUCache.put(coreHostClusterDTO.getId(), coreHostClusterDTO);
            });
        }

        Map<Long, CoreTableDataSourceTypeDTO> coreTableDataSourceTypeDTOMap = new HashMap<>();

        for (Long l : CoreServiceEntityTable.coreTableDataSourceTypeEntityLRUCache.getKeySet()) {
            Optional<CoreTableDataSourceTypeEntity> coreTableDataSourceTypeEntityOptional = CoreServiceEntityTable.coreTableDataSourceTypeEntityLRUCache.get(l);
            coreTableDataSourceTypeEntityOptional.ifPresent(coreTableDataSourceTypeEntity -> {
                CoreTableDataSourceTypeDTO coreTableDataSourceTypeDTO = ConvertUtil.convert(coreTableDataSourceTypeEntity);

                coreTableDataSourceTypeDTOMap.put(coreTableDataSourceTypeDTO.getId(), coreTableDataSourceTypeDTO);
            });
        }

        for (Long aLong : CoreServiceEntityTable.coreTableDataSourceEntityLRUCache.getKeySet()) {
            Optional<CoreTableDataSourceEntity> entity = CoreServiceEntityTable.coreTableDataSourceEntityLRUCache.get(aLong);
            entity.ifPresent(coreTableDataSourceEntity -> {
                Class<? extends AbstractRDBMSReactorFactory<?, ?>> clazzRDBMS = InfraConnectionFactoryProvider.getClassAbstractRDBMSReactorFactory(coreTableDataSourceEntity.getRegister_key());
                Class<? extends AbstractNoSQLReactorFactory<?, ?>> clazzNoSQL = InfraConnectionFactoryProvider.getClassAbstractNoSQLReactorFactory(coreTableDataSourceEntity.getRegister_key());

                CoreTableDataSourceDTO coreTableDataSourceDTO = ConvertUtil.convert(coreTableDataSourceEntity);
                coreTableDataSourceDTO.setClassRDBMS(clazzRDBMS);
                coreTableDataSourceDTO.setClassNoSQL(clazzNoSQL);

                coreHostClusterDTOLRUCache.get(coreTableDataSourceEntity.getCore_host_cluster_id()).ifPresent(coreTableDataSourceDTO::setCoreHostClusterDTO);
                CoreTableDataSourceTypeDTO coreTableDataSourceTypeDTO = coreTableDataSourceTypeDTOMap.get(coreTableDataSourceEntity.getCore_table_datasource_type_id());
                if (coreTableDataSourceTypeDTO != null) {
                    coreTableDataSourceDTO.setCoreTableDataSourceTypeDTO(coreTableDataSourceTypeDTO);
                }

                coreTableDataSourceDTOLRUCache.put(aLong, coreTableDataSourceDTO);
                coreTableDataSourceDTOByRegisterKeyLRUCache.put(coreTableDataSourceEntity.getRegister_key(), coreTableDataSourceDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableDTO() {
        for (Long tableId : CoreServiceEntityTable.coreTableEntityLRUCache.getKeySet()) {
            Optional<CoreTableEntity> entity = CoreServiceEntityTable.coreTableEntityLRUCache.get(tableId);
            Optional<List<CoreTableColumnEntity>> coreTableColumnEntityListOptional = CoreServiceEntityTable.coreTableColumnByTableIdEntityLRUCache.get(tableId);

            entity.ifPresent(coreTableEntity -> {
                CoreTableDTO coreTableDTO = ConvertUtil.convert(coreTableEntity);
                coreTableColumnEntityListOptional.ifPresent(coreTableColumnEntityList -> {
                    List<CoreTableColumnDTO> coreTableColumnDTOs = new ArrayList<>();
                    List<CoreTableColumnDTO> coreTableColumnPkDTOs = new ArrayList<>();
                    Map<Long, CoreTableColumnDTO> columnDTOMap = new HashMap<>();
                    Map<Long, CoreTableColumnDTO> pkColumnDTOMap = new HashMap<>();

                    for (CoreTableColumnEntity coreTableColumnEntity : coreTableColumnEntityList) {
                        Optional<CoreTableColumnDTO> coreTableColumnDTOOptional = coreTableColumnDTOLRUCache.get(coreTableColumnEntity.getId());
                        if (coreTableColumnDTOOptional.isPresent()) {
                            CoreTableColumnDTO coreTableColumnDTO = coreTableColumnDTOOptional.get();
                            if (coreTableColumnDTO.isPk()) {
                                coreTableColumnPkDTOs.add(coreTableColumnDTO);
                                pkColumnDTOMap.put(coreTableColumnDTO.getId(), coreTableColumnDTO);
                            }
                            coreTableColumnDTOs.add(coreTableColumnDTO);
                            columnDTOMap.put(coreTableColumnDTO.getId(), coreTableColumnDTO);
                        }
                    }

                    coreTableDTO.setColumns(coreTableColumnDTOs);
                    coreTableDTO.setColumnDTOMap(columnDTOMap);
                    coreTableDTO.setPkColumns(coreTableColumnPkDTOs);
                    coreTableDTO.setPkColumnDTOMap(pkColumnDTOMap);
                });
                coreTableDTOLRUCache.put(tableId, coreTableDTO);

                Map<String, CoreTableDTO> tableName = coreTableDTOByDataSourceIdAndTableNameLRUCache.get(coreTableEntity.getCore_table_datasource_id()).orElseGet(() -> {
                    Map<String, CoreTableDTO> stringCoreTableDTOMap = new HashMap<>();
                    coreTableDTOByDataSourceIdAndTableNameLRUCache.put(coreTableEntity.getCore_table_datasource_id(), stringCoreTableDTOMap);
                    return stringCoreTableDTOMap;
                });
                tableName.put(coreTableEntity.getTablename(), coreTableDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderTableDTO() {
        for (Long coreTableColumnDataProviderTableId : CoreServiceEntityTable.coreTableColumnDataProviderTableEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderTableEntity> coreTableColumnDataProviderTableEntityOptional = CoreServiceEntityTable.coreTableColumnDataProviderTableEntityLRUCache.get(coreTableColumnDataProviderTableId);
            Optional<List<CoreTableColumnDataProviderTableColumnsEntity>> coreTableColumnDataProviderTableColumnsEntityList = CoreServiceEntityTable.coreTableColumnDataProviderTableColumnsByTableIdEntityLRUCache.get(coreTableColumnDataProviderTableId);

            coreTableColumnDataProviderTableEntityOptional.ifPresent(coreTableColumnDataProviderTableEntity -> {
                CoreTableColumnDataProviderTableDTO coreTableColumnDataProviderTableDTO = ConvertUtil.convert(coreTableColumnDataProviderTableEntity);

                if (coreTableColumnDataProviderTableEntity.getCore_table_column_dataprovider_serializer_id() != null) {
                    Optional<CoreTableColumnDataProviderSerializerDTO> coreTableColumnDataProviderSerializerDTOOptional = coreTableColumnDataProviderSerializerDTOLRUCache.get(coreTableColumnDataProviderTableEntity.getCore_table_column_dataprovider_serializer_id());
                    coreTableColumnDataProviderSerializerDTOOptional.ifPresent(coreTableColumnDataProviderTableDTO::setCoreTableColumnDataProviderSerializerDTO);
                }

                coreTableColumnDataProviderTableColumnsEntityList.ifPresent(coreTableColumnDataProviderTableColumnsEntities -> {
                    Optional<CoreTableDTO> coreTableDTOOptional = coreTableDTOLRUCache.get(coreTableColumnDataProviderTableDTO.getCoreTableId());
                    Map<Long, CoreTableColumnDataProviderTableColumnsDTO> coreTableColumnDataProviderTableColumnsDTOHashMap = new HashMap<>();
                    for (CoreTableColumnDataProviderTableColumnsEntity coreTableColumnDataProviderTableColumnsEntity : coreTableColumnDataProviderTableColumnsEntities) {
                        CoreTableColumnDataProviderTableColumnsDTO coreTableColumnDataProviderTableColumnsDTO = ConvertUtil.convert(coreTableColumnDataProviderTableColumnsEntity);

                        coreTableDTOOptional.ifPresent(coreTableDTO -> {
                            coreTableColumnDataProviderTableColumnsDTO.setCoreTableColumnDTO(coreTableDTO.getColumnDTOMap().get(coreTableColumnDataProviderTableColumnsEntity.getCore_table_column_id()));
                        });
                        coreTableColumnDataProviderTableColumnsDTOHashMap.put(coreTableColumnDataProviderTableColumnsDTO.getId(), coreTableColumnDataProviderTableColumnsDTO);
                    }
                    coreTableColumnDataProviderTableDTO.setCoreTableColumnDataProviderTableColumnsDTOMap(coreTableColumnDataProviderTableColumnsDTOHashMap);
                });
                coreTableColumnDataProviderTableDTOLRUCache.put(coreTableColumnDataProviderTableId, coreTableColumnDataProviderTableDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderAttachmentDTOLRUCache() {
        for (Long coreTableColumnDataProviderAttachmentId : CoreServiceEntityTable.coreTableColumnDataProviderAttachmentEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderAttachmentEntity> coreTableColumnDataProviderAttachmentEntityOptional = CoreServiceEntityTable.coreTableColumnDataProviderAttachmentEntityLRUCache.get(coreTableColumnDataProviderAttachmentId);
            coreTableColumnDataProviderAttachmentEntityOptional.ifPresent(coreTableColumnDataProviderAttachmentEntity -> {
                CoreTableColumnDataProviderAttachmentDTO coreTableColumnDataProviderAttachmentDTO = ConvertUtil.convert(coreTableColumnDataProviderAttachmentEntity);
                coreTableDTOLRUCache.get(coreTableColumnDataProviderAttachmentEntity.getCore_attachment_core_table_id()).ifPresent(coreTableColumnDataProviderAttachmentDTO::setCoreAttachmentTable);
                coreTableDTOLRUCache.get(coreTableColumnDataProviderAttachmentEntity.getCore_attachment_assign_element_core_table_id()).ifPresent(coreTableColumnDataProviderAttachmentDTO::setCoreAttachmentAssignElementTable);
                coreTableDataSourceDTOLRUCache.get(coreTableColumnDataProviderAttachmentEntity.getBytes_core_table_datasource_id()).ifPresent(coreTableColumnDataProviderAttachmentDTO::setBytesDataSource);
                coreTableColumnDataProviderSerializerDTOLRUCache.get(coreTableColumnDataProviderAttachmentEntity.getCore_table_column_dataprovider_serializer_id()).ifPresent(coreTableColumnDataProviderAttachmentDTO::setCoreTableColumnDataProviderSerializerDTO);
                coreTableColumnDataProviderAttachmentDTOLRUCache.put(coreTableColumnDataProviderAttachmentEntity.getId(), coreTableColumnDataProviderAttachmentDTO);
            });
        }
        for (Long coreTableColumnDataProviderAttachmentAssignElementId : CoreServiceEntityTable.coreTableColumnDataProviderAttachmentAssignElementEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderAttachmentAssignElementEntity> coreTableColumnDataProviderAttachmentAssignElementEntityOptional = CoreServiceEntityTable.coreTableColumnDataProviderAttachmentAssignElementEntityLRUCache.get(coreTableColumnDataProviderAttachmentAssignElementId);
            coreTableColumnDataProviderAttachmentAssignElementEntityOptional.ifPresent(coreTableColumnDataProviderAttachmentAssignElementEntity -> {
                CoreTableColumnDataProviderAttachmentAssignElementDTO coreTableColumnDataProviderAttachmentAssignElementDTO = ConvertUtil.convert(coreTableColumnDataProviderAttachmentAssignElementEntity);
                coreAllElementDTOLRUCache.get(coreTableColumnDataProviderAttachmentAssignElementEntity.getCore_all_element_id()).ifPresent(coreTableColumnDataProviderAttachmentAssignElementDTO::setCoreAllElementDTO);
                Map<Long, CoreTableColumnDataProviderAttachmentAssignElementDTO> longCoreTableColumnDataProviderAttachmentAssignElementDTOMap = coreTableColumnDataProviderAttachmentAssignElementDTOLRUCache.get(coreTableColumnDataProviderAttachmentAssignElementEntity.getCore_all_element_id()).orElseGet(() -> {
                    Map<Long, CoreTableColumnDataProviderAttachmentAssignElementDTO> coreTableColumnDataProviderAttachmentAssignElementDTOMap = new HashMap<>();
                    coreTableColumnDataProviderAttachmentAssignElementDTOLRUCache.put(coreTableColumnDataProviderAttachmentAssignElementEntity.getCore_all_element_id(), coreTableColumnDataProviderAttachmentAssignElementDTOMap);
                    return coreTableColumnDataProviderAttachmentAssignElementDTOMap;
                });
                longCoreTableColumnDataProviderAttachmentAssignElementDTOMap.put(coreTableColumnDataProviderAttachmentAssignElementEntity.getRecord_id(), coreTableColumnDataProviderAttachmentAssignElementDTO);
            });
        }

        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderListDTOLRUCache() {
        for (Long coreTableColumnDataProviderId : CoreServiceEntityTable.coreTableColumnDataProviderListValuesEntityByListIdLRUCache.getKeySet()) {
            Optional<List<CoreTableColumnDataProviderListValuesEntity>> coreTableColumnDataProviderListValuesEntity = CoreServiceEntityTable.coreTableColumnDataProviderListValuesEntityByListIdLRUCache.get(coreTableColumnDataProviderId);
            coreTableColumnDataProviderListValuesEntity.ifPresent(coreTableColumnDataProviderListValuesEntities -> {
                Map<Long, CoreTableColumnDataProviderListValuesDTO> coreTableColumnDataProviderListValuesDTOS = new HashMap<>(coreTableColumnDataProviderListValuesEntities.size());
                for (CoreTableColumnDataProviderListValuesEntity tableColumnDataProviderListValuesEntity : coreTableColumnDataProviderListValuesEntities) {
                    CoreTableColumnDataProviderListValuesDTO tableColumnDataProviderListValuesDTO = ConvertUtil.convert(tableColumnDataProviderListValuesEntity);
                    coreTableColumnDataProviderListValuesDTOS.put(tableColumnDataProviderListValuesEntity.getId(), tableColumnDataProviderListValuesDTO);
                }
                coreTableColumnDataProviderListValuesDTOLRUCache.put(coreTableColumnDataProviderId, coreTableColumnDataProviderListValuesDTOS);
            });
        }
        for (Long coreTableColumnDataProviderListEntityId : CoreServiceEntityTable.coreTableColumnDataProviderListEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderListEntity> coreTableColumnDataProviderListEntityOptional = CoreServiceEntityTable.coreTableColumnDataProviderListEntityLRUCache.get(coreTableColumnDataProviderListEntityId);
            coreTableColumnDataProviderListEntityOptional.ifPresent(coreTableColumnDataProviderListEntity -> {
                CoreTableColumnDataProviderListDTO coreTableColumnDataProviderListDTO = ConvertUtil.convert(coreTableColumnDataProviderListEntity);

                if (coreTableColumnDataProviderListEntity.getCore_table_column_dataprovider_serializer_id() > 0) {
                    Optional<CoreTableColumnDataProviderSerializerDTO> coreTableColumnDataProviderSerializerDTOOptional = coreTableColumnDataProviderSerializerDTOLRUCache.get(coreTableColumnDataProviderListEntity.getCore_table_column_dataprovider_serializer_id());
                    coreTableColumnDataProviderSerializerDTOOptional.ifPresent(coreTableColumnDataProviderListDTO::setCoreTableColumnDataProviderSerializerDTO);
                }

                coreTableColumnDataProviderListValuesDTOLRUCache.get(coreTableColumnDataProviderListEntity.getId()).ifPresent(coreTableColumnDataProviderListDTO::setCoreTableColumnDataProviderListValuesDTODTOMap);

                coreTableColumnDataProviderListDTOLRUCache.put(coreTableColumnDataProviderListEntity.getId(), coreTableColumnDataProviderListDTO);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreTableColumnDataProviderPrimaryDTO() {
        for (Long coreTableColumnDataProviderPrimaryId : CoreServiceEntityTable.coreTableColumnDataProviderPrimaryEntityLRUCache.getKeySet()) {
            Optional<CoreTableColumnDataProviderPrimaryEntity> entity = CoreServiceEntityTable.coreTableColumnDataProviderPrimaryEntityLRUCache.get(coreTableColumnDataProviderPrimaryId);
            entity.ifPresent(coreTableColumnDataProviderPrimaryEntity -> {
                CoreTableColumnDataProviderPrimaryDTO dto = ConvertUtil.convert(coreTableColumnDataProviderPrimaryEntity);

                if (coreTableColumnDataProviderPrimaryEntity.getCore_table_column_dataprovider_serializer_id() != null) {
                    Optional<CoreTableColumnDataProviderSerializerDTO> coreTableColumnDataProviderSerializerDTOOptional = coreTableColumnDataProviderSerializerDTOLRUCache.get(coreTableColumnDataProviderPrimaryEntity.getCore_table_column_dataprovider_serializer_id());
                    coreTableColumnDataProviderSerializerDTOOptional.ifPresent(dto::setCoreTableColumnDataProviderSerializerDTO);
                }

                coreTableColumnDataProviderPrimaryDTOLRUCache.put(coreTableColumnDataProviderPrimaryId, dto);
            });
        }
        return Mono.just(complete);
    }

    private Mono<Serializable> coreWindowTabDTO() {
        for (Long coreWindowTabFilterId : CoreServiceEntityTable.coreWindowTabFilterEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabFilterEntity> coreWindowTabFilterEntityOptional = CoreServiceEntityTable.coreWindowTabFilterEntityLRUCache.get(coreWindowTabFilterId);
            coreWindowTabFilterEntityOptional.ifPresent(coreWindowTabFilterEntity -> {
                CoreWindowTabFilterDTO coreWindowTabFilterDTO = ConvertUtil.convert(coreWindowTabFilterEntity);
                coreWindowTabFilterDTOLRUCache.put(coreWindowTabFilterDTO.getId(), coreWindowTabFilterDTO);

                Map<Long, CoreWindowTabFilterDTO> mapOfTab = coreWindowTabFilterDTOPerTabIdLRUCache.get(coreWindowTabFilterDTO.getCoreWindowTabId()).orElseGet(() -> {
                    Map<Long, CoreWindowTabFilterDTO> mapOf = new HashMap<>();
                    coreWindowTabFilterDTOPerTabIdLRUCache.put(coreWindowTabFilterDTO.getCoreWindowTabId(), mapOf);
                    return mapOf;
                });

                mapOfTab.put(coreWindowTabFilterEntity.getId(), coreWindowTabFilterDTO);
            });
        }

        for (Long coreWindowTabTypeEntityId : CoreServiceEntityTable.coreWindowTabTypeEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabTypeEntity> coreWindowTabTypeEntityOptional = CoreServiceEntityTable.coreWindowTabTypeEntityLRUCache.get(coreWindowTabTypeEntityId);
            coreWindowTabTypeEntityOptional.ifPresent(coreWindowTabTypeEntity -> {
                CoreWindowTabTypeDTO coreWindowTabTypeDTO = ConvertUtil.convert(coreWindowTabTypeEntity);
                coreWindowTabTypeDTOLRUCache.put(coreWindowTabTypeDTO.getId(), coreWindowTabTypeDTO);
            });
        }

        for (Long coreWindowTabJoinColumnEntityId : CoreServiceEntityTable.coreWindowTabJoinColumnEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabJoinColumnEntity> coreWindowTabJoinColumnEntityOptional = CoreServiceEntityTable.coreWindowTabJoinColumnEntityLRUCache.get(coreWindowTabJoinColumnEntityId);
            coreWindowTabJoinColumnEntityOptional.ifPresent(coreWindowTabJoinColumnEntity -> {
                Optional<CoreWindowTabTypeDTO> coreWindowTabTypeDTO = coreWindowTabTypeDTOLRUCache.get(coreWindowTabJoinColumnEntity.getCore_window_tab_type_id());
                CoreWindowTabJoinColumnDTO coreWindowTabJoinColumnDTO = ConvertUtil.convert(coreWindowTabJoinColumnEntity);
                coreWindowTabTypeDTO.ifPresent(coreWindowTabJoinColumnDTO::setCoreWindowTabTypeDTO);

                Map<Long, CoreWindowTabJoinColumnDTO> coreWindowTabJoinColumnDTOS = coreWindowTabJoinColumnDTOPerChildTabIdLRUCache.get(coreWindowTabJoinColumnDTO.getCoreWindowTabChildId()).orElseGet(() -> {
                    Map<Long, CoreWindowTabJoinColumnDTO> coreWindowTabJoinColumnDTOSNew = new HashMap<>();
                    coreWindowTabJoinColumnDTOPerChildTabIdLRUCache.put(coreWindowTabJoinColumnDTO.getCoreWindowTabChildId(), coreWindowTabJoinColumnDTOSNew);
                    return coreWindowTabJoinColumnDTOSNew;
                });
                coreWindowTabJoinColumnDTOS.put(coreWindowTabJoinColumnDTO.getCoreWindowTabMasterId(), coreWindowTabJoinColumnDTO);
            });
        }

        for (Long coreWindowTabFieldEntityId : CoreServiceEntityTable.coreWindowTabFieldEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabFieldEntity> coreWindowTabFieldEntityOptional = CoreServiceEntityTable.coreWindowTabFieldEntityLRUCache.get(coreWindowTabFieldEntityId);
            coreWindowTabFieldEntityOptional.ifPresent(coreWindowTabFieldEntity -> {
                CoreAllElementDTO coreAllElementDTO_Field = findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Field);

                CoreWindowTabFieldDTO coreWindowTabFieldDTO = ConvertUtil.convert(coreWindowTabFieldEntity);
                CoreWindowTabDTO coreWindowTabDTO = coreWindowTabDTOLRUCache.get(coreWindowTabFieldEntity.getCore_window_tab_id()).orElse(null);

                if (coreWindowTabDTO == null) {
                    Optional<CoreWindowTabEntity> coreWindowTabEntityOptional = CoreServiceEntityTable.coreWindowTabEntityLRUCache.get(coreWindowTabFieldDTO.getCoreTabId());
                    if (coreWindowTabEntityOptional.isPresent()) {
                        CoreAllElementDTO coreAllElementDTO_Tab = findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Tab);
                        CoreAllElementDTO coreAllElementDTO_Toolbar = findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.CoreWindowTab_Toolbar);

                        CoreWindowTabEntity coreWindowTabEntity = coreWindowTabEntityOptional.get();
                        Optional<CoreTableDTO> coreTableDTOOptional = coreTableDTOLRUCache.get(coreWindowTabEntity.getCore_table_id());

                        Map<Long, CoreLayoutAssignElementDTO> coreWindowTabLayoutDTOMap_Tab = coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache.get(coreAllElementDTO_Tab.getId()).map(longMapMap -> longMapMap.get(coreWindowTabEntity.getId())).orElse(new HashMap<>());
                        Map<Long, CoreLayoutAssignElementDTO> coreWindowTabLayoutDTOMap_Toolbar = coreLayoutAssignElementDTOByElementIdAndRecordIdLRUCache.get(coreAllElementDTO_Toolbar.getId()).map(longMapMap -> longMapMap.get(coreWindowTabEntity.getId())).orElse(new HashMap<>());

                        coreWindowTabDTO = ConvertUtil.convert(coreWindowTabEntity);
                        coreWindowTabDTO.setCoreAllElementDTO(coreAllElementDTO_Tab);
                        coreWindowTabDTO.setCoreLayoutAssignElementDTOMap_Tab(coreWindowTabLayoutDTOMap_Tab);
                        coreWindowTabDTO.setCoreLayoutAssignElementDTOMap_Toolbar(coreWindowTabLayoutDTOMap_Toolbar);
                        coreWindowTabJoinColumnDTOPerChildTabIdLRUCache.get(coreWindowTabDTO.getId()).ifPresent(coreWindowTabDTO::setCoreWindowTabJoinColumnDTOMap);
                        coreWorkflowActionDTOLRUCache.get(coreWindowTabEntity.getCore_workflow_action_id()).ifPresent(coreWindowTabDTO::setCoreWorkflowActionDTO);
                        coreWindowTabFilterDTOPerTabIdLRUCache.get(coreWindowTabDTO.getId()).ifPresent(coreWindowTabDTO::setCoreWindowTabFilterDTOMap);

                        if (coreTableDTOOptional.isPresent()) {
                            coreWindowTabDTO.setCoreTableDTO(coreTableDTOOptional.get());
                            Optional<List<CoreWindowTabDTO>> coreWindowTabList = coreWindowTabDTOByCoreTableIdLRUCache.get(coreWindowTabDTO.getCoreTableDTO().getId());
                            List<CoreWindowTabDTO> coreWindowTabDTOS = null;
                            if (coreWindowTabList.isEmpty()) {
                                coreWindowTabDTOS = new ArrayList<>();
                                coreWindowTabDTOByCoreTableIdLRUCache.put(coreWindowTabDTO.getCoreTableDTO().getId(), coreWindowTabDTOS);
                            } else {
                                coreWindowTabDTOS = coreWindowTabList.get();
                            }
                            coreWindowTabDTOS.add(coreWindowTabDTO);
                        }

                        coreWindowTabDTOLRUCache.put(coreWindowTabDTO.getId(), coreWindowTabDTO);

                        Optional<CoreWindowDTO> coreWindowDTOOptional = coreWindowDTOLRUCache.get(coreWindowTabEntity.getCore_window_id());

                        if (coreWindowDTOOptional.isPresent()) {
                            CoreWindowDTO coreWindowDTO = coreWindowDTOOptional.get();
                            coreWindowDTO.getCoreWindowTabDTOMap().put(coreWindowTabDTO.getId(), coreWindowTabDTO);
                        } else {
                            Optional<CoreWindowEntity> coreWindowEntityOptional = CoreServiceEntityTable.coreWindowEntityLRUCache.get(coreWindowTabEntity.getCore_window_id());
                            CoreWindowTabDTO finalCoreWindowTabDTO = coreWindowTabDTO;
                            coreWindowEntityOptional.ifPresent(coreWindowEntity -> {
                                CoreWindowDTO coreWindowDTO = ConvertUtil.convert(coreWindowEntity);
                                coreWindowDTO.getCoreWindowTabDTOMap().put(finalCoreWindowTabDTO.getId(), finalCoreWindowTabDTO);
                                Optional<CoreAllElementEntity> coreAllElementIdOptional = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(CoreAllElementRegisterKeyEnum.Window.toString());
                                coreAllElementIdOptional.flatMap(coreAllElementEntity -> coreViewModelAssignElementDTOByCoreAllElementAndRecordIdLRUCache.get(coreAllElementEntity.getId())).ifPresent(longMapMap -> {
                                    Map<Long, CoreViewModuleAssignElementDTO> coreViewModuleAssignElementDTOMap = longMapMap.get(coreWindowDTO.getId());
                                    coreViewModuleAssignElementDTOMap.forEach((aLong, coreViewModuleAssignElementDTO) -> {
                                        coreWindowDTO.setCoreViewModuleDTO(coreViewModuleAssignElementDTO.getCoreViewModuleDTO());
                                    });
                                });

                                coreWindowDTOLRUCache.put(coreWindowDTO.getId(), coreWindowDTO);
                            });
                        }
                    }
                }

                if (coreWindowTabFieldEntity.getCore_table_column_editor_id() != null) {
                    Optional<CoreTableColumnEditorDTO> coreTableColumnEditorDTOOptional = coreTableColumnEditorDTOLRUCache.get(coreWindowTabFieldEntity.getCore_table_column_editor_id());
                    coreTableColumnEditorDTOOptional.ifPresent(coreWindowTabFieldDTO::setCoreTableColumnEditorDTO);
                }
                if (coreWindowTabFieldEntity.getCore_table_column_dataprovider_id() != null) {
                    Optional<CoreTableColumnDataProviderDTO> coreTableColumnDataProviderDTOOptional = coreTableColumnDataProviderDTOLRUCache.get(coreWindowTabFieldEntity.getCore_table_column_dataprovider_id());
                    coreTableColumnDataProviderDTOOptional.ifPresent(coreTableColumnDataProviderDTO -> {
                        refactorCoreTableColumnDataProviderDTO(coreTableColumnDataProviderDTO);
                        coreWindowTabFieldDTO.setCoreTableColumnDataProviderDTO(coreTableColumnDataProviderDTO);
                    });
                }

                if (coreWindowTabFieldEntity.getCore_table_column_id() != null) {
                    Optional<CoreTableColumnDTO> coreTableColumnDTOOptional = coreTableColumnDTOLRUCache.get(coreWindowTabFieldEntity.getCore_table_column_id());
                    coreTableColumnDTOOptional.ifPresent(coreTableColumnDTO -> {
                        refactorCoreTableColumnDataProviderDTO(coreTableColumnDTO.getCoreTableColumnDataProviderDTO());
                        coreWindowTabFieldDTO.setCoreTableColumnDTO(coreTableColumnDTO);
                    });
                }

                Map<Long, CoreLayoutDataAssignElementDTO> coreLayoutDataAssignElementDTOMap = coreLayoutDataAssignElementDTOByElementIdAndRecordIdLRUCache.get(coreAllElementDTO_Field.getId()).map(longMapMap -> {
                    return longMapMap.get(coreWindowTabFieldEntity.getId());
                }).orElse(new HashMap<>());

                coreWindowTabFieldDTO.setCoreLayoutDataAssignElementDTOMap(coreLayoutDataAssignElementDTOMap);

                coreWindowTabFieldDTOLRUCache.put(coreWindowTabFieldDTO.getId(), coreWindowTabFieldDTO);
                if (coreWindowTabDTO != null) {
                    coreWindowTabDTO.getCoreWindowTabFieldDTOMap().put(coreWindowTabFieldDTO.getId(), coreWindowTabFieldDTO);
                }
            });
        }

        for (Long coreWindowTabFilterFieldId : CoreServiceEntityTable.coreWindowTabFilterFieldEntityLRUCache.getKeySet()) {
            Optional<CoreWindowTabFilterFieldEntity> coreWindowTabFilterFieldEntityOptional = CoreServiceEntityTable.coreWindowTabFilterFieldEntityLRUCache.get(coreWindowTabFilterFieldId);
            coreWindowTabFilterFieldEntityOptional.ifPresent(coreWindowTabFilterFieldEntity -> {
                CoreWindowTabFilterFieldDTO coreWindowTabFilterFieldDTO = ConvertUtil.convert(coreWindowTabFilterFieldEntity);
                coreWindowTabFieldDTOLRUCache.get(coreWindowTabFilterFieldEntity.getCore_window_tab_field_id()).ifPresent(coreWindowTabFilterFieldDTO::setCoreWindowTabFieldDTO);

                coreWindowTabFilterFieldDTOLRUCache.put(coreWindowTabFilterFieldDTO.getId(), coreWindowTabFilterFieldDTO);

                coreWindowTabFilterDTOLRUCache.get(coreWindowTabFilterFieldEntity.getCore_window_tab_filter_id()).ifPresent(coreWindowTabFilterDTO -> {
                    coreWindowTabFilterDTO.getCoreWindowTabFilterFieldDTOMap().put(coreWindowTabFilterFieldDTO.getId(), coreWindowTabFilterFieldDTO);
                });
            });
        }

        Optional<CoreTableEntity> coreButtonAssignElementTableEntityOptional = CoreServiceEntityTable.coreTableEntityByTableNameLRUCache.get(CoreServiceBaseEntity.findTableName(CoreButtonAssignElementEntity.class));

        coreButtonAssignElementTableEntityOptional.ifPresent(coreTableEntity -> {
            for (Long coreWindowTabDTOId : coreWindowTabDTOLRUCache.getKeySet()) {
                Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = coreWindowTabDTOLRUCache.get(coreWindowTabDTOId);
                coreWindowTabDTOOptional.ifPresent(coreWindowTabDTO -> {
                    List<CoreButtonAssignElementEntity> coreButtonAssignElementRecordEntityEntityList = CoreServiceEntityTable.coreButtonAssignElementRecordDTOByElementTypeAndRecordIdEnum(CoreAllElementRegisterKeyEnum.Tab, coreWindowTabDTO.getId());

                    for (CoreButtonAssignElementEntity coreButtonAssignElementEntity : coreButtonAssignElementRecordEntityEntityList) {
                        CoreButtonAssignElementDTO coreButtonAssignElementDTO = convertCoreButtonAssignElementEntity(coreButtonAssignElementEntity);
                        coreWindowTabDTO.getCoreButtonAssignElementDTOMap().put(coreButtonAssignElementDTO.getId(), coreButtonAssignElementDTO);
                    }
                });
            }
        });
        return Mono.just(complete);
    }

    private void refactorCoreTableColumnDataProviderDTO(CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO) {
        if (coreTableColumnDataProviderDTO != null && coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeId() != null) {
            CoreTableColumnDataProviderTypeEnum type = CoreTableColumnDataProviderTypeEnum.findType(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeId());
            switch (type) {
                case Table -> {
                    Optional<CoreTableColumnDataProviderTableDTO> coreTableColumnDataProviderTableDTOOptional = coreTableColumnDataProviderTableDTOLRUCache.get(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
                    coreTableColumnDataProviderTableDTOOptional.ifPresent(coreTableColumnDataProviderTableDTO -> {
                        coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderTableDTO.getCoreTableColumnDataProviderSerializerDTO());
                    });
                }
                case List -> {
                    Optional<CoreTableColumnDataProviderListDTO> coreTableColumnDataProviderListDTOOptional = coreTableColumnDataProviderListDTOLRUCache.get(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
                    coreTableColumnDataProviderListDTOOptional.ifPresent(coreTableColumnDataProviderListDTO -> {
                        coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderListDTO.getCoreTableColumnDataProviderSerializerDTO());
                    });
                }
                case Primary -> {
                    Optional<CoreTableColumnDataProviderPrimaryDTO> coreTableColumnDataProviderPrimaryDTOOptional = coreTableColumnDataProviderPrimaryDTOLRUCache.get(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
                    coreTableColumnDataProviderPrimaryDTOOptional.ifPresent(coreTableColumnDataProviderPrimaryDTO -> {
                        coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderPrimaryDTO.getCoreTableColumnDataProviderSerializerDTO());
                    });
                }
                case Attachment -> {
                    Optional<CoreTableColumnDataProviderAttachmentDTO> coreTableColumnDataProviderAttachmentDTOOptional = coreTableColumnDataProviderAttachmentDTOLRUCache.get(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
                    coreTableColumnDataProviderAttachmentDTOOptional.ifPresent(coreTableColumnDataProviderAttachmentDTO -> {
                        coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO().setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderAttachmentDTO.getCoreTableColumnDataProviderSerializerDTO());
                    });
                }
                case null -> {
                }
            }
        }
    }

    public CoreButtonAssignElementDTO convertCoreButtonAssignElementEntity(CoreButtonAssignElementEntity coreButtonAssignElementEntity) {
        CoreButtonAssignElementDTO coreButtonAssignElementDTO = ConvertUtil.convert(coreButtonAssignElementEntity);
        coreAllElementDTOLRUCache.get(coreButtonAssignElementEntity.getCore_all_element_id()).ifPresent(coreButtonAssignElementDTO::setCoreAllElementDTO);
        coreAllElementDTOLRUCache.get(coreButtonAssignElementEntity.getCore_all_element_id_module()).ifPresent(coreButtonAssignElementDTO::setCoreAllElementDTOModule);
        coreButtonDTOLRUCache.get(coreButtonAssignElementEntity.getCore_button_id()).ifPresent(coreButtonAssignElementDTO::setCoreButtonDTO);
        if (coreButtonAssignElementEntity.getCore_css_id() != null) {
            coreCssDTOLRUCache.get(coreButtonAssignElementEntity.getCore_css_id()).ifPresent(coreButtonAssignElementDTO::setCoreCssDTO);
        }
        coreButtonAssignElementDTO.setCoreAllElementExtraAttributeValueDTOMap(new HashMap<>());
//        coreButtonAssignElementDTO.setExtraAttributeValueDTOMap(coreAllElementExtraAttributeValueMap(coreTableEntity, coreButtonActionEntity.getRecord_id().get()));
        return coreButtonAssignElementDTO;
    }

    public static CoreWindowDTO translateWindow(CoreWindowDTO coreWindowDTO, CoreUserAuthenticateRequestDTO userSecurity, CoreTranslateLanguageDTO coreTranslateLanguageDTO) {
        String translateWindow = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Window, coreTranslateLanguageDTO, coreWindowDTO.getId());
        coreWindowDTO.setTranslate(translateWindow);

        coreWindowDTO.getCoreWindowTabDTOMap().forEach((tabId, coreWindowTabDTO) -> {
            CoreServiceDTOTable.translateTab(coreWindowTabDTO, userSecurity, coreTranslateLanguageDTO);
        });
        return coreWindowDTO;
    }

    public static CoreWindowTabDTO translateTab(CoreWindowTabDTO coreWindowTabDTO, CoreUserAuthenticateRequestDTO userSecurity, CoreTranslateLanguageDTO coreTranslateLanguageDTO) {
        String translateTab = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Tab, coreTranslateLanguageDTO, coreWindowTabDTO.getId());
        coreWindowTabDTO.setTranslate(translateTab);

        coreWindowTabDTO.getCoreWindowTabFieldDTOMap().forEach((fieldId, coreWindowTabFieldDTO) -> {
            String translateField = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Field, coreTranslateLanguageDTO, coreWindowTabFieldDTO.getId());
            coreWindowTabFieldDTO.setTranslate(translateField);

            if (coreWindowTabFieldDTO.getCoreTableColumnDTO() != null) {
                String translateColumn = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Column, coreTranslateLanguageDTO, coreWindowTabFieldDTO.getCoreTableColumnDTO().getId());
                coreWindowTabFieldDTO.getCoreTableColumnDTO().setTranslate(translateColumn);
            }
        });

        coreWindowTabDTO.getCoreButtonAssignElementDTOMap().forEach((buttonId, coreWindowTabButtonDTO) -> {
            String translateButton = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Button, coreTranslateLanguageDTO, coreWindowTabButtonDTO.getId());
            coreWindowTabButtonDTO.setTranslate(translateButton);
        });
        return coreWindowTabDTO;
    }

    public String coreTranslateDTOMono(CoreTranslateLanguageDTO coreTranslateLanguageDTO, String registerKey, Long recordId) {
        Optional<CoreAllElementEntity> coreAllElement = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(registerKey);
        if (coreAllElement.isPresent() && coreAllElement.get().getId() != null) {
            Long coreAllElementId = coreAllElement.get().getId();
            CoreTranslateEntity coreTranslateEntity = CoreServiceEntityTable.translate(coreTranslateLanguageDTO.getId(), coreAllElementId, recordId);
            if (coreTranslateEntity != null) {
                return coreTranslateEntity.getTranslate_value();
            }
        }
        return null;
    }

    public static void convertToTranslateWithDetailDTO(CoreTranslateLanguageDTO coreTranslateLanguageDTO, CoreAllElementDetailEntity coreAllElementDetailEntity, Long coreAllElementId, Map<Long, CoreTranslateDTO> coreTranslateDTOMap, CoreAllElementDTO coreAllElementDTO) {
        CoreTranslateEntity coreTranslate = CoreServiceEntityTable.translate(coreTranslateLanguageDTO.getId(), coreAllElementId, coreAllElementDetailEntity.getId());
        if (coreTranslate != null) {
            CoreTranslateDTO coreTranslateDTO = convert(coreTranslate, coreAllElementDetailEntity, coreTranslateLanguageDTO, coreAllElementDTO);
            coreTranslateDTOMap.put(coreTranslateDTO.getRecordId(), coreTranslateDTO);
        }
    }

    public static void convertToTranslateWithOutRecordId(CoreTranslateLanguageDTO coreTranslateLanguageDTO, Long coreAllElementId, Map<Long, CoreTranslateDTO> coreTranslateDTOMap, CoreAllElementDTO coreAllElementDTO) {
        HashMap<Long, CoreTranslateEntity> longCoreTranslateEntityHashMap = CoreServiceEntityTable.translateWithOutRecordId(coreTranslateLanguageDTO.getId(), coreAllElementId);
        if (longCoreTranslateEntityHashMap != null) {
            longCoreTranslateEntityHashMap.forEach((aLong, coreTranslateEntity) -> {
                CoreTranslateDTO coreTranslateDTO = convert(coreTranslateEntity, null, coreTranslateLanguageDTO, coreAllElementDTO);
                coreTranslateDTOMap.put(coreTranslateDTO.getRecordId(), coreTranslateDTO);
            });
        }
    }

    public static CoreTranslateDTO convert(CoreTranslateEntity coreTranslate, CoreAllElementDetailEntity coreAllElementDetailEntity, CoreTranslateLanguageDTO coreTranslateLanguageDTO, CoreAllElementDTO coreAllElementDTO) {
        CoreTranslateDTO coreTranslateDTO = new CoreTranslateDTO();
        coreTranslateDTO.setCoreTranslateLanguageDTO(coreTranslateLanguageDTO);
        coreTranslateDTO.setId(coreTranslate.getId());
        coreTranslateDTO.setRecordId(coreTranslate.getRecord_id());
        coreTranslateDTO.setCoreAllElementDTO(coreAllElementDTO);

        if (coreAllElementDetailEntity != null) {
            HashMap<String, String> keyTranslate = new HashMap<>();
            keyTranslate.put("id", coreAllElementDetailEntity.getId() + "");
            keyTranslate.put("name", coreAllElementDetailEntity.getName());

            coreTranslateDTO.setCoreGeneralRecordDTO(keyTranslate);
        }

        if (coreTranslate.getTranslate_value() != null) {
            coreTranslateDTO.setTranslateValue(coreTranslate.getTranslate_value());
        }
        return coreTranslateDTO;
    }

    public static CoreAllElementDetailEntity findCoreElement(List<CoreAllElementDetailEntity> coreElementList, String exceptionKeyString) {
        for (CoreAllElementDetailEntity coreAllElementDetailEntity : coreElementList) {
            if (exceptionKeyString.equalsIgnoreCase(coreAllElementDetailEntity.getName())) {
                return coreAllElementDetailEntity;
            }
        }
        return null;
    }

    public static CoreAllElementDTO findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum elementType) {
        return coreAllElementDTOByKeyLRUCache.get(elementType.toString().toLowerCase()).orElse(null);
    }

    public static CoreAllElementDTO findCoreAllElementByRegisterKey(String registerKey) {
        return coreAllElementDTOByKeyLRUCache.get(registerKey.toLowerCase()).orElse(null);
    }

    public static CoreAllElementDTO findCoreAllElementByCoreTableId(Long coreTableId) {
        return coreAllElementDTOByCoreTableIdLRUCache.get(coreTableId).orElse(null);
    }

//    public static Map<Long, CoreAllElementExtraAttributeValueDTO> coreAllElementExtraAttributeValueMap(CoreTableEntity coreWindowTabButtonTableEntity, Long coreWindowTabButtonId) {
//        Map<Long, CoreAllElementExtraAttributeValueDTO> extraAttributeValueDTOMap = new HashMap<>();
//        Optional<CoreAllElementEntity> coreAllElementEntityOptional = CoreServiceEntityTable.coreAllElementByCoreTableIdEntityLRUCache.get(coreWindowTabButtonTableEntity.getId());
//        coreAllElementEntityOptional.map(CoreAllElementEntity::getId).ifPresent(coreAllElementEntityId -> {
//            Optional<List<CoreAllElementExtraAttributeEntity>> listExtraAttribute = CoreServiceEntityTable.coreAllElementExtraAttributeEntityByCoreAllElementIdLRUCache.get(coreAllElementEntityId);
//            if (listExtraAttribute.isPresent()) {
//                for (CoreAllElementExtraAttributeEntity coreAllElementExtraAttributeEntity : listExtraAttribute.get()) {
//                    Optional<Map<Long, CoreAllElementExtraAttributeValueEntity>> mapCoreAllElementExtraAttributeValueOptional = CoreServiceEntityTable.coreAllElementExtraAttributeValueEntityByAttributeIdAndRecordIdLRUCache.get(coreAllElementExtraAttributeEntity.getId());
//                    mapCoreAllElementExtraAttributeValueOptional.ifPresent(mapCoreAllElementExtraAttributeValue -> {
//                        CoreAllElementExtraAttributeValueEntity coreAllElementExtraAttributeValue = mapCoreAllElementExtraAttributeValue.get(coreWindowTabButtonId);
//                        if (coreAllElementExtraAttributeValue != null) {
//                            extraAttributeValueDTOMap.put(coreWindowTabButtonId, ConvertUtil.convert(coreAllElementExtraAttributeValue));
//                        }
//                    });
//                }
//            }
//        });
//        return extraAttributeValueDTOMap;
//    }

}
