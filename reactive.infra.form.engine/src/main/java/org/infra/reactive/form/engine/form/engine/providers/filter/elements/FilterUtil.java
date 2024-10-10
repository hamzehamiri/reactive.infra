package org.infra.reactive.form.engine.form.engine.providers.filter.elements;

import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.CoreFilterRequestElementRecordDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementInterface;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementWithOperandDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.filter.element.CoreFilterRequestElementWithOperationParamValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabRequestSearchDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.filter.field.CoreFilterAssignFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationAbstract;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.operation.CoreFilterOperationJavaServiceRegistryFactory;
import org.infra.reactive.form.engine.form.engine.providers.filter.service.provider.CoreFilterProviderJavaServiceAbstract;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;

import java.util.*;

public class FilterUtil {

    public static void injectFilter(TableExpression rootTableExpression, CoreWindowTabDTO coreWindowTabDTO, CoreWindowTabRequestSearchDTO coreWindowTabRequestSearchDTO) {
        CoreFilterRequestElementWithOperandDTO coreFilterValue = coreWindowTabRequestSearchDTO.getCoreFilterRequestElementWithOperandDTO();
        if (coreFilterValue != null) {
            ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder = ColumnsCriteriaComparisonOperatorModel.builder();
            columnsCriteriaComparisonOperatorModelBuilder.logicalOperators(ConvertUtil.convert(coreFilterValue.getCoreFilterRequestOperandEnum()));

            for (CoreFilterRequestElementInterface coreFilterRequestElementInterface : coreFilterValue.getCoreFilterRequestElementValueInterfaceList()) {
                if (coreFilterRequestElementInterface instanceof CoreFilterRequestElementWithOperationParamValueDTO coreFilterRequestElementWithOperationParamValueDTO) {
                    Map<Long, DataProviderAbstract<?, ?>> params = coreFilterRequestElementWithOperationParamValueDTO.getOperationParamValueMap();
                    CoreServiceDTOTable.coreFilterOperationDTOLRUCache.get(coreFilterRequestElementWithOperationParamValueDTO.getCoreFilterOperationId()).ifPresent(coreFilterOperationDTO -> {

                        CoreWindowTabFieldDTO field = coreWindowTabDTO.getCoreWindowTabFieldDTOMap().get(coreFilterRequestElementWithOperationParamValueDTO.getRecordId());

                        ColumnExpression columnExpression = null;

                        for (Map.Entry<String, TableInterface> stringTableInterfaceEntry : rootTableExpression.getSelectAllTable().entrySet()) {
                            if (stringTableInterfaceEntry.getValue() instanceof TableMetadata tableMetadata) {
                                columnExpression = tableMetadata.getColumns().get(field.getCoreTableColumnDTO().getId());
                            }
                        }

                        CoreFilterOperationAbstract operation = CoreFilterOperationJavaServiceRegistryFactory.Instance().factoryInstance(coreFilterOperationDTO.getRegisterKey());
                        if (operation != null) {
                            operation.setRootTableExpression(rootTableExpression);
                            operation.setColumnExpression(columnExpression);
                            operation.setParams(params);
                            operation.applyFilter(columnsCriteriaComparisonOperatorModelBuilder);
                        }
                    });
                }
            }
            ColumnsCriteriaComparisonOperatorModel build = columnsCriteriaComparisonOperatorModelBuilder.build();
            if (build.getColumnCriteriaModels() != null && !build.getColumnCriteriaModels().isEmpty())
                rootTableExpression.setCriteria(build);
        }
    }

