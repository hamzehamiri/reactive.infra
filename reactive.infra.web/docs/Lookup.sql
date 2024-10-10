select
    (select
         (select dd.name || '____' || dd.tablename from core_table dd where dd.id = c_table.id) as CheckName
     from core_table c_table
     where tab.core_table_id = c_table.id) as CheckName
from core_window_tab tab;

select
    (c2_table.name || '____' || c2_table.tablename)
from
    core_window_tab tab
        inner join core_table c_table on (c_table.id = tab.core_table_id)
        inner join core_table c2_table on (c_table.id = c2_table.id);