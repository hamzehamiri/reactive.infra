sqlplus sys as sysdba;
shutdown immediate;
startup;
alter pluggable database all open;
select status from v$instance;

sqlplus /NOLOG;
    connect / as sysdba;
