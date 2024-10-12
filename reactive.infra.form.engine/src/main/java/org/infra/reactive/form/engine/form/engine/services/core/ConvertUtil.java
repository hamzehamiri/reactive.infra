package org.infra.reactive.form.engine.form.engine.services.core;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestOperandEnum;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportLayoutDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field.CoreAnalyticReportFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.css.CoreCssDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementExtraAttributeValueDTO;
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
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
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
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.analytic.report.CoreAnalyticReportLayoutEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.common.CommonCountryEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.css.CoreCssEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.dashboard.*;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementExtraAttributeValueEntity;
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
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;
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
import org.infra.reactive.form.engine.form.engine.model.tables.translate.CoreTranslateLanguageEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.view.CoreViewModuleAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.view.CoreViewModuleEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.window.CoreWindowEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.window.tab.*;
import org.infra.reactive.form.engine.form.engine.model.tables.wizard.CoreWizardEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.wizard.CoreWizardStateEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.wizard.CoreWizardStateValueEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.wizard.CoreWizardValidationEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowActionEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowActionTypeEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.workflow.CoreWorkflowEntity;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.LogicalOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ConvertUtil {

    public static CoreWindowTabFilterDTO convert(CoreWindowTabFilterEntity coreWindowTabFilterEntity) {
        CoreWindowTabFilterDTO coreWindowTabFilterDTO = new CoreWindowTabFilterDTO();
        coreWindowTabFilterDTO.setId(coreWindowTabFilterEntity.getId());
        coreWindowTabFilterDTO.setName(coreWindowTabFilterEntity.getName());
        coreWindowTabFilterDTO.setCoreWindowTabId(coreWindowTabFilterEntity.getCore_window_tab_id());
        coreWindowTabFilterDTO.setActiveDefault(coreWindowTabFilterEntity.getActive_default());
        coreWindowTabFilterDTO.setRegisterKeySide(coreWindowTabFilterEntity.getRegister_key_side());
        coreWindowTabFilterDTO.setCoreWindowTabFilterFieldDTOMap(new HashMap<>());
        return coreWindowTabFilterDTO;
    }

    public static CoreWindowTabFilterFieldDTO convert(CoreWindowTabFilterFieldEntity coreWindowTabFilterFieldEntity) {
        CoreWindowTabFilterFieldDTO coreWindowTabFilterFieldDTO = new CoreWindowTabFilterFieldDTO();
        coreWindowTabFilterFieldDTO.setId(coreWindowTabFilterFieldEntity.getId());
        coreWindowTabFilterFieldDTO.setCoreWindowTabFilterId(coreWindowTabFilterFieldEntity.getCore_window_tab_filter_id());
        return coreWindowTabFilterFieldDTO;
    }

    public static CoreAllElementPropertiesValueDTO convert(CoreAllElementPropertiesDTO coreAllElementPropertiesDTO, String value) {
        CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = new CoreAllElementPropertiesValueDTO();
        coreAllElementPropertiesValueDTO.setCoreAllElementPropertiesDTO(coreAllElementPropertiesDTO);
        coreAllElementPropertiesValueDTO.setValue(value);
        return coreAllElementPropertiesValueDTO;
    }

    public static CoreAllElementPropertiesDTO convert(CoreAllElementPropertiesEntity coreAllElementPropertiesEntity) {
        CoreAllElementPropertiesDTO coreAllElementPropertiesDTO = new CoreAllElementPropertiesDTO();
        coreAllElementPropertiesDTO.setId(coreAllElementPropertiesEntity.getId());
        coreAllElementPropertiesDTO.setName(coreAllElementPropertiesEntity.getName());
        coreAllElementPropertiesDTO.setRecordId(coreAllElementPropertiesEntity.getRecord_id());
        coreAllElementPropertiesDTO.setRegisterKey(coreAllElementPropertiesEntity.getRegister_key());
        return coreAllElementPropertiesDTO;
    }

    public static CoreAllElementPropertiesValueDTO convert(CoreAllElementPropertiesValueEntity coreAllElementPropertiesValueEntity) {
        CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = new CoreAllElementPropertiesValueDTO();
        coreAllElementPropertiesValueDTO.setId(coreAllElementPropertiesValueEntity.getId());
        coreAllElementPropertiesValueDTO.setValue(coreAllElementPropertiesValueEntity.getValue());
        return coreAllElementPropertiesValueDTO;
    }

    public static CoreWorkflowActionDTO convert(CoreWorkflowActionEntity coreWorkflowActionEntity) {
        CoreWorkflowActionDTO coreWorkflowActionDTO = new CoreWorkflowActionDTO();
        coreWorkflowActionDTO.setId(coreWorkflowActionEntity.getId());
        coreWorkflowActionDTO.setName(coreWorkflowActionEntity.getName());
        coreWorkflowActionDTO.setRegisterKey(coreWorkflowActionEntity.getRegister_key());
        return coreWorkflowActionDTO;
    }

    public static CoreWorkflowActionTypeDTO convert(CoreWorkflowActionTypeEntity coreWorkflowActionTypeEntity) {
        CoreWorkflowActionTypeDTO coreWorkflowActionTypeDTO = new CoreWorkflowActionTypeDTO();
        coreWorkflowActionTypeDTO.setId(coreWorkflowActionTypeEntity.getId());
        coreWorkflowActionTypeDTO.setName(coreWorkflowActionTypeEntity.getName());
        return coreWorkflowActionTypeDTO;
    }

    public static CoreWorkflowDTO convert(CoreWorkflowEntity coreWorkflowEntity) {
        CoreWorkflowDTO coreWorkflowDTO = new CoreWorkflowDTO();
        coreWorkflowDTO.setId(coreWorkflowEntity.getId());
        coreWorkflowDTO.setName(coreWorkflowEntity.getName());
        return coreWorkflowDTO;
    }

    public static CoreTableDataSourceTypeDTO convert(CoreTableDataSourceTypeEntity coreTableDataSourceTypeEntity) {
        CoreTableDataSourceTypeDTO coreTableDataSourceTypeDTO = new CoreTableDataSourceTypeDTO();
        coreTableDataSourceTypeDTO.setId(coreTableDataSourceTypeEntity.getId());
        coreTableDataSourceTypeDTO.setName(coreTableDataSourceTypeEntity.getName());
        coreTableDataSourceTypeDTO.setRdbms(coreTableDataSourceTypeEntity.getIs_rdbms());
        coreTableDataSourceTypeDTO.setNosql(coreTableDataSourceTypeEntity.getIs_nosql());
        return coreTableDataSourceTypeDTO;
    }

    public static CoreHostClusterDTO convert(CoreHostClusterEntity coreHostClusterEntity) {
        CoreHostClusterDTO coreHostClusterDTO = new CoreHostClusterDTO();
        coreHostClusterDTO.setId(coreHostClusterEntity.getId());
        coreHostClusterDTO.setName(coreHostClusterEntity.getName());
        return coreHostClusterDTO;
    }

    public static CoreHostClusterNodeDTO convert(CoreHostClusterNodeEntity coreHostClusterNodeEntity) {
        CoreHostClusterNodeDTO coreHostClusterNodeDTO = new CoreHostClusterNodeDTO();
        coreHostClusterNodeDTO.setId(coreHostClusterNodeEntity.getId());
        coreHostClusterNodeDTO.setCoreHostClusterId(coreHostClusterNodeEntity.getCore_host_cluster_id());
        coreHostClusterNodeDTO.setPort(coreHostClusterNodeEntity.getPort());
        return coreHostClusterNodeDTO;
    }

    public static CoreWindowTabPluggableAssignTabDTO convert(CoreWindowTabPluggableAssignTabEntity coreWindowTabPluggableAssignTabEntity) {
        CoreWindowTabPluggableAssignTabDTO coreWindowTabPluggableAssignTabDTO = new CoreWindowTabPluggableAssignTabDTO();
        coreWindowTabPluggableAssignTabDTO.setId(coreWindowTabPluggableAssignTabEntity.getId());
        coreWindowTabPluggableAssignTabDTO.setCoreWindowTabId(coreWindowTabPluggableAssignTabEntity.getCore_window_tab_id());
        return coreWindowTabPluggableAssignTabDTO;
    }

    public static CoreWindowTabPluggableDTO convert(CoreWindowTabPluggableEntity coreWindowTabPluggableEntity) {
        CoreWindowTabPluggableDTO coreWindowTabPluggableDTO = new CoreWindowTabPluggableDTO();
        coreWindowTabPluggableDTO.setId(coreWindowTabPluggableEntity.getId());
        coreWindowTabPluggableDTO.setName(coreWindowTabPluggableEntity.getName());
        coreWindowTabPluggableDTO.setRegisterKey(coreWindowTabPluggableEntity.getRegister_key());
        return coreWindowTabPluggableDTO;
    }

    public static CoreTableColumnDataProviderAttachmentAssignElementDTO convert(CoreTableColumnDataProviderAttachmentAssignElementEntity coreTableColumnDataProviderAttachmentAssignElementEntity) {
        CoreTableColumnDataProviderAttachmentAssignElementDTO coreTableColumnDataProviderAttachmentAssignElementDTO = new CoreTableColumnDataProviderAttachmentAssignElementDTO();
        coreTableColumnDataProviderAttachmentAssignElementDTO.setId(coreTableColumnDataProviderAttachmentAssignElementEntity.getId());
        coreTableColumnDataProviderAttachmentAssignElementDTO.setCoreTableColumnDataProviderAttachmentId(coreTableColumnDataProviderAttachmentAssignElementEntity.getCore_table_column_dataprovider_attachment_id());
        coreTableColumnDataProviderAttachmentAssignElementDTO.setRecordId(coreTableColumnDataProviderAttachmentAssignElementEntity.getRecord_id());
        return coreTableColumnDataProviderAttachmentAssignElementDTO;
    }

    public static CoreTableColumnDataProviderAttachmentDTO convert(CoreTableColumnDataProviderAttachmentEntity coreTableColumnDataProviderAttachmentEntity) {
        CoreTableColumnDataProviderAttachmentDTO coreTableColumnDataProviderAttachmentDTO = new CoreTableColumnDataProviderAttachmentDTO();
        coreTableColumnDataProviderAttachmentDTO.setId(coreTableColumnDataProviderAttachmentEntity.getId());
        coreTableColumnDataProviderAttachmentDTO.setName(coreTableColumnDataProviderAttachmentEntity.getName());
        return coreTableColumnDataProviderAttachmentDTO;
    }

    public static CoreTableColumnDataProviderListDTO convert(CoreTableColumnDataProviderListEntity coreTableColumnDataProviderListEntity) {
        CoreTableColumnDataProviderListDTO coreTableColumnDataProviderListDTO = new CoreTableColumnDataProviderListDTO();
        coreTableColumnDataProviderListDTO.setId(coreTableColumnDataProviderListEntity.getId());
        coreTableColumnDataProviderListDTO.setName(coreTableColumnDataProviderListEntity.getName());
        return coreTableColumnDataProviderListDTO;
    }

    public static CoreTableColumnDataProviderListValuesDTO convert(CoreTableColumnDataProviderListValuesEntity coreTableColumnDataProviderListValuesEntity) {
        CoreTableColumnDataProviderListValuesDTO coreTableColumnDataProviderListValuesDTO = new CoreTableColumnDataProviderListValuesDTO();
        coreTableColumnDataProviderListValuesDTO.setId(coreTableColumnDataProviderListValuesEntity.getId());
        coreTableColumnDataProviderListValuesDTO.setKey(coreTableColumnDataProviderListValuesEntity.getKey());
        coreTableColumnDataProviderListValuesDTO.setDisplayValue(coreTableColumnDataProviderListValuesEntity.getDisplay_value());
        return coreTableColumnDataProviderListValuesDTO;
    }

    public static CoreViewModuleAssignElementDTO convert(CoreViewModuleAssignElementEntity coreViewModuleAssignElementEntity) {
        CoreViewModuleAssignElementDTO coreViewModuleAssignElementDTO = new CoreViewModuleAssignElementDTO();
        coreViewModuleAssignElementDTO.setId(coreViewModuleAssignElementEntity.getId());
        coreViewModuleAssignElementDTO.setRecordId(coreViewModuleAssignElementEntity.getRecord_id());
        return coreViewModuleAssignElementDTO;
    }

    public static CoreViewModuleDTO convert(CoreViewModuleEntity coreViewModuleEntity) {
        CoreViewModuleDTO coreViewModuleDTO = new CoreViewModuleDTO();
        coreViewModuleDTO.setId(coreViewModuleEntity.getId());
        coreViewModuleDTO.setName(coreViewModuleEntity.getName());
        coreViewModuleDTO.setRegisterKey(coreViewModuleEntity.getRegister_key());
        return coreViewModuleDTO;
    }

    public static CoreWindowTabTypeDTO convert(CoreWindowTabTypeEntity coreWindowTabTypeEntity) {
        CoreWindowTabTypeDTO coreWindowTabTypeDTO = new CoreWindowTabTypeDTO();
        coreWindowTabTypeDTO.setId(coreWindowTabTypeEntity.getId());
        coreWindowTabTypeDTO.setName(coreWindowTabTypeEntity.getName());
        coreWindowTabTypeDTO.setRegisterKey(coreWindowTabTypeEntity.getRegister_key());
        return coreWindowTabTypeDTO;
    }

    public static CoreWindowTabJoinColumnDTO convert(CoreWindowTabJoinColumnEntity coreWindowTabJoinColumnEntity) {
        CoreWindowTabJoinColumnDTO coreWindowTabJoinColumnDTO = new CoreWindowTabJoinColumnDTO();
        coreWindowTabJoinColumnDTO.setId(coreWindowTabJoinColumnEntity.getId());
        coreWindowTabJoinColumnDTO.setCoreWindowTabMasterId(coreWindowTabJoinColumnEntity.getCore_window_tab_master_id());
        coreWindowTabJoinColumnDTO.setCoreWindowTabFieldMasterId(coreWindowTabJoinColumnEntity.getCore_window_tab_field_master_id());
        coreWindowTabJoinColumnDTO.setCoreWindowTabChildId(coreWindowTabJoinColumnEntity.getCore_window_tab_child_id());
        coreWindowTabJoinColumnDTO.setCoreWindowTabFieldChildId(coreWindowTabJoinColumnEntity.getCore_window_tab_field_child_id());
        return coreWindowTabJoinColumnDTO;
    }

    public static CoreProcessParamDTO convert(CoreProcessParamEntity coreProcessParamEntity) {
        CoreProcessParamDTO coreProcessParamDTO = new CoreProcessParamDTO();
        coreProcessParamDTO.setId(coreProcessParamEntity.getId());
        coreProcessParamDTO.setName(coreProcessParamEntity.getName());
        coreProcessParamDTO.setActive(coreProcessParamEntity.getActive());
        coreProcessParamDTO.setIndex(coreProcessParamEntity.getIndex());
        return coreProcessParamDTO;
    }

    public static CoreProcessDTO convert(CoreProcessEntity coreProcessEntity) {
        CoreProcessDTO coreProcessDTO = new CoreProcessDTO();
        coreProcessDTO.setId(coreProcessEntity.getId());
        coreProcessDTO.setName(coreProcessEntity.getName());
        coreProcessDTO.setClientRegisterKey(coreProcessEntity.getClient_register_key());
        coreProcessDTO.setServerRegisterKey(coreProcessEntity.getServer_register_key());
        coreProcessDTO.setCoreProcessParamDTOMap(new HashMap<>());
        return coreProcessDTO;
    }

    public static CoreHostDTO convert(CoreHostEntity coreHostEntity) {
        CoreHostDTO coreHostDTO = new CoreHostDTO();
        coreHostDTO.setId(coreHostEntity.getId());
        coreHostDTO.setName(coreHostEntity.getName());
        coreHostDTO.setRegisterKey(coreHostEntity.getRegister_key());
        coreHostDTO.setIpv4(coreHostEntity.getIpv4());
        coreHostDTO.setIpv6(coreHostEntity.getIpv6());
        coreHostDTO.setDnsName(coreHostEntity.getDns_name());
        return coreHostDTO;
    }

    public static LogicalOperators convert(CoreFilterRequestOperandEnum coreFilterRequestOperandEnum) {
        switch (coreFilterRequestOperandEnum) {
            case AND -> {
                return LogicalOperators.AND;
            }
            case OR -> {
                return LogicalOperators.OR;
            }
            case NOT -> {
                return LogicalOperators.NOT;
            }
            case NOTNULL -> {
                return LogicalOperators.NOTNULL;
            }
        }
        return LogicalOperators.AND;
    }

    public static CoreFilterAssignDataProviderDTO convert(CoreFilterAssignDataProviderEntity coreFilterAssignDataProviderEntity) {
        CoreFilterAssignDataProviderDTO coreFilterAssignDataProviderDTO = new CoreFilterAssignDataProviderDTO();
        coreFilterAssignDataProviderDTO.setId(coreFilterAssignDataProviderEntity.getId());
        coreFilterAssignDataProviderDTO.setName(coreFilterAssignDataProviderEntity.getName());
        coreFilterAssignDataProviderDTO.setCoreTableColumnDataProviderId(coreFilterAssignDataProviderEntity.getCore_table_column_dataprovider_id());
        return coreFilterAssignDataProviderDTO;
    }

    public static CoreWizardValidationDTO convert(CoreWizardValidationEntity coreWizardValidationEntity) {
        CoreWizardValidationDTO coreWizardValidationDTO = new CoreWizardValidationDTO();
        coreWizardValidationDTO.setId(coreWizardValidationEntity.getId());
        coreWizardValidationDTO.setName(coreWizardValidationEntity.getName());
        coreWizardValidationDTO.setRegisterKey(coreWizardValidationEntity.getRegister_key());
        coreWizardValidationDTO.setRecordId(coreWizardValidationEntity.getRecord_id());
        return coreWizardValidationDTO;
    }

    public static CoreWizardStateValueDTO convert(CoreWizardStateValueEntity coreWizardStateValueEntity) {
        CoreWizardStateValueDTO coreWizardStateValueDTO = new CoreWizardStateValueDTO();
        coreWizardStateValueDTO.setId(coreWizardStateValueEntity.getId());
        coreWizardStateValueDTO.setCoreWizardStateId(coreWizardStateValueEntity.getCore_wizard_state_id());
        coreWizardStateValueDTO.setJsonValue(coreWizardStateValueEntity.getJson_value() != null ? coreWizardStateValueEntity.getJson_value().asString() : null);
        return coreWizardStateValueDTO;
    }

    public static CoreWizardStateDTO convert(CoreWizardStateEntity coreWizardStateEntity) {
        CoreWizardStateDTO coreWizardStateDTO = new CoreWizardStateDTO();
        coreWizardStateDTO.setId(coreWizardStateEntity.getId());
        coreWizardStateDTO.setName(coreWizardStateEntity.getName());
        coreWizardStateDTO.setCoreWizardId(coreWizardStateEntity.getCore_wizard_id());
        coreWizardStateDTO.setRecordId(coreWizardStateEntity.getRecord_id());
        coreWizardStateDTO.setIndex(coreWizardStateEntity.getIndex());
        return coreWizardStateDTO;
    }

    public static CoreWizardDTO convert(CoreWizardEntity coreWizardEntity) {
        CoreWizardDTO coreWizardDTO = new CoreWizardDTO();
        coreWizardDTO.setId(coreWizardEntity.getId());
        coreWizardDTO.setName(coreWizardEntity.getName());
        coreWizardDTO.setRecordId(coreWizardEntity.getRecord_id());
        return coreWizardDTO;
    }

    public static CoreLayoutAssignElementDTO convert(CoreLayoutAssignElementEntity coreLayoutAssignElementEntity) {
        CoreLayoutAssignElementDTO coreLayoutAssignElementDTO = new CoreLayoutAssignElementDTO();
        coreLayoutAssignElementDTO.setId(coreLayoutAssignElementEntity.getId());
        coreLayoutAssignElementDTO.setName(coreLayoutAssignElementEntity.getName());
        coreLayoutAssignElementDTO.setRecordId(coreLayoutAssignElementEntity.getRecord_id());
        if (coreLayoutAssignElementEntity.getJson_layout() != null)
            coreLayoutAssignElementDTO.setJsonLayout(coreLayoutAssignElementEntity.getJson_layout().asString());
        return coreLayoutAssignElementDTO;
    }

    public static CoreLayoutDataAssignElementDTO convert(CoreLayoutDataAssignElementEntity coreLayoutDataAssignElementEntity) {
        CoreLayoutDataAssignElementDTO coreLayoutDataAssignElementDTO = new CoreLayoutDataAssignElementDTO();
        coreLayoutDataAssignElementDTO.setId(coreLayoutDataAssignElementEntity.getId());
        coreLayoutDataAssignElementDTO.setName(coreLayoutDataAssignElementEntity.getName());
        coreLayoutDataAssignElementDTO.setRecordId(coreLayoutDataAssignElementEntity.getRecord_id());
        if (coreLayoutDataAssignElementEntity.getJson_layout_data() != null)
            coreLayoutDataAssignElementDTO.setJsonLayoutData(coreLayoutDataAssignElementEntity.getJson_layout_data().asString());
        return coreLayoutDataAssignElementDTO;
    }

    public static CoreLayoutDataDTO convert(CoreLayoutDataEntity coreLayoutDataEntity) {
        CoreLayoutDataDTO coreLayoutDataDTO = new CoreLayoutDataDTO();
        coreLayoutDataDTO.setId(coreLayoutDataEntity.getId());
        coreLayoutDataDTO.setName(coreLayoutDataEntity.getName());
        coreLayoutDataDTO.setRegisterKey(coreLayoutDataEntity.getRegister_key());
        return coreLayoutDataDTO;
    }

    public static CoreLayoutDTO convert(CoreLayoutEntity coreLayoutEntity) {
        CoreLayoutDTO coreLayoutDTO = new CoreLayoutDTO();
        coreLayoutDTO.setId(coreLayoutEntity.getId());
        coreLayoutDTO.setName(coreLayoutEntity.getName());
        coreLayoutDTO.setRegisterKey(coreLayoutEntity.getRegister_key());
        return coreLayoutDTO;
    }

    public static CoreFilterAssignElementDTO convert(CoreFilterAssignElementEntity coreFilterAssignElementEntity) {
        CoreFilterAssignElementDTO coreFilterAssignElementDTO = new CoreFilterAssignElementDTO();
        coreFilterAssignElementDTO.setId(coreFilterAssignElementEntity.getId());
        coreFilterAssignElementDTO.setName(coreFilterAssignElementEntity.getName());
        coreFilterAssignElementDTO.setRecordId(coreFilterAssignElementEntity.getRecord_id());
        return coreFilterAssignElementDTO;
    }

    public static CoreFilterOperationParamDTO convert(CoreFilterOperationParamEntity coreFilterOperationParamEntity) {
        CoreFilterOperationParamDTO coreFilterOperationParamDTO = new CoreFilterOperationParamDTO();
        coreFilterOperationParamDTO.setId(coreFilterOperationParamEntity.getId());
        coreFilterOperationParamDTO.setName(coreFilterOperationParamEntity.getName());
        coreFilterOperationParamDTO.setReferOriginalEditor(convertBoolean(coreFilterOperationParamEntity.getRefer_original_editor()));
        return coreFilterOperationParamDTO;
    }

    public static CoreFilterDTO convert(CoreFilterEntity coreFilterEntity) {
        CoreFilterDTO coreFilterDTO = new CoreFilterDTO();
        coreFilterDTO.setId(coreFilterEntity.getId());
        coreFilterDTO.setName(coreFilterEntity.getName());
        coreFilterDTO.setCoreFilterParentId(coreFilterEntity.getCore_filter_parent_id());
        return coreFilterDTO;
    }

    public static CoreFilterOperationDTO convert(CoreFilterOperationEntity coreFilterOperationEntity) {
        CoreFilterOperationDTO coreFilterOperationDTO = new CoreFilterOperationDTO();
        coreFilterOperationDTO.setId(coreFilterOperationEntity.getId());
        coreFilterOperationDTO.setName(coreFilterOperationEntity.getName());
        coreFilterOperationDTO.setRegisterKey(coreFilterOperationEntity.getRegister_key());
        return coreFilterOperationDTO;
    }

    public static CoreFilterLayoutDTO convert(CoreFilterLayoutEntity coreFilterLayoutEntity) {
        CoreFilterLayoutDTO coreFilterLayoutDTO = new CoreFilterLayoutDTO();
        coreFilterLayoutDTO.setId(coreFilterLayoutEntity.getId());
        coreFilterLayoutDTO.setName(coreFilterLayoutEntity.getName());
        coreFilterLayoutDTO.setLayoutJson(coreFilterLayoutEntity.getLayout_json());
        return coreFilterLayoutDTO;
    }

    public static CoreFilterProviderDTO convert(CoreFilterProviderEntity coreFilterProviderEntity) {
        CoreFilterProviderDTO coreFilterProviderDTO = new CoreFilterProviderDTO();
        coreFilterProviderDTO.setId(coreFilterProviderEntity.getId());
        coreFilterProviderDTO.setName(coreFilterProviderEntity.getName());
        coreFilterProviderDTO.setRegisterKey(coreFilterProviderEntity.getRegister_key());
        return coreFilterProviderDTO;
    }

    public static CoreTableColumnDataProviderSerializerDTO convert(CoreTableColumnDataProviderSerializerEntity coreTableColumnDataProviderSerializerEntity) {
        CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO = new CoreTableColumnDataProviderSerializerDTO();
        coreTableColumnDataProviderSerializerDTO.setId(coreTableColumnDataProviderSerializerEntity.getId());
        coreTableColumnDataProviderSerializerDTO.setName(coreTableColumnDataProviderSerializerEntity.getName());
        coreTableColumnDataProviderSerializerDTO.setServerRegisterKey(coreTableColumnDataProviderSerializerEntity.getServer_register_key());
        coreTableColumnDataProviderSerializerDTO.setClientRegisterKey(coreTableColumnDataProviderSerializerEntity.getClient_register_key());
        return coreTableColumnDataProviderSerializerDTO;
    }

    public static CoreCssDTO convert(CoreCssEntity coreCssEntity) {
        CoreCssDTO coreCssDTO = new CoreCssDTO();
        coreCssDTO.setId(coreCssEntity.getId());
        coreCssDTO.setName(coreCssEntity.getName());
        coreCssDTO.setJsonAttribute(coreCssEntity.getJson_attribute() != null ? coreCssEntity.getJson_attribute().asString() : null);
        return coreCssDTO;
    }

    public static CoreButtonDTO convert(CoreButtonEntity coreButtonEntity) {
        CoreButtonDTO coreButtonDTO = new CoreButtonDTO();
        coreButtonDTO.setId(coreButtonEntity.getId());
        coreButtonDTO.setName(coreButtonEntity.getName());
        coreButtonDTO.setClientUiKey(coreButtonEntity.getClient_ui_key());
        coreButtonDTO.setCommandServerKey(coreButtonEntity.getCommand_server_key());
        coreButtonDTO.setCommandClientKey(coreButtonEntity.getCommand_client_key());
        return coreButtonDTO;
    }

    public static CoreAnalyticReportFieldDTO getCoreAnalyticReportFieldDTO(Map.Entry<Long, CoreWindowTabFieldDTO> longCoreWindowTabFieldDTOEntry, String fieldTranslate) {
        CoreAnalyticReportFieldDTO coreAnalyticReportFieldDTO = new CoreAnalyticReportFieldDTO();
        coreAnalyticReportFieldDTO.setId(longCoreWindowTabFieldDTOEntry.getKey());
        coreAnalyticReportFieldDTO.setCoreTableColumnDTO(longCoreWindowTabFieldDTOEntry.getValue().getCoreTableColumnDTO());
        coreAnalyticReportFieldDTO.setCoreWindowTabFieldDTO(longCoreWindowTabFieldDTOEntry.getValue());
        coreAnalyticReportFieldDTO.setTitle(fieldTranslate);
        return coreAnalyticReportFieldDTO;
    }

    public static CoreAnalyticReportLayoutDTO convert(CoreAnalyticReportLayoutEntity coreAnalyticReportLayoutEntity) {
        CoreAnalyticReportLayoutDTO coreAnalyticReportLayoutDTO = new CoreAnalyticReportLayoutDTO();
        coreAnalyticReportLayoutDTO.setId(coreAnalyticReportLayoutEntity.getId());
        coreAnalyticReportLayoutDTO.setName(coreAnalyticReportLayoutEntity.getName());
        coreAnalyticReportLayoutDTO.setLayoutJson(coreAnalyticReportLayoutEntity.getLayout_json());
        return coreAnalyticReportLayoutDTO;
    }

    public static CoreAnalyticReportDTO convert(CoreAnalyticReportEntity coreAnalyticReportEntity) {
        CoreAnalyticReportDTO coreAnalyticReportDTO = new CoreAnalyticReportDTO();
        coreAnalyticReportDTO.setId(coreAnalyticReportEntity.getId());
        coreAnalyticReportDTO.setName(coreAnalyticReportEntity.getName());
        coreAnalyticReportDTO.setRecordId(coreAnalyticReportEntity.getRecord_id());
        return coreAnalyticReportDTO;
    }

    public static CoreTableColumnDataProviderDTO convert(long id, CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum, String clientRegisterKey) {
        CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = new CoreTableColumnDataProviderDTO();
        coreTableColumnDataProviderDTO.setId(id);
        coreTableColumnDataProviderDTO.setCoreTableColumnDataProviderWithSerializerDTO(convert(coreTableColumnDataProviderTypeEnum, clientRegisterKey));
        return coreTableColumnDataProviderDTO;
    }

    public static CoreTableColumnDataProviderWithSerializerDTO convert(CoreTableColumnDataProviderTypeEnum coreTableColumnDataProviderTypeEnum, String clientRegisterKey) {
        CoreTableColumnDataProviderSerializerDTO coreTableColumnDataProviderSerializerDTO = new CoreTableColumnDataProviderSerializerDTO();
        coreTableColumnDataProviderSerializerDTO.setClientRegisterKey(clientRegisterKey);

        CoreTableColumnDataProviderWithSerializerDTO coreTableColumnDataProviderWithSerializerDTO = new CoreTableColumnDataProviderWithSerializerDTO();
        coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderTypeEnum(coreTableColumnDataProviderTypeEnum);
        coreTableColumnDataProviderWithSerializerDTO.setCoreTableColumnDataProviderSerializerDTO(coreTableColumnDataProviderSerializerDTO);

        return coreTableColumnDataProviderWithSerializerDTO;
    }

    public static CoreUserTenantDTO convert(CoreUserTenantEntity coreUserTenantEntity) {
        CoreUserTenantDTO coreUserTenantDTO = new CoreUserTenantDTO();
        coreUserTenantDTO.setId(coreUserTenantEntity.getId());
        coreUserTenantDTO.setActive(coreUserTenantEntity.getActive());
        coreUserTenantDTO.setPassword(coreUserTenantEntity.getPassword());
        return coreUserTenantDTO;
    }

    public static CoreTenantTypeDTO convert(CoreTenantTypeEntity coreTenantTypeEntity) {
        CoreTenantTypeDTO coreTenantDTO = new CoreTenantTypeDTO();
        coreTenantDTO.setId(coreTenantTypeEntity.getId());
        coreTenantDTO.setName(coreTenantTypeEntity.getName());
        coreTenantDTO.setLevelIndex(coreTenantTypeEntity.getLevel_index());
        return coreTenantDTO;
    }

    public static CoreUserDTO convert(CoreUserEntity coreUserEntity) {
        CoreUserDTO coreUserDTO = new CoreUserDTO();
        coreUserDTO.setId(coreUserEntity.getId());
        coreUserDTO.setUserName(coreUserEntity.getUsername());
        return coreUserDTO;
    }

    public static CoreTenantDTO convert(CoreTenantEntity coreTenantEntity) {
        CoreTenantDTO coreTenantDTO = new CoreTenantDTO();
        coreTenantDTO.setId(coreTenantEntity.getId());
        coreTenantDTO.setName(coreTenantEntity.getName());
        return coreTenantDTO;
    }

    public static CoreProfileDTO convert(CoreProfileEntity coreProfileEntity) {
        CoreProfileDTO coreProfileDTO = new CoreProfileDTO();
        coreProfileDTO.setId(coreProfileEntity.getId());
        coreProfileDTO.setName(coreProfileEntity.getName());
        return coreProfileDTO;
    }

    public static CoreUserTenantProfileDTO convert(CoreUserTenantProfileEntity coreUserTenantProfileEntity) {
        CoreUserTenantProfileDTO coreUserTenantProfileDTO = new CoreUserTenantProfileDTO();
        coreUserTenantProfileDTO.setId(coreUserTenantProfileEntity.getId());
        coreUserTenantProfileDTO.setName(coreUserTenantProfileEntity.getName());
        coreUserTenantProfileDTO.setRecordId(coreUserTenantProfileEntity.getRecord_id());
        coreUserTenantProfileDTO.setJsonValue(coreUserTenantProfileEntity.getJson_value());
        return coreUserTenantProfileDTO;
    }

    public static CoreTableDataSourceDTO convert(CoreTableDataSourceEntity coreTableDataSourceEntity) {
        CoreTableDataSourceDTO coreTableDataSourceDTO = new CoreTableDataSourceDTO();
        coreTableDataSourceDTO.setId(coreTableDataSourceEntity.getId());
        coreTableDataSourceDTO.setRegisterKey(coreTableDataSourceEntity.getRegister_key());

        if (coreTableDataSourceEntity.getJson_config() != null) {
            try {
                Map<String, Object> options = new ObjectMapper().readValue(coreTableDataSourceEntity.getJson_config().asString(), HashMap.class);
                coreTableDataSourceDTO.setOptions(options);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        return coreTableDataSourceDTO;
    }

    public static CoreAllElementExtraAttributeValueDTO convert(CoreAllElementExtraAttributeValueEntity coreAllElementExtraAttributeValueEntity) {
        CoreAllElementExtraAttributeValueDTO coreAllElementExtraAttributeValueDTO = new CoreAllElementExtraAttributeValueDTO();
        coreAllElementExtraAttributeValueDTO.setId(coreAllElementExtraAttributeValueEntity.getId());
        coreAllElementExtraAttributeValueDTO.setCoreAllElementExtraAttributeId(coreAllElementExtraAttributeValueEntity.getCore_all_element_extra_attribute_id());
        coreAllElementExtraAttributeValueDTO.setRecordId(coreAllElementExtraAttributeValueEntity.getRecord_id());
        coreAllElementExtraAttributeValueDTO.setValues(coreAllElementExtraAttributeValueEntity.getValues());
        return coreAllElementExtraAttributeValueDTO;
    }

    public static CoreTableColumnDataProviderTableColumnsDTO convert(CoreTableColumnDataProviderTableColumnsEntity coreTableColumnDataProviderTableColumnsEntity) {
        CoreTableColumnDataProviderTableColumnsDTO coreTableColumnDataProviderTableColumnsDTO = new CoreTableColumnDataProviderTableColumnsDTO();
        coreTableColumnDataProviderTableColumnsDTO.setId(coreTableColumnDataProviderTableColumnsEntity.getId());
        coreTableColumnDataProviderTableColumnsDTO.setIndex(coreTableColumnDataProviderTableColumnsEntity.getIndex());
        return coreTableColumnDataProviderTableColumnsDTO;
    }

    public static CoreTableColumnDataProviderTableDTO convert(CoreTableColumnDataProviderTableEntity coreTableColumnDataProviderTableEntity) {
        CoreTableColumnDataProviderTableDTO coreTableColumnDataProviderTableDTO = new CoreTableColumnDataProviderTableDTO();
        coreTableColumnDataProviderTableDTO.setId(coreTableColumnDataProviderTableEntity.getId());
        coreTableColumnDataProviderTableDTO.setName(coreTableColumnDataProviderTableEntity.getName());
        coreTableColumnDataProviderTableDTO.setCoreTableId(coreTableColumnDataProviderTableEntity.getCore_table_id());
        return coreTableColumnDataProviderTableDTO;
    }

    public static CoreTableColumnDataProviderPrimaryDTO convert(CoreTableColumnDataProviderPrimaryEntity coreTableColumnDataProviderPrimaryEntity) {
        CoreTableColumnDataProviderPrimaryDTO coreTableColumnDataProviderPrimaryDTO = new CoreTableColumnDataProviderPrimaryDTO();
        coreTableColumnDataProviderPrimaryDTO.setId(coreTableColumnDataProviderPrimaryEntity.getId());
        coreTableColumnDataProviderPrimaryDTO.setName(coreTableColumnDataProviderPrimaryEntity.getName());
        return coreTableColumnDataProviderPrimaryDTO;
    }

    public static CoreMenuDTO convert(CoreMenuEntity coreMenuEntity) {
        CoreMenuDTO coreMenuDTO = new CoreMenuDTO();
        coreMenuDTO.setId(coreMenuEntity.getId());
        coreMenuDTO.setName(coreMenuEntity.getName());
        coreMenuDTO.setCoreMenuRecordId(coreMenuEntity.getRecord_id());
        coreMenuDTO.setCoreMenuParentId(coreMenuEntity.getCore_menu_parent_id());
        return coreMenuDTO;
    }

    public static CoreAllElementDTO convert(CoreAllElementEntity coreAllElementEntity) {
        CoreAllElementDTO coreAllElementDTO = new CoreAllElementDTO();
        coreAllElementDTO.setId(coreAllElementEntity.getId());
        coreAllElementDTO.setName(coreAllElementEntity.getName());
        coreAllElementDTO.setRegisterKey(coreAllElementEntity.getRegister_key());
        coreAllElementDTO.setCoreTableId(coreAllElementEntity.getCore_table_id());
        return coreAllElementDTO;
    }

    public static CoreTranslateLanguageDTO convert(CoreTranslateLanguageEntity coreTranslateLanguageEntity) {
        CoreTranslateLanguageDTO coreTranslateLanguageDTO = new CoreTranslateLanguageDTO();
        coreTranslateLanguageDTO.setId(coreTranslateLanguageEntity.getId());
        coreTranslateLanguageDTO.setLanguage(coreTranslateLanguageEntity.getLanguage());
        coreTranslateLanguageDTO.setLocaleName(coreTranslateLanguageEntity.getLocale_name());
        coreTranslateLanguageDTO.setRTL(coreTranslateLanguageEntity.getIs_rtl());
        return coreTranslateLanguageDTO;
    }

    public static CommonCountryDTO convert(CommonCountryEntity commonCountryEntity) {
        CommonCountryDTO commonCountryDTO = new CommonCountryDTO();
        commonCountryDTO.setId(commonCountryEntity.getId());
        commonCountryDTO.setName(commonCountryEntity.getName());
        commonCountryDTO.setFlagPicPath(commonCountryEntity.getFlag_pic_path());
        return commonCountryDTO;
    }

    public static CoreRoleDTO convert(CoreRoleEntity coreRoleEntity) {
        CoreRoleDTO coreRoleDTO = new CoreRoleDTO();
        coreRoleDTO.setId(coreRoleEntity.getId());
        coreRoleDTO.setName(coreRoleEntity.getName());
        return coreRoleDTO;
    }

    public static TableMetadata convert(CoreWindowTabDTO coreWindowTabDTO) {
        TableMetadata.TableMetadataBuilder tableBuilder = TableMetadata.builder()
                .id(coreWindowTabDTO.getCoreTableDTO().getId())
                .uuid(UUID.randomUUID().toString())
                .tableName(coreWindowTabDTO.getCoreTableDTO().getTablename());

        coreWindowTabDTO.getCoreWindowTabFieldDTOMap().forEach((aLong, coreWindowTabFieldDTO) -> {
            CoreTableColumnDTO column = coreWindowTabFieldDTO.getCoreTableColumnDTO();
            if (column != null) {
                ColumnMetaModel columnMetaModel = convert(column);
                if (columnMetaModel.isPk()) {
                    tableBuilder.AddPkColumn(column.getId(), columnMetaModel);
                } else {
                    tableBuilder.AddColumn(column.getId(), columnMetaModel);
                    tableBuilder.AddColumnBYName(column.getName(), columnMetaModel);
                }
            }
        });

        return tableBuilder.build();
    }

    public static TableMetadata convert(CoreTableDTO coreTableDTO) {
        return convert(coreTableDTO, coreTableDTO.getColumns());
    }

    public static TableMetadata convert(CoreTableDTO coreTableDTO, List<CoreTableColumnDTO> overRightColumnSelected) {
        TableMetadata.TableMetadataBuilder tableBuilder = TableMetadata.builder()
                .id(coreTableDTO.getId())
                .tableName(coreTableDTO.getTablename());

        overRightColumnSelected.forEach((coreTableColumnDTO) -> {
            ColumnMetaModel columnMetaModel = convert(coreTableColumnDTO);
            tableBuilder.AddColumn(coreTableColumnDTO.getId(), columnMetaModel);
            tableBuilder.AddColumnBYName(coreTableColumnDTO.getName(), columnMetaModel);
        });
        tableBuilder.uuid(UUID.randomUUID().toString());

        return tableBuilder.build();
    }

    public static ColumnMetaModel convert(CoreTableColumnDTO column) {
        ColumnMetaModel c = new ColumnMetaModel();
        c.id(column.getId())
                .uuid(UUID.randomUUID().toString())
                .pk(column.isPk())
                .columnName(column.getName())
                .coreTableColumnDataProviderDTO(column.getCoreTableColumnDataProviderDTO());
        return c;
    }

    public static CoreTableDTO convert(CoreTableEntity coreTableEntity) {
        CoreTableDTO coreTableDTO = new CoreTableDTO();
        coreTableDTO.setId(coreTableEntity.getId());
        coreTableDTO.setName(coreTableEntity.getName());
        coreTableDTO.setTitle(coreTableEntity.getTitle());
        coreTableDTO.setCore_table_datasource_id(coreTableEntity.getCore_table_datasource_id());
        coreTableDTO.setTablename(coreTableEntity.getTablename());
        return coreTableDTO;
    }

    public static CoreTableColumnEditorDTO convert(CoreTableColumnEditorEntity coreTableColumnEditorEntity) {
        CoreTableColumnEditorDTO coreTableColumnEditorDTO = new CoreTableColumnEditorDTO();
        coreTableColumnEditorDTO.setId(coreTableColumnEditorEntity.getId());
        coreTableColumnEditorDTO.setName(coreTableColumnEditorEntity.getName());
        coreTableColumnEditorDTO.setEditorClassRegisterKey(coreTableColumnEditorEntity.getEditor_class_register_key());
        return coreTableColumnEditorDTO;
    }

    public static CoreTableColumnDTO convert(CoreTableColumnEntity coreTableColumnEntity) {
        CoreTableColumnDTO coreTableColumnDTO = new CoreTableColumnDTO();
        coreTableColumnDTO.setId(coreTableColumnEntity.getId());
        coreTableColumnDTO.setName(coreTableColumnEntity.getName());
        coreTableColumnDTO.setCoreTableId(coreTableColumnEntity.getCore_table_id());
        coreTableColumnDTO.setPk(convertBooleanPrimary(coreTableColumnEntity.getIs_pk()));
        return coreTableColumnDTO;
    }

    public static CoreTableColumnDataProviderDTO convert(CoreTableColumnDataProviderEntity coreTableColumnDataProviderEntity) {
        CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = new CoreTableColumnDataProviderDTO();
        coreTableColumnDataProviderDTO.setId(coreTableColumnDataProviderEntity.getId());
        coreTableColumnDataProviderDTO.setName(coreTableColumnDataProviderEntity.getName());
        coreTableColumnDataProviderDTO.setCoreTableColumnDataProviderTypeId(coreTableColumnDataProviderEntity.getCore_table_column_dataprovider_type_id());
        coreTableColumnDataProviderDTO.setCoreTableColumnDataProviderTypeRecordId(coreTableColumnDataProviderEntity.getCore_table_column_dataprovider_type_record_id());
        return coreTableColumnDataProviderDTO;
    }

    public static CoreDashboardDTO convert(CoreDashboardEntity coreDashboardEntity) {
        CoreDashboardDTO coreDashboardDTO = new CoreDashboardDTO();
        coreDashboardDTO.setId(coreDashboardEntity.getId());
        coreDashboardDTO.setName(coreDashboardEntity.getName());
        coreDashboardDTO.setTranslate(coreDashboardEntity.getName());
        return coreDashboardDTO;
    }

    public static CoreDashboardItemDTO convert(CoreDashboardItemEntity coreDashboardItemEntity) {
        CoreDashboardItemDTO coreDashboardItemDTO = new CoreDashboardItemDTO();
        coreDashboardItemDTO.setId(coreDashboardItemEntity.getId());
        coreDashboardItemDTO.setName(coreDashboardItemEntity.getName());
        coreDashboardItemDTO.setParentId(coreDashboardItemEntity.getCore_dashboard_item_parent_id());
        return coreDashboardItemDTO;
    }

    public static CoreDashboardGadgetDTO convert(CoreDashboardGadgetEntity coreDashboardGadgetEntity) {
        CoreDashboardGadgetDTO coreDashboardGadgetDTO = new CoreDashboardGadgetDTO();
        coreDashboardGadgetDTO.setId(coreDashboardGadgetEntity.getId());
        coreDashboardGadgetDTO.setName(coreDashboardGadgetEntity.getName());
        coreDashboardGadgetDTO.setRecordId(coreDashboardGadgetEntity.getRecord_id());
        return coreDashboardGadgetDTO;
    }

    public static CoreDashboardViewDTO convert(CoreDashboardViewEntity coreDashboardViewEntity) {
        CoreDashboardViewDTO coreDashboardViewDTO = new CoreDashboardViewDTO();
        coreDashboardViewDTO.setId(coreDashboardViewEntity.getId());
        coreDashboardViewDTO.setName(coreDashboardViewEntity.getName());
        coreDashboardViewDTO.setTranslate(coreDashboardViewEntity.getName());
        coreDashboardViewDTO.setParentId(coreDashboardViewEntity.getCore_dashboard_view_parent_id());
        coreDashboardViewDTO.setLayoutJson(coreDashboardViewEntity.getLayout_json());
        return coreDashboardViewDTO;
    }

    public static CoreDashboardGadgetViewDTO convert(CoreDashboardGadgetViewEntity coreDashboardGadgetViewEntity) {
        CoreDashboardGadgetViewDTO coreDashboardGadgetViewDTO = new CoreDashboardGadgetViewDTO();
        coreDashboardGadgetViewDTO.setId(coreDashboardGadgetViewEntity.getId());
        coreDashboardGadgetViewDTO.setLayoutDataJson(coreDashboardGadgetViewEntity.getLayout_data_json());
        return coreDashboardGadgetViewDTO;
    }

    public static CoreWindowDTO convert(CoreWindowEntity coreWindowEntity) {
        CoreWindowDTO coreWindowDTO = new CoreWindowDTO();
        coreWindowDTO.setId(coreWindowEntity.getId());
        coreWindowDTO.setName(coreWindowEntity.getName());
        coreWindowDTO.setCoreWindowTabDTOMap(new HashMap<>());
        return coreWindowDTO;
    }

    public static CoreWindowTabDTO convert(CoreWindowTabEntity coreWindowTabEntity) {
        CoreWindowTabDTO coreWindowTabDTO = new CoreWindowTabDTO();
        coreWindowTabDTO.setId(coreWindowTabEntity.getId());
        coreWindowTabDTO.setName(coreWindowTabEntity.getName());
        coreWindowTabDTO.setCoreWindowTabFieldDTOMap(new HashMap<>());
        coreWindowTabDTO.setCoreButtonAssignElementDTOMap(new HashMap<>());
        coreWindowTabDTO.setCoreLayoutAssignElementDTOMap_Tab(new HashMap<>());
        coreWindowTabDTO.setCoreLayoutAssignElementDTOMap_Toolbar(new HashMap<>());
        coreWindowTabDTO.setTabIndex(coreWindowTabEntity.getTab_index());
        coreWindowTabDTO.setCreateDate(coreWindowTabEntity.getCreate_date());
        return coreWindowTabDTO;
    }

    public static CoreWindowTabFieldDTO convert(CoreWindowTabFieldEntity coreWindowTabFieldEntity) {
        CoreWindowTabFieldDTO coreWindowTabFieldDTO = new CoreWindowTabFieldDTO();
        coreWindowTabFieldDTO.setId(coreWindowTabFieldEntity.getId());
        coreWindowTabFieldDTO.setName(coreWindowTabFieldEntity.getName());
        coreWindowTabFieldDTO.setCoreTabId(coreWindowTabFieldEntity.getCore_window_tab_id());
        coreWindowTabFieldDTO.setActive(coreWindowTabFieldEntity.getActive());
        coreWindowTabFieldDTO.setColumnIndex(coreWindowTabFieldEntity.getIndex());
        return coreWindowTabFieldDTO;
    }

    public static boolean convertBoolean(String ch) {
        return ch != null && ch.equalsIgnoreCase("1");
    }

    public static boolean convertBooleanPrimary(Boolean ch) {
        return ch != null ? ch : false;
    }

    public static CoreButtonAssignElementDTO convert(CoreButtonAssignElementEntity coreButtonActionEntity) {
        CoreButtonAssignElementDTO coreButtonAssignElementRecordDTO = new CoreButtonAssignElementDTO();
        coreButtonAssignElementRecordDTO.setId(coreButtonActionEntity.getId());
        coreButtonAssignElementRecordDTO.setName(coreButtonActionEntity.getName());
        coreButtonAssignElementRecordDTO.setRecordId(coreButtonActionEntity.getRecord_id());
        coreButtonAssignElementRecordDTO.setButtonIndex(coreButtonActionEntity.getButton_index());
        coreButtonAssignElementRecordDTO.setRecordIdModule(coreButtonActionEntity.getRecord_id_module());
        return coreButtonAssignElementRecordDTO;
    }

    public static CoreTableColumnDataProviderDTO getDataProviderFromField(CoreWindowTabFieldDTO field) {
        return field.getCoreTableColumnDataProviderDTO() != null ? field.getCoreTableColumnDataProviderDTO() : (field.getCoreTableColumnDTO() != null ? field.getCoreTableColumnDTO().getCoreTableColumnDataProviderDTO() : null);
    }
}