    public static <T extends CoreFilterAssignElementMasterDTO> void createCoreFilterAssignElementMasterDTO(CoreServiceDTOForm coreServiceDTOForm, CoreWindowTabDTO coreWindowTabDTO, CoreTranslateLanguageDTO coreTranslateLanguageDTO, CoreFilterProviderJavaServiceAbstract<?, ?> coreFilterProviderJavaServiceAbstract, T coreFilterAssignElementMasterDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        Map<Long, CoreFilterAssignAbstract> coreFilterAssignAbstractMap = new HashMap<>();

        CoreServiceDTOTable.translateTab(coreWindowTabDTO, userSecurity, coreTranslateLanguageDTO);

        CoreAllElementDTO coreAllElementField = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.Field);
        CoreAllElementDTO coreAllElementFilterProvider = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.CoreFilterProviderElement);
        CoreAllElementDTO coreAllElementFilter = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.CoreFilter);
        CoreAllElementDTO coreAllElementFilterOperation = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.CoreFilterOperation);
        CoreAllElementDTO coreAllElementFilterOperationParam = CoreServiceDTOTable.findCoreAllElementByRegisterKey(CoreAllElementRegisterKeyEnum.CoreFilterOperationParam);

        Map<Long, CoreTranslateDTO> coreFilterProviderTranslateMap = FilterUtil.convertTranslate(coreTranslateLanguageDTO, coreAllElementFilterProvider, coreServiceDTOForm);
        Map<Long, CoreTranslateDTO> coreFilterTranslateMap = FilterUtil.convertTranslate(coreTranslateLanguageDTO, coreAllElementFilter, coreServiceDTOForm);
        Map<Long, CoreTranslateDTO> coreFilterOperationTranslateMap = FilterUtil.convertTranslate(coreTranslateLanguageDTO, coreAllElementFilterOperation, coreServiceDTOForm);
        Map<Long, CoreTranslateDTO> coreFilterOperationParamTranslateMap = FilterUtil.convertTranslate(coreTranslateLanguageDTO, coreAllElementFilterOperationParam, coreServiceDTOForm);

        for (Map.Entry<Long, CoreWindowTabFieldDTO> longCoreWindowTabFieldDTOEntry : coreWindowTabDTO.getCoreWindowTabFieldDTOMap().entrySet()) {
            CoreWindowTabFieldDTO field = longCoreWindowTabFieldDTOEntry.getValue();
            Long fieldId = longCoreWindowTabFieldDTOEntry.getKey();

            Map<Long, CoreFilterDTO> coreFilterDTOMap = new HashMap<>();

            Optional<Map<Long, List<CoreFilterAssignElementDTO>>> coreFilterAssignElementDTOByRecordOptional = CoreServiceDTOTable.coreFilterAssignElementDTOByCoreAllElementIdAndRecordIdLRUCache.get(coreAllElementField.getId());
            coreFilterAssignElementDTOByRecordOptional.ifPresentOrElse(longListMap -> {
                List<CoreFilterAssignElementDTO> coreFilterAssigneElementList = longListMap.get(fieldId);
                if (coreFilterAssigneElementList != null) {
                    for (CoreFilterAssignElementDTO coreFilterAssignElementDTO : coreFilterAssigneElementList) {
                        CoreFilterDTO filter = coreFilterAssignElementDTO.getCoreFilterDTO();
                        FilterUtil.translateCoreFilter(filter, coreFilterTranslateMap, coreFilterOperationTranslateMap, coreFilterOperationParamTranslateMap);
                        coreFilterDTOMap.put(filter.getId(), filter);
                    }
                } else {
                    FilterUtil.fetchFilterByCoreTableColumnDataProvider(field, coreFilterDTOMap, coreFilterTranslateMap, coreFilterOperationTranslateMap, coreFilterOperationParamTranslateMap);
                }
            }, () -> {
                FilterUtil.fetchFilterByCoreTableColumnDataProvider(field, coreFilterDTOMap, coreFilterTranslateMap, coreFilterOperationTranslateMap, coreFilterOperationParamTranslateMap);
            });

            CoreFilterAssignFieldDTO coreFilterAssignFieldDTO = new CoreFilterAssignFieldDTO();
            coreFilterAssignFieldDTO.setCoreAllElementDTO(coreAllElementField);
            coreFilterAssignFieldDTO.setCoreWindowTabFieldDTO(field);
            coreFilterAssignFieldDTO.setCoreFilterDTOMap(coreFilterDTOMap);
            coreFilterAssignFieldDTO.setRegisterKey(coreAllElementField.getRegisterKey());

            coreFilterAssignAbstractMap.put(fieldId, coreFilterAssignFieldDTO);
        }

        List<CoreButtonAssignElementEntity> coreButtonAssignElementRecordEntityEntityList = CoreServiceEntityTable.coreButtonAssignElementRecordDTOByElementTypeAndRecordIdEnum(CoreAllElementRegisterKeyEnum.CoreFilterProvider, coreFilterProviderJavaServiceAbstract.getCoreFilterProviderDTO().getId());

        CoreFilterRequestElementRecordDTO coreAllElement = coreFilterProviderJavaServiceAbstract.getCoreFilterRequestDTO().getCoreFilterRequestElementRecordDTOArray().getFirst();

        coreFilterAssignElementMasterDTO.setUuid(UUID.randomUUID().toString());
        coreFilterAssignElementMasterDTO.setCoreAllElementDTO(coreAllElement.getCoreAllElementDTO());
        coreFilterAssignElementMasterDTO.setCoreFilterAssignAbstractMap(coreFilterAssignAbstractMap);
        coreFilterAssignElementMasterDTO.setRecordId(coreWindowTabDTO.getId());
        coreFilterAssignElementMasterDTO.setRegisterKey(coreAllElement.getCoreAllElementDTO().getRegisterKey());
        coreFilterAssignElementMasterDTO.setCoreButtonAssignElementDTOMap(coreServiceDTOForm.convert(coreButtonAssignElementRecordEntityEntityList));

        Map<String, CoreTranslateDTO> translateMap = new HashMap<>();
        for (Map.Entry<Long, CoreTranslateDTO> coreTranslateDTO : coreFilterProviderTranslateMap.entrySet()) {
            translateMap.put(coreTranslateDTO.getValue().getCoreGeneralRecordDTO().get("name"), coreTranslateDTO.getValue());
        }
        coreFilterAssignElementMasterDTO.setCoreTranslateDTOMap(translateMap);
    }

    public static Map<Long, CoreTranslateDTO> convertTranslate(CoreTranslateLanguageDTO coreTranslateLanguageDTO, CoreAllElementDTO coreAllElement, CoreServiceDTOForm coreServiceDTOForm) {
        return coreServiceDTOForm.coreTranslateWithModel(coreAllElement.getId(), null, coreTranslateLanguageDTO, coreAllElement);
    }

    public static void fetchFilterByCoreTableColumnDataProvider(CoreWindowTabFieldDTO field, Map<Long, CoreFilterDTO> coreFilterDTOMap, Map<Long, CoreTranslateDTO> coreFilterTranslateMap, Map<Long, CoreTranslateDTO> coreFilterOperationTranslateMap, Map<Long, CoreTranslateDTO> coreFilterOperationParamTranslateMap) {
        CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = ConvertUtil.getDataProviderFromField(field);
        if (coreTableColumnDataProviderDTO != null) {
            CoreServiceDTOTable.coreFilterAssignDataProviderDTOByCoreTableColumnDataProviderIdLRUCache.get(coreTableColumnDataProviderDTO.getId()).ifPresent(coreFilterAssignDataProviderDTOS -> {
                for (CoreFilterAssignDataProviderDTO coreFilterAssignDataProviderDTO : coreFilterAssignDataProviderDTOS) {
                    if (coreFilterAssignDataProviderDTO.getCoreFilterDTO() != null) {
                        translateCoreFilter(coreFilterAssignDataProviderDTO.getCoreFilterDTO(), coreFilterTranslateMap, coreFilterOperationTranslateMap, coreFilterOperationParamTranslateMap);
                        coreFilterDTOMap.put(coreFilterAssignDataProviderDTO.getCoreFilterDTO().getId(), coreFilterAssignDataProviderDTO.getCoreFilterDTO());
                    }
                }
            });
        }
    }

    public static void translateCoreFilter(CoreFilterDTO coreFilterDTO, Map<Long, CoreTranslateDTO> coreFilterTranslateMap, Map<Long, CoreTranslateDTO> coreFilterOperationTranslateMap, Map<Long, CoreTranslateDTO> coreFilterOperationParamTranslateMap) {
        if (coreFilterTranslateMap != null) {
            CoreTranslateDTO translateCoreFilter = coreFilterTranslateMap.get(coreFilterDTO.getId());
            if (translateCoreFilter != null && translateCoreFilter.getTranslateValue() != null) {
                coreFilterDTO.setTranslate(translateCoreFilter.getTranslateValue());
            }
        }
        if (coreFilterOperationTranslateMap != null && coreFilterDTO.getCoreFilterOperationDTOMap() != null) {
            coreFilterDTO.getCoreFilterOperationDTOMap().forEach((aLong, coreFilterOperationDTO) -> {
                CoreTranslateDTO coreFilterOperation_TranslateValue = coreFilterOperationTranslateMap.get(coreFilterOperationDTO.getId());
                if (coreFilterOperation_TranslateValue != null && coreFilterOperation_TranslateValue.getTranslateValue() != null) {
                    coreFilterOperationDTO.setTranslate(coreFilterOperation_TranslateValue.getTranslateValue());
                }

                if (coreFilterOperationDTO.getCoreFilterOperationParamDTOMap() != null) {
                    coreFilterOperationDTO.getCoreFilterOperationParamDTOMap().forEach((aLong1, coreFilterOperationParamDTO) -> {
                        CoreTranslateDTO coreFilterOperationParam_TranslateValue = coreFilterOperationParamTranslateMap.get(coreFilterOperationParamDTO.getId());
                        if (coreFilterOperationParam_TranslateValue != null && coreFilterOperationParam_TranslateValue.getTranslateValue() != null) {
                            coreFilterOperationParamDTO.setTranslate(coreFilterOperationParam_TranslateValue.getTranslateValue());
                        }
                    });
                }
            });
        }
    }
}
