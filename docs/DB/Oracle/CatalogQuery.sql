select dbms_metadata.get_ddl('INDEX','PLT_DFT_CIX6','rahvar') from dual;


select ind.table_owner || '.' || ind.table_name as "TABLE",
       ind.index_name,
       LISTAGG(ind_col.column_name, ',')
                                                   WITHIN GROUP(order by ind_col.column_position) as columns,
	   ind.index_type,
	   ind.uniqueness,
	   ind.TABLESPACE_NAME
from sys.all_indexes ind
    join sys.all_ind_columns ind_col
on ind.owner = ind_col.index_owner
    and ind.index_name = ind_col.index_name
where ind.table_owner not in ('plt_dftrchh') and lower(ind.INDEX_NAME) = 'plt_dft_cix7'
group by ind.table_owner,
    ind.table_name,
    ind.index_name,
    ind.index_type,
    ind.uniqueness,
    ind.TABLESPACE_NAME
order by ind.table_owner,
    ind.table_name;


SELECT idx.index_name, SUM(bytes)
FROM dba_segments seg, dba_indexes idx
WHERE lower(idx.table_owner) = 'rahvar'
  AND lower(idx.table_name) = 'plt_dftrchh'
  AND idx.owner      = seg.owner
  AND idx.index_name = seg.segment_name
GROUP BY idx.index_name


select ind.table_owner || '.' || ind.table_name as "TABLE",
       ind.index_name,
       LISTAGG(ind_col.column_name, ',')
                                                   WITHIN GROUP(order by ind_col.column_position) as columns,
	   ind.index_type,
	   ind.uniqueness
from sys.dba_indexes ind
    join sys.dba_ind_columns ind_col
on ind.owner = ind_col.index_owner
    and ind.index_name = ind_col.index_name
where lower(ind.table_owner) in ('rahvar') and lower(ind.TABLE_NAME) = 'plt_dftrchh'
group by ind.table_owner,
    ind.table_name,
    ind.index_name,
    ind.index_type,
    ind.uniqueness
order by ind.table_owner,
    ind.table_name;