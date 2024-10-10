package org.infra.reactive.form.engine.form.engine.providers.dbs.rdbms.postgres;

import io.r2dbc.postgresql.PostgresqlConnectionConfiguration;
import io.r2dbc.postgresql.PostgresqlConnectionFactory;
import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Row;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementPropertiesDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.element.CoreAllElementPropertiesValueDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.column.CoreTableColumnDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.AbstractReactorFactoryRegister;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.DBTypeEnum;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.RDBMSAliasProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.services.core.ConvertUtil;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceBaseEntity;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTableBase;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.util.*;

@AbstractReactorFactoryRegister(registerKey = PostgresFactoryProviderReactive.registerKey, DB_TYPE_ENUM = DBTypeEnum.RDBMS)
public class PostgresFactoryProviderReactive extends AbstractRDBMSReactorFactory<PostgresqlConnectionFactory, PostgresQueryProvider> {

    public static final String registerKey = "postgres";
    public static final String data_type_key = "data_type";
    public static final String character_maximum_length_key = "character_maximum_length";
    public static final String is_nullable_key = "is_nullable";
    public static final String column_name_key = "column_name";

    @Override
    public void buildConnectionFactory() {
        PostgresqlConnectionConfiguration connectionFactoryOptions = PostgresqlConnectionConfiguration.builder()
                .host(getHost())
                .port(getPort())
                .username(getUserName())
                .password(getPassword())
                .database(getDataBase())
                .schema(getSchema())
                .build();

        this.connectionFactory = new PostgresqlConnectionFactory(connectionFactoryOptions);
    }

    @Override
    public PostgresQueryProvider createQueryProvider(TableExpressionPrepare tableExpression) {
        PostgresQueryProvider postgresQueryProvider = createQueryProvider();
        postgresQueryProvider.setTableExpressionPrepare(tableExpression);
        return postgresQueryProvider;
    }

    @Override
    public PostgresQueryProvider createQueryProvider() {
        PostgresQueryProvider postgresQueryProvider = new PostgresQueryProvider(null, new RDBMSAliasProvider());
        postgresQueryProvider.setFunctionDialectDB(new PostgresFunctionDialectDB());
        return postgresQueryProvider;
    }

    @Override
    public Flux<CoreTableDTO> fetchAllCoreTables() {
        return Flux.zip(new CoreServiceEntityTableBase().checkCache(null), Flux.just(CoreServiceEntityTableBase.complete)).flatMap(oneLevelObject -> {
            PostgresQueryProvider postgresQueryProvider = createQueryProvider();
            postgresQueryProvider.generateQueryWithParam();

            StringBuilder queryAllMetaDataTable = new StringBuilder();
            queryAllMetaDataTable.append("SELECT ")
                    .append(PostgresColumnCatalog.table_name).append(" , ")
                    .append(PostgresColumnCatalog.column_name).append(" , ")
                    .append(PostgresColumnCatalog.data_type).append(" , ")
                    .append(PostgresColumnCatalog.character_maximum_length).append(" , ")
                    .append(PostgresColumnCatalog.is_nullable).append(" , ")
                    .append(PostgresColumnCatalog.is_identity).append(" , ")
                    .append(" FROM information_schema.columns WHERE schemaname='")
                    .append(getSchema())
                    .append("'");

            QuerySelectModelWithParamModel params = postgresQueryProvider.getQuerySelectModelWithParamModel();
            params.getRdbmsQueryStringBuilder().setFullQuery(queryAllMetaDataTable);

            Flux<CoreTableColumnDTO> columns = Flux.usingWhen(this.getRConnection(), CoreServiceBaseEntity.connectionConsumerStatic(params), Connection::close).flatMap(result -> result.map((row, rowMetadata) -> {
                String table_name_value = row.get(PostgresColumnCatalog.table_name, String.class);
                String column_name_value = row.get(PostgresColumnCatalog.column_name, String.class);
                String data_type_value = row.get(PostgresColumnCatalog.data_type, String.class);
                String character_maximum_length_value = row.get(PostgresColumnCatalog.character_maximum_length, String.class);
                String is_nullable_value = row.get(PostgresColumnCatalog.is_nullable, String.class);
                String is_identity_value = row.get(PostgresColumnCatalog.is_identity, String.class);

                CoreTableColumnDTO coreTableColumnDTO = new CoreTableColumnDTO();
                coreTableColumnDTO.setName(column_name_value);
                coreTableColumnDTO.setTableName(table_name_value);
                coreTableColumnDTO.setPk(is_identity_value != null && is_identity_value.equalsIgnoreCase("Y"));

                return coreTableColumnDTO;
            }));

            return Flux.zip(columns.collectList(), Mono.just("OK")).flatMap(objects -> {
                Map<String, List<CoreTableColumnDTO>> coreTableColumnDTOMap = new TreeMap<>();
                for (CoreTableColumnDTO coreTableColumnDTO : objects.getT1()) {
                    List<CoreTableColumnDTO> columnList = coreTableColumnDTOMap.computeIfAbsent(coreTableColumnDTO.getTableName(), s -> new ArrayList<>());
                    columnList.add(coreTableColumnDTO);
                }

                return Flux.create((FluxSink<CoreTableDTO> coreTableDTOFluxSink) -> {
                    for (Map.Entry<String, List<CoreTableColumnDTO>> stringListEntry : coreTableColumnDTOMap.entrySet()) {
                        String tableName = stringListEntry.getKey();
                        List<CoreTableColumnDTO> columnList = stringListEntry.getValue();

                        CoreTableDTO coreTableDTO = new CoreTableDTO();
                        coreTableDTO.setColumnDTOMap(null);

                        coreTableDTOFluxSink.next(coreTableDTO);
                    }

                    coreTableDTOFluxSink.complete();
                });
            });
        });
    }

    @Override
    public CoreTableColumnDTO processColumn(Row row, Map<String, CoreTableColumnDTO> allOriginalColumn) {
        String data_type = row.get(data_type_key, String.class);
        Integer character_maximum_length = row.get(character_maximum_length_key, Integer.class);
        String is_nullable = row.get(is_nullable_key, String.class);
        String column_name = row.get(column_name_key, String.class);

        CoreTableColumnDTO originalCoreTableColumnDTO = allOriginalColumn.get(column_name);
        if (originalCoreTableColumnDTO != null) {
            Map<String, CoreAllElementPropertiesDTO> mapOf = CoreServiceDTOTable.findPropertiesByElementIdAndRecordIdMapOf(this.coreAllElementDTO_Column.getId(), originalCoreTableColumnDTO.getId());

            List<CoreAllElementPropertiesValueDTO> newListOfProperties = new ArrayList<>();

            Optional<CoreAllElementPropertiesDTO> coreAttributeDTO_data_type_key_Optional = CoreServiceDTOTable.coreAllElementPropertiesDTOByRegisterKeyLRUCache.get(data_type_key);
            Optional<CoreAllElementPropertiesDTO> coreAttributeDTO_character_maximum_length_key_Optional = CoreServiceDTOTable.coreAllElementPropertiesDTOByRegisterKeyLRUCache.get(character_maximum_length_key);
            Optional<CoreAllElementPropertiesDTO> coreAttributeDTO_is_nullable_key_Optional = CoreServiceDTOTable.coreAllElementPropertiesDTOByRegisterKeyLRUCache.get(is_nullable_key);

            if (coreAttributeDTO_data_type_key_Optional.isPresent() && data_type != null) {
                CoreAllElementPropertiesDTO coreAllElementPropertiesDTO = coreAttributeDTO_data_type_key_Optional.get();
                CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = ConvertUtil.convert(coreAllElementPropertiesDTO, data_type);
                newListOfProperties.add(coreAllElementPropertiesValueDTO);
            }
            if (coreAttributeDTO_character_maximum_length_key_Optional.isPresent() && character_maximum_length != null) {
                CoreAllElementPropertiesDTO coreAllElementPropertiesDTO = coreAttributeDTO_character_maximum_length_key_Optional.get();
                CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = ConvertUtil.convert(coreAllElementPropertiesDTO, character_maximum_length.toString());
                newListOfProperties.add(coreAllElementPropertiesValueDTO);
            }

            if (coreAttributeDTO_is_nullable_key_Optional.isPresent() && is_nullable != null) {
                CoreAllElementPropertiesDTO coreAllElementPropertiesDTO = coreAttributeDTO_is_nullable_key_Optional.get();
                CoreAllElementPropertiesValueDTO coreAllElementPropertiesValueDTO = ConvertUtil.convert(coreAllElementPropertiesDTO, is_nullable);
                newListOfProperties.add(coreAllElementPropertiesValueDTO);
            }


            if (mapOf != null) {
                CoreAllElementPropertiesDTO old_data_type = mapOf.get(data_type_key);
                CoreAllElementPropertiesDTO old_character_maximum_length_key = mapOf.get(character_maximum_length_key);
                CoreAllElementPropertiesDTO old_is_nullable_key = mapOf.get(is_nullable_key);
            }

            CoreTableColumnDTO coreTableColumnDTO = new CoreTableColumnDTO();
            coreTableColumnDTO.setName(column_name);
            coreTableColumnDTO.setCoreAllElementPropertiesValueDTOS(newListOfProperties);

            return coreTableColumnDTO;
        } else {
            return null;
        }
    }
}
