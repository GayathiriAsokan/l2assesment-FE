# Purchase Order (PO) Service

This is the purchase order management microservice for the inventory system. It handles supplier POs, receiving stock, and updating inventory.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)

## Endpoints
- `POST /api/purchase-orders` — Create a new purchase order
- `PATCH /api/purchase-orders/{id}/receive` — Mark PO as received

## Database Tables
- `purchase_orders (id, supplier_id, status, date)`
- `po_items (id, po_id, product_id, quantity)`
- `suppliers (id, name, contact_info)`

## Running Locally
1. Configure PostgreSQL (see `application.yml` for DB settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 