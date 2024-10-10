package org.infra.reactive.form.engine.form.engine.test;

import io.r2dbc.spi.Connection;
import io.r2dbc.spi.Statement;
import org.infra.reactive.form.engine.form.engine.model.dto.request.window.CoreWindowRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.CoreWindowDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.CoreWindowTabDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.field.CoreWindowTabFieldDTO;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSQueryProvider;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms.AbstractRDBMSReactorFactory;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.factory.ConnectionStartup;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.QuerySelectModelWithParamModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.primary.ColumnMetaModel;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpression;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.columnexpression.impl.table.TableExpressionPrepare;
import org.infra.reactive.form.engine.form.engine.providers.dbs.common.models.table.TableMetadata;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import org.infra.reactive.form.engine.form.engine.setup.CoreTables;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.concurrent.CountDownLatch;

public class WindowCacheServiceTest {
    public static void main(String[] args) {
//        window();
//        coreTable();
        coreWindow();
//        fluxStream();

    }

    public static void fluxStream() {
        CountDownLatch countDownLatch = new CountDownLatch(3);

        Flux<String> flux1 = Flux.range(1, 3).flatMap(integer -> {
            return Flux.just(integer + "One");
        });

        Flux<String> flux2 = Flux.range(1, 4).flatMap(integer -> {
            return Flux.just(integer + "Two");
        });

        Flux<String> dd = Flux.merge(flux1, flux2);

        Mono.zip(dd.collectList(), Mono.just("FF")).flatMap(objects -> {
            return Mono.just(objects.getT2());
        }).subscribe(s -> {
            System.out.println(s);
        });

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void coreWindow() {
        CountDownLatch countDownLatch = new CountDownLatch(3);

        CoreServiceEntityTable coreServiceEntityTable = new CoreServiceEntityTable();
        CoreServiceDTOTable coreServiceDTOTable = new CoreServiceDTOTable(coreServiceEntityTable);
        CoreServiceDTOForm coreServiceDTOForm = new CoreServiceDTOForm(coreServiceDTOTable);
        Mono<CoreWindowDTO> dd = coreServiceDTOForm.findWindow_WithCheckCache(null , new CoreWindowRequestDTO(1L , null , null), null);
        dd.subscribe(coreWindowDTO -> {
            System.out.println(coreWindowDTO.toString());
        });

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void coreTable() {
        CountDownLatch countDownLatch = new CountDownLatch(3);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();

        CoreServiceEntityTable coreServiceTable = new CoreServiceEntityTable();
        Flux<? extends Serializable> coreFlex = coreServiceTable.cacheAll(coreServiceTable.getConnection(abstractRDBMSReactorFactory, null));
        coreFlex.subscribe(coreTableDTO -> {
            System.out.println(coreTableDTO.toString());
        });

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    public static Flux<CoreWindowTabFieldDTO> field(CountDownLatch countDownLatch, Mono<Connection> connectionCreated) {
        TableMetadata coreFieldMetaDataTable = CoreTables.coreTable();
        coreFieldMetaDataTable.setMasterTable(true);

        ColumnMetaModel fieldId = coreFieldMetaDataTable.getColumns().get(9L);
        ColumnMetaModel fieldName = coreFieldMetaDataTable.getColumns().get(10L);
        ColumnMetaModel fieldTitle = coreFieldMetaDataTable.getColumns().get(11L);
        ColumnMetaModel coreTabId = coreFieldMetaDataTable.getColumns().get(12L);
        ColumnMetaModel coreColumnId = coreFieldMetaDataTable.getColumns().get(13L);

        TableExpression selectModel = new TableExpression()
                .setId(3L)
                .AddTable(coreFieldMetaDataTable.getID(), coreFieldMetaDataTable)
                .AddColumnExpression(fieldId.getID(), fieldId)
                .AddColumnExpression(fieldName.getID(), fieldName)
                .AddColumnExpression(fieldTitle.getID(), fieldTitle)
                .AddColumnExpression(coreTabId.getID(), coreTabId)
                .AddColumnExpression(coreColumnId.getID(), coreColumnId);

        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(selectModel);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider(tableExpressionPrepare);
        abstractRDBMSQueryProvider.generateQueryWithParam();

        QuerySelectModelWithParamModel params = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();

        Flux<CoreWindowTabFieldDTO> fields = Flux.usingWhen(connectionCreated, connection -> {
            String query = params.getRdbmsQueryStringBuilder().getFullQuery().toString();
            Statement statement = connection.createStatement(query);
            params.getParamValue().forEach(statement::bind);
            return statement.execute();
        }, connection -> {
            countDownLatch.countDown();
            return s -> {
            };
        }).flatMap(result -> {
            return result.map((row, rowMetadata) -> {
                Long fieldIdValue = row.get(params.getMapColumnAlias().get(fieldId.getID()), Long.class);

                CoreWindowTabFieldDTO coreWindowTabFieldDTO = new CoreWindowTabFieldDTO();
                coreWindowTabFieldDTO.setId(fieldIdValue);

                return coreWindowTabFieldDTO;
            });
        });
        return fields;
    }

    public static Flux<CoreWindowTabDTO> tab(CountDownLatch countDownLatch, Mono<Connection> connectionCreated) {
        TableMetadata coreTabMetaDataTable = CoreTables.coreTable();
        coreTabMetaDataTable.setMasterTable(true);

        ColumnMetaModel tabId = coreTabMetaDataTable.getColumns().get(4L);
        ColumnMetaModel tabName = coreTabMetaDataTable.getColumns().get(5L);
        ColumnMetaModel tabTitle = coreTabMetaDataTable.getColumns().get(6L);
        ColumnMetaModel coreTableId = coreTabMetaDataTable.getColumns().get(7L);
        ColumnMetaModel coreWindowId = coreTabMetaDataTable.getColumns().get(8L);

        TableExpression selectModel = new TableExpression()
                .setId(2L)
                .AddTable(coreTabMetaDataTable.getID(), coreTabMetaDataTable)
                .AddColumnExpression(tabId.getID(), tabId)
                .AddColumnExpression(tabName.getID(), tabName);
        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(selectModel);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider(tableExpressionPrepare);
        abstractRDBMSQueryProvider.generateQueryWithParam();

        QuerySelectModelWithParamModel params = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();

        Flux<CoreWindowTabDTO> tabs = Flux.usingWhen(connectionCreated, connection -> {
            String query = params.getRdbmsQueryStringBuilder().getFullQuery().toString();
            Statement statement = connection.createStatement(query);
            params.getParamValue().forEach(statement::bind);
            return statement.execute();
        }, connection -> {
            countDownLatch.countDown();
            return s -> {
            };
        }).flatMap(result -> {
            return result.map((row, rowMetadata) -> {
                Long tabIdValue = row.get(params.getMapColumnAlias().get(tabId.getID()), Long.class);
                CoreWindowTabDTO coreWindowTabDTO = new CoreWindowTabDTO();
                coreWindowTabDTO.setId(tabIdValue);

                return coreWindowTabDTO;
            });
        });

        return tabs;
    }

    public static void window() {
        CountDownLatch countDownLatch = new CountDownLatch(3);

        TableMetadata coreWindowMetaDataTable = CoreTables.coreTable();
        coreWindowMetaDataTable.setMasterTable(true);

        ColumnMetaModel windowId = coreWindowMetaDataTable.getColumns().get(1L);
        ColumnMetaModel windowName = coreWindowMetaDataTable.getColumns().get(2L);
        ColumnMetaModel windowTitle = coreWindowMetaDataTable.getColumns().get(3L);

        TableExpression tableExpression = new TableExpression()
                .setId(1L)
                .AddTable(coreWindowMetaDataTable.getID(), coreWindowMetaDataTable)
                .AddColumnExpression(windowId.getID(), windowId)
                .AddColumnExpression(windowName.getID(), windowName)
                .AddColumnExpression(windowTitle.getID(), windowTitle);

        TableExpressionPrepare tableExpressionPrepare = new TableExpressionPrepare();
        tableExpressionPrepare.setColumnExpression(tableExpression);

        AbstractRDBMSReactorFactory<?, ?> abstractRDBMSReactorFactory = ConnectionStartup.createRDBMSReactorFactoryDefault();
        AbstractRDBMSQueryProvider abstractRDBMSQueryProvider = abstractRDBMSReactorFactory.createQueryProvider(tableExpressionPrepare);
        abstractRDBMSQueryProvider.generateQueryWithParam();

        Mono<Connection> connectionCreated = abstractRDBMSReactorFactory.getRConnection();
        QuerySelectModelWithParamModel params = abstractRDBMSQueryProvider.getQuerySelectModelWithParamModel();

        Flux<CoreWindowDTO> cacheAll = Flux.usingWhen(connectionCreated, connection -> {
            String query = params.getRdbmsQueryStringBuilder().getFullQuery().toString();
            Statement statement = connection.createStatement(query);
            params.getParamValue().forEach(statement::bind);
            return statement.execute();
        }, connection -> {
            countDownLatch.countDown();
            return s -> {
            };
        }).flatMap(result -> {
            return result.map((row, rowMetadata) -> {
                Long windowIdValue = row.get(params.getMapColumnAlias().get(windowId.getID()), Long.class);
                String windowNameValue = row.get(params.getMapColumnAlias().get(windowName.getID()), String.class);
                String windowTitleValue = row.get(params.getMapColumnAlias().get(windowTitle.getID()), String.class);

                CoreWindowDTO coreWindowDTO = new CoreWindowDTO();
                coreWindowDTO.setId(windowIdValue);
                coreWindowDTO.setName(windowNameValue);
                coreWindowDTO.setTranslate(windowTitleValue);

                return coreWindowDTO;
            });
        });

        Flux<CoreWindowTabFieldDTO> fieldCache = field(countDownLatch, connectionCreated);

//        Flux<CoreWindowDTO> windowAndTabCache = Flux.zip(cacheAll, tab(countDownLatch, connectionCreated)).flatMap(objects -> {
//            return Flux.just(objects.getT1());
//        });
//
//        Flux<CoreWindowDTO> windowCache2 = Flux.zip(windowAndTabCache, field(countDownLatch, connectionCreated)).flatMap(objects -> {
//            return Flux.just(objects.getT1());
//        });

        fieldCache.subscribe(coreWindowDTO -> {
            System.out.println(coreWindowDTO.getId());
        });

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("Finish");
    }
}
