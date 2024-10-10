(c1, c2, c3)
(c1, c2)
(c2, c3)
(c1,c3)
(c1)
(c2)
(c3)
()


SELECT
    EXTRACT (YEAR FROM rental_date) y,
    EXTRACT (MONTH FROM rental_date) M,
    EXTRACT (DAY FROM rental_date) d,
    COUNT (rental_id),
    GROUPING(EXTRACT (YEAR FROM rental_date) , EXTRACT (MONTH FROM rental_date) , EXTRACT (DAY FROM rental_date))
FROM
    rental
GROUP BY
    ROLLUP (
    EXTRACT (YEAR FROM rental_date),
    EXTRACT (MONTH FROM rental_date),
    EXTRACT (DAY FROM rental_date)
    );