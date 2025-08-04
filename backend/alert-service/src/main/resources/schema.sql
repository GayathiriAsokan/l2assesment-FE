CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    threshold INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
); 