# Reporting Service

This is the reporting microservice for the inventory system. It provides stock valuation and turnover reports for dashboards and analytics.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)

## Endpoints
- `GET /api/reports/stock-valuation` — Stock valuation report
- `GET /api/reports/turnover` — Turnover report

## Running Locally
1. Configure PostgreSQL (see `application.yml` for DB settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8085/swagger-ui.html](http://localhost:8085/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 