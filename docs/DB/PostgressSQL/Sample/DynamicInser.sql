do
$$
    DECLARE
        v_partition_name text := quote_ident('dummyTest');
        query text;
        product_name text;
        price numeric;
        group_id numeric;
    begin
        for counter in 1..60000 by 1
            loop
                price =  random() * 1000;
                product_name = 'Test' || price;
                group_id = floor(random() * array_length(ARRAY[1, 2, 3], 1)) + 1;
                query = 'INSERT INTO products(product_name,price,group_id) VALUES ($1 , $2 , $3)';
                raise notice 'product_name : % , price : % , group_id : %', product_name , price , group_id;
                EXECUTE query using product_name , price , group_id;
            end loop;
    end
$$