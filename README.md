# NSB.uz — Production E-Commerce Platform

## Architecture
```
nsb/
├── frontend/    # React 18 · Router v6 · Tailwind · Axios · Context API
├── backend/     # Java 17 · Spring Boot 3 · Security · JPA · JWT
├── database/    # PostgreSQL 15 · Schema · Seed data
├── docker/      # Dockerfiles
└── docker-compose.yml
```

## Quick Start
```bash
docker-compose up --build
```
| Service   | URL                                  |
|-----------|--------------------------------------|
| Frontend  | http://localhost:3000                 |
| Backend   | http://localhost:8080                 |
| Swagger   | http://localhost:8080/swagger-ui.html |
| Admin     | http://localhost:3000/admin           |

**Admin credentials:** admin@nsb.uz / admin123
