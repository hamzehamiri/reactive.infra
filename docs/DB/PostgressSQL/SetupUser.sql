CREATE USER postgres SUPERUSER;
CREATE DATABASE postgres WITH OWNER postgres;
ALTER USER postgres WITH PASSWORD '1';
ALTER ROLE postgres WITH PASSWORD '1';

alter ROLE Sanaz WITH LOGIN SUPERUSER PASSWORD '1';

/*Hatman Baraye Horof Bozorg => ""*/

GRANT ALL PRIVILEGES ON DATABASE erp TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA hamzehschema TO postgres;
GRANT CONNECT ON DATABASE erp TO postgres;

*************************
GRANT pg_read_all_data TO postgres;
GRANT pg_write_all_data TO postgres;

ALTER USER postgres CREATEDB;
ALTER USER postgres WITH SUPERUSER;
*************************