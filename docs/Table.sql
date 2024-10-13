select
    id as c1,
    name as c2,
    title,
    (select ct.name || ' - ' || ct.tablename from core_table ct where ct.id = cwt.core_table_id)
from core_window_tab cwt;

select
    cwt.id,
    cwt.name,
    cwt.title,
    (ct.name || ' - ' || ct.tablename) f1
from core_window_tab cwt
         inner join core_table ct on cwt.core_table_id = ct.id;

select *
from core_table_column ctc
         inner join core_table_column_dataprovider ctcd on (ctcd.id = ctc.core_table_column_dataprovider_id)
         inner join core_table_column_dataprovider_table ctcdt on (ctcdt.id = ctcd.record_id and ctcd.type = '1')