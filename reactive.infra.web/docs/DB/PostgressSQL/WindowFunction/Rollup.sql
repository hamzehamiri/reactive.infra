DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
                       brand VARCHAR NOT NULL,
                       segment VARCHAR NOT NULL,
                       quantity INT NOT NULL,
                       PRIMARY KEY (brand, segment)
);

INSERT INTO sales (brand, segment, quantity)
VALUES
    ('ABC', 'Premium', 100),
    ('ABC', 'Basic', 200),
    ('XYZ', 'Premium', 100),
    ('XYZ', 'Basic', 300);


(c1, c2, c3)
(c1, c2)
(c1)
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