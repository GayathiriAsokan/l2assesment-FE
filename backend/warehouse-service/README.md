# Warehouse Service

This is the warehouse management microservice for the inventory system. It handles warehouses and their locations.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)

## Endpoints
- `GET /api/warehouses` — List all warehouses
- `POST /api/warehouses` — Create a new warehouse
- `PUT /api/warehouses/{id}` — Update a warehouse

## Database Tables
- `warehouses (id, name, location)`

## Running Locally
1. Configure PostgreSQL (see `application.yml` for DB settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 