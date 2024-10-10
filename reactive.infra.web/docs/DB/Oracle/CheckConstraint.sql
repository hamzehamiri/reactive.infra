select table_name, constraint_name, status, owner
from all_constraints
where r_owner = 'PLM'
  and constraint_type = 'R'
  and r_constraint_name in
      (
          select constraint_name from all_constraints
          where constraint_type in ('P', 'U')
            and table_name = 'TBL_MIM_PAYMENT'
            and owner = 'PLM'
      )
order by table_name, constraint_name;
select * from all_constraints;

SELECT a.owner,
       a.constraint_name,
       a.table_name,
       b.column_name,
       a.status
FROM   all_constraints a
           JOIN   all_cons_columns b ON b.constraint_name = a.constraint_name
WHERE  /*a.constraint_type = 'R'
  AND*/ EXISTS (
    SELECT 1
    FROM   all_constraints
    WHERE  constraint_name = a.r_constraint_name
-- 		  AND constraint_type IN ('P', 'U')
      AND table_name = 'TBL_MIM_ADDRESS'
      AND owner = 'PLM'
)
ORDER BY table_name, constraint_name;

SELECT a.owner AS FK_OWNER,
       a.constraint_name AS FK_CONSTRAINT_NAME,
       a.table_name AS FK_TABLE_NAME,
       b.column_name AS FK_COLUMN_NAME,
       c.owner AS REF_OWNER,
       c.constraint_name AS REF_CONSTRAINT_NAME,
       c.table_name AS REF_TABLE_NAME,
       d.column_name AS REF_COLUMN_NAME
FROM all_constraints a
         JOIN all_cons_columns b ON a.constraint_name = b.constraint_name
         JOIN all_constraints c ON b.CONSTRAINT_NAME = c.R_CONSTRAINT_NAME
         JOIN all_cons_columns d ON c.constraint_name = d.constraint_name
WHERE a.constraint_type = 'R';

select ac.TABLE_NAME , acc2.TABLE_NAME, a.CONSTRAINT_NAME , a.OWNER from all_constraints a
                                                                             inner join all_cons_columns ac on (ac.CONSTRAINT_NAME = a.R_CONSTRAINT_NAME)
                                                                             inner join all_cons_columns acc2 on (acc2.CONSTRAINT_NAME = a.CONSTRAINT_NAME)
where
    a.constraint_type = 'R' and
    a.OWNER='PLM' and
    acc2.TABLE_NAME = 'TBL_MIM_PAYMENT'
;

select * from all_cons_columns ac where ac.CONSTRAINT_NAME = 'FK_ADDRESS_PK_PERSON_ID';
select * from all_cons_columns ac where ac.CONSTRAINT_NAME = 'PK_PERSON_ID';

select * from TBL_MIM_BUYER_SELLER_INFO