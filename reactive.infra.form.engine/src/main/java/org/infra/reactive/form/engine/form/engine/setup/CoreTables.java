package org.infra.reactive.form.engine.form.engine.setup;

import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderSerializerConstant;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.dataprovider.CoreTableColumnDataProviderTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.common.CoreColumnType;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;

import java.util.UUID;

public class CoreTables {

    public static long core_table = 6;
    public static long core_table_column = 7;

    public static TableMetadata coreTable() {
        ColumnMetaModel id = new ColumnMetaModel()
                .pk(true)
                .columnTitle("id")
                .id(1)
                .uuid(UUID.randomUUID().toString())
                .columnName("id")
                .columnType(CoreColumnType.INT64);

        ColumnMetaModel name = new ColumnMetaModel()
                .columnTitle("name")
                .id(2)
                .uuid(UUID.randomUUID().toString())
                .columnName("name")
                .coreTableColumnDataProviderDTO(ConvertUtil.convert(1, CoreTableColumnDataProviderTypeEnum.Primary, CoreTableColumnDataProviderSerializerConstant.key_StringTypePrimary))
                .columnType(CoreColumnType.String);

        ColumnMetaModel core_table_datasource_id = new ColumnMetaModel()
                .columnTitle("core_table_datasource_id")
                .id(4)
                .uuid(UUID.randomUUID().toString())
                .columnName("core_table_datasource_id")
                .coreTableColumnDataProviderDTO(ConvertUtil.convert(1, CoreTableColumnDataProviderTypeEnum.Table, CoreTableColumnDataProviderSerializerConstant.key_CoreTableSerializer))
                .columnType(CoreColumnType.INT64);

        ColumnMetaModel tablename = new ColumnMetaModel()
                .columnTitle("tablename")
                .id(6)
                .uuid(UUID.randomUUID().toString())
                .columnName("tablename")
                .coreTableColumnDataProviderDTO(ConvertUtil.convert(1, CoreTableColumnDataProviderTypeEnum.Primary, CoreTableColumnDataProviderSerializerConstant.key_StringTypePrimary))
                .columnType(CoreColumnType.String);

        TableMetadata coreTable = TableMetadata.builder()
                .tableName("core_table")
                .id(core_table)
                .uuid(UUID.randomUUID().toString())
                .AddColumn(id.getId(), id)
                .AddColumn(name.getId(), name)
                .AddColumn(core_table_datasource_id.getId(), core_table_datasource_id)
                .AddColumn(tablename.getId(), tablename)
                .AddColumnBYName(id.getColumnName(), id)
                .AddColumnBYName(name.getColumnName(), name)
                .AddColumnBYName(core_table_datasource_id.getColumnName(), core_table_datasource_id)
                .AddColumnBYName(tablename.getColumnName(), tablename)
                .build();
        return coreTable;
    }

    public static TableMetadata coreTableColumn() {
        ColumnMetaModel id = new ColumnMetaModel()
                .pk(true)
                .columnTitle("id")
                .id(7)
                .uuid(UUID.randomUUID().toString())
                .columnName("id")
                .columnType(CoreColumnType.INT32);

        ColumnMetaModel name = new ColumnMetaModel()
                .columnTitle("name")
                .id(8)
                .uuid(UUID.randomUUID().toString())
                .columnName("name")
                .columnType(CoreColumnType.String);

        ColumnMetaModel coreEditorId = new ColumnMetaModel()
                .columnTitle("core_table_column_editor_id")
                .id(10)
                .uuid(UUID.randomUUID().toString())
                .columnName("core_table_column_editor_id")
                .columnType(CoreColumnType.INT32);

        ColumnMetaModel coreTableId = new ColumnMetaModel()
                .columnTitle("core_table_id")
                .id(12)
                .uuid(UUID.randomUUID().toString())
                .columnName("core_table_id")
                .columnType(CoreColumnType.INT32);

        ColumnMetaModel is_pk = new ColumnMetaModel()
                .columnTitle("is_pk")
                .id(13)
                .uuid(UUID.randomUUID().toString())
                .columnName("is_pk")
                .columnType(CoreColumnType.Boolean);

        ColumnMetaModel core_table_column_dataprovider_id = new ColumnMetaModel()
                .columnTitle("core_table_column_dataprovider_id")
                .id(14)
                .uuid(UUID.randomUUID().toString())
                .columnName("core_table_column_dataprovider_id")
                .columnType(CoreColumnType.INT32);

        TableMetadata coreColumnMetadata = TableMetadata.builder()
                .tableName("core_table_column")
                .id(core_table_column)
                .uuid(UUID.randomUUID().toString())
                .AddColumn(id.getId(), id)
                .AddColumn(name.getId(), name)
                .AddColumn(coreEditorId.getId(), coreEditorId)
                .AddColumn(coreTableId.getId(), coreTableId)
                .AddColumn(is_pk.getId(), is_pk)
                .AddColumn(core_table_column_dataprovider_id.getId(), core_table_column_dataprovider_id)
                .AddColumnBYName(id.getColumnName(), id)
                .AddColumnBYName(name.getColumnName(), name)
                .AddColumnBYName(coreEditorId.getColumnName(), coreEditorId)
                .AddColumnBYName(coreTableId.getColumnName(), coreTableId)
                .AddColumnBYName(is_pk.getColumnName(), is_pk)
                .AddColumnBYName(core_table_column_dataprovider_id.getColumnName(), core_table_column_dataprovider_id)
                .build();
        return coreColumnMetadata;
    }
}
