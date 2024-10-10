bin\initdb.exe -D "D:\DBS\PostgreSQL\16.1\DB" -U postgres;
bin\pg_ctl.exe -D "D:/DBS/PostgreSQL/16.1/DB" -l logfile start
bin\psql.exe -U postgres -d postgres;
CREATE ROLE postgres LOGIN PASSWORD '1';
alter ROLE postgres LOGIN PASSWORD '1';
FLUSH PRIVILEGES;

bin\postgres.exe -D "D:\DBS\pgsql\DB"