CREATE TEMPORARY TABLE t
(
    id         INT,
    manager_id INT,
    name       TEXT
);
INSERT INTO t
VALUES (1, 2, 'Matt'),
       (2, 1, 'Simon'),
       (3, 1, 'John'),
       (4, 2, 'Bob'),
       (5, 4, 'Bill');

select *
from t;

WITH RECURSIVE man(a, b, c) AS (SELECT manager_id, id, name
                                FROM t
                                UNION
                                SELECT man.a, id, man.c
                                FROM man,
                                     t
                                WHERE man.b = manager_id)
SELECT a, c
FROM man
WHERE b = 5;