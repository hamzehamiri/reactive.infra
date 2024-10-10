SELECT l.session_id, l.oracle_username, l.os_user_name, o.object_name, o.owner
FROM v$locked_object l
         JOIN dba_objects o ON l.object_id = o.object_id;

ALTER TABLE PLM.TBL_MIM_PLATE DISABLE TABLE LOCK