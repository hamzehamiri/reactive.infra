SHOW server_encoding;
SET client_encoding TO 'UTF8';
SHOW client_encoding;

ALTER DATABASE postgres
    SET client_encoding = WIN1256;

CREATE DATABASE "erp"
    WITH OWNER "postgres"
    ENCODING 'WIN1256'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';

ALTER USER postgres CREATEDB;

CREATE DATABASE "erp"
    WITH OWNER "postgres"
    ENCODING 'WIN1256';

create schema hamzehschema;

SET PGCLIENTENCODING="utf-8";

SELECT datname, pg_encoding_to_char(encoding) AS encoding, datcollate, datctype FROM pg_database;
SHOW SERVER_ENCODING;

CREATE SCHEMA erp;

CREATE DATABASE erp WITH TEMPLATE = template0 ENCODING = 'UTF8';
CREATE DATABASE erpbusiness WITH TEMPLATE = template0 ENCODING = 'UTF8';