# National Examination Management System (NEMS)

A comprehensive full-stack examination management system built with Spring Boot, React, TypeScript, and MySQL.

## 🎯 Features

### 9 Core Modules
1. **Master Reference Data** - Regions, Exam Types, Centers, Rooms
2. **Student Registration** - Students, Documents, Payments, Biometrics
3. **Exam Scheduling** - Time Slots, Schedules, Seating Patterns
4. **Invigilator Management** - Assignments, Workload, Availability
5. **Student Distribution & Attendance** - Seat Allocation, Attendance Tracking
6. **Secure Evaluation** - Answer Scripts, Evaluators, Marking Schemes
7. **Result Processing** - Raw Marks, Moderation, Final Results
8. **Grievance Handling** - Complaints, Reviews, Resolutions
9. **Security & Monitoring** - Malpractice Reports, Audit Logs

## 🛠️ Technology Stack

### Backend
- **Java 17+**
- **Spring Boot 3.2.x**
- **Spring Data JPA**
- **Spring Security + JWT**
- **MySQL 8.x**
- **Maven**

### Frontend
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **React Router**

## 📋 Prerequisites

1. **Java Development Kit (JDK) 17 or higher**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java -version`

2. **Maven 3.6+**
   - Download: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`

3. **Node.js 18+ and npm/yarn**
   - Download: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

4. **MySQL 8.x**
   - Download: https://dev.mysql.com/downloads/
   - Or use Docker (see below)

5. **IntelliJ IDEA** (Community or Ultimate)
   - Download: https://www.jetbrains.com/idea/download/

6. **Postman** (for API testing)
   - Download: https://www.postman.com/downloads/

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Start MySQL with Docker Compose**
```bash
cd nems-project
docker-compose up -d
```

This will start MySQL on port 3306 with:
- Database: `nems_db`
- Username: `root`
- Password: `nems_password`

### Option 2: Manual MySQL Setup

1. **Install and start MySQL**

2. **Create database**
```sql
CREATE DATABASE nems_db;
```

3. **Update credentials in `backend/src/main/resources/application.properties`**

## 📦 Backend Setup

### Using IntelliJ IDEA

1. **Open IntelliJ IDEA**

2. **Import Project**
   - Click `File` → `Open`
   - Navigate to `nems-project/backend`
   - Select the `backend` folder
   - IntelliJ will auto-detect it as a Maven project

3. **Wait for Maven Dependencies**
   - IntelliJ will automatically download all dependencies
   - Check bottom-right corner for progress

4. **Configure Database**
   - Open `src/main/resources/application.properties`
   - Verify MySQL credentials match your setup

5. **Run the Application**
   - Locate `NemsApplication.java` in `src/main/java/com/nems/`
   - Right-click and select `Run 'NemsApplication'`
   - Or click the green play button
   - Application will start on `http://localhost:8080`

6. **Verify Backend is Running**
   - Open browser: `http://localhost:8080/api/health`
   - Should see: `{"status":"UP"}`

### Using Command Line

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

## 🎨 Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm start
# or
yarn start
```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Auto-opens in browser

## 🧪 Testing with Postman

1. **Import Postman Collection**
   - Open Postman
   - Click `Import` button
   - Select `NEMS_Postman_Collection.json` from project root
   - Collection will appear in left sidebar

2. **Set Environment Variables**
   - Create new environment in Postman
   - Add variable: `baseUrl` = `http://localhost:8080`

3. **Test Authentication**
   - Open `Auth` folder → `Login` request
   - Default credentials:
     - Email: `admin@nems.com`
     - Password: `admin123`
   - Click `Send`
   - Copy the `token` from response
   - Save it as environment variable: `authToken`

4. **Test Other APIs**
   - All requests use Bearer token: `{{authToken}}`
   - Try `GET /api/students` to fetch all students
   - Try `POST /api/exams` to create new exam

## 📊 Database Schema

The database will be automatically created with **90+ sample records** (10 per module) when you first run the backend.

### Sample Data Includes:
- 10 Regions across India
- 10 Exam types (JEE, NEET, GATE, etc.)
- 10 Students with complete profiles
- 10 Exam centers
- 10 Invigilators
- And more...

## 🔐 Default Credentials

### Admin Login
- **Email**: `admin@nems.com`
- **Password**: `admin123`

### Student Login
- **Email**: `student1@example.com`
- **Password**: `password123`

### Invigilator Login
- **Email**: `invigilator1@nems.com`
- **Password**: `inv123`

## 📁 Project Structure

```
nems-project/
├── backend/
│   ├── src/main/java/com/nems/
│   │   ├── NemsApplication.java          # Main application
│   │   ├── config/
│   │   │   ├── SecurityConfig.java       # Security & JWT
│   │   │   ├── CorsConfig.java           # CORS settings
│   │   │   └── JwtUtils.java             # JWT utilities
│   │   ├── entity/                       # Database entities (30+ tables)
│   │   ├── repository/                   # JPA repositories
│   │   ├── service/                      # Business logic
│   │   ├── controller/                   # REST endpoints
│   │   ├── dto/                          # Data transfer objects
│   │   └── exception/                    # Exception handling
│   ├── src/main/resources/
│   │   ├── application.properties        # App configuration
│   │   └── import.sql                    # Sample data
│   └── pom.xml                           # Maven dependencies
├── frontend/
│   ├── src/
│   │   ├── components/                   # Reusable components
│   │   ├── pages/                        # Page components
│   │   ├── services/                     # API services
│   │   ├── utils/                        # Utilities
│   │   ├── App.tsx                       # Main app component
│   │   └── index.tsx                     # Entry point
│   ├── package.json                      # npm dependencies
│   └── tailwind.config.js                # Tailwind config
├── docker-compose.yml                     # Docker MySQL setup
├── NEMS_Postman_Collection.json          # API collection
└── README.md                              # This file
```

## 🔌 API Endpoints Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Student registration

### Module 1: Master Reference Data
- `GET/POST /api/regions`
- `GET/POST /api/exams`
- `GET/POST /api/exam-centers`
- `GET/POST /api/rooms`

### Module 2: Student Registration
- `GET/POST /api/students`
- `GET/POST /api/registrations`
- `GET/POST /api/payments`

### Module 3: Exam Scheduling
- `GET/POST /api/schedules`
- `GET/POST /api/time-slots`
- `GET/POST /api/seat-allocations`

### Module 4: Invigilator Management
- `GET/POST /api/invigilators`
- `GET/POST /api/assignments`

### Module 5: Attendance
- `GET/POST /api/attendance`
- `GET /api/attendance/stats`

### Module 6: Evaluation
- `GET/POST /api/evaluators`
- `GET/POST /api/evaluations`

### Module 7: Results
- `GET/POST /api/results`
- `GET /api/results/student/{id}`

### Module 8: Grievances
- `GET/POST /api/grievances`
- `PUT /api/grievances/{id}/resolve`

### Module 9: Security
- `GET /api/malpractice-reports`
- `GET /api/audit-logs`

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use**
```bash
# Find and kill the process
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**MySQL Connection Error**
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE nems_db;`

**Maven Build Fails**
```bash
# Clear cache and rebuild
mvn clean
mvn install -U
```

### Frontend Issues

**Port 3000 already in use**
```bash
# Kill the process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Module not found errors**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📸 Screenshots

The application features:
- Clean, brutalist design with sharp edges
- High-contrast Swiss-inspired UI
- Responsive dashboard for all modules
- Role-based access control
- Real-time data updates

## 🤝 Contributing

This is an academic project for Internet Programming coursework.

## 📄 License

Academic use only.

## 📞 Support

For issues or questions:
1. Check this README first
2. Review Postman collection examples
3. Check application logs in IntelliJ console
4. Verify all services are running

## 🎓 Credits

Developed as part of DBMS to Internet Programming conversion project.

---

**Happy Coding! 🚀**