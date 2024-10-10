CREATE FUNCTION random_date_in_range()
    RETURNS DATE
    LANGUAGE SQL
    AS $$
SELECT $1 + floor( ($2 - $1 + 1) * random() )::INTEGER;
$$;


DO $$
    DECLARE
i INTEGER;
BEGIN
truncate table testTable
FOR i IN 1..1000000 LOOP
                INSERT INTO "testTable" (id, date)
                VALUES (random() , NOW() + (random() * (interval '90 days')));
END LOOP;
END $$;