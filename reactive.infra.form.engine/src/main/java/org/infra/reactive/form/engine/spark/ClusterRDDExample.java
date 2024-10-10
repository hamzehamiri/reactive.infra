package org.infra.reactive.form.engine.spark;//package org.hamzeh.erp.spark;
//
//import org.apache.spark.api.java.JavaRDD;
//import org.apache.spark.api.java.JavaSparkContext;
//import org.apache.spark.api.java.function.Function;
//import org.apache.spark.sql.AnalysisException;
//import org.apache.spark.sql.Dataset;
//import org.apache.spark.sql.Row;
//import org.apache.spark.sql.SparkSession;
//
//import java.util.List;
//
//import static org.apache.spark.sql.functions.col;
//
//public class ClusterRDDExample {
//    public static void main(String[] args) {
//        SparkSession spark = SparkSession
//                .builder()
//                .appName("Java Spark SQL basic example")
//                .config("spark.some.config.option", "some-value")
//                .getOrCreate();
//        try {
//            runBasicDataFrameExample(spark);
//        } catch (AnalysisException e) {
//            throw new RuntimeException(e);
//        }
//
//        // Create SparkContext
//        try (JavaSparkContext sc = new JavaSparkContext("spark://localhost:4040", "ClusterRDDExample")) {
//
//            // Create an RDD
//            String[] words = {"Hello", "World", "Spark", "Java"};
//            JavaRDD<String> rdd = sc.parallelize(List.of(words));
//
//            // Perform RDD operations
//            JavaRDD<String> upperCaseWords = rdd.map(new Function<String, String>() {
//                @Override
//                public String call(String s) throws Exception {
//                    return s.toUpperCase();
//                }
//            });
//
//            // Print results
//            upperCaseWords.foreach(System.out::println);
//
//            // Stop SparkContext
//            sc.stop();
//        }
//    }
//
//    private static void runBasicDataFrameExample(SparkSession spark) throws AnalysisException {
//        // $example on:create_df$
//        Dataset<Row> df = spark.read().json("reactive.form.engine/src/main/resources/people.json");
//
//        // Displays the content of the DataFrame to stdout
//        df.show();
//        // +----+-------+
//        // | age|   name|
//        // +----+-------+
//        // |null|Michael|
//        // |  30|   Andy|
//        // |  19| Justin|
//        // +----+-------+
//        // $example off:create_df$
//
//        // $example on:untyped_ops$
//        // Print the schema in a tree format
//        df.printSchema();
//        // root
//        // |-- age: long (nullable = true)
//        // |-- name: string (nullable = true)
//
//        // Select only the "name" column
//        df.select("name").show();
//        // +-------+
//        // |   name|
//        // +-------+
//        // |Michael|
//        // |   Andy|
//        // | Justin|
//        // +-------+
//
//        // Select everybody, but increment the age by 1
//        df.select(col("name"), col("age").plus(1)).show();
//        // +-------+---------+
//        // |   name|(age + 1)|
//        // +-------+---------+
//        // |Michael|     null|
//        // |   Andy|       31|
//        // | Justin|       20|
//        // +-------+---------+
//
//        // Select people older than 21
//        df.filter(col("age").gt(21)).show();
//        // +---+----+
//        // |age|name|
//        // +---+----+
//        // | 30|Andy|
//        // +---+----+
//
//        // Count people by age
//        df.groupBy("age").count().show();
//        // +----+-----+
//        // | age|count|
//        // +----+-----+
//        // |  19|    1|
//        // |null|    1|
//        // |  30|    1|
//        // +----+-----+
//        // $example off:untyped_ops$
//
//        // $example on:run_sql$
//        // Register the DataFrame as a SQL temporary view
//        df.createOrReplaceTempView("people");
//
//        Dataset<Row> sqlDF = spark.sql("SELECT * FROM people");
//        sqlDF.show();
//        // +----+-------+
//        // | age|   name|
//        // +----+-------+
//        // |null|Michael|
//        // |  30|   Andy|
//        // |  19| Justin|
//        // +----+-------+
//        // $example off:run_sql$
//
//        // $example on:global_temp_view$
//        // Register the DataFrame as a global temporary view
//        df.createGlobalTempView("people");
//
//        // Global temporary view is tied to a system preserved database `global_temp`
//        spark.sql("SELECT * FROM global_temp.people").show();
//        // +----+-------+
//        // | age|   name|
//        // +----+-------+
//        // |null|Michael|
//        // |  30|   Andy|
//        // |  19| Justin|
//        // +----+-------+
//
//        // Global temporary view is cross-session
//        spark.newSession().sql("SELECT * FROM global_temp.people").show();
//        // +----+-------+
//        // | age|   name|
//        // +----+-------+
//        // |null|Michael|
//        // |  30|   Andy|
//        // |  19| Justin|
//        // +----+-------+
//        // $example off:global_temp_view$
//    }
//}
