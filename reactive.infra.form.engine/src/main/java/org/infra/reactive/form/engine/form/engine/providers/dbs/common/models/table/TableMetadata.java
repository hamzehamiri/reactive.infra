package org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table;

import lombok.Builder;
import lombok.Data;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.sequence.SequencerInterface;

import java.util.HashMap;
import java.util.Map;

@Builder
@Data
public class TableMetadata implements TableInterface {
    private long id;
    private String uuid;
    private String aliasTableName;
    private String tableName;
    private boolean masterTable;
    private String tableTitle;
    private SequencerInterface sequencer;
    private Map<Long, ColumnMetaModel> columns;
    private Map<Long, ColumnMetaModel> pkColumns;
    private Map<String, ColumnMetaModel> columnsByUUID;
    private Map<String, ColumnMetaModel> columnsByName;

    public TableMetadata(long id, String uuid, String aliasTableName, String tableName, boolean masterTable, String tableTitle, SequencerInterface sequencer, Map<Long, ColumnMetaModel> columns, Map<Long, ColumnMetaModel> pkColumns, Map<String, ColumnMetaModel> columnsByUUID, Map<String, ColumnMetaModel> columnsByName) {
        this.id = id;
        this.uuid = uuid;
        this.aliasTableName = aliasTableName;
        this.tableName = tableName;
        this.masterTable = masterTable;
        this.tableTitle = tableTitle;
        this.sequencer = sequencer;
        this.columns = columns;
        this.pkColumns = pkColumns;
        this.columnsByUUID = columnsByUUID;
        this.columnsByName = columnsByName;
    }

    @Override
    public String getID() {
        return id + "";
    }

    @Override
    public String generateTableExpression() {
        return tableName;
    }

    @Override
    public boolean isMasterTable() {
        return masterTable;
    }


    public static class TableMetadataBuilder {
        private long id;
        private String uuid;
        private String aliasTableName;
        private String tableName;
        private boolean masterTable;
        private String tableTitle;
        private SequencerInterface sequencer;
        private Map<Long, ColumnMetaModel> columns = new HashMap<>();
        private Map<Long, ColumnMetaModel> pkColumns = new HashMap<>();
        private Map<String, ColumnMetaModel> columnsByUUID = new HashMap<>();
        private Map<String, ColumnMetaModel> columnsByName = new HashMap<>();

        public TableMetadataBuilder AddColumn(Long key, ColumnMetaModel value) {
            this.columns.put(key, value);
            this.columnsByUUID.put(value.getUuid(), value);
            return this;
        }

        public TableMetadataBuilder AddPkColumn(Long key, ColumnMetaModel value) {
            AddColumn(key, value);
            this.pkColumns.put(key, value);
            return this;
        }

        public TableMetadataBuilder AddColumnBYName(String key, ColumnMetaModel value) {
            this.columnsByName.put(key, value);
            return this;
        }

        public TableMetadata build() {
            TableMetadata table = new TableMetadata(this.id, this.uuid, this.aliasTableName, this.tableName, this.masterTable, this.tableTitle, this.sequencer, this.columns, this.pkColumns, this.columnsByUUID, this.columnsByName);
            this.columns.forEach((columnId, columnMetaModel) -> {
                columnMetaModel.setTableInterface(table);
            });
            this.columnsByName.forEach((columnName, columnMetaModel) -> {
                columnMetaModel.setTableInterface(table);
            });
            return table;
        }
    }
}
