# NEMS - National Examination Management System

## Problem Statement
Convert DBMS academic project (National Examination Management System) into a full-stack internet programming project with Spring Boot, React TypeScript, Tailwind CSS, MySQL, and Postman integration.

## Architecture
- **Spring Boot project**: `/app/nems-project/` (downloadable ZIP for IntelliJ)
- **Live Demo**: FastAPI + React on Emergent platform

### Spring Boot Backend
- 32 JPA Entities across 9 modules
- 15+ JPA Repositories
- 12 REST Controllers with CRUD
- JWT Authentication
- BCrypt password encoding
- DataSeeder for sample data
- Global exception handler
- CORS configuration

### React Frontend (TypeScript)
- 8 Page components
- Sidebar navigation
- API service layer (Axios)
- Tailwind CSS with Swiss/Brutalist design

## User Personas
1. **Admin**: Manages students, schedules exams, assigns rooms, publishes results
2. **Student**: Views admit card, checks results, raises grievances
3. **Invigilator**: Assigned to rooms/schedules (data available)
4. **Evaluator**: Evaluates answer scripts (data available)

## What's Been Implemented (Apr 15, 2026)
- All 9 modules with 32 entities
- 10 sample records per module (90+ total)
- Complete Postman collection
- Student portal (Dashboard, Admit Card, Results, Grievances)
- Admin dashboard (Stats, Students, Schedules, Rooms, Results)
- JWT Authentication with role-based routing
- Docker Compose for MySQL
- Detailed README with setup instructions

## Prioritized Backlog
### P0 (Done)
- All 9 modules implemented
- Authentication (Login/Register)
- Sample data seeding

### P1 (Next)
- IntelliJ live testing of Spring Boot project
- Add CREATE/UPDATE/DELETE for admin module pages
- Student profile editing

### P2 (Future)
- PDF export for Admit Cards
- Email notifications
- Role-based access control per endpoint
- Bulk data import/export

## Next Tasks
1. User downloads and tests Spring Boot project in IntelliJ
2. Connect to local MySQL and verify all endpoints
3. Import Postman collection and test all APIs
