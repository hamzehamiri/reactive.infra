package org.hamzeh.erp.form.engine.services.core.dto.temp;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Result;
import io.r2dbc.spi.Statement;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreTranslateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.error.ErrorResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.menu.CoreMenuDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.CoreUserAuthenticateResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CommonCountryDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateLanguageDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.translate.CoreTranslateDTO;
import org.infra.reactive.form.engine.form.engine.providers.common.AbstractReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.postgres.PostgresQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.columnexpression.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.crud.SelectModel;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.join.JoinTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.operators.ComparisonOperators;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.operators.ComparisonOperatorsValue;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.operators.LogicalOperators;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.querybuilder.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.security.EncryptionUtil;
import org.infra.reactive.form.engine.form.engine.security.exception.ERPHttpStatus;
import org.infra.reactive.form.engine.form.engine.services.TranslateQueryJoiner;
import org.infra.reactive.form.engine.form.engine.services.TranslatedRegisterQuery;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.CoreElementTranslateQueryJoinerImpl;
import org.infra.reactive.form.engine.form.engine.services.translatejoiners.JoinColumnModelAndColumnAndCriteria;
import org.infra.reactive.form.engine.form.engine.setup.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.setup.CoreTables;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Objects;
import java.util.function.Function;

public class CoreServices extends CoreBaseService {

    static {
        // Find TranslateQueryJoiner With Bean Of Spring And Call Init Method
        new CoreElementTranslateQueryJoinerImpl().init();
    }

//    public Flux<CoreTranslateDTO> coreTranslateDTOFlux(CoreTranslateRequestDTO coreTranslateMetaDataRequestDTO) {
//        TableMetadata coreTranslate = CoreTables.coreTranslate();
//        coreTranslate.setMasterTable(true);
//        ColumnMetaModel coreTranslateMetadata_id = coreTranslate.getColumns().get(23L);
//        ColumnMetaModel coreTranslateMetadata_translateValue = coreTranslate.getColumns().get(24L);
//        ColumnMetaModel coreTranslateMetadata_coreTranslateLanguageMetadataId = coreTranslate.getColumns().get(25L);
//        ColumnMetaModel coreTranslateMetadata_coreAllElementId = coreTranslate.getColumns().get(26L);
//        ColumnMetaModel coreTranslateMetadata_coreGeneralId = coreTranslate.getColumns().get(27L);
//
//        TableMetadata coreAllElement = CoreTables.coreAllElement();
//        ColumnMetaModel coreAllElement_id = coreAllElement.getColumns().get(6L);
//        ColumnMetaModel coreAllElement_name = coreAllElement.getColumns().get(7L);
//        ColumnMetaModel coreAllElement_registerKey = coreAllElement.getColumns().get(8L);
//
//        JoinColumnModel joinCoreTranslateToCoreAllElement = JoinColumnModel.builder()
//                .joinTypeEnum(JoinTypeEnum.InnerJoin)
//                .toTable(coreAllElement)
//                .toColumn(coreAllElement_id)
//                .fromTable(coreTranslate)
//                .fromColumn(coreTranslateMetadata_coreAllElementId)
//                .build();
//
//        ColumnsCriteriaComparisonOperatorModel columnCriteria = null;
//        ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnsCriteriaComparisonOperatorModelBuilder = ColumnsCriteriaComparisonOperatorModel.builder()
//                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                        .builder()
//                        .columnExpression(coreTranslateMetadata_coreTranslateLanguageMetadataId)
//                        .operationValue(ComparisonOperatorsValue
//                                .builder()
//                                .operation(ComparisonOperators.EqualTo)
//                                .value(coreTranslateMetaDataRequestDTO.getCoreTranslateLanguageDTO().getId())
//                                .build()
//                        ).build()
//                )
//                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                        .builder()
//                        .columnExpression(coreAllElement_registerKey)
//                        .operationValue(ComparisonOperatorsValue
//                                .builder()
//                                .operation(ComparisonOperators.EqualTo)
//                                .value(coreTranslateMetaDataRequestDTO.getRegisterKey())
//                                .build()
//                        ).build()
//                )
//                .logicalOperators(LogicalOperators.AND);
//
//        Class<? extends TranslateQueryJoiner> clazzQuery = TranslatedRegisterQuery.getQueryJoiner(coreTranslateMetaDataRequestDTO.getRegisterKey().toLowerCase());
//        try {
//            TranslateQueryJoiner instance = clazzQuery.getConstructor().newInstance();
//            JoinColumnModelAndColumnAndCriteria joinColumnModelAndColumn = instance.createTargetElementJoin(coreTranslate, coreTranslateMetadata_coreGeneralId, coreTranslateMetaDataRequestDTO.getExtraParameter());
//
//            if (joinColumnModelAndColumn.getExtraParameterCriteria() != null && joinColumnModelAndColumn.getExtraParameterCriteria().size() > 0) {
//                joinColumnModelAndColumn.getExtraParameterCriteria().forEach(columnsCriteriaComparisonOperatorModelBuilder::AddColumnCriteriaModel);
//            }
//            columnCriteria = columnsCriteriaComparisonOperatorModelBuilder.build();
//
//            SelectModel selectCoreTranslateMetaData = SelectModel.builder()
//                    .id(2L)
//                    .AddTable(coreTranslate.getID(), coreTranslate)
//                    .AddColumnExpression(coreTranslateMetadata_id.getID(), coreTranslateMetadata_id)
//                    .AddColumnExpression(coreTranslateMetadata_translateValue.getID(), coreTranslateMetadata_translateValue)
//                    .AddColumnExpression(coreTranslateMetadata_coreTranslateLanguageMetadataId.getID(), coreTranslateMetadata_coreTranslateLanguageMetadataId)
//                    .AddColumnExpression(coreTranslateMetadata_coreAllElementId.getID(), coreTranslateMetadata_coreAllElementId)
//                    .AddColumnExpression(coreAllElement_name.getID(), coreAllElement_name)
//                    .AddColumnExpression(coreAllElement_registerKey.getID(), coreAllElement_registerKey)
//                    .AddColumnExpression(joinColumnModelAndColumn.getKeyColumn().getID(), joinColumnModelAndColumn.getKeyColumn())
//                    .AddColumnExpression(joinColumnModelAndColumn.getNameColumn().getID(), joinColumnModelAndColumn.getNameColumn())
//                    .AddJoinColumn(joinCoreTranslateToCoreAllElement)
//                    .AddJoinColumn(joinColumnModelAndColumn.getJoinColumnModel())
//                    .criteria(columnCriteria)
//                    .build();
//
//            AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
//            PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
//            postgresQueryProvider.setSelectModel(selectCoreTranslateMetaData);
//
//            QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();
//
//            Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
//                Statement statement = connection.createStatement(params.getQuery());
//                params.getParamValue().forEach(statement::bind);
//                return statement.execute();
//            };
//
//            Function<Connection, Publisher<Void>> connectionClose = (Connection connection) -> {
//                return connection.close();
//            };
//
//            Flux<CoreTranslateDTO> resulTranslate = Flux.usingWhen(abstractReactorFactory.getConnection(), connectionProvider, connectionClose).flatMapSequential(result -> {
//                return result.map((row, rowMetadata) -> {
//                    CoreAllElementDTO coreAllElementDTO = new CoreAllElementDTO();
//                    coreAllElementDTO.setName(row.get(params.getMapColumn().get("7"), String.class));
//                    coreAllElementDTO.setRegisterKey(row.get(params.getMapColumn().get("8"), String.class));
//
//                    String keyColumnName = params.getMapColumn().get(joinColumnModelAndColumn.getKeyColumn().getID());
//                    String nameColumn = params.getMapColumn().get(joinColumnModelAndColumn.getNameColumn().getID());
//
//                    HashMap<String, String> keyTranslate = new HashMap<>();
//                    keyTranslate.put("id", row.get(keyColumnName, String.class));
//                    keyTranslate.put("name", row.get(nameColumn, String.class));
//
//                    CoreTranslateDTO coreTranslateMetaDataDTO = new CoreTranslateDTO();
//                    coreTranslateMetaDataDTO.setId(row.get(params.getMapColumn().get("1"), Long.class));
//                    coreTranslateMetaDataDTO.setTranslateValue(row.get(params.getMapColumn().get("2"), String.class));
//                    coreTranslateMetaDataDTO.setCoreAllElementDTO(coreAllElementDTO);
//                    coreTranslateMetaDataDTO.setCoreGeneralRecordDTO(keyTranslate);
//
//                    return coreTranslateMetaDataDTO;
//                });
//            });
//            return resulTranslate;
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public Flux<CoreRoleDTO> rolesPerUserTenant(Long userTenantId) {
//        TableMetadata coreRoleMetaData = CoreTables.coreRole();
//        ColumnMetaModel coreRoleMetaData_id = coreRoleMetaData.getColumns().get(1L);
//        ColumnMetaModel coreRoleMetaData_name = coreRoleMetaData.getColumns().get(2L);
//        ColumnMetaModel coreRoleMetaData_title = coreRoleMetaData.getColumns().get(3L);
//
//        TableMetadata coreRoleAssignUserTenantMetaData = CoreTables.coreRoleAssignUserTenant();
//        coreRoleAssignUserTenantMetaData.setMasterTable(true);
//        ColumnMetaModel coreRoleAssignUserTenantMetaData_id = coreRoleAssignUserTenantMetaData.getColumns().get(4L);
//        ColumnMetaModel coreRoleAssignUserTenantMetaData_coreRoleMetadataId = coreRoleAssignUserTenantMetaData.getColumns().get(5L);
//        ColumnMetaModel coreRoleAssignUserTenantMetaData_coreUserTenantId = coreRoleAssignUserTenantMetaData.getColumns().get(6L);
//        ColumnMetaModel coreRoleAssignUserTenantMetaData_isActive = coreRoleAssignUserTenantMetaData.getColumns().get(7L);
//
//        JoinColumnModel joinCoreRoleAssignUserTenantMetaDataToCoreRoleMetaData = JoinColumnModel.builder()
//                .joinTypeEnum(JoinTypeEnum.InnerJoin)
//                .toTable(coreRoleMetaData)
//                .toColumn(coreRoleMetaData_id)
//                .fromTable(coreRoleAssignUserTenantMetaData)
//                .fromColumn(coreRoleAssignUserTenantMetaData_coreRoleMetadataId).build();
//
//        ColumnsCriteriaComparisonOperatorModel columnCriteriaBuilder = ColumnsCriteriaComparisonOperatorModel.builder()
//                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                        .builder()
//                        .columnExpression(coreRoleAssignUserTenantMetaData_coreUserTenantId)
//                        .operationValue(ComparisonOperatorsValue
//                                .builder()
//                                .operation(ComparisonOperators.EqualTo)
//                                .value(userTenantId)
//                                .build()
//                        ).build()
//                )
//                .logicalOperators(LogicalOperators.AND)
//                .build();
//
//        SelectModel selectCoreRoleAssignUserTenantMetaData = SelectModel.builder()
//                .id(2L)
//                .AddTable(coreRoleAssignUserTenantMetaData.getID(), coreRoleAssignUserTenantMetaData)
//                .AddColumnExpression(coreRoleAssignUserTenantMetaData_id.getID(), coreRoleAssignUserTenantMetaData_id)
//                .AddColumnExpression(coreRoleAssignUserTenantMetaData_isActive.getID(), coreRoleAssignUserTenantMetaData_isActive)
//                .AddColumnExpression(coreRoleMetaData_id.getID(), coreRoleMetaData_id)
//                .AddColumnExpression(coreRoleMetaData_name.getID(), coreRoleMetaData_name)
//                .AddColumnExpression(coreRoleMetaData_title.getID(), coreRoleMetaData_title)
//                .AddJoinColumn(joinCoreRoleAssignUserTenantMetaDataToCoreRoleMetaData)
//                .criteria(columnCriteriaBuilder)
//                .build();
//
//        AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
//        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
//        postgresQueryProvider.setSelectModel(selectCoreRoleAssignUserTenantMetaData);
//
//        QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();
//
//        Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
//            Statement statement = connection.createStatement(params.getQuery());
//            params.getParamValue().forEach(statement::bind);
//            return statement.execute();
//        };
//
//        Function<Connection, Publisher<Void>> connectionClose = (Connection connection) -> {
//            return connection.close();
//        };
//
//        Flux<CoreRoleDTO> res = Flux.usingWhen(abstractReactorFactory.getConnection(), connectionProvider, connectionClose).flatMap(result -> {
//            return result.map((row, rowMetadata) -> {
//                Long coreRoleMetaData_id_val = row.get(params.getMapColumn().get("1"), Long.class);
//                String coreRoleMetaData_name_val = row.get(params.getMapColumn().get("2"), String.class);
//                String coreRoleMetaData_title_val = row.get(params.getMapColumn().get("3"), String.class);
//                CoreRoleDTO coreRoleMetaDataDTO = new CoreRoleDTO();
//                coreRoleMetaDataDTO.setId(coreRoleMetaData_id_val);
//                coreRoleMetaDataDTO.setName(coreRoleMetaData_name_val);
//                coreRoleMetaDataDTO.setTitle(coreRoleMetaData_title_val);
//                return coreRoleMetaDataDTO;
//            });
//        });
//
//        return res;
//    }

//    public Mono<CoreUserAuthenticateResponseDTO> login(CoreUserAuthenticateRequestDTO userAuthenticateRequestModel) {
//        logger.info("Login");
//
//        TableMetadata coreTenantMetadata = CoreTables.coreTenant();
//        ColumnMetaModel coreTenantMetadata_id = coreTenantMetadata.getColumns().get(8L);
//        ColumnMetaModel coreTenantMetadata_name = coreTenantMetadata.getColumns().get(9L);
//        ColumnMetaModel coreTenantMetadata_coreTenantTypeId = coreTenantMetadata.getColumns().get(10L);
//        ColumnMetaModel coreTenantMetadata_coreTenantMetadataId = coreTenantMetadata.getColumns().get(11L);
//
//        TableMetadata coreUser = CoreTables.coreUser();
//        ColumnMetaModel coreUser_id = coreUser.getColumns().get(6L);
//        ColumnMetaModel coreUser_username = coreUser.getColumns().get(7L);
//
//        TableMetadata coreUserTenant = CoreTables.coreUserTenant();
//        coreUserTenant.setMasterTable(true);
//        ColumnMetaModel coreUserTenant_id = coreUserTenant.getColumns().get(1L);
//        ColumnMetaModel coreUserTenant_core_user_id = coreUserTenant.getColumns().get(2L);
//        ColumnMetaModel coreUserTenant_core_tenant_id = coreUserTenant.getColumns().get(3L);
//        ColumnMetaModel coreUserTenant_is_active = coreUserTenant.getColumns().get(4L);
//        ColumnMetaModel coreUserTenant_password = coreUserTenant.getColumns().get(5L);
//
//        JoinColumnModel joinCoreUserTenantToCoreUser = JoinColumnModel.builder()
//                .joinTypeEnum(JoinTypeEnum.InnerJoin)
//                .toTable(coreUser)
//                .toColumn(coreUser_id)
//                .fromTable(coreUserTenant)
//                .fromColumn(coreUserTenant_core_user_id).build();
//
//        JoinColumnModel joinCoreUserTenantToCoreTenant = JoinColumnModel.builder()
//                .joinTypeEnum(JoinTypeEnum.InnerJoin)
//                .toTable(coreTenantMetadata)
//                .toColumn(coreTenantMetadata_id)
//                .fromTable(coreUserTenant)
//                .fromColumn(coreUserTenant_core_tenant_id).build();
//
//        ColumnsCriteriaComparisonOperatorModel.ColumnsCriteriaComparisonOperatorModelBuilder columnCriteriaBuilder = ColumnsCriteriaComparisonOperatorModel.builder()
//                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                        .builder()
//                        .columnExpression(coreUser_username)
//                        .operationValue(ComparisonOperatorsValue
//                                .builder()
//                                .operation(ComparisonOperators.EqualTo)
//                                .value(userAuthenticateRequestModel.getUserName())
//                                .build()
//                        ).build()
//                )
//                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                        .builder()
//                        .columnExpression(coreUserTenant_password)
//                        .operationValue(ComparisonOperatorsValue
//                                .builder()
//                                .operation(ComparisonOperators.EqualTo)
//                                .value(EncryptionUtil.encryptPassword(userAuthenticateRequestModel.getPassword()))
//                                .build()
//                        ).build()
//                )
//                .logicalOperators(LogicalOperators.AND);
//        ColumnsCriteriaComparisonOperatorModel columnCriteria = null;
//        if (userAuthenticateRequestModel.getTenant() != null) {
//            columnCriteria = columnCriteriaBuilder.AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel
//                            .builder()
//                            .columnExpression(coreTenantMetadata_id)
//                            .operationValue(ComparisonOperatorsValue
//                                    .builder()
//                                    .operation(ComparisonOperators.EqualTo)
//                                    .value(userAuthenticateRequestModel.getTenant().getCoreTenantId().getId())
//                                    .build()
//                            ).build())
//                    .build();
//        } else {
//            columnCriteria = columnCriteriaBuilder.build();
//        }
//
//        SelectModel selectCoreUserTenant = SelectModel.builder()
//                .id(2L)
//                .AddTable(coreUserTenant.getID(), coreUserTenant)
//                .AddColumnExpression(coreUserTenant_id.getID(), coreUserTenant_id)
//                .AddColumnExpression(coreUserTenant_core_tenant_id.getID(), coreUserTenant_core_tenant_id)
//                .AddColumnExpression(coreUserTenant_is_active.getID(), coreUserTenant_is_active)
//                .AddColumnExpression(coreUserTenant_password.getID(), coreUserTenant_password)
//                .AddColumnExpression(coreUser_id.getID(), coreUser_id)
//                .AddColumnExpression(coreUser_username.getID(), coreUser_username)
//                .AddColumnExpression(coreTenantMetadata_id.getID(), coreTenantMetadata_id)
//                .AddColumnExpression(coreTenantMetadata_name.getID(), coreTenantMetadata_name)
//                .AddJoinColumn(joinCoreUserTenantToCoreUser)
//                .AddJoinColumn(joinCoreUserTenantToCoreTenant)
//                .criteria(columnCriteria)
//                .build();
//        AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
//        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
//        postgresQueryProvider.setSelectModel(selectCoreUserTenant);
//
//        QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();
//
//        Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
//            Statement statement = connection.createStatement(params.getQuery());
//            params.getParamValue().forEach(statement::bind);
//            return statement.execute();
//        };
//
//        Function<Connection, Publisher<Void>> connectionClose = (Connection connection) -> {
//            return connection.close();
//        };
//
//        Flux<CoreUserTenantDTO> coreUserTenantDTOFlux = Flux.usingWhen(abstractReactorFactory.getConnection(), connectionProvider, connectionClose).flatMap(result -> {
//            return result.map((row, rowMetadata) -> {
//                Long coreUserTenant_id_val = row.get(params.getMapColumn().get("1"), Long.class);
//                Long coreUser_id_val = row.get(params.getMapColumn().get("6"), Long.class);
//                Long coreTenantMetadata_id_val = row.get(params.getMapColumn().get("8"), Long.class);
//                String coreTenantMetadata_name_val = row.get(params.getMapColumn().get("9"), String.class);
//
//                CoreUserDTO coreUserDTO = new CoreUserDTO();
//                coreUserDTO.setId(coreUser_id_val);
//
//                CoreTenantDTO coreTenantMetaDataDTO = new CoreTenantDTO();
//                coreTenantMetaDataDTO.setId(coreTenantMetadata_id_val);
//                coreTenantMetaDataDTO.setName(coreTenantMetadata_name_val);
//
//                CoreUserTenantDTO coreUserTenantDTO = new CoreUserTenantDTO();
//                coreUserTenantDTO.setId(coreUserTenant_id_val);
//                coreUserTenantDTO.setCoreUserId(coreUserDTO);
//                coreUserTenantDTO.setCoreTenantId(coreTenantMetaDataDTO);
//                coreUserTenantDTO.setActive(true);
//                return coreUserTenantDTO;
//            });
//        });
//
//        Mono<CoreUserAuthenticateResponseDTO> resultUser = Mono.zip(coreUserTenantDTOFlux.collectList(), Mono.just(new CoreUserAuthenticateResponseDTO())).flatMap(userAuthenticateResponseDTOTuple2 -> {
//            userAuthenticateResponseDTOTuple2.getT2().setAllTenants(userAuthenticateResponseDTOTuple2.getT1());
//            return Mono.just(userAuthenticateResponseDTOTuple2.getT2());
//        });
//        return resultUser;
//    }

//    public Flux<CoreTranslateLanguageDTO> getAllLanguages() {
//        logger.info("Lang");
//        TableMetadata commonCountry = CoreTables.commonCountry();
//        ColumnMetaModel commonCountry_Id = commonCountry.getColumns().get(6L);
//        ColumnMetaModel commonCountry_Name = commonCountry.getColumns().get(7L);
//        ColumnMetaModel commonCountry_FlagPicPath = commonCountry.getColumns().get(8L);
//
//        TableMetadata coreTranslateLanguageMetadata = CoreTables.coreTranslateLanguage();
//        coreTranslateLanguageMetadata.setMasterTable(true);
//        ColumnMetaModel coreTranslateLanguageMetadata_id = coreTranslateLanguageMetadata.getColumns().get(31L);
//        ColumnMetaModel coreTranslateLanguageMetadata_localeName = coreTranslateLanguageMetadata.getColumns().get(32L);
//        ColumnMetaModel coreTranslateLanguageMetadata_language = coreTranslateLanguageMetadata.getColumns().get(33L);
//        ColumnMetaModel coreTranslateLanguageMetadata_commonCountryId = coreTranslateLanguageMetadata.getColumns().get(34L);
//        ColumnMetaModel coreTranslateLanguageMetadata_isRTL = coreTranslateLanguageMetadata.getColumns().get(35L);
//
//
//        JoinColumnModel joinTabToCountry = JoinColumnModel.builder()
//                .joinTypeEnum(JoinTypeEnum.LeftJoin)
//                .toTable(commonCountry)
//                .toColumn(commonCountry_Id)
//                .fromTable(coreTranslateLanguageMetadata)
//                .fromColumn(coreTranslateLanguageMetadata_commonCountryId).build();
//
//        SelectModel selectCoreTranslateLanguageMetadata = SelectModel.builder()
//                .id(3L)
//                .AddTable(coreTranslateLanguageMetadata.getID(), coreTranslateLanguageMetadata)
//                .AddColumnExpression(coreTranslateLanguageMetadata_id.getID(), coreTranslateLanguageMetadata_id)
//                .AddColumnExpression(coreTranslateLanguageMetadata_localeName.getID(), coreTranslateLanguageMetadata_localeName)
//                .AddColumnExpression(coreTranslateLanguageMetadata_language.getID(), coreTranslateLanguageMetadata_language)
//                .AddColumnExpression(coreTranslateLanguageMetadata_isRTL.getID(), coreTranslateLanguageMetadata_isRTL)
//                .AddColumnExpression(commonCountry_Id.getID(), commonCountry_Id)
//                .AddColumnExpression(commonCountry_Name.getID(), commonCountry_Name)
//                .AddColumnExpression(commonCountry_FlagPicPath.getID(), commonCountry_FlagPicPath)
//                .AddJoinColumn(joinTabToCountry)
//                .build();
//
//        AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
//        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
//        postgresQueryProvider.setSelectModel(selectCoreTranslateLanguageMetadata);
//
//        QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();
//
//        Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
//            Statement statement = connection.createStatement(params.getQuery());
//            params.getParamValue().forEach(statement::bind);
//            return statement.execute();
//        };
//
//        Function<Connection, Publisher<Void>> connectionClose = (Connection connection) -> {
//            return connection.close();
//        };
//
//        Flux<CoreTranslateLanguageDTO> languages = Flux.usingWhen(abstractReactorFactory.getConnection(), connectionProvider, connectionClose).flatMapSequential(result -> {
//            return result.map((row, rowMetadata) -> {
//                CommonCountryDTO commonCountry1 = new CommonCountryDTO();
//                commonCountry1.setId(row.get(params.getMapColumn().get(commonCountry_Id.getID()), Long.class));
//                commonCountry1.setName(row.get(params.getMapColumn().get(commonCountry_Name.getID()), String.class));
//                commonCountry1.setFlagPicPath(row.get(params.getMapColumn().get(commonCountry_FlagPicPath.getID()), String.class));
//
//                CoreTranslateLanguageDTO coreTranslateLanguageMetadata1 = new CoreTranslateLanguageDTO();
//                coreTranslateLanguageMetadata1.setId(row.get(params.getMapColumn().get(coreTranslateLanguageMetadata_id.getID()), Long.class));
//                coreTranslateLanguageMetadata1.setLocaleName(row.get(params.getMapColumn().get(coreTranslateLanguageMetadata_localeName.getID()), String.class));
//                coreTranslateLanguageMetadata1.setLanguage(row.get(params.getMapColumn().get(coreTranslateLanguageMetadata_language.getID()), String.class));
//                coreTranslateLanguageMetadata1.setCommonCountry(commonCountry1);
//                coreTranslateLanguageMetadata1.setRTL(Objects.requireNonNull(row.get(params.getMapColumn().get(coreTranslateLanguageMetadata_isRTL.getID()), String.class)).equalsIgnoreCase("1"));
//
//                return coreTranslateLanguageMetadata1;
//            });
//        });
//
//        return languages;
//    }
}
