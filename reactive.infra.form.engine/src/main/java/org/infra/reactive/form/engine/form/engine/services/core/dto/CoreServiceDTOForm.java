package org.infra.reactive.form.engine.form.engine.services.core.dto;

import io.r2dbc.spi.Connection;
import lombok.Getter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreTranslateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.analytic.report.AnalyticReportRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PageDataDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.dashboard.CoreDashboardItemRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.dashboard.CoreDashboardRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.element.CoreAllElementRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.menu.CoreMenuRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowSaveDataRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.editors.DataProviderSearchRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabPluggableRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.tab.CoreWindowTabRequestSearchDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportMetaDataDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.CoreAnalyticReportPivotGrid;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field.CoreAnalyticReportFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.analytic.report.field.CoreAnalyticReportFieldRegionEnumDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.button.CoreButtonAssignElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardGadgetDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardGadgetViewDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardItemDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.dashboard.CoreDashboardViewDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.menu.CoreMenuDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessParamDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.CoreWindowProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.CoreUserAuthenticateResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.*;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabPluggableAssignTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabResponseSearchDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.RecordModelDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.shared.editors.KeyValueDTO;
import org.infra.reactive.form.engine.form.engine.model.tables.button.CoreButtonAssignElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementDetailEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.element.CoreAllElementEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleAssignUserTenantEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.security.role.CoreRoleEntity;
import org.infra.reactive.form.engine.form.engine.model.tables.translate.CoreTranslateEntity;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.ColumnExpressionPrepareFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.operators.LogicalOperators;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.filter.elements.FilterUtil;
import org.infra.reactive.form.engine.form.engine.security.EncryptionUtil;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreAllElementRegisterKeyEnum;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.CoreElementTranslateQueryJoinerImpl;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.*;

public class CoreServiceDTOForm extends CoreServiceBaseEntity {

    private final Logger logger = LogManager.getLogger(CoreServiceDTOForm.class);
    @Getter
    private final CoreServiceDTOTable coreServiceDTOTable;

    public CoreServiceDTOForm(CoreServiceDTOTable coreServiceDTOTable) {
        this.coreServiceDTOTable = coreServiceDTOTable;
    }

    @Override
    public Flux<? extends Serializable> checkCache(Mono<Connection> connection) {
        return coreServiceDTOTable.cacheAll(connection)
                .doFinally(doFinallyCache())
                .doOnError(doException());
    }

    public Mono<CoreWindowDTO> findWindow_WithCheckCache(Mono<Connection> connectionMono, CoreWindowRequestDTO coreWindowRequestModel, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMap(objects -> {
            Optional<CoreWindowDTO> coreWindowDTOOptional = CoreServiceDTOTable.coreWindowDTOLRUCache.get(coreWindowRequestModel.getId());
            return coreWindowDTOOptional.map(coreWindowDTO -> Mono.just(CoreServiceDTOTable.translateWindow(coreWindowDTO, userSecurity, coreWindowRequestModel.getCoreTranslateLanguageDTO() != null ? coreWindowRequestModel.getCoreTranslateLanguageDTO() : userSecurity.getCoreTranslateLanguageDTO()))).orElse(Mono.just(new CoreWindowDTO()));
        });
    }

    public Mono<CoreWindowTabDTO> findTab_WithCheckCache(Mono<Connection> connectionMono, CoreWindowTabRequestDTO coreWindowTabRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMap(objects -> {
            Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreWindowTabRequestDTO.getId());
            return coreWindowTabDTOOptional.map(coreWindowTabDTO -> Mono.just(CoreServiceDTOTable.translateTab(coreWindowTabDTO, userSecurity, coreWindowTabRequestDTO.getCoreTranslateLanguageDTO() != null ? coreWindowTabRequestDTO.getCoreTranslateLanguageDTO() : userSecurity.getCoreTranslateLanguageDTO()))).orElse(Mono.just(new CoreWindowTabDTO()));
        });
    }

    public Mono<CoreWindowTabResponseSearchDTO> newTabData_WithCheckCache(Mono<Connection> connectionMono, CoreWindowTabRequestDTO coreWindowTabRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMap(objects -> {
            Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreWindowTabRequestDTO.getId());
            return coreWindowTabDTOOptional.map(coreWindowTabDTO -> {
                String uuid = UUID.randomUUID().toString();
                RecordModelDTO recordModelDTO = new RecordModelDTO();
                recordModelDTO.setUuid(uuid);

                CoreWindowTabResponseSearchDTO coreWindowTabResponseSearchDTO = new CoreWindowTabResponseSearchDTO();
                coreWindowTabResponseSearchDTO.setCoreWindowTabId(coreWindowTabRequestDTO.getId());
                coreWindowTabResponseSearchDTO.setRecordModelDTO(recordModelDTO);
                coreWindowTabResponseSearchDTO.setUuidTarget(uuid);
                return Mono.just(coreWindowTabResponseSearchDTO);
            }).orElse(Mono.just(new CoreWindowTabResponseSearchDTO()));
        });
    }

    public Flux<CoreWindowTabResponseSearchDTO> saveTabData(Mono<Connection> connectionMono, CoreWindowSaveDataRequestDTO coreWindowSaveDataRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.fromIterable(coreWindowSaveDataRequestDTO.getTabDataMap().entrySet()).flatMap(longListEntry -> {
            long coreWindowTabId = longListEntry.getKey();
            List<CoreWindowTabResponseSearchDTO> coreWindowTabResponseSearchDTOList = longListEntry.getValue();
            Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreWindowTabId);
            if (coreWindowTabDTOOptional.isPresent()) {
                CoreWindowTabDTO coreWindowTabDTO = coreWindowTabDTOOptional.get();
                // TODO workflowaction register mechanism
                coreWindowTabDTO.getCoreWorkflowActionDTO();
            } else {

            }
            return Flux.just(new CoreWindowTabResponseSearchDTO());
        });
    }

    public Flux<CoreWindowProfileDTO> saveWindowProfile(Mono<Connection> connectionMono, CoreWindowProfileDTO coreWindowProfileDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Flux.just(new CoreWindowProfileDTO());
    }

    public Flux<CoreWindowTabPluggableAssignTabDTO> windowTabPluggableList(Mono<Connection> connectionMono, CoreWindowTabPluggableRequestDTO coreWindowTabPluggableRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMapMany(objects -> {
            Optional<List<CoreWindowTabPluggableAssignTabDTO>> coreWindowTabPluggableAssignTabDTOS = CoreServiceDTOTable.coreWindowTabPluggableAssignTabDTOsLRUCache.get(coreWindowTabPluggableRequestDTO.getCoreWindowTabId());
            return Flux.create((FluxSink<CoreWindowTabPluggableAssignTabDTO> fluxSink) -> {
                if (coreWindowTabPluggableAssignTabDTOS.isPresent()) {
                    for (CoreWindowTabPluggableAssignTabDTO coreWindowTabPluggableAssignTabDTO : coreWindowTabPluggableAssignTabDTOS.get()) {
                        fluxSink.next(coreWindowTabPluggableAssignTabDTO);
                    }
                }
                fluxSink.complete();
            });
        });
    }

    public Flux<CoreAllElementDTO> findCoreAllElementByRegisterKey_WithCheckCache(Mono<Connection> connectionMono, CoreUserAuthenticateRequestDTO userSecurity, CoreAllElementRequestDTO coreAllElementRequestDTO) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMapMany(objects -> {
            return Flux.create((FluxSink<CoreAllElementDTO> fluxSink) -> {
                coreAllElementRequestDTO.getRegisterKeyArray().forEach(registerKey -> {
                    fluxSink.next(CoreServiceDTOTable.findCoreAllElementByRegisterKey(registerKey));
                });
                fluxSink.complete();
            });
        });
    }

    public Flux<CoreWindowTabResponseSearchDTO> searchTabData_WithCheckCache(Mono<Connection> connectionMono, CoreWindowTabRequestSearchDTO coreWindowTabRequestSearchDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(CoreServiceBaseEntity.complete)).flatMapMany(objects -> {
            Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreWindowTabRequestSearchDTO.getCoreWindowTabId());
            return coreWindowTabDTOOptional.map(coreWindowTabDTO -> {
                CoreTableDTO coreTableDTO = coreWindowTabDTO.getCoreTableDTO();
                Optional<CoreTableDataSourceDTO> coreTableDataSourceDTOOptional = CoreServiceDTOTable.coreTableDataSourceDTOLRUCache.get(coreTableDTO.getCore_table_datasource_id());

                if (coreTableDataSourceDTOOptional.isPresent()) {
                    CoreTableDataSourceDTO coreTableDataSourceDTO = coreTableDataSourceDTOOptional.get();
                    TableMetadata tableMetaData = ConvertUtil.convert(coreWindowTabDTO);

                    TableExpression rootTableExpression = new TableExpression()
                            .setId(coreTableDTO.getId())
                            .SetMasterTable(tableMetaData.getID(), tableMetaData)
                            .setPagingDTO(coreWindowTabRequestSearchDTO.getPagingDTO())
                            .setUuid(UUID.randomUUID().toString())
                            .setCoreTableDataSourceDTO(coreTableDataSourceDTO);
                    TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
                    tableExpressionPrepare.setColumnExpression(rootTableExpression);
                    tableExpressionPrepare.setCoreTableDataSourceDTO(coreTableDataSourceDTO);

                    ColumnExpressionPrepareFactory columnExpressionPrepareFactory = ColumnExpressionPrepareFactory.Instance();
                    for (Map.Entry<Long, CoreWindowTabFieldDTO> longCoreWindowTabFieldDTOEntry : coreWindowTabDTO.getCoreWindowTabFieldDTOMap().entrySet()) {
                        CoreWindowTabFieldDTO coreWindowTabFieldDTO = longCoreWindowTabFieldDTOEntry.getValue();
                        CoreWindowTabFieldSortOrderProfileDTO coreWindowTabFieldSortOrderProfileDTO = coreWindowTabRequestSearchDTO.getSortOrderMap().get(coreWindowTabFieldDTO.getId());

                        CoreTableColumnDataProviderDTO dataProvider = ConvertUtil.getDataProviderFromField(coreWindowTabFieldDTO);
                        CoreTableColumnDTO coreTableColumnDTO = coreWindowTabFieldDTO.getCoreTableColumnDTO();
                        if (coreWindowTabFieldDTO.isActive()) {
                            ColumnExpressionPrepare<?, Long> prepare = columnExpressionPrepareFactory.processColumnExpressionPrepare(
                                    connectionMono,
                                    userSecurity,
                                    coreWindowTabRequestSearchDTO.getCoreTranslateLanguageDTO(),
                                    coreTableColumnDTO,
                                    coreWindowTabFieldDTO,
                                    tableMetaData,
                                    dataProvider,
                                    rootTableExpression,
                                    rootTableExpression,
                                    tableExpressionPrepare
                            );
                            if (prepare != null) {
                                if (prepare.getColumnExpression() != null) {
                                    prepare.getColumnExpression().setFieldId(coreWindowTabFieldDTO.getId());
                                    prepare.getColumnExpression().setCoreWindowTabFieldSortOrderProfileDTO(coreWindowTabFieldSortOrderProfileDTO);

                                    tableExpressionPrepare.addColumnExpressionPrepareWithColumnIdMap(prepare.getColumnExpression().getID(), prepare);
                                    tableExpressionPrepare.addMapDataProviderJavaAbstract(prepare.getColumnExpression().getID(), prepare.getDataProviderJavaAbstract());
                                    rootTableExpression.AddColumnExpression(prepare.getColumnExpression().getID(), prepare.getColumnExpression());
                                } else {
                                    if (prepare.isCompatibleDataSourceWithMaster()) {
                                        tableExpressionPrepare.addColumnExpressionPrepareWithColumnIdMap(prepare.getUUID(), prepare);
                                        tableExpressionPrepare.addMapDataProviderJavaAbstract(prepare.getUUID(), prepare.getDataProviderJavaAbstract());
                                    } else {
                                        tableExpressionPrepare.addColumnExpressionPrepareWithColumnIdOtherDataSourceMap(prepare.getUUID(), prepare);
                                    }

                                }
                            } else if (coreWindowTabFieldDTO.getCoreTableColumnDTO() != null && coreWindowTabFieldDTO.getCoreTableColumnDTO().isPk()) {
                                ColumnMetaModel columnExpressionPk = tableMetaData.getPkColumns().get(coreWindowTabFieldDTO.getCoreTableColumnDTO().getId());
                                columnExpressionPk.setFieldId(coreWindowTabFieldDTO.getId());
                                tableExpressionPrepare.getColumnExpression().AddPkColumnExpression(columnExpressionPk.getID(), columnExpressionPk);
                            }
                        }

                    }

                    FilterUtil.injectFilter(rootTableExpression, coreWindowTabDTO, coreWindowTabRequestSearchDTO);

                    AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryPerDataSource(coreTableDataSourceDTO);
                    QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);
                    param.setCoreWindowTabDTO(coreWindowTabDTO);

                    return Flux.usingWhen(getConnection(abstractRDBMSReactorFactory, connectionMono), connectionConsumer(param), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
                        RecordModelDTO recordModelDTO = new RecordModelDTO();
                        recordModelDTO.setFieldValues(new HashMap<>());
                        recordModelDTO.setPkFieldValues(new HashMap<>());

                        for (Map.Entry<String, DataProviderJavaAbstract<?, ?, Long>> stringDataProviderJavaAbstractEntry : param.getMapDataProviderJavaAbstract().entrySet()) {
                            DataProviderJavaAbstract<?, ?, Long> converterField = stringDataProviderJavaAbstractEntry.getValue();
                            if (converterField != null) {
                                converterField.setCoreTranslateLanguageDTO(coreWindowTabRequestSearchDTO.getCoreTranslateLanguageDTO());
                                DataProviderAbstract<?, ?> valueModel = converterField.convertJava(row, param);
                                recordModelDTO.getFieldValues().put(converterField.getKey(), valueModel);
                            }
                        }

                        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : param.getSelectModel().getColumnExpression().getPkColumns().entrySet()) {
                            Object pkValue = row.get(stringColumnExpressionEntry.getValue().getAliasColumnName());
                            if (pkValue instanceof Long pkValueLong) {
                                System.out.println("Record Id Before" + pkValue);
                                recordModelDTO.getPkFieldValues().put(stringColumnExpressionEntry.getValue().getFieldId(), pkValueLong);
                            }
                        }

                        CoreWindowTabResponseSearchDTO rowEntity = new CoreWindowTabResponseSearchDTO();
                        rowEntity.setRecordModelDTO(recordModelDTO);
                        return rowEntity;
                    })).flatMap(coreWindowTabResponseSearchDTO -> {
                        for (Map.Entry<Long, Serializable> longSerializableEntry : coreWindowTabResponseSearchDTO.getRecordModelDTO().getPkFieldValues().entrySet()) {
                            System.out.println("Record Id After" + longSerializableEntry.getValue());
                        }
                        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactoryMini = ConnectionStartup.createRDBMSReactorFactoryPerDataSource(coreTableDataSourceDTO);
                        ;
//                    coreWindowTabResponseSearchDTO.getRecordModelDTO().getFieldValues()
                        return Flux.create((FluxSink<CoreWindowTabResponseSearchDTO> fluxData) -> {
                            fluxData.next(coreWindowTabResponseSearchDTO);
                            fluxData.complete();
                        });

//                    return coreWindowTabResponseSearchDTO;
                    });
                }
                return null;
            }).orElse(Flux.error(new RuntimeException("Tab Not Found")));
        });
    }

    public Flux<PageDataDTO> dataProviderSearch_WithCheckCache(Mono<Connection> connectionMono, DataProviderSearchRequestDTO dataProviderSearchRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {

            if (dataProviderSearchRequestDTO.getCoreWindowTabFieldId() > 0 && dataProviderSearchRequestDTO.getCoreWindowTabId() > 0) {
                Optional<CoreWindowTabDTO> tabDTOFromCache = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(dataProviderSearchRequestDTO.getCoreWindowTabId());
                if (tabDTOFromCache.isPresent()) {
                    CoreWindowTabDTO coreWindowTabDTO = tabDTOFromCache.get();
                    CoreWindowTabFieldDTO coreWindowTabFieldDTO = coreWindowTabDTO.getCoreWindowTabFieldDTOMap().get(dataProviderSearchRequestDTO.getCoreWindowTabFieldId());
                    CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO = ConvertUtil.getDataProviderFromField(coreWindowTabFieldDTO);
                    if (coreTableColumnDataProviderDTO != null) {
                        if (coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeId() == 2) {
                            return computeListDataProvider(dataProviderSearchRequestDTO, coreTableColumnDataProviderDTO);
                        } else {
                            TableExpressionPrepare prepare = (TableExpressionPrepare) ColumnExpressionPrepareFactory.Instance().processColumnExpressionPrepare(
                                    connectionMono,
                                    userSecurity,
                                    dataProviderSearchRequestDTO.getCoreTranslateLanguageDTO(),
                                    coreWindowTabFieldDTO.getCoreTableColumnDTO(),
                                    coreWindowTabFieldDTO,
                                    null,
                                    coreTableColumnDataProviderDTO,
                                    null,
                                    null,
                                    null

                            );
                            prepare.getColumnExpression().setFieldId(dataProviderSearchRequestDTO.getCoreWindowTabFieldId());
                            return computeTableDataProvider(connectionMono, prepare, dataProviderSearchRequestDTO);
                        }
                    }
                }
            } else if (dataProviderSearchRequestDTO.getCoreProcessParamId() > 0) {
                Optional<CoreProcessParamDTO> coreProcessParamDTOOptional = CoreServiceDTOTable.coreProcessParamDTOLRUCache.get(dataProviderSearchRequestDTO.getCoreProcessParamId());
                if (coreProcessParamDTOOptional.isPresent()) {
                    CoreProcessParamDTO coreProcessParamDTO = coreProcessParamDTOOptional.get();
                    TableExpressionPrepare prepare = (TableExpressionPrepare) ColumnExpressionPrepareFactory.Instance().processColumnExpressionPrepare(
                            connectionMono,
                            userSecurity,
                            dataProviderSearchRequestDTO.getCoreTranslateLanguageDTO(),
                            null,
                            null,
                            null,
                            coreProcessParamDTO.getCoreTableColumnDataProviderDTO(),
                            null,
                            null,
                            null);
                    return computeTableDataProvider(connectionMono, prepare, dataProviderSearchRequestDTO);
                }
            }
            return Flux.error(new RuntimeException("Field Not Found"));
        });
    }

    private Flux<PageDataDTO> computeListDataProvider(DataProviderSearchRequestDTO dataProviderSearchRequestDTO, CoreTableColumnDataProviderDTO coreTableColumnDataProviderDTO) {
        Optional<CoreTableColumnDataProviderListDTO> coreTableColumnDataProviderListDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderListDTOLRUCache.get(coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
        if (coreTableColumnDataProviderListDTOOptional.isPresent()) {
            CoreTableColumnDataProviderListDTO coreTableColumnDataProviderListDTO = coreTableColumnDataProviderListDTOOptional.get();
            return Flux.create(fluxSink -> {
                for (Map.Entry<Long, CoreTableColumnDataProviderListValuesDTO> longCoreTableColumnDataProviderListValuesDTOEntry : coreTableColumnDataProviderListDTO.getCoreTableColumnDataProviderListValuesDTODTOMap().entrySet()) {
                    long keyId = longCoreTableColumnDataProviderListValuesDTOEntry.getKey();
                    String translate = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.CoreTableColumnDataProviderListValues, dataProviderSearchRequestDTO.getCoreTranslateLanguageDTO(), keyId);

//                DataProviderJavaAbstract<?, ListColumnExpression> dataProviderJavaAbstractNew = DataProviderJavaServiceRegistry.Instance().factoryInstance(optionalCoreTableColumnDataProviderListDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity);
//                dataProviderJavaAbstractNew.setColumnExpression(listColumnExpression);
//                dataProviderJavaAbstractNew.setCoreTableColumnDataProviderWithSerializerDTO(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO());
//
//                dataProviderJavaAbstractNew.convertJava()

                    KeyValueDTO<Long, Serializable> keyValueDTO = new KeyValueDTO<>();
                    keyValueDTO.setKey(keyId);
                    keyValueDTO.setDisplay(translate);
                    keyValueDTO.setOriginalData(longCoreTableColumnDataProviderListValuesDTOEntry.getValue());
                    keyValueDTO.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.convert(CoreTableColumnDataProviderTypeEnum.List, CoreTableColumnDataProviderSerializerConstant.key_KeyValueDTOListSerializer));

                    RecordModelDTO recordModelDTO = new RecordModelDTO();
                    recordModelDTO.setFieldValues(new HashMap<>());
                    recordModelDTO.setPkFieldValues(new HashMap<>());

                    recordModelDTO.getPkFieldValues().put(keyId, keyId);
                    recordModelDTO.getFieldValues().put(keyId, keyValueDTO);
                    recordModelDTO.setDisplay(translate);

                    PageDataDTO pageDTO = new PageDataDTO();
                    pageDTO.setPagingDTO(dataProviderSearchRequestDTO.getPagingDTO());
                    pageDTO.setRecordModelDTO(recordModelDTO);

                    fluxSink.next(pageDTO);
                }

                fluxSink.complete();
            });
        }
        return Flux.error(new RuntimeException("Reference List Not Found"));
    }

    private Flux<PageDataDTO> computeTableDataProvider(Mono<Connection> connectionMono, TableExpressionPrepare prepare, DataProviderSearchRequestDTO dataProviderSearchRequestDTO) {
        prepare.getColumnExpression().setPagingDTO(dataProviderSearchRequestDTO.getPagingDTO());
        prepare.getColumnExpression().setMasterTable(true);
        for (Map.Entry<String, TableInterface> stringTableInterfaceEntry : prepare.getColumnExpression().getSelectAllTable().entrySet()) {
            stringTableInterfaceEntry.getValue().setMasterTable(true);
        }

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        QuerySelectModelWithParamModel param = CoreServiceBaseEntity.convertParamStatic(abstractRDBMSReactorFactory, prepare);

        return Flux.usingWhen(CoreServiceBaseEntity.getConnectionStatic(abstractRDBMSReactorFactory, connectionMono), CoreServiceBaseEntity.connectionConsumerStatic(param), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
            RecordModelDTO recordModelDTO = new RecordModelDTO();
            recordModelDTO.setFieldValues(new HashMap<>());
            recordModelDTO.setPkFieldValues(new HashMap<>());

//                    for (Map.Entry<String, DataProviderJavaAbstract<?, ?>> stringDataProviderJavaAbstractEntry : param.getMapDataProviderJavaAbstract().entrySet()) {
//                        DataProviderJavaAbstract<?, ?> converterField = stringDataProviderJavaAbstractEntry.getValue();
//                        DataProviderAbstract<?> valueModel = converterField.convertJava(row, param);
//                        recordModelDTO.getFieldValues().put(coreWindowTabField.getId(), valueModel);
//                    }

            DataProviderAbstract<?, ?> convertData = prepare.getDataProviderJavaAbstract().convertJava(row, param);
            recordModelDTO.getFieldValues().put(dataProviderSearchRequestDTO.getCoreWindowTabFieldId(), convertData);
            recordModelDTO.setDisplay(convertData.getDisplay());

            for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : prepare.getColumnExpression().getPkColumns().entrySet()) {
                Object pkValue = row.get(stringColumnExpressionEntry.getValue().getAliasColumnName());
                if (pkValue instanceof Long pkValueLong) {
                    recordModelDTO.getPkFieldValues().put(stringColumnExpressionEntry.getValue().getId(), pkValueLong);
                }
            }

            PageDataDTO pageDTO = new PageDataDTO();
            pageDTO.setPagingDTO(dataProviderSearchRequestDTO.getPagingDTO());
            pageDTO.setRecordModelDTO(recordModelDTO);
            return pageDTO;
        }));
    }

    public Mono<List<CoreRoleDTO>> rolesPerUserTenant(Long userTenantId, CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO) {
        List<CoreRoleDTO> allRole = new ArrayList<>();

        Optional<CoreAllElementEntity> coreAllElement_CoreRole = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(CoreAllElementRegisterKeyEnum.CoreRole.toString());

        coreAllElement_CoreRole.ifPresent(coreAllElementEntity -> {
            HashMap<Long, CoreTranslateEntity> allTranslateCoreRole = CoreServiceEntityTable.translateWithOutRecordId(coreUserAuthenticateRequestDTO.getCoreTranslateLanguageDTO().getId(), coreAllElementEntity.getId());

            Optional<List<CoreRoleAssignUserTenantEntity>> coreRoleAssignUserTenants = CoreServiceEntityTable.coreRoleAssignUserTenantEntityByCoreUserTenantIdLRUCache.get(userTenantId);
            coreRoleAssignUserTenants.ifPresent(coreRoleAssignUserTenantEntities -> coreRoleAssignUserTenantEntities.forEach(coreRoleAssignUserTenantEntity -> {
                Optional<CoreRoleEntity> coreRoleEntity = CoreServiceEntityTable.coreRoleEntityLRUCache.get(coreRoleAssignUserTenantEntity.getCore_role_id());
                coreRoleEntity.ifPresent(coreRoleEntity1 -> {
                    CoreTranslateEntity coreTranslateEntity = allTranslateCoreRole.get(coreRoleEntity1.getId());
                    CoreRoleDTO coreRoleDTO = ConvertUtil.convert(coreRoleEntity1);
                    if (coreTranslateEntity != null) {
                        coreRoleDTO.setTranslate(coreTranslateEntity.getTranslate_value());
                    }

                    allRole.add(coreRoleDTO);
                });
            }));
        });

        return Mono.just(allRole);
    }

    public Mono<List<CoreMenuDTO>> menuList_WithCheckCache(CoreUserAuthenticateRequestDTO userSecurity, CoreMenuRequestDTO coreMenuRequestDTO) {
        return Mono.zip(cacheAll(null).collectList(), Mono.just(complete)).flatMap(o -> {
            List<CoreMenuDTO> allMenu = new ArrayList<>();
            Optional<CoreAllElementEntity> coreAllElement = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(CoreAllElementRegisterKeyEnum.CoreMenu.toString());
            coreAllElement.ifPresent(coreAllElementEntity -> {
                HashMap<Long, CoreTranslateEntity> coreTranslateEntityByRecordId = CoreServiceEntityTable.translateWithOutRecordId(coreMenuRequestDTO.getCoreTranslateLanguageDTO().getId(), coreAllElementEntity.getId());
                for (Long aLong : CoreServiceDTOTable.coreMenuDTOLRUCache.getKeySet()) {
                    Optional<CoreMenuDTO> optionalMenu = CoreServiceDTOTable.coreMenuDTOLRUCache.get(aLong);
                    optionalMenu.ifPresent(coreMenuDTO -> {
                        CoreTranslateEntity coreTranslateEntity = coreTranslateEntityByRecordId.get(coreMenuDTO.getId());
                        if (coreTranslateEntity != null && coreTranslateEntity.getTranslate_value() != null) {
                            coreMenuDTO.setTranslate(coreTranslateEntity.getTranslate_value());
                        }
                        allMenu.add(coreMenuDTO);
                    });
                }
            });
            return Mono.just(allMenu);
        });
    }

    public Mono<List<PageDataDTO>> getAllLanguages_WithCheckCache() {
        return Mono.zip(cacheAll(null).collectList(), Mono.just(complete)).flatMap(o -> {
            List<PageDataDTO> allLang = new ArrayList<>();
            for (Long aLong : CoreServiceDTOTable.coreTranslateLanguageDTOLRUCache.getKeySet()) {
                Optional<CoreTranslateLanguageDTO> optionalLang = CoreServiceDTOTable.coreTranslateLanguageDTOLRUCache.get(aLong);

                if (optionalLang.isPresent()) {
                    CoreTranslateLanguageDTO lang = optionalLang.get();

                    RecordModelDTO recordModelDTO = new RecordModelDTO();
                    recordModelDTO.setFieldValues(new HashMap<>());
                    recordModelDTO.setPkFieldValues(new HashMap<>());

                    KeyValueDTO<Long, CoreTranslateLanguageDTO> coreTranslateLanguageDTOKeyValue = new KeyValueDTO<>();
                    coreTranslateLanguageDTOKeyValue.setDisplay(lang.getLanguage());
                    coreTranslateLanguageDTOKeyValue.setKey(lang.getId());
                    coreTranslateLanguageDTOKeyValue.setOriginalData(lang);
                    coreTranslateLanguageDTOKeyValue.setCoreTableColumnDataProviderWithSerializerDTO(ConvertUtil.convert(CoreTableColumnDataProviderTypeEnum.Table, CoreTableColumnDataProviderSerializerConstant.key_KeyValueDTOSerializer));

                    recordModelDTO.getPkFieldValues().put(1L, lang.getId());
                    recordModelDTO.getFieldValues().put(1L, coreTranslateLanguageDTOKeyValue);
                    recordModelDTO.setDisplay(lang.getLanguage());

                    PageDataDTO pageDataDTO = new PageDataDTO();
                    pageDataDTO.setPagingDTO(new PagingDTO());
                    pageDataDTO.setRecordModelDTO(recordModelDTO);

                    allLang.add(pageDataDTO);
                }
            }
            return Mono.just(allLang);
        });
    }

    public Mono<CoreUserAuthenticateResponseDTO> login(CoreUserAuthenticateRequestDTO userAuthenticateRequestModel) {
        logger.info("Login");
        return Mono.zip(cacheAll(null).collectList(), Mono.just(complete)).flatMap(o -> {
            TableMetadata coreTenant = CoreServiceEntityTable.findByTableName("core_tenant");
            coreTenant.setMasterTable(false);
            ColumnMetaModel coreTenant_id = coreTenant.getColumnsByName().get("id");
            ColumnMetaModel coreTenant_name = coreTenant.getColumnsByName().get("name");

            TableMetadata coreUser = CoreServiceEntityTable.findByTableName("core_user");
            coreUser.setMasterTable(false);
            ColumnMetaModel coreUser_id = coreUser.getColumnsByName().get("id");
            ColumnMetaModel coreUser_username = coreUser.getColumnsByName().get("username");

            TableMetadata coreUserTenant = CoreServiceEntityTable.findByTableName("core_user_tenant");
            ColumnMetaModel coreUserTenant_id = coreUserTenant.getColumnsByName().get("id");
            ColumnMetaModel coreUserTenant_core_user_id = coreUserTenant.getColumnsByName().get("core_user_id");
            ColumnMetaModel coreUserTenant_core_tenant_id = coreUserTenant.getColumnsByName().get("core_tenant_id");
            ColumnMetaModel coreUserTenant_is_active = coreUserTenant.getColumnsByName().get("active");
            ColumnMetaModel coreUserTenant_password = coreUserTenant.getColumnsByName().get("password");

            JoinColumnModel joinCoreUserTenantToCoreUser = JoinColumnModel.builder()
                    .joinTypeEnum(JoinTypeEnum.InnerJoin)
                    .fromTable(coreUser)
                    .fromColumn(coreUser_id)
                    .toTable(coreUserTenant)
                    .toColumn(coreUserTenant_core_user_id).build();

            JoinColumnModel joinCoreUserTenantToCoreTenant = JoinColumnModel.builder()
                    .joinTypeEnum(JoinTypeEnum.InnerJoin)
                    .fromTable(coreTenant)
                    .fromColumn(coreTenant_id)
                    .toTable(coreUserTenant)
                    .toColumn(coreUserTenant_core_tenant_id).build();

            ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnCriteriaBuilder = ColumnsCriteriaComparisonOperatorModel.builder()
                    .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
                            .builder()
                            .columnExpression(coreUser_username)
                            .operationValue(ComparisonOperatorsValue
                                    .builder()
                                    .operation(ComparisonOperators.string_equal)
                                    .value(userAuthenticateRequestModel.getUserName())
                                    .build()
                            ).build()
                    )
                    .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
                            .builder()
                            .columnExpression(coreUserTenant_password)
                            .operationValue(ComparisonOperatorsValue
                                    .builder()
                                    .operation(ComparisonOperators.string_equal)
                                    .value(EncryptionUtil.encryptPassword(userAuthenticateRequestModel.getPassword()))
                                    .build()
                            ).build()
                    )
                    .logicalOperators(LogicalOperators.AND);
            ColumnsCriteriaComparisonOperatorModel columnCriteria;
            if (userAuthenticateRequestModel.getTenant() != null) {
                columnCriteria = columnCriteriaBuilder.AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
                                .builder()
                                .columnExpression(coreTenant_id)
                                .operationValue(ComparisonOperatorsValue
                                        .builder()
                                        .operation(ComparisonOperators.number_equal)
                                        .value(userAuthenticateRequestModel.getTenant().getCoreTenantDTO().getId())
                                        .build()
                                ).build())
                        .build();
            } else {
                columnCriteria = columnCriteriaBuilder.build();
            }

            TableExpression selectCoreUserTenant = new TableExpression()
                    .setId(2L)
                    .SetMasterTable(coreUserTenant.getID(), coreUserTenant)
                    .AddColumnExpression(coreUserTenant_id.getID(), coreUserTenant_id)
                    .AddColumnExpression(coreUserTenant_core_tenant_id.getID(), coreUserTenant_core_tenant_id)
                    .AddColumnExpression(coreUserTenant_is_active.getID(), coreUserTenant_is_active)
                    .AddColumnExpression(coreUserTenant_password.getID(), coreUserTenant_password)
                    .AddColumnExpression(coreUser_id.getID(), coreUser_id)
                    .AddColumnExpression(coreUser_username.getID(), coreUser_username)
                    .AddColumnExpression(coreTenant_id.getID(), coreTenant_id)
                    .AddColumnExpression(coreTenant_name.getID(), coreTenant_name)
                    .AddJoinColumn(joinCoreUserTenantToCoreUser)
                    .AddJoinColumn(joinCoreUserTenantToCoreTenant)
                    .setCriteria(columnCriteria);

            TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
            tableExpressionPrepare.setColumnExpression(selectCoreUserTenant);
            tableExpressionPrepare.generateManualWithOutMechanism(null);

            AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
            AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider(tableExpressionPrepare);
            abstractRDBMSQueryProvider.generateQueryWithParam();

            QuerySelectModelWithParamModel params = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();

            Flux<CoreUserTenantDTO> coreUserTenantDTOFlux = Flux.usingWhen(abstractRDBMSReactorFactory.getRConnection(), CoreServiceBaseEntity.connectionConsumerStatic(params), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
                Long coreUserTenant_id_val = row.get(params.getMapColumnAlias().get(coreUserTenant_id.getID()), Long.class);
                Long coreUser_id_val = row.get(params.getMapColumnAlias().get(coreUser_id.getID()), Long.class);
                Long coreTenant_id_val = row.get(params.getMapColumnAlias().get(coreTenant_id.getID()), Long.class);
                String coreTenant_name_val = row.get(params.getMapColumnAlias().get(coreTenant_name.getID()), String.class);

                CoreUserDTO coreUserDTO = new CoreUserDTO();
                coreUserDTO.setId(coreUser_id_val);

                CoreTenantDTO coreTenantMetaDataDTO = new CoreTenantDTO();
                coreTenantMetaDataDTO.setId(coreTenant_id_val);
                coreTenantMetaDataDTO.setName(coreTenant_name_val);

                CoreUserTenantDTO coreUserTenantDTO = new CoreUserTenantDTO();
                coreUserTenantDTO.setId(coreUserTenant_id_val);
                coreUserTenantDTO.setCoreUserDTO(coreUserDTO);
                coreUserTenantDTO.setCoreTenantDTO(coreTenantMetaDataDTO);
                coreUserTenantDTO.setActive(true);
                return coreUserTenantDTO;
            }));

            return Mono.zip(coreUserTenantDTOFlux.collectList(), Mono.just(new CoreUserAuthenticateResponseDTO())).flatMap(userAuthenticateResponseDTOTuple2 -> {
                userAuthenticateResponseDTOTuple2.getT2().setAllTenants(userAuthenticateResponseDTOTuple2.getT1());
                return Mono.just(userAuthenticateResponseDTOTuple2.getT2());
            });
        });
    }

    public Mono<Map<Long, CoreTranslateDTO>> coreTranslateDTOFlux_WithCheckCache(CoreTranslateRequestDTO coreTranslateRequestDTO) {
        return Mono.zip(cacheAll(null).collectList(), Mono.just(complete)).flatMap(objects -> {
            Optional<CoreAllElementDTO> coreAllElementDTOOptional = CoreServiceDTOTable.coreAllElementDTOByKeyLRUCache.get(coreTranslateRequestDTO.getRegisterKey());
            Map<Long, CoreTranslateDTO> coreTranslateDTOMap = coreAllElementDTOOptional.map(coreAllElementDTO -> coreTranslateDTOS(coreTranslateRequestDTO, coreAllElementDTO)).orElseGet(HashMap::new);
            return Mono.just(coreTranslateDTOMap);
        });
    }

    public Map<Long, CoreTranslateDTO> coreTranslateDTOS(CoreTranslateRequestDTO coreTranslateRequestDTO, CoreAllElementDTO coreAllElementDTO) {
        Optional<CoreAllElementEntity> coreAllElementEntityOptional = CoreServiceEntityTable.coreAllElementByKeyEntityLRUCache.get(coreTranslateRequestDTO.getRegisterKey());
        return coreAllElementEntityOptional.map(coreAllElementEntity -> {
            return coreTranslateWithModel(coreAllElementEntity.getId(), coreTranslateRequestDTO.getExtraParameter(), coreTranslateRequestDTO.getCoreTranslateLanguageDTO(), coreAllElementDTO);
        }).orElseGet(HashMap::new);
    }

    public Map<Long, CoreTranslateDTO> coreTranslateWithModel(Long coreAllElementId, Map<String, Object> extraParameter, CoreTranslateLanguageDTO coreTranslateLanguageDTO, CoreAllElementDTO coreAllElementDTO) {
        Map<Long, CoreTranslateDTO> coreTranslateDTOMap = new HashMap<>();
        Optional<List<CoreAllElementDetailEntity>> coreElementList = CoreServiceEntityTable.coreAllElementDetailEntityByCoreAllElementKeyLRUCache.get(coreAllElementId);
        if (coreElementList.isPresent()) {
            if (extraParameter != null) {
                Object exceptionKey = extraParameter.get(CoreElementTranslateQueryJoinerImpl.key_core_element_name);
                if (exceptionKey instanceof String exceptionKeyString) {
                    CoreAllElementDetailEntity coreAllElementDetailEntity = CoreServiceDTOTable.findCoreElement(coreElementList.get(), exceptionKeyString);
                    if (coreAllElementDetailEntity != null) {
                        CoreServiceDTOTable.convertToTranslateWithDetailDTO(coreTranslateLanguageDTO, coreAllElementDetailEntity, coreAllElementId, coreTranslateDTOMap, coreAllElementDTO);
                    }
                }
            } else {
                for (CoreAllElementDetailEntity coreAllElementDetailEntity : coreElementList.get()) {
                    CoreServiceDTOTable.convertToTranslateWithDetailDTO(coreTranslateLanguageDTO, coreAllElementDetailEntity, coreAllElementId, coreTranslateDTOMap, coreAllElementDTO);
                }
            }
        } else {
            CoreServiceDTOTable.convertToTranslateWithOutRecordId(coreTranslateLanguageDTO, coreAllElementId, coreTranslateDTOMap, coreAllElementDTO);
        }
        return coreTranslateDTOMap;
    }

    public Flux<CoreDashboardItemDTO> searchDashboardItems_WithCheckCache(Mono<Connection> connectionMono, CoreDashboardRequestDTO coreDashboardRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            Optional<List<CoreDashboardItemDTO>> result = CoreServiceDTOTable.coreDashboardItemDTOsByDashboardIdRUCache.get(coreDashboardRequestDTO.getId());
            if (result.isPresent()) {
                for (CoreDashboardItemDTO coreDashboardItemDTO : result.get()) {
                    coreDashboardItemDTO.setTranslate(coreServiceDTOTable.coreTranslateDTOMono(userSecurity.getCoreTranslateLanguageDTO(), "CoreDashboardItem", coreDashboardItemDTO.getId()));
                }
            }
            return Flux.fromIterable(result.orElseGet(ArrayList::new));
        });
    }

    public Flux<CoreDashboardViewDTO> searchDashboardViews_WithCheckCache(Mono<Connection> connectionMono, CoreDashboardRequestDTO coreDashboardRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            Optional<List<CoreDashboardViewDTO>> result = CoreServiceDTOTable.coreDashboardViewDTOsByDashboardIdDTORUCache.get(coreDashboardRequestDTO.getId());
            return Flux.fromIterable(result.orElseGet(ArrayList::new));
        });
    }

    public Flux<CoreDashboardGadgetViewDTO> searchDashboardGadgetViews_WithCheckCache(Mono<Connection> connectionMono, CoreDashboardItemRequestDTO coreDashboardItemRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            Optional<List<CoreDashboardGadgetViewDTO>> result = CoreServiceDTOTable.coreDashboardGadgetViewDTOsByDashboardItemIdDTORUCache.get(coreDashboardItemRequestDTO.getId());
            return Flux.fromIterable(result.orElseGet(ArrayList::new));
        });
    }

    public Flux<CoreDashboardGadgetDTO> searchDashboardGadgets_WithCheckCache(Mono<Connection> connectionMono, CoreDashboardItemRequestDTO coreDashboardItemRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            Optional<List<CoreDashboardGadgetDTO>> result = CoreServiceDTOTable.coreDashboardGadgetDTOsByDashboardItemIdDTORUCache.get(coreDashboardItemRequestDTO.getId());
            return Flux.fromIterable(result.orElseGet(ArrayList::new));
        });
    }

    public Flux<CoreAnalyticReportMetaDataDTO> loadAnalyticByRequest_WithCheckCache(Mono<Connection> connectionMono, AnalyticReportRequestDTO analyticReportRequestDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            CoreAnalyticReportMetaDataDTO coreAnalyticReportMetaDataDTO = new CoreAnalyticReportMetaDataDTO();

            Optional<CoreAnalyticReportDTO> coreAnalyticReportDTOOptional = CoreServiceDTOTable.coreAnalyticReportDTOLRUCache.get(analyticReportRequestDTO.getId());
            coreAnalyticReportDTOOptional.ifPresent(coreAnalyticReportDTO -> {
                coreAnalyticReportMetaDataDTO.setCoreAnalyticReportDTO(coreAnalyticReportDTO);

                if (coreAnalyticReportDTO.getCoreAllElementDTO().getRegisterKey().equals(CoreAllElementRegisterKeyEnum.Tab.toString())) {
                    Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreAnalyticReportDTO.getRecordId());
                    coreWindowTabDTOOptional.ifPresent(coreWindowTabDTO -> {
                        List<CoreAnalyticReportFieldDTO> coreAnalyticReportFieldDTOS = new ArrayList<>(coreWindowTabDTO.getCoreWindowTabFieldDTOMap().size());
                        for (Map.Entry<Long, CoreWindowTabFieldDTO> longCoreWindowTabFieldDTOEntry : coreWindowTabDTO.getCoreWindowTabFieldDTOMap().entrySet()) {
                            String fieldTranslate = CoreServiceEntityTable.translateElement(CoreAllElementRegisterKeyEnum.Field, userSecurity.getCoreTranslateLanguageDTO(), longCoreWindowTabFieldDTOEntry.getValue().getId());

                            CoreAnalyticReportFieldDTO coreAnalyticReportFieldDTO = ConvertUtil.getCoreAnalyticReportFieldDTO(longCoreWindowTabFieldDTOEntry, fieldTranslate);

                            coreAnalyticReportFieldDTOS.add(coreAnalyticReportFieldDTO);
                        }
                        Map<CoreAnalyticReportFieldRegionEnumDTO, List<CoreAnalyticReportFieldDTO>> fields = new HashMap<>();
                        fields.put(CoreAnalyticReportFieldRegionEnumDTO.None, coreAnalyticReportFieldDTOS);

                        List<CoreButtonAssignElementEntity> coreButtonAssignElementEntityList = CoreServiceEntityTable.coreButtonAssignElementRecordDTOByElementTypeAndRecordIdEnum(CoreAllElementRegisterKeyEnum.AnalyticReport, coreWindowTabDTO.getId());

                        coreAnalyticReportMetaDataDTO.setCoreAnalyticReportFieldDTOMap(fields);
                        coreAnalyticReportMetaDataDTO.setCoreButtonAssignElementDTOMap(convert(coreButtonAssignElementEntityList));
                    });
                } else if (coreAnalyticReportDTO.getCoreAllElementDTO().getRegisterKey().equals(CoreAllElementRegisterKeyEnum.Table.toString())) {
                    Optional<CoreTableDTO> coreTableDTOOptional = CoreServiceDTOTable.coreTableDTOLRUCache.get(coreAnalyticReportDTO.getRecordId());
                    coreTableDTOOptional.ifPresent(coreTableDTO -> {

                    });
                }
            });

            return Flux.just(coreAnalyticReportMetaDataDTO);
        });
    }

    public Map<Long, CoreButtonAssignElementDTO> convert(List<CoreButtonAssignElementEntity> coreButtonAssignElementEntityList) {
        Map<Long, CoreButtonAssignElementDTO> coreButtonAssignElementDTOMap = new HashMap<>();
        for (CoreButtonAssignElementEntity coreButtonAssignElementEntity : coreButtonAssignElementEntityList) {
            CoreButtonAssignElementDTO coreButtonAssignElementDTO = coreServiceDTOTable.convertCoreButtonAssignElementEntity(coreButtonAssignElementEntity);
            coreButtonAssignElementDTOMap.put(coreButtonAssignElementDTO.getId(), coreButtonAssignElementDTO);
        }
        return coreButtonAssignElementDTOMap;
    }

    public Flux<CoreProcessResponseDTO> processTableDDL(CoreTableDTO coreTableDTO) {
        return Mono.zip(cacheAll(null).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            Optional<CoreTableDataSourceDTO> coreTableDaatSourceOptional = CoreServiceDTOTable.coreTableDataSourceDTOLRUCache.get(coreTableDTO.getCore_table_datasource_id());
            if (coreTableDaatSourceOptional.isPresent()) {
                CoreTableDataSourceDTO coreTableDataSourceDTO = coreTableDaatSourceOptional.get();
                AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryPerDataSource(coreTableDataSourceDTO);
                return abstractRDBMSReactorFactory.processTableColumnMetaData(coreTableDTO).flatMapMany(coreTableMetaData -> {
                    System.out.println(coreTableMetaData.getOriginal().getName());
                    return Flux.usingWhen(getConnection(abstractRDBMSReactorFactory, null), connectionConsumerStatic("param"), Connection::close).flatMap(o -> {
                        return Flux.just(new CoreProcessResponseDTO());
                    });
                });
            } else {
                CoreProcessResponseDTO coreProcessResponseDTO = new CoreProcessResponseDTO();
                coreProcessResponseDTO.setBodyResponse("DataSource Not Found");
                return Flux.just(coreProcessResponseDTO);
            }
        });
    }

    public Flux<CoreAnalyticReportPivotGrid> refreshAnalyticReport_WithCheckCache(Mono<Connection> connectionMono, CoreAnalyticReportMetaDataDTO coreAnalyticReportMetaDataDTO, CoreUserAuthenticateRequestDTO userSecurity) {
        return Mono.zip(cacheAll(connectionMono).collectList(), Mono.just(complete)).flatMapMany(objects -> {
            CoreAllElementDTO element = coreAnalyticReportMetaDataDTO.getCoreAnalyticReportDTO().getCoreAllElementDTO();
            Optional<CoreAllElementRegisterKeyEnum> enumKey = CoreAllElementRegisterKeyEnum.getEnum(element.getRegisterKey());

            return enumKey.map(coreAllElementRegisterKeyEnum -> {
                switch (coreAllElementRegisterKeyEnum) {
                    case Tab:
                        Optional<CoreWindowTabDTO> coreWindowTabDTOOptional = CoreServiceDTOTable.coreWindowTabDTOLRUCache.get(coreAnalyticReportMetaDataDTO.getCoreAnalyticReportDTO().getRecordId());
                        coreWindowTabDTOOptional.ifPresent(coreWindowTabDTO -> {

                            TableMetadata tableMetaData = ConvertUtil.convert(coreWindowTabDTO);

                            TableExpression rootTableExpression = new TableExpression()
                                    .setId(coreWindowTabDTO.getCoreTableDTO().getId())
                                    .SetMasterTable(tableMetaData.getID(), tableMetaData)
                                    .setUuid(UUID.randomUUID().toString());
                            TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
                            tableExpressionPrepare.setColumnExpression(rootTableExpression);

                            ColumnExpressionPrepareFactory columnExpressionPrepareFactory = ColumnExpressionPrepareFactory.Instance();

                            List<CoreAnalyticReportFieldDTO> listFieldRow = coreAnalyticReportMetaDataDTO.getCoreAnalyticReportFieldDTOMap().get(CoreAnalyticReportFieldRegionEnumDTO.Row);
                            for (CoreAnalyticReportFieldDTO coreAnalyticReportFieldDTO : listFieldRow) {
                                CoreWindowTabFieldDTO field = coreWindowTabDTO.getCoreWindowTabFieldDTOMap().get(coreAnalyticReportFieldDTO.getId());
                                if (field != null) {
                                    CoreTableColumnDataProviderDTO dataProvider = ConvertUtil.getDataProviderFromField(field);
                                    if (field.getCoreTableColumnDTO() != null) {
                                        ColumnExpressionPrepare<?, Long> prepare = columnExpressionPrepareFactory.processColumnExpressionPrepare(
                                                connectionMono,
                                                userSecurity,
                                                coreAnalyticReportMetaDataDTO.getCoreTranslateLanguageDTO(),
                                                field.getCoreTableColumnDTO(),
                                                field,
                                                tableMetaData,
                                                dataProvider,
                                                rootTableExpression,
                                                rootTableExpression,
                                                tableExpressionPrepare
                                        );
                                        if (prepare != null) {
                                            prepare.getColumnExpression().setFieldId(field.getId());
                                            tableExpressionPrepare.addColumnExpressionPrepareWithColumnIdMap(prepare.getColumnExpression().getID(), prepare);
                                            tableExpressionPrepare.addMapDataProviderJavaAbstract(prepare.getColumnExpression().getID(), prepare.getDataProviderJavaAbstract());
                                            rootTableExpression.AddColumnExpression(prepare.getColumnExpression().getID(), prepare.getColumnExpression());
                                        }
                                    }
                                }
                            }

                            AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
                            QuerySelectModelWithParamModel param = convertParam(abstractRDBMSReactorFactory, tableExpressionPrepare);

                        });
                        break;
                    case Table:
                        break;

                    default:
                }
                return Flux.just(new CoreAnalyticReportPivotGrid());
            }).orElseGet(() -> Flux.just(new CoreAnalyticReportPivotGrid()));
        });
    }
}
