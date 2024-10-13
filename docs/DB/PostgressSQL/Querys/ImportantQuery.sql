SELECT table_name, table_schema
FROM information_schema.tables
WHERE table_schema = 'hamzehschema'
  and table_name not in (select t.tablename from core_table t);

select *
from information_schema.columns col
where col.table_schema = 'hamzehschema'
  and col.column_name not in (select c.name from core_table_column c)