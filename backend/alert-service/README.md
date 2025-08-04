# Alert Service

This is the alert management microservice for the inventory system. It detects low stock and notifies users or sends auto-reorder suggestions.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)
- Spring for Apache Kafka

## Endpoints
- `GET /api/alerts` — List all alerts

## Database Tables
- `alerts (id, product_id, warehouse_id, threshold, status)`

## Kafka
- Listens to `low-stock-events` topic for low stock events

## Running Locally
1. Configure PostgreSQL and Kafka (see `application.yml` for settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8084/swagger-ui.html](http://localhost:8084/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 