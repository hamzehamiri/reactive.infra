package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.infra.reactive.form.engine.form.engine.model.dto.request.common.PagingDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDataSourceDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.join.JoinColumnModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableInterface;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.where.ColumnsCriteriaComparisonOperatorModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.ColumnExpression;

import java.util.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class TableExpression extends ColumnExpression implements TableInterface {
    private Long id;
    private String uuid;
    private String aliasTableName;
    private boolean masterTable;
    private Map<String, ColumnExpression> columnSelected = new HashMap<>();
    private Map<String, ColumnExpression> pkColumns = new HashMap<>();
    private Map<String, TableInterface> selectAllTable = new HashMap<>();
    private List<JoinColumnModel> joinColumns = new ArrayList<>();
    private ColumnsCriteriaComparisonOperatorModel criteria;
    private PagingDTO pagingDTO;
    private TableExpression parentTableExpression;
    private CoreTableDataSourceDTO coreTableDataSourceDTO;

    public TableExpression() {
        setUuid(UUID.randomUUID().toString());
    }

    public TableExpression(Long id, String aliasTableName, boolean masterTable, Map<String, ColumnExpression> columnSelected, Map<String, TableInterface> selectAllTable, List<JoinColumnModel> joinColumns, ColumnsCriteriaComparisonOperatorModel criteria, PagingDTO pagingDTO, TableExpression parentSelectModel) {
        this();
        this.id = id;
        this.aliasTableName = aliasTableName;
        this.masterTable = masterTable;
        this.columnSelected = columnSelected;
        this.selectAllTable = selectAllTable;
        this.joinColumns = joinColumns;
        this.criteria = criteria;
        this.pagingDTO = pagingDTO;
        this.parentTableExpression = parentSelectModel;
    }

    public TableExpression setUuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public TableExpression setId(Long id) {
        this.id = id;
        return this;
    }

    public TableExpression setCriteria(ColumnsCriteriaComparisonOperatorModel criteria) {
        this.criteria = criteria;
        return this;
    }

    public TableExpression setCoreTableDataSourceDTO(CoreTableDataSourceDTO coreTableDataSourceDTO) {
        this.coreTableDataSourceDTO = coreTableDataSourceDTO;
        return this;
    }

    public TableExpression AddColumnExpression(String key, ColumnExpression value) {
        this.columnSelected.put(key, value);
        return this;
    }

    public TableExpression AddPkColumnExpression(String key, ColumnExpression value) {
        this.pkColumns.put(key, value);
        return this;
    }


    public TableExpression AddTableMetadataForAllColumnSelected(TableMetadata tableMetadata) {
        for (Map.Entry<Long, ColumnMetaModel> longColumnMetaModelEntry : tableMetadata.getColumns().entrySet()) {
            ColumnMetaModel columnExpression = longColumnMetaModelEntry.getValue();
            if (columnExpression.isPk()) {
                AddPkColumnExpression(columnExpression.getID(), columnExpression);
            } else {
                AddColumnExpression(columnExpression.getID(), columnExpression);
            }
        }
        return this;
    }

    public TableExpression SetMasterTable(String key, TableInterface value) {
        value.setMasterTable(true);
        setMasterTable(true);
        return AddTable(key, value);
    }

    public TableExpression AddTable(String key, TableInterface value) {
        this.selectAllTable.put(key, value);
        return this;
    }

    public TableExpression setPagingDTO(PagingDTO pagingDTO) {
        this.pagingDTO = pagingDTO;
        return this;
    }

    public TableExpression AddJoinColumn(JoinColumnModel value) {
        this.joinColumns.add(value);
        return this;
    }

    public TableExpression AddReverseJoinColumn(JoinColumnModel value) {
        this.joinColumns.add(JoinColumnModel.builder()
                .joinTypeEnum(value.getJoinTypeEnum())
                .fromColumn(value.getToColumn())
                .fromTable(value.getToTable())
                .toColumn(value.getFromColumn())
                .toTable(value.getFromTable())
                .build());
        return this;
    }

    @Override
    public String getID() {
        return getUuid();
    }

    @Override
    public long getId() {
        return id;
    }

    @Override
    public void generateAlias() {
        setAliasTableName(RDBMSAliasProvider.nextAliasTableName());
    }

    @Override
    public String generateTableExpression() {
        return "";
    }

    @Override
    public boolean isMasterTable() {
        return masterTable;
    }

    @Override
    public String columnName() {
        return null;
    }

    @Override
    public String toString() {
        return "SelectModel{" +
                "aliasTableName='" + aliasTableName + '\'' +
                '}';
    }
}
