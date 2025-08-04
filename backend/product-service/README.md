# Product Service

This is the product management microservice for the inventory system. It handles products, categories, and specifications.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)

## Endpoints
- `GET /api/products` — List all products
- `POST /api/products` — Create a new product
- `PUT /api/products/{id}` — Update a product
- `DELETE /api/products/{id}` — Delete a product
- `GET /api/products/categories` — List all categories

## Database Tables
- `products (id, name, sku, price, category_id)`
- `categories (id, name)`
- `specifications (id, product_id, key, value)`

## Running Locally
1. Configure PostgreSQL (see `application.yml` for DB settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 