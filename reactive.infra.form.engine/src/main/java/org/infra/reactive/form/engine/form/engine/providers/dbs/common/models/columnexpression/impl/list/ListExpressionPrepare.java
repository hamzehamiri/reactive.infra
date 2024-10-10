package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.list;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderListDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaAbstract;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.PrimaryExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;

import java.util.Optional;
import java.util.UUID;

public class ListExpressionPrepare extends ColumnExpressionPrepare<ListColumnExpression, Long> {

    @Override
    public void generate(DataProviderObjects dataProviderObjects) {
        Long coreTableColumnDataProviderListId = dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId();
        Optional<CoreTableColumnDataProviderListDTO> optionalCoreTableColumnDataProviderListDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderListDTOLRUCache.get(coreTableColumnDataProviderListId);

        if (optionalCoreTableColumnDataProviderListDTOOptional.isPresent()) {
            CoreTableColumnDataProviderListDTO optionalCoreTableColumnDataProviderListDTO = optionalCoreTableColumnDataProviderListDTOOptional.get();

            ListColumnExpression listColumnExpression = new ListColumnExpression();
            listColumnExpression.setUuid(UUID.randomUUID().toString());
            listColumnExpression.setTableInterface(dataProviderObjects.tableMetaData);
            listColumnExpression.setColumnName(dataProviderObjects.coreTableColumnDTO.getName());
            listColumnExpression.setCoreTableColumnDataProviderDTO(dataProviderObjects.coreTableColumnDataProviderDTO);

            DataProviderJavaAbstract<?, ListColumnExpression, Long> dataProviderJavaAbstractNew = DataProviderJavaServiceRegistry.Instance().factoryInstance(optionalCoreTableColumnDataProviderListDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity , computeEffectiveCoreAllElementDTO(dataProviderObjects));
            dataProviderJavaAbstractNew.setColumnExpression(listColumnExpression);
            dataProviderJavaAbstractNew.setCoreTableColumnDataProviderWithSerializerDTO(dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderWithSerializerDTO());

            if (dataProviderObjects.coreWindowTabFieldDTO != null) {
                dataProviderJavaAbstractNew.setKey(dataProviderObjects.coreWindowTabFieldDTO.getId());
            }

            setDataProviderJavaAbstract(dataProviderJavaAbstractNew);
            setColumnExpression(listColumnExpression);
        }
    }

    @Override
    public void generateQuerySelectModelWithParamModel(AbstractRDBMSQueryProvider abstractRDBMSQueryProvider) {
        PrimaryExpressionPrepare.generateQueryWithParamForPK(abstractRDBMSQueryProvider, getColumnExpression());
        if (getColumnExpression().getTableInterface().isMasterTable())
            abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel().getMapDataProviderJavaAbstract().put(getColumnExpression().getID(), getDataProviderJavaAbstract());
    }
}
