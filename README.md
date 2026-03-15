# Weekly Planner Tracker

A full-stack **Weekly Planning and Progress Tracking System** built using **.NET (C#)** and **Angular (TypeScript)**.
The application allows teams to manage backlog items, plan weekly work, track progress, and provide a dashboard view for team leads.

---
🌐 Live Application

Frontend deployed on Azure Static Web Apps

https://black-stone-0ca0bf200.6.azurestaticapps.net
📦 GitHub Repository

https://github.com/Gandhaktepallavi/Weekly_Plan_Tracker


---

## Project Overview

This system replicates the functionality of a browser-only weekly planner application and rebuilds it using a modern full-stack architecture.

The application allows teams to:

* Manage backlog items
* Plan weekly work based on category allocation
* Freeze plans after planning
* Track task progress
* Provide a dashboard summary for team leads

---

## Technology Stack

### Backend

* .NET 8 Web API
* Entity Framework Core
* Azure Cosmos DB
* Clean Architecture (Domain, Application, Infrastructure)

### Frontend

* Angular
* TypeScript
* Angular Material
* REST API integration

### DevOps

* Git & GitHub
* Azure Static Web Apps
* Azure App Service
* Docker (optional)

---

## System Architecture

```
Frontend (Angular)
        |
        | REST API
        |
Backend (.NET Web API)
        |
        | Entity Framework
        |
Azure Cosmos DB
```

### Backend Layer Structure

```
WeeklyPlanner.Api
    Controllers
    Program.cs

WeeklyPlanner.Application
    Interfaces
    Business Logic Contracts

WeeklyPlanner.Domain
    Entities
    Enums

WeeklyPlanner.Infrastructure
    DbContext
    Service Implementations
```

---

## Core Features

### Backlog Management

* Create backlog items
* Categorize tasks:

  * Client Work
  * Tech Debt
  * Research & Development

### Weekly Planning

* Weekly planning occurs on Tuesday
* Team plans work for Wednesday → Monday
* Maximum planning capacity: **30 hours**

### Plan Freezing

Once planning is complete:

* Plan becomes **frozen**
* Tasks cannot be modified
* Only progress updates are allowed

### Progress Tracking

Team members update task progress:

* 0–100%

### Dashboard (Team Lead)

Team leads can view:

* Total tasks
* Completed tasks
* Remaining tasks
* Team progress summary

---

## Project Folder Structure

```
Weekly_Plan_Tracker

Backend
 └── src
     ├── WeeklyPlanner.Api
     │    └── Controllers
     │
     ├── WeeklyPlanner.Application
     │    └── Services (Interfaces)
     │
     ├── WeeklyPlanner.Domain
     │    └── Entities
     │
     └── WeeklyPlanner.Infrastructure
          ├── Services
          └── WeeklyPlannerDbContext

Frontend
 └── weekly-planner-ui
      └── Angular Application
```

---

## Setup Instructions

### Clone Repository

```
git clone https://github.com/Gandhaktepallavi/Weekly_Plan_Tracker.git
```

---

### Backend Setup

Navigate to backend folder:

```
cd backend/src/WeeklyPlanner.Api
```

Run API:

```
dotnet run
```

Swagger UI:

```
https://localhost:xxxx/swagger
```

---

### Cosmos DB Configuration

Add configuration in **appsettings.json**

```
"Cosmos": {
  "AccountEndpoint": "YOUR_ENDPOINT",
  "AccountKey": "YOUR_KEY",
  "DatabaseName": "WeeklyPlannerDb"
}
```

---

### Frontend Setup

Navigate to Angular project:

```
cd frontend/weekly-planner-ui
```

Install dependencies:

```
npm install
```

Run Angular app:

```
ng serve
```

Open browser:

```
http://localhost:4200
```

---

## API Endpoints

### Backlog

```
GET    /api/backlog
POST   /api/backlog
DELETE /api/backlog/{id}
```

### Weekly Plan

```
GET    /api/weeklyplan/current
POST   /api/weeklyplan
PUT    /api/weeklyplan/{id}/freeze
```

### Dashboard

```
GET /api/dashboard/summary
```

---

## Deployment

### Frontend

* Azure Static Web Apps

### Backend

* Azure App Service

### Database

* Azure Cosmos DB

---

## Key Learning Outcomes

* Clean Architecture in .NET
* REST API design
* Angular frontend integration
* Azure cloud deployment
* Cosmos DB integration

---

## Author

**Pallavi Gandhakte**

GitHub:
https://github.com/Gandhaktepallavi

---
