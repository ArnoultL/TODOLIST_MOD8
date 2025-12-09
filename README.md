# 📝 TODO List Application – Full Stack

A modern to‑do list app with drag‑and‑drop, secure authentication, and full CRUD support.  
Built with **Vue.js**, **Node.js/Express**, and **MySQL** using **Sequelize ORM**.

---

##  Features
-  User authentication with JWT + bcrypt
-  Personal columns per user (customizable)
-  Tasks & subtasks with priorities (low / medium / high)
-  Drag & drop with saved positions
-  Real‑time sync between frontend and backend
-  RESTful API (19 endpoints)
-  Clean database schema with cascade deletes

---

##  Tech Stack

**Backend**
- Node.js + Express
- Sequelize ORM + MySQL
- JWT authentication
- bcrypt password hashing

**Frontend**
- Vue.js 3 (Composition API)
- Vue Router
- Axios for API calls
- vuedraggable for drag & drop
- Vite build tool

**API overview**

Auth
- POST /auth/register – create account
- POST /auth/login – login
- GET /auth/logout – logout
  
Columns
- GET /tasks/columns – list columns
- POST /tasks/columns – create column
- PUT /tasks/columns/:id – update column
- DELETE /tasks/columns/:id – delete column
  
Tasks
- POST /tasks/tasks – create task
- PUT /tasks/tasks/:id – update task
- DELETE /tasks/tasks/:id – delete task
  
Subtasks
- POST /tasks/subtasks – create subtask
- PUT /tasks/subtasks/:id – update subtask
- DELETE /tasks/subtasks/:id – delete subtask

---

##  Quick Start

### Prerequisites
- Node.js v16+
- MySQL v5.7+
- npm or yarn

### Installation
```bash
# Clone the repo
git clone https://github.com/ArnoultL/TODOLIST_MOD8
cd TODOLIST_MOD8
```

## Project structure
```bash
TODOLIST_MOD8/
├── server/        # Backend
│   ├── app/       # config, models, routes, middleware, utils
│   ├── server.js
│   └── seedFromJson.js
├── vue-app/       # Frontend
│   ├── src/       # components, views, router, services, store
│   └── vite.config.js
└── docs/          # Documentation
```

