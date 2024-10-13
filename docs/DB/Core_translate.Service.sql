EXPLAIN
select ctm.*, ce.*
from core_translate_metadata ctm
         inner join core_all_element cae on ctm.core_all_element_id = cae.id
         inner join core_element ce on ctm.core_general_id = ce.id
where cae.register_key = 'Login'
  and ctm.core_lang_id = 2;


==

EXPLAIN
select ctm.*, ce.*
from core_translate_metadata ctm
         inner join core_all_element cae on ctm.core_all_element_id = cae.id and cae.register_key = 'Login'
         inner join core_element ce on ctm.core_general_id = ce.id
where ctm.core_lang_id = 2;


EXPLAIN
select ctm.*, ce.*
from core_translate_metadata ctm
         inner join (select * from core_all_element where register_key = 'Login') cae on ctm.core_all_element_id = cae.id
         inner join core_element ce on ctm.core_general_id = ce.id
where ctm.core_lang_id = 2;


explain
select * from core_translate_metadata
