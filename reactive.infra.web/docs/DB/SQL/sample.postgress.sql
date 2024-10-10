select
    *
from hamzehschema.address a
         inner join hamzehschema.user u on u.id = a.user_id;

select
    count(u.isbn_number), u.name
from hamzehschema.user u
         inner join hamzehschema.address a on u.id = a.user_id
group by rollup (u.isbn_number , u.name)

--having count(u.isbn_number) > 3

select * from hamzehschema.address OFFSET 0
    LIMIT 3;

select
    ua.user_address_type_id,
    user_id,
    count(user_id),
    grouping(ua.user_address_type_id, user_id)
from hamzehschema.user_address ua
group by
    rollup (ua.user_address_type_id, user_id)