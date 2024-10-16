package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.tree;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTreeColumnsDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTreeDTO;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.dataprovider.DataProviderJavaServiceRegistry;
import org.infra.reactive.form.engine.form.engine.providers.coretableservices.table.DataProviderTableKeyValueDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.DataProviderObjects;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class TreeExpressionPrepare extends TableExpressionPrepare {

    public void generate(DataProviderObjects dataProviderObjects) {
        Long coreTableColumnDataProviderTreeId = dataProviderObjects.coreTableColumnDataProviderDTO.getCoreTableColumnDataProviderTypeRecordId();

        Optional<CoreTableColumnDataProviderTreeDTO> coreTableColumnDataProviderTreeDTOOptional = CoreServiceDTOTable.coreTableColumnDataProviderTreeDTOLRUCache.get(coreTableColumnDataProviderTreeId);

        if (coreTableColumnDataProviderTreeDTOOptional.isPresent()) {
            boolean isColumnMasterExist = dataProviderObjects.coreTableColumnDTO != null;

            CoreTableColumnDataProviderTreeDTO coreTableColumnDataProviderTreeDTO = coreTableColumnDataProviderTreeDTOOptional.get();
            Optional<CoreTableDTO> optionalCoreTableDTO = CoreServiceDTOTable.coreTableDTOLRUCache.get(coreTableColumnDataProviderTreeDTO.getCoreTableId());
            if (optionalCoreTableDTO.isPresent()) {
                CoreTableDTO coreTableDTO = optionalCoreTableDTO.get();
                DataProviderTableKeyValueDTO dataProviderTableJavaAbstract = DataProviderJavaServiceRegistry.Instance().factoryInstance(coreTableColumnDataProviderTreeDTO.getCoreTableColumnDataProviderSerializerDTO().getClientRegisterKey(), dataProviderObjects.userSecurity, computeEffectiveCoreAllElementDTO(dataProviderObjects));
                if (dataProviderTableJavaAbstract == null) {
                    dataProviderTableJavaAbstract = new DataProviderTableKeyValueDTO(dataProviderObjects.userSecurity);
                }

                List<CoreTableColumnDTO> overRightColumnSelected = new ArrayList<>();
                List<CoreTableColumnDTO> pkColumns = new ArrayList<>();

                if (coreTableColumnDataProviderTreeDTO.getCoreTableColumnDataProviderTreeColumnsDTOMap() != null) {
                    for (Map.Entry<Long, CoreTableColumnDataProviderTreeColumnsDTO> longCoreTableColumnDataProviderTreeColumnsDTOEntry : coreTableColumnDataProviderTreeDTO.getCoreTableColumnDataProviderTreeColumnsDTOMap().entrySet()) {
                        CoreTableColumnDTO column = longCoreTableColumnDataProviderTreeColumnsDTOEntry.getValue().getCoreTableColumnDTO();
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
}
