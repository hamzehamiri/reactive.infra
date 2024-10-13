
CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8'
UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';

