package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table;

import io.r2dbc.spi.Connection;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.profile.window.tab.field.CoreWindowTabFieldSortOrderProfileDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTableColumnsDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTableDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.table.DataProviderTableKeyValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSQueryStringBuilder;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.ColumnExpressionPrepareFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.MultiColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.PrimaryExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnCriteriaLogicalOperatorModel;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import reactor.core.publisher.Mono;

import java.util.*;

public class TableExpressionPrepare extends MultiColumnExpressionPrepare<TableExpression, Long> {
    public static final String keySeparator = "--";

    public void generateManualWithOutMechanism(Mono<Connection> connection) {
        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : getColumnExpression().getColumnSelected().entrySet()) {
            ColumnExpression columnExpressionSelect = stringColumnExpressionEntry.getValue();
            PrimaryExpressionPrepare primaryExpressionPrepare = new PrimaryExpressionPrepare();
            primaryExpressionPrepare.setColumnExpression(columnExpressionSelect);
            addColumnExpressionPrepareWithColumnIdMap(columnExpressionSelect.getID(), primaryExpressionPrepare);
        }
    }

    @Override
    public void generate(DataProviderObjects dataProviderObjects) {
        Long coreTableColumnDataProviderTableId = dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId();

        Optional<CoreTableColumnDataProviderTableDTO> optionalCoreTableColumnDataProviderTableDTO = CoreServiceDTOTable.coreTableColumnDataProviderTableDTOLRUCache.get(coreTableColumnDataProviderTableId);

        if (optionalCoreTableColumnDataProviderTableDTO.isPresent()) {
            boolean isColumnMasterExist = dataProviderObjects.coreTableColumnDTO != null;

            CoreTableColumnDataProviderTableDTO coreTableColumnDataProviderTableDTO = optionalCoreTableColumnDataProviderTableDTO.get();
            Optional<CoreTableDTO> optionalCoreTableDTO = CoreServiceDTOTable.coreTableDTOLRUCache.get(coreTableColumnDataProviderTableDTO.getCoreTableId());
            if (optionalCoreTableDTO.isPresent()) {
                CoreTableDTO coreTableDTO = optionalCoreTableDTO.get();
                DataProviderTableKeyValueDTO dataProviderTableJavaAbstract = DataProviderJavaServiceRegistry.Instance().factoryInstance(coreTableColumnDataProviderTableDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity, computeEffectiveCoreAllElementDTO(dataProviderObjects));
                if (dataProviderTableJavaAbstract == null) {
                    dataProviderTableJavaAbstract = new DataProviderTableKeyValueDTO(dataProviderObjects.userSecurity);
                }

                List<CoreTableColumnDTO> overRightColumnSelected = new ArrayList<>();
                List<CoreTableColumnDTO> pkColumns = new ArrayList<>();

                if (coreTableColumnDataProviderTableDTO.getCoreTableColumnDataProviderTableColumnsDTOMap() != null) {
                    for (Map.Entry<Long, CoreTableColumnDataProviderTableColumnsDTO> longCoreTableColumnDataProviderTableColumnsDTOEntry : coreTableColumnDataProviderTableDTO.getCoreTableColumnDataProviderTableColumnsDTOMap().entrySet()) {
                        CoreTableColumnDTO column = longCoreTableColumnDataProviderTableColumnsDTOEntry.getValue().getCoreTableColumnDTO();
                        if (!detectChain(dataProviderObjects, column))
                            overRightColumnSelected.add(column);
                    }
                    pkColumns.addAll(coreTableDTO.getPkColumns());
                } else {
                    processDefaultColumn(coreTableDTO, overRightColumnSelected, pkColumns, dataProviderObjects, isColumnMasterExist);
                }

                processShare(dataProviderObjects, coreTableDTO, overRightColumnSelected, isColumnMasterExist, pkColumns, dataProviderTableJavaAbstract);
            }
        }
    }

    protected void processShare(DataProviderObjects dataProviderObjects, CoreTableDTO coreTableDTO, List<CoreTableColumnDTO> overRightColumnSelected, boolean isColumnMasterExist, List<CoreTableColumnDTO> pkColumns, DataProviderTableKeyValueDTO dataProviderTableJavaAbstract) {
        TableMetadata tableMetaData = ConvertUtil.convert(coreTableDTO, overRightColumnSelected);

        TableExpression childTableExpression = new TableExpression();
        childTableExpression.setId(coreTableDTO.getId());
        childTableExpression.setUuid(UUID.randomUUID().toString());
        childTableExpression.AddTable(tableMetaData.getID(), tableMetaData);
        childTableExpression.setParentTableExpression(dataProviderObjects.parentTableExpression);
        childTableExpression.setCoreTableColumnDataProviderDTO(dataProviderObjects.coreTableColumnDataProviderDTO);

        ColumnExpression mainColumn = isColumnMasterExist ? dataProviderObjects.getColumnExpression() : null;

        for (CoreTableColumnDTO pkColumn : pkColumns) {
            ColumnMetaModel columnPkExpression = ConvertUtil.convert(pkColumn);
            columnPkExpression.setTableInterface(tableMetaData);

            childTableExpression.AddPkColumnExpression(columnPkExpression.getID(), columnPkExpression);
            if (dataProviderObjects.tableMetaData != null && isColumnMasterExist) {
                mainColumn.setTableInterface(dataProviderObjects.tableMetaData);

                childTableExpression.AddJoinColumn(JoinColumnModel.builder()
                        .joinTypeEnum(JoinTypeEnum.LeftJoin)
                        .toTable(dataProviderObjects.tableMetaData)
                        .toColumn(mainColumn)
                        .fromTable(tableMetaData)
                        .fromColumn(columnPkExpression)
                        .build());
            }
        }

        Map<String, DataProviderJavaAbstract<?, ?, Long>> childColumnDataProviderJava = new HashMap<>();

        dataProviderTableJavaAbstract.setSeparatorChar(keySeparator);
        dataProviderTableJavaAbstract.setColumnExpression(childTableExpression);
        dataProviderTableJavaAbstract.setMapColumnSelectedDataProviderJava(childColumnDataProviderJava);
        dataProviderTableJavaAbstract.setCoreTableColumnDataProviderWithSerializerDTO(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO());
        dataProviderTableJavaAbstract.setCoreTranslateLanguageDTO(dataProviderObjects.coreTranslateLanguageDTO);

        if (dataProviderObjects.coreWindowTabFieldDTO != null) {
            dataProviderTableJavaAbstract.setKey(dataProviderObjects.coreWindowTabFieldDTO.getId());
        }

        ColumnExpressionPrepareFactory columnExpressionPrepareFactory = ColumnExpressionPrepareFactory.Instance();

        this.setColumnExpression(childTableExpression);
        this.setDataProviderJavaAbstract(dataProviderTableJavaAbstract);

        for (CoreTableColumnDTO coreTableColumnDTO : overRightColumnSelected) {
            ColumnExpressionPrepare<?, Long> columnExpressionPrepare = columnExpressionPrepareFactory.processColumnExpressionPrepare(
                    dataProviderObjects.connectionMono,
                    dataProviderObjects.userSecurity,
                    dataProviderObjects.coreTranslateLanguageDTO,
                    coreTableColumnDTO,
                    null,
                    tableMetaData,
                    coreTableColumnDTO.getCoreTableColumnDataProviderDTO(),
                    childTableExpression,
                    dataProviderObjects.rootTableExpression,
                    this
            );
            if (columnExpressionPrepare != null) {
                childColumnDataProviderJava.put(columnExpressionPrepare.getColumnExpression().getID(), columnExpressionPrepare.getDataProviderJavaAbstract());
                childTableExpression.AddColumnExpression(columnExpressionPrepare.getColumnExpression().getID(), columnExpressionPrepare.getColumnExpression());
                addColumnExpressionPrepareWithColumnIdMap(columnExpressionPrepare.getColumnExpression().getID(), columnExpressionPrepare);
                addMapDataProviderJavaAbstract(columnExpressionPrepare.getColumnExpression().getID(), columnExpressionPrepare.getDataProviderJavaAbstract());
            } else {
                System.out.println(" ColumnId : " + coreTableColumnDTO.getId());
            }
        }
    }

    protected void processDefaultColumn(CoreTableDTO coreTableDTO, List<CoreTableColumnDTO> overRightColumnSelected, List<CoreTableColumnDTO> pkColumns, DataProviderObjects dataProviderObjects, boolean isColumnMasterExist) {
        for (CoreTableColumnDTO column : coreTableDTO.getColumns()) {
            if (column.isPk()) {
                pkColumns.add(column);
            } else {
                if (!isColumnMasterExist) {
                    overRightColumnSelected.add(column);
                } else {
                    if (!detectChain(dataProviderObjects, column)) {
                        overRightColumnSelected.add(column);
                    }
                }
            }
        }
    }

    protected boolean detectChain(DataProviderObjects dataProviderObjects, CoreTableColumnDTO coreTableColumnDTO) {
        return Objects.equals(dataProviderObjects.coreTableColumnDTO.getId(), coreTableColumnDTO.getId());
    }

    @Override
    public void generateQuerySelectModelWithParamModel(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        generateAliases(abstractRDBMSQueryProvider.getRdbmsAliasProvider());

        RDBMSQueryStringBuilder rdbmsQueryStringBuilder = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder();
        if (getColumnExpression().isMasterTable()) {
            if (abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getMapDataProviderJavaAbstract() != null && this.mapDataProviderJavaAbstract != null)
                abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getMapDataProviderJavaAbstract().putAll(this.mapDataProviderJavaAbstract);

            convertSelectColumn(abstractRDBMSQueryProvider);
            convertMasterTable(abstractRDBMSQueryProvider);
            convertJoinTable(abstractRDBMSQueryProvider);
            convertWhere(abstractRDBMSQueryProvider);

            StringBuilder queryBuilder = rdbmsQueryStringBuilder.getFullQuery();
            queryBuilder.append(AbstractRDBMSQueryProvider.keySelect)
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(rdbmsQueryStringBuilder.getColumnsPart())
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyFrom)
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(rdbmsQueryStringBuilder.getTablesPart())
                    .append(rdbmsQueryStringBuilder.getJoinsPart())
                    .append(rdbmsQueryStringBuilder.getWheresPart());
            convertSortOrderParts(abstractRDBMSQueryProvider, queryBuilder);
            convertPagination(abstractRDBMSQueryProvider, queryBuilder);

            abstractRDBMSQueryProvider
                    .getQuerySelectModelWithParamModel()
                    .setSelectModel(this);
        } else {
            convertSelectColumn(abstractRDBMSQueryProvider);
            passJoinToParent();
            convertWhere(abstractRDBMSQueryProvider);

            abstractRDBMSQueryProvider
                    .getQuerySelectModelWithParamModel()
                    .setSelectModel(this);
        }
    }

    private void convertSortOrderParts(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider, StringBuilder queryBuilder) {
        StringBuilder sortOrderPart = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getSortOrdersPart();
        if (!sortOrderPart.isEmpty()) {
            queryBuilder
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyOrderBy)
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(sortOrderPart);
        }
    }

    private void convertPagination(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider, StringBuilder queryBuilder) {
        Map<Integer, Object> parameters = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getParamValue();
        if (this.getColumnExpression().getPagingDTO() != null) {
            int pageSizeIndexParam = abstractRDBMSQueryProvider.incrementAndGetIndexParameter();
            int fromRecordIndexParam = abstractRDBMSQueryProvider.incrementAndGetIndexParameter();

            PagingDTO page = this.getColumnExpression().getPagingDTO();

            parameters.put(pageSizeIndexParam, page.getPageSize());
            queryBuilder
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyLimit)
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyParam)
                    .append(pageSizeIndexParam);

            parameters.put(fromRecordIndexParam, page.getFromRecord());
            queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyOffset)
                    .append(AbstractRDBMSQueryProvider.keyEmpty)
                    .append(AbstractRDBMSQueryProvider.keyParam)
                    .append(fromRecordIndexParam);
        }
    }

    private void generateAliases(RDBMSAliasProvider rdbmsAliasProvider) {
        if (!this.getColumnExpression().isGenerateAliases()) {
            this.getColumnExpression().setAliasTableName(rdbmsAliasProvider.nextAliasTableName());
            this.getColumnExpression().setGenerateAliases(true);
        }
        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : this.getColumnExpression().getColumnSelected().entrySet()) {
            ColumnExpression columnExpression = stringColumnExpressionEntry.getValue();
            if (!columnExpression.isGenerateAliases()) {
                columnExpression.setAliasConsumer(rdbmsAliasProvider);
                columnExpression.generateAliasAllElements();
            }
        }
        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : this.getColumnExpression().getPkColumns().entrySet()) {
            ColumnExpression columnExpression = stringColumnExpressionEntry.getValue();
            if (!columnExpression.isGenerateAliases()) {
                columnExpression.setAliasConsumer(rdbmsAliasProvider);
                columnExpression.generateAliasAllElements();
            }
        }
        for (Map.Entry<String, TableInterface> stringTableInterfaceEntry : this.getColumnExpression().getSelectAllTable().entrySet()) {
            TableInterface tableInterface = stringTableInterfaceEntry.getValue();
            tableInterface.setAliasTableName(rdbmsAliasProvider.nextAliasTableName());
        }
        generateJoinColumnAliases(rdbmsAliasProvider);
    }

    private void generateJoinColumnAliases(RDBMSAliasProvider rdbmsAliasProvider) {
        if (this.getColumnExpression().getJoinColumns() != null) {
            if (this.getColumnExpression().isMasterTable()) {
                for (JoinColumnModel joinColumn : this.getColumnExpression().getJoinColumns()) {
                    if (joinColumn.getFromColumn().getAliasColumnName() == null)
                        joinColumn.getFromColumn().setAliasColumnName(rdbmsAliasProvider.nextAliasColumnName());
                    if (joinColumn.getToColumn().getAliasColumnName() == null)
                        joinColumn.getToColumn().setAliasColumnName(rdbmsAliasProvider.nextAliasColumnName());
                    if (joinColumn.getFromTable().getAliasTableName() == null)
                        joinColumn.getFromTable().setAliasTableName(rdbmsAliasProvider.nextAliasTableName());
                    if (joinColumn.getToTable().getAliasTableName() == null)
                        joinColumn.getToTable().setAliasTableName(rdbmsAliasProvider.nextAliasTableName());
                }
            }
        }
    }

    private void passJoinToParent() {
        TableExpression parentSelect = this.getColumnExpression().getParentTableExpression();
        if (parentSelect != null) {
            for (JoinColumnModel joinColumn : this.getColumnExpression().getJoinColumns()) {
                parentSelect.AddJoinColumn(joinColumn);
            }
        }
    }

    public void convertSelectColumn(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        QuerySelectModelWithParamModel querySelectModelWithParamModel = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();
        Map<String, String> mapAlias = querySelectModelWithParamModel.getMapColumnAlias();
        StringBuilder queryBuilder_ColumnSelected = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getColumnsPart();
        StringBuilder queryBuilder_SortOrder = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getSortOrdersPart();
        for (Map.Entry<String, ColumnExpressionPrepare<?, ?>> stringColumnExpressionEntry : this.getColumnExpressionPrepareWithColumnIdMap().entrySet()) {
            ColumnExpressionPrepare<?, ?> columnExpressionPrepare = stringColumnExpressionEntry.getValue();
            columnExpressionPrepare.generateQuerySelectModelWithParamModel(abstractRDBMSQueryProvider);

            if (columnExpressionPrepare.getColumnExpression() != null) {
                String uuidColumn = columnExpressionPrepare.getColumnExpression().getID();

                if (querySelectModelWithParamModel.getMapColumnAlias().get(uuidColumn) == null && columnExpressionPrepare.getColumnExpression().getAliasColumnName() != null) {
                    querySelectModelWithParamModel.getMapColumnAlias().put(uuidColumn, columnExpressionPrepare.getColumnExpression().getAliasColumnName());
                }
                if (querySelectModelWithParamModel.getMapColumnUUIDToColumnsExpression().get(uuidColumn) == null) {
                    querySelectModelWithParamModel.getMapColumnUUIDToColumnsExpression().put(uuidColumn, columnExpressionPrepare.getColumnExpression());
                }

                queryBuilder_ColumnSelected.append(AbstractRDBMSQueryProvider.columnSeparator);

                if (getColumnExpression().isMasterTable() && columnExpressionPrepare.getColumnExpression().getCoreWindowTabFieldSortOrderProfileDTO() != null && !columnExpressionPrepare.getColumnExpression().getCoreWindowTabFieldSortOrderProfileDTO().equals(CoreWindowTabFieldSortOrderProfileDTO.None)) {
                    String orderType = columnExpressionPrepare.getColumnExpression().getCoreWindowTabFieldSortOrderProfileDTO().toString();
                    if (columnExpressionPrepare.getColumnExpression() instanceof TableExpression tableExpression) {
                        for (String columnName : tableExpression.getPkColumns().keySet()) {
                            ColumnExpression colPk = tableExpression.getPkColumns().get(columnName);
                            queryBuilder_SortOrder.append(colPk.getAliasColumnName()).append(AbstractRDBMSQueryProvider.columnSeparator);
                        }
                        if (!queryBuilder_SortOrder.isEmpty() && getColumnExpression().isMasterTable()) {
                            queryBuilder_SortOrder.delete(queryBuilder_SortOrder.length() - AbstractRDBMSQueryProvider.columnSeparator.length(), queryBuilder_SortOrder.length());
                        }
                        queryBuilder_SortOrder.append(AbstractRDBMSQueryProvider.keyEmpty).append(orderType).append(AbstractRDBMSQueryProvider.columnSeparator);
                    } else {
                        queryBuilder_SortOrder.append(columnExpressionPrepare.getColumnExpression().getAliasColumnName()).append(AbstractRDBMSQueryProvider.keyEmpty).append(orderType).append(AbstractRDBMSQueryProvider.columnSeparator);
                    }
                }
            }
        }

        for (Map.Entry<String, ColumnExpression> stringColumnExpressionEntry : this.columnExpression.getPkColumns().entrySet()) {
            ColumnExpression pkColumn = stringColumnExpressionEntry.getValue();
            PrimaryExpressionPrepare.generateQueryWithParamForPK(abstractRDBMSQueryProvider, pkColumn);
            queryBuilder_ColumnSelected.append(AbstractRDBMSQueryProvider.columnSeparator);
        }

        if (!queryBuilder_ColumnSelected.isEmpty())
            queryBuilder_ColumnSelected.delete(queryBuilder_ColumnSelected.length() - AbstractRDBMSQueryProvider.columnSeparator.length(), queryBuilder_ColumnSelected.length());
        if (!queryBuilder_SortOrder.isEmpty() && getColumnExpression().isMasterTable()) {
            queryBuilder_SortOrder.delete(queryBuilder_SortOrder.length() - AbstractRDBMSQueryProvider.columnSeparator.length(), queryBuilder_SortOrder.length());
        }
    }

    private void convertWhere(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        TableExpression tableExpression = this.getColumnExpression();
        StringBuilder queryBuilder = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getWheresPart();
        if (tableExpression.getCriteria() != null) {
            queryBuilder.append(AbstractRDBMSQueryProvider.keyWhere);
            String latestOperation = "";
            for (ColumnCriteriaLogicalOperatorModel columnCriteriaModel : tableExpression.getCriteria().getColumnCriteriaModels()) {
                latestOperation = tableExpression.getCriteria().getLogicalOperators().toString();

                queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty);

                abstractRDBMSQueryProvider.convertOperation(queryBuilder, columnCriteriaModel);

                queryBuilder.append(latestOperation);
            }
            queryBuilder.delete(queryBuilder.length() - latestOperation.length(), queryBuilder.length());
        }
    }

    private void convertMasterTable(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        boolean deleteLast = false;
        StringBuilder queryBuilder = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getTablesPart();
        for (Map.Entry<String, TableInterface> stringTableInterfaceEntry : this.getColumnExpression().getSelectAllTable().entrySet()) {
            TableInterface tableInterface = stringTableInterfaceEntry.getValue();
            if (tableInterface.isMasterTable()) {
                queryBuilder.append(tableInterface.generateTableExpression());
                if (tableInterface.getAliasTableName() != null) {
                    queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty).append(tableInterface.getAliasTableName()).append(AbstractRDBMSQueryProvider.keyEmpty);
                }
                queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty);
                deleteLast = true;
            }
        }
        if (deleteLast)
            queryBuilder.delete(queryBuilder.length() - AbstractRDBMSQueryProvider.keyEmpty.length(), queryBuilder.length());
    }

    private void convertJoinTable(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        StringBuilder queryBuilder = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getJoinsPart();
        TableExpression tableExpression = this.getColumnExpression();
        if (tableExpression.getJoinColumns() != null && !tableExpression.getJoinColumns().isEmpty()) {
            for (JoinColumnModel joinColumn : tableExpression.getJoinColumns()) {
                if (joinColumn.getJoinTypeEnum() == null)
                    joinColumn.setJoinTypeEnum(JoinTypeEnum.LeftJoin);
                queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty)
                        .append(joinColumn.getJoinTypeEnum().toString())
                        .append(AbstractRDBMSQueryProvider.keyEmpty)
                        .append(joinColumn.getFromTable().generateTableExpression())
                        .append(AbstractRDBMSQueryProvider.keyEmpty)
                        .append(joinColumn.getFromTable().getAliasTableName())
                        .append(AbstractRDBMSQueryProvider.keyOn)

                        .append(joinColumn.getToColumn().getTableInterface().getAliasTableName())
                        .append(AbstractRDBMSQueryProvider.keyDOT)
                        .append(joinColumn.getToColumn().getColumnName())
                        .append(AbstractRDBMSQueryProvider.keyEqual)
                        .append(joinColumn.getFromColumn().getTableInterface().getAliasTableName())
                        .append(AbstractRDBMSQueryProvider.keyDOT)
                        .append(joinColumn.getFromColumn().getColumnName());
//                queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty)
//                        .append(joinColumn.getJoinTypeEnum().toString())
//                        .append(AbstractRDBMSQueryProvider.keyEmpty)
//                        .append(joinColumn.getToTable().generateTableExpression());
//                if (joinColumn.getToTable().getAliasTableName() != null) {
//                    queryBuilder.append(AbstractRDBMSQueryProvider.keyEmpty).append(joinColumn.getToTable().getAliasTableName());
//                }
//                queryBuilder.append(AbstractRDBMSQueryProvider.keyOn)
//                        .append(joinColumn.getToColumn().getTableInterface().getAliasTableName())
//                        .append(AbstractRDBMSQueryProvider.keyDOT)
//                        .append(joinColumn.getToColumn().getColumnName())
//                        .append(AbstractRDBMSQueryProvider.keyEqual)
//                        .append(joinColumn.getFromColumn().getTableInterface().getAliasTableName())
//                        .append(AbstractRDBMSQueryProvider.keyDOT)
//                        .append(joinColumn.getFromColumn().getColumnName());
            }
        }
    }
}
