with recursive coreMenuMetadataRecursive as (select cmm.id,
                                                    cmm.name,
                                                    cmm.core_menu_item_type_metadata_id,
                                                    cmm.core_menu_metadata_parent_id
                                             from core_menu_metadata cmm
                                             where cmm.name like 'Window User'
                                             union all
                                             select cmm.id,
                                                    cmm.name,
                                                    cmm.core_menu_item_type_metadata_id,
                                                    cmm.core_menu_metadata_parent_id
                                             from core_menu_metadata cmm
                                                      inner join coreMenuMetadataRecursive cmmr
                                                                 on (cmmr.core_menu_metadata_parent_id = cmm.id))
select *
from coreMenuMetadataRecursive