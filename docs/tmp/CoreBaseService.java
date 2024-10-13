package org.hamzeh.erp.form.engine.services.core.dto.temp;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Result;
import io.r2dbc.spi.Statement;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.infra.reactive.form.engine.cache.lru.LRUCache;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnEditorDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
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
import org.infra.reactive.form.engine.form.engine.setup.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.setup.CoreTables;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

public class CoreBaseService {
    protected Logger logger = LogManager.getLogger(CoreServices.class);
    protected static LRUCache<Long, CoreWindowDTO> windowMetaDataDTOLRUCache = new LRUCache<>(1000);

    public Mono<CoreWindowDTO> windowRequestMetaData(CoreWindowRequestDTO coreWindowRequestModel, CoreUserAuthenticateRequestDTO userSecurity) {
        Optional<CoreWindowDTO> cache = windowMetaDataDTOLRUCache.get(coreWindowRequestModel.getId());
        if (cache.isPresent())
            return Mono.just(cache.get());

        TableMetadata coreWindowMetaDataTable = CoreTables.coreWindow();
        coreWindowMetaDataTable.setMasterTable(true);

        ColumnMetaModel windowId = coreWindowMetaDataTable.getColumns().get(1L);
        ColumnMetaModel windowName = coreWindowMetaDataTable.getColumns().get(2L);
        ColumnMetaModel windowTitle = coreWindowMetaDataTable.getColumns().get(3L);

        ColumnsCriteriaComparisonOperatorModel columnCriteria = ColumnsCriteriaComparisonOperatorModel.builder()
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(windowId)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.EqualTo)
                                .value(coreWindowRequestModel.getId())
                                .build()).build())
                .logicalOperators(LogicalOperators.OR)
                .build();

        SelectModel selectModelWindowMetaData = SelectModel.builder()
                .id(1L)
                .AddTable(coreWindowMetaDataTable.getID(), coreWindowMetaDataTable)
                .AddColumnExpression(windowId.getID(), windowId)
                .AddColumnExpression(windowName.getID(), windowName)
                .AddColumnExpression(windowTitle.getID(), windowTitle)
                .criteria(columnCriteria)
                .build();

        AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
        postgresQueryProvider.setSelectModel(selectModelWindowMetaData);

        QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();

        Function<Connection, Mono<? extends Result>> connectionProvider = (Connection connection) -> {
            Statement statement = connection.createStatement(params.getQuery());
            params.getParamValue().forEach(statement::bind);
            return Mono.from(statement.execute());
        };

        Mono<Connection> connection = abstractReactorFactory.getConnection();

        Mono<CoreWindowDTO> dd = Mono.usingWhen(connection, connectionProvider, Connection::close).flatMap(result -> {
            return Mono.from(result.map((row, rowMetadata) -> {
                Map<Long, CoreWindowTabDTO> coreWindowTabDTOMap = new HashMap<>();

                CoreWindowDTO coreWindowMetaDataDTO = new CoreWindowDTO();
                coreWindowMetaDataDTO.setCoreWindowTabDTOMap(coreWindowTabDTOMap);
                coreWindowMetaDataDTO.setId(row.get(params.getMapColumn().get("1"), Long.class));
                coreWindowMetaDataDTO.setName(row.get(params.getMapColumn().get("2"), String.class));
                coreWindowMetaDataDTO.setTitle(row.get(params.getMapColumn().get("3"), String.class));

                return coreWindowMetaDataDTO;
            }));
        });
        return dd;
    }

    public Mono<CoreWindowDTO> window2(CoreWindowRequestDTO coreWindowRequestModel, CoreUserAuthenticateRequestDTO userSecurity) {
        Optional<CoreWindowDTO> cache = windowMetaDataDTOLRUCache.get(coreWindowRequestModel.getId());
        if (cache.isPresent())
            return Mono.just(cache.get());

        TableMetadata coreWindowMetaDataTable = CoreTables.coreWindow();
        coreWindowMetaDataTable.setMasterTable(true);

        ColumnMetaModel windowId = coreWindowMetaDataTable.getColumns().get(1L);
        ColumnMetaModel windowName = coreWindowMetaDataTable.getColumns().get(2L);
        ColumnMetaModel windowTitle = coreWindowMetaDataTable.getColumns().get(3L);

        TableMetadata coreTabMetaDataTable = CoreTables.coreWindowTab();

        ColumnMetaModel tabId = coreTabMetaDataTable.getColumns().get(4L);
        ColumnMetaModel tabName = coreTabMetaDataTable.getColumns().get(5L);
        ColumnMetaModel tabTitle = coreTabMetaDataTable.getColumns().get(6L);
        ColumnMetaModel coreTableId = coreTabMetaDataTable.getColumns().get(7L);
        ColumnMetaModel coreWindowId = coreTabMetaDataTable.getColumns().get(8L);

        return null;
    }
    public Mono<CoreWindowDTO> window(CoreWindowRequestDTO coreWindowRequestModel, CoreUserAuthenticateRequestDTO userSecurity) {
        Optional<CoreWindowDTO> cache = windowMetaDataDTOLRUCache.get(coreWindowRequestModel.getId());
        if (cache.isPresent())
            return Mono.just(cache.get());

        TableMetadata coreWindowMetaDataTable = CoreTables.coreWindow();
        coreWindowMetaDataTable.setMasterTable(true);

        ColumnMetaModel windowId = coreWindowMetaDataTable.getColumns().get(1L);
        ColumnMetaModel windowName = coreWindowMetaDataTable.getColumns().get(2L);
        ColumnMetaModel windowTitle = coreWindowMetaDataTable.getColumns().get(3L);

        TableMetadata coreTabMetaDataTable = CoreTables.coreWindowTab();

        ColumnMetaModel tabId = coreTabMetaDataTable.getColumns().get(4L);
        ColumnMetaModel tabName = coreTabMetaDataTable.getColumns().get(5L);
        ColumnMetaModel tabTitle = coreTabMetaDataTable.getColumns().get(6L);
        ColumnMetaModel coreTableId = coreTabMetaDataTable.getColumns().get(7L);
        ColumnMetaModel coreWindowId = coreTabMetaDataTable.getColumns().get(8L);

        TableMetadata coreFieldMetaDataTable = CoreTables.coreWindowTabField();

        ColumnMetaModel fieldId = coreFieldMetaDataTable.getColumns().get(9L);
        ColumnMetaModel fieldName = coreFieldMetaDataTable.getColumns().get(10L);
        ColumnMetaModel fieldTitle = coreFieldMetaDataTable.getColumns().get(11L);
        ColumnMetaModel coreTabId = coreFieldMetaDataTable.getColumns().get(12L);
        ColumnMetaModel coreColumnId = coreFieldMetaDataTable.getColumns().get(13L);

        TableMetadata coreColumnMetaData = CoreTables.coreTableColumn();

        ColumnMetaModel columnId = coreColumnMetaData.getColumns().get(14L);
        ColumnMetaModel columnName = coreColumnMetaData.getColumns().get(15L);
        ColumnMetaModel columnTitle = coreColumnMetaData.getColumns().get(16L);
        ColumnMetaModel columnCoreEditorId = coreColumnMetaData.getColumns().get(17L);
        ColumnMetaModel columnXmlQuerySelect = coreColumnMetaData.getColumns().get(18L);
        ColumnMetaModel columnCoreTableId = coreColumnMetaData.getColumns().get(19L);

        TableMetadata coreTableColumnEditor = CoreTables.coreTableColumnEditor();
        ColumnMetaModel editorId = coreTableColumnEditor.getColumns().get(20L);
        ColumnMetaModel editorName = coreTableColumnEditor.getColumns().get(21L);
        ColumnMetaModel editorClassRegisterKey = coreTableColumnEditor.getColumns().get(22L);

        TableMetadata coreTranslate = CoreTables.coreTranslate();
        ColumnMetaModel coreTranslate_Id = coreTranslate.getColumns().get(23L);
        ColumnMetaModel coreTranslate_translate_value = coreTranslate.getColumns().get(24L);
        ColumnMetaModel coreTranslateId_core_translate_language_id = coreTranslate.getColumns().get(25L);
        ColumnMetaModel coreTranslateId_core_all_element_id = coreTranslate.getColumns().get(26L);
        ColumnMetaModel coreTranslateId_core_translate_record_id = coreTranslate.getColumns().get(27L);

        TableMetadata coreAllElement = CoreTables.coreAllElement();
        ColumnMetaModel coreAllElement_Id = coreAllElement.getColumns().get(28L);
        ColumnMetaModel coreAllElement_name = coreAllElement.getColumns().get(29L);
        ColumnMetaModel coreAllElement_register_key = coreAllElement.getColumns().get(30L);

        TableMetadata coreTranslateLang = CoreTables.coreTranslateLanguage();
        ColumnMetaModel coreTranslateLang_id = coreTranslateLang.getColumns().get(31L);
        ColumnMetaModel coreTranslateLang_locale_name = coreTranslateLang.getColumns().get(32L);
        ColumnMetaModel coreTranslateLang_language = coreTranslateLang.getColumns().get(33L);
        ColumnMetaModel coreTranslateLang_common_country_id = coreTranslateLang.getColumns().get(34L);
        ColumnMetaModel coreTranslateLang_is_rtl = coreTranslateLang.getColumns().get(35L);

        ColumnsCriteriaComparisonOperatorModel columnCriteria = ColumnsCriteriaComparisonOperatorModel.builder()
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(windowId)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.EqualTo)
                                .value(coreWindowRequestModel.getId())
                                .build()).build())
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(coreTranslateLang_locale_name)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.EqualTo)
                                .value("fa_IR")
                                .build()).build())
                .AddColumnCriteriaModel(ColumnCriteriaLogicalOperatorModel.builder()
                        .columnExpression(coreAllElement_register_key)
                        .operationValue(ComparisonOperatorsValue.builder()
                                .operation(ComparisonOperators.EqualTo)
                                .value("Field")
                                .build()).build())
                .logicalOperators(LogicalOperators.AND)
                .build();

        JoinColumnModel joinTabToWindow = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.LeftJoin)
                .toTable(coreTabMetaDataTable)
                .toColumn(coreWindowId)
                .fromTable(coreWindowMetaDataTable)
                .fromColumn(windowId).build();

        JoinColumnModel joinFieldToTab = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.LeftJoin)
                .toTable(coreFieldMetaDataTable)
                .toColumn(coreTabId)
                .fromTable(coreTabMetaDataTable)
                .fromColumn(tabId).build();


        JoinColumnModel joinTranslateToField = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.LeftJoin)
                .toTable(coreTranslate)
                .toColumn(coreTranslateId_core_translate_record_id)
                .fromTable(coreFieldMetaDataTable)
                .fromColumn(fieldId).build();

        JoinColumnModel joinTranslateLangToTranslate = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.LeftJoin)
                .toTable(coreTranslateLang)
                .toColumn(coreTranslateLang_id)
                .fromTable(coreTranslate)
                .fromColumn(coreTranslateId_core_translate_language_id).build();

        JoinColumnModel joinCoreAllElementToTranslate = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.LeftJoin)
                .toTable(coreAllElement)
                .toColumn(coreAllElement_Id)
                .fromTable(coreTranslate)
                .fromColumn(coreTranslateId_core_all_element_id).build();


        JoinColumnModel joinColumnToField = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.InnerJoin)
                .toTable(coreColumnMetaData)
                .toColumn(columnId)
                .fromTable(coreFieldMetaDataTable)
                .fromColumn(coreColumnId).build();

        JoinColumnModel joinEditorToColumn = JoinColumnModel.builder()
                .joinTypeEnum(JoinTypeEnum.InnerJoin)
                .toTable(coreTableColumnEditor)
                .toColumn(editorId)
                .fromTable(coreColumnMetaData)
                .fromColumn(columnCoreEditorId).build();

        SelectModel selectModelWindowMetaData = SelectModel.builder()
                .id(1L)
                .AddTable(coreWindowMetaDataTable.getID(), coreWindowMetaDataTable)
                .AddColumnExpression(windowId.getID(), windowId)
                .AddColumnExpression(windowName.getID(), windowName)
                .AddColumnExpression(windowTitle.getID(), windowTitle)
                .AddColumnExpression(tabId.getID(), tabId)
                .AddColumnExpression(tabName.getID(), tabName)
                .AddColumnExpression(tabTitle.getID(), tabTitle)

                .AddColumnExpression(fieldId.getID(), fieldId)
                .AddColumnExpression(fieldName.getID(), fieldName)
                .AddColumnExpression(fieldTitle.getID(), fieldTitle)
                .AddColumnExpression(coreTranslate_translate_value.getID(), coreTranslate_translate_value)

                .AddColumnExpression(columnId.getID(), columnId)
                .AddColumnExpression(columnName.getID(), columnName)
                .AddColumnExpression(columnTitle.getID(), columnTitle)
                .AddColumnExpression(columnXmlQuerySelect.getID(), columnXmlQuerySelect)
                .AddColumnExpression(columnCoreTableId.getID(), columnCoreTableId)

                .AddColumnExpression(editorId.getID(), editorId)
                .AddColumnExpression(editorName.getID(), editorName)
                .AddColumnExpression(editorClassRegisterKey.getID(), editorClassRegisterKey)

                .AddJoinColumn(joinTabToWindow)
                .AddJoinColumn(joinFieldToTab)

                .AddJoinColumn(joinTranslateToField)
                .AddJoinColumn(joinTranslateLangToTranslate)
                .AddJoinColumn(joinCoreAllElementToTranslate)

                .AddJoinColumn(joinColumnToField)
                .AddJoinColumn(joinEditorToColumn)
                .criteria(columnCriteria)
                .build();


        AbstractReactorFactory<?> abstractReactorFactory = ConnectionStartup.createConnectionPostgres();
        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider();
        postgresQueryProvider.setSelectModel(selectModelWindowMetaData);

        QuerySelectModelWithParamModel params = postgresQueryProvider.generateQueryWithParam();

        Function<Connection, Publisher<? extends Result>> connectionProvider = (Connection connection) -> {
            Statement statement = connection.createStatement(params.getQuery());
            params.getParamValue().forEach(statement::bind);
            return statement.execute();
        };

        Mono<Connection> connection = abstractReactorFactory.getConnection();

        Flux<CoreWindowDTO> coreWindowMetaDataDTOFlux = Flux.usingWhen(connection, connectionProvider, Connection::close).flatMap(result -> {
            Map<Long, CoreWindowTabDTO> coreWindowTabDTOMap = new HashMap<>();
            CoreWindowDTO coreWindowMetaDataDTO = new CoreWindowDTO();
            coreWindowMetaDataDTO.setCoreWindowTabDTOMap(coreWindowTabDTOMap);

            return result.map((row, rowMetadata) -> {
                coreWindowMetaDataDTO.setId(row.get(params.getMapColumn().get(windowId.getID()), Long.class));
                coreWindowMetaDataDTO.setName(row.get(params.getMapColumn().get(windowName.getID()), String.class));
                coreWindowMetaDataDTO.setTitle(row.get(params.getMapColumn().get(windowTitle.getID()), String.class));

                Long tabIDRet = row.get(params.getMapColumn().get(tabId.getID()), Long.class);
                String tabNameRet = row.get(params.getMapColumn().get(tabName.getID()), String.class);
                String tabTitleRet = row.get(params.getMapColumn().get(tabTitle.getID()), String.class);

                if (tabIDRet != null) {
                    Long fieldIDRet = row.get(params.getMapColumn().get(fieldId.getID()), Long.class);
                    String fieldNameRet = row.get(params.getMapColumn().get(fieldName.getID()), String.class);
                    String fieldTitleRet = row.get(params.getMapColumn().get(fieldTitle.getID()), String.class);
                    String coreTranslate_translate_valueRet = row.get(params.getMapColumn().get(coreTranslate_translate_value.getID()), String.class);

                    Long columnIdRet = row.get(params.getMapColumn().get(columnId.getID()), Long.class);
                    String columnNameRet = row.get(params.getMapColumn().get(columnName.getID()), String.class);
                    String columnTitleRet = row.get(params.getMapColumn().get(columnTitle.getID()), String.class);
                    String columnXmlQuerySelectRet = row.get(params.getMapColumn().get(columnXmlQuerySelect.getID()), String.class);
                    Long columnCoreTableIdRet = row.get(params.getMapColumn().get(columnCoreTableId.getID()), Long.class);

                    Long editorIdRet = row.get(params.getMapColumn().get(editorId.getID()), Long.class);
                    String editorNameRet = row.get(params.getMapColumn().get(editorName.getID()), String.class);
                    String editorClassRegisterKeyRet = row.get(params.getMapColumn().get(editorClassRegisterKey.getID()), String.class);

                    CoreWindowTabDTO tab = coreWindowTabDTOMap.get(tabIDRet);
                    if (tab == null) {
                        tab = new CoreWindowTabDTO();
                        tab.setId(tabIDRet);
                        tab.setName(tabNameRet);
                        tab.setTitle(tabTitleRet);
                        tab.setCoreWindowTabFieldDTOMap(new HashMap<>());
                        coreWindowTabDTOMap.put(tabIDRet, tab);
                    }

                    CoreWindowTabFieldDTO field = tab.getCoreWindowTabFieldDTOMap().get(fieldIDRet);
                    if (field == null) {
                        CoreTableColumnEditorDTO coreTableColumnEditorDTO = new CoreTableColumnEditorDTO();
                        coreTableColumnEditorDTO.setId(editorIdRet);
                        coreTableColumnEditorDTO.setName(editorNameRet);
                        coreTableColumnEditorDTO.setEditorClassRegisterKey(editorClassRegisterKeyRet);

                        CoreTableColumnDTO coreTableColumnDTO = new CoreTableColumnDTO();
                        coreTableColumnDTO.setId(columnIdRet);
                        coreTableColumnDTO.setName(columnNameRet);
                        coreTableColumnDTO.setTitle(columnTitleRet);
                        coreTableColumnDTO.setCoreTableColumnEditorDTO(coreTableColumnEditorDTO);
                        coreTableColumnDTO.setXmlQuerySelect(columnXmlQuerySelectRet);
                        coreTableColumnDTO.setCoreTableId(columnCoreTableIdRet);

                        field = new CoreWindowTabFieldDTO();
                        field.setId(fieldIDRet);
                        field.setName(fieldNameRet);
                        field.setTitle(fieldTitleRet);
                        field.setTranslate(coreTranslate_translate_valueRet);
                        field.setCoreTabId(tabIDRet);
                        field.setCoreTableColumnDTO(coreTableColumnDTO);
                        tab.getCoreWindowTabFieldDTOMap().put(fieldIDRet, field);
                    }
                }
                System.out.println("DTO");
                return coreWindowMetaDataDTO;
            });
        });
        return coreWindowMetaDataDTOFlux.reduce((coreWindowMetaDataDTO, coreWindowMetaDataDTO2) -> {
            return coreWindowMetaDataDTO;
        });
    }
}
