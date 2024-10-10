package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderPrimaryDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;

import java.util.Optional;
import java.util.UUID;

public class PrimaryExpressionPrepare extends ColumnExpressionPrepare<ColumnExpression, Long> {

    protected String uuid;

    @Override
    public void generateColumnExpression(DataProviderObjects dataProviderObjects) {
        if (dataProviderObjects.coreTableColumnDTO != null) {
            ColumnMetaModel columnMetaData = ConvertUtil.convert(dataProviderObjects.coreTableColumnDTO);
            columnMetaData.setTableInterface(dataProviderObjects.tableMetaData);
            setColumnExpression(columnMetaData);
        }
    }

    @Override
    public String getUUID() {
        return this.uuid;
    }

    @Override
    public void generate(DataProviderObjects dataProviderObjects) {
        Optional<CoreTableColumnDataProviderPrimaryDTO> coreTableColumnDataProviderPrimaryDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderPrimaryDTOLRUCache.get(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId());
        coreTableColumnDataProviderPrimaryDTOOptional.ifPresent(coreTableColumnDataProviderPrimaryDTO -> {
            if (coreTableColumnDataProviderPrimaryDTO.getCoreTableColumnDataProviderSerializerDTO() != null && coreTableColumnDataProviderPrimaryDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey() != null) {
                DataProviderJavaAbstract<?, ColumnExpression, Long> dataProviderJavaAbstractNew = DataProviderJavaServiceRegistry.Instance().factoryInstance(coreTableColumnDataProviderPrimaryDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity, computeEffectiveCoreAllElementDTO(dataProviderObjects));
                dataProviderJavaAbstractNew.setCoreTableColumnDataProviderWithSerializerDTO(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO());
                setDataProviderJavaAbstract(dataProviderJavaAbstractNew);
            }
            if (getColumnExpression() != null) {
                this.uuid = getColumnExpression().getID();
                getDataProviderJavaAbstract().setColumnExpression(getColumnExpression());
            } else {
                this.uuid = UUID.randomUUID().toString();
            }
            if (dataProviderObjects.coreWindowTabFieldDTO != null) {
                getDataProviderJavaAbstract().setKey(dataProviderObjects.coreWindowTabFieldDTO.getId());
            }
        });
    }

    @Override
    public void generateQuerySelectModelWithParamModel(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        PrimaryExpressionPrepare.generateQueryWithParamForPK(abstractRDBMSQueryProvider, getColumnExpression());
        if (getColumnExpression() != null && getColumnExpression().getTableInterface().isMasterTable())
            abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getMapDataProviderJavaAbstract().put(getColumnExpression().getID(), getDataProviderJavaAbstract());
    }

    public static void generateQueryWithParamForPK(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider, ColumnExpression columnExpression) {
        StringBuilder columnPart = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getRdbmsQueryStringBuilder().getColumnsPart();
        if (columnExpression != null) {
            if (columnExpression.getTableInterface().getAliasTableName() != null) {
                columnPart.append(columnExpression.getTableInterface().getAliasTableName())
                        .append(AbstractRDBMSQueryProvider.keyDOT)
                        .append(columnExpression.getColumnName())
                        .append(AbstractRDBMSQueryProvider.keyEmpty)
                        .append(columnExpression.getAliasColumnName());
                abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getMapColumnAlias().put(columnExpression.getID(), columnExpression.getAliasColumnName());
            } else {
                columnPart.append(columnExpression.getTableInterface().generateTableExpression())
                        .append(AbstractRDBMSQueryProvider.keyDOT)
                        .append(columnExpression.getAliasColumnName());
            }
        }
    }
}
