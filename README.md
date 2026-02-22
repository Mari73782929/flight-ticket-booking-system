# ✈️ Flight Booking System

A Full-Stack Flight Booking System built using Spring Boot, MySQL, and HTML/CSS/JavaScript.  
This project demonstrates REST API development, database relationships, and frontend-backend integration.

---

## 🚀 Project Overview

The Flight Booking System allows users to:

- Add and manage flights
- Add and manage seats for each flight
- Book tickets
- Prevent double booking
- Cancel bookings
- View all bookings

The application follows a layered architecture using Spring Boot and JPA.

---
## 📄 Project Documentation

Detailed project explanation, screenshots, and architecture document:

🔗 **Project Document (Google Drive):**  
👉 https://drive.google.com/file/d/1XrBHb2L3LVW2hMlrbkqeLJTaKgQUm_5z/view?usp=drive_link


## 🛠 Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Lombok
- REST API

### Database
- MySQL 8+

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## 📂 Project Structure

```
controller/
service/
repository/
entity/
dto/
config/
```

---

## 🗄 Database Setup

Run the following in MySQL Workbench:

```sql
DROP DATABASE IF EXISTS skyscanner_db;
CREATE DATABASE skyscanner_db;
USE skyscanner_db;
```

After starting the Spring Boot application, Hibernate will automatically create:

- flight
- seats
- bookings

To verify:

```sql
SELECT * FROM flight;
SELECT * FROM seats;
SELECT * FROM bookings;
```

---

## ⚙ Application Configuration

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skyscanner_db?useSSL=false&serverTimezone=Asia/Kolkata
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## ▶ How To Run

1. Clone the repository  
2. Open in IntelliJ / Eclipse  
3. Update MySQL password in `application.properties`  
4. Run Spring Boot application  
5. Open `index.html` using Live Server  

Backend:
```
http://localhost:8080
```

Frontend:
```
http://127.0.0.1:5500
```

---

## 📡 REST API Endpoints

### ✈ Flight APIs
- POST `/api/flights`
- DELETE `/api/flights/{id}`
- GET `/api/flights/search?source=&destination=`

### 💺 Seat APIs
- POST `/api/seats/{flightId}`
- DELETE `/api/seats/{id}`

### 🎟 Booking APIs
- POST `/api/bookings`
- DELETE `/api/bookings/{id}`
- GET `/api/bookings`

---

## 🔐 Business Rules

- Seat cannot be booked twice  
- Cancelling booking frees the seat  
- Each booking links to one flight and one seat  
- One flight can have multiple seats  

---

## 🎯 Future Enhancements

- JWT Authentication  
- Role-Based Access Control  
- Payment Gateway Integration  
- Pagination & Sorting  
- Docker Deployment  

---

## 👨‍💻 Author

**Marimuthu A**  
BCA Student | Full Stack Java Developer  

---

⭐ If you like this project, consider giving it a star!
