Select x20.title                     x1,
       x22.editor_class_register_key x2,
       x21.id                        x3,
       x21.name                      x4,
       x21.title                     x5,
       x21.xml_query_select          x6,
       x21.core_table_id             x7,
       x18.id                        x8,
       x18.name                      x9,
       x18.title                     x10,
       x19.id                        x11,
       x19.name                      x12,
       x19.title                     x13,
       x20.id                        x14,
       x22.id                        x15,
       x20.name                      x16,
       x22.name                      x17,
       ct.translate_value x22
From core_window x18
         left join core_window_tab x19 On x18.id = x19.core_window_id
         left join core_window_tab_field x20 On x19.id = x20.core_window_tab_id

         left join core_translate ct on ct.core_translate_record_id = x20.id
         left join core_all_element cae on cae.id = ct.core_all_element_id
         left join core_translate_language ctl on ctl.id = ct.core_translate_language_id

         inner join core_table_column x21 On x20.core_table_column_id = x21.id
         inner join core_table_column_editor x22 On x21.core_table_column_editor_id = x22.id
WHERE x18.id = 1 and cae.register_key = 'Field' and ctl.locale_name='fa_IR';



Select x21.title                     x1,
       x26.editor_class_register_key x2,
       x22.translate_value           x3,
       x25.id                        x4,
       x25.name                      x5,
       x25.title                     x6,
       x25.xml_query_select          x7,
       x25.core_table_id             x8,
       x19.id                        x9,
       x19.name                      x10,
       x19.title                     x11,
       x20.id                        x12,
       x20.name                      x13,
       x20.title                     x14,
       x21.id                        x15,
       x26.id                        x16,
       x21.name                      x17,
       x26.name                      x18
From core_window x19
         left join core_window_tab x20 On x19.id = x20.core_window_id
         left join core_window_tab_field x21 On x20.id = x21.core_window_tab_id
         left join core_translate x22 On x21.id = x22.core_translate_record_id
         left join core_translate_language x23 On x22.core_translate_language_id = x23.id
         left join core_all_element x24 On x22.core_all_element_id = x24.id
         inner join core_table_column x25 On x21.core_table_column_id = x25.id
         inner join core_table_column_editor x26 On x25.core_table_column_editor_id = x26.id
WHERE x19.id = 1
  AND x23.locale_name='fa_IR'
  AND (x24.register_key = 'Field')

select * from core_window_tab cwt
                  left join core_translate ct on (ct.core_translate_record_id = cwt.id)
where ct.core_all_element_id = 2 and ct.core_translate_language_id = 2