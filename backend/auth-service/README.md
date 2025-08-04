# Auth Service

This is the authentication microservice for the inventory system. It handles user registration, login, JWT token generation/validation, and role-based access control.

## Tech Stack
- Java 17
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- SpringDoc OpenAPI (Swagger UI)

## Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/validate` — Validate a JWT token

## Database Tables
- `users (id, name, email, password, role)`
- `roles (id, name)`

## Running Locally
1. Configure PostgreSQL (see `application.yml` for DB settings)
2. Build and run the service:
   ```bash
   mvn spring-boot:run
   ```
3. Access Swagger UI at: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Testing
- Run tests with:
  ```bash
  mvn test
  ``` 