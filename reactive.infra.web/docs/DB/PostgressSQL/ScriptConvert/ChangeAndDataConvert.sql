alter table hamzehschema.core_table_column
    add pk bit;

update hamzehschema.core_table_column set pk = CASE WHEN is_pk THEN B'1' ELSE B'0' END;

select CASE WHEN is_pk THEN B'1' ELSE B'0' END from core_table_column;


ALTER TABLE core_process_param ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_role_assign_user_tenant ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_scheduler ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_translate_language ALTER is_rtl TYPE boolean USING CASE WHEN is_rtl=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_user_tenant ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_window_tab_field ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
ALTER TABLE core_wizard_state_validation ALTER active TYPE boolean USING CASE WHEN active=B'0' THEN FALSE ELSE TRUE END;
