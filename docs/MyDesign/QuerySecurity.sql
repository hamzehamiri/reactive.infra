select *
from core_user_tenant cut
         inner join core_user cu on cut.core_user_id = cu.id
         inner join core_tenant_metadata ctm on (ctm.id = cut.core_tenant_id)
where cu.username = 'hamzehamiri'
  and cut.password = 'hashpassword';

WITH RECURSIVE t(n) AS (
    VALUES (1)
    UNION ALL
    SELECT n+1 FROM t WHERE n < 100
)
SELECT n FROM t;

WITH RECURSIVE mytree as (select id, core_tenant_metadata_id
                          from core_tenant_metadata
                          union all
                          select ctm.id, ctm.core_tenant_metadata_id
                          from core_tenant_metadata ctm
                                   join mytree t on t.id = ctm.core_tenant_metadata_id)
select *
from core_tenant_metadata
         join mytree t using (id)
where t.core_tenant_metadata_id is null

select *
from core_user_tenant cut
         inner join core_user cu on cut.core_user_id = cu.id
         inner join core_tenant_metadata ctm on (ctm.id = cut.core_tenant_id)
where cu.username = 'hamzehamiri'
  and cut.password = 'hashpassword'
  and cut.core_tenant_id = 2

select * from core_tenant_metadata
                  CONNECT BY PRIOR id = core_tenant_metadata_id
START WITH id IS NULL