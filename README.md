# 📝 TODO List Application - Full Stack (Refactored)

Modern TODO list application with drag-and-drop, user authentication, and full CRUD operations.

## 🎯 Features

- ✅ **User Authentication** (JWT)
- ✅ **Personal Columns** (customizable per user)
- ✅ **Tasks & Subtasks** (hierarchical structure)
- ✅ **Drag & Drop** (with position persistence)
- ✅ **Priority System** (low, medium, high)
- ✅ **Real-time Sync** (frontend ↔ backend)
- ✅ **Sequelize ORM** (professional database layer)
- ✅ **RESTful API** (19 endpoints)

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **Sequelize ORM** + **MySQL**
- **JWT** authentication
- **bcrypt** password hashing

### Frontend
- **Vue.js 3** (Composition API)
- **Vue Router**
- **Axios** for HTTP requests
- **vuedraggable** for drag & drop
- **Vite** build tool

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL (v5.7+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd TODOLIST_MOD8
```

2. **Backend Setup**
```bash
cd server
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
npm start
```

3. **Frontend Setup**
```bash
cd ../vue-app
npm install
npm run dev
```

4. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

### Optional: Seed Demo Data
```bash
cd server
npm run seed
# Creates demo user: demo/demo123
```

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[REFACTORING_GUIDE.md](REFACTORING_GUIDE.md)** - Complete refactoring details
- **[API_REFERENCE.md](API_REFERENCE.md)** - Full API documentation
- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Summary of changes

## 📊 Database Structure

```
users
├── columns (user's personal columns)
│   └── tasks (tasks in columns)
│       └── subtasks (sub-tasks)
```

**All relations use CASCADE DELETE for data integrity**

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/logout` - Logout

### Columns
- `GET /tasks/columns` - Get all columns
- `POST /tasks/columns` - Create column
- `PUT /tasks/columns/:id` - Update column
- `DELETE /tasks/columns/:id` - Delete column

### Tasks
- `POST /tasks/tasks` - Create task
- `PUT /tasks/tasks/:id` - Update task
- `DELETE /tasks/tasks/:id` - Delete task

### Subtasks
- `POST /tasks/subtasks` - Create subtask
- `PUT /tasks/subtasks/:id` - Update subtask
- `DELETE /tasks/subtasks/:id` - Delete subtask

## 🎨 Features Overview

### User Registration
- Automatic creation of 4 default columns:
  - To Sort
  - TO DO
  - In Progress
  - Done

### Task Management
- Create, read, update, delete tasks
- Set priority and importance
- Add descriptions
- Track completion status
- Drag & drop between columns

### Subtasks
- Unlimited subtasks per task
- Track progress independently
- Nested task structure

## 🔧 Configuration

### Backend (.env)
```env
PORT=5001
DB_NAME=todolist_db
DB_PASS=your_mysql_password
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend
API base URL is configured in `vue-app/src/api.js`

## 🧪 Testing

1. Register a new user → Check 4 default columns created
2. Create tasks → Verify saved in database
3. Drag & drop tasks → Check position persisted
4. Toggle task completion → Verify state update
5. Logout/Login → Check data persistence

## 📦 Project Structure

```
TODOLIST_MOD8/
├── server/                 # Backend
│   ├── app/
│   │   ├── config/        # Database config
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # JWT auth
│   │   └── utils/         # Helper functions
│   ├── server.js          # Entry point
│   └── seedFromJson.js    # Seed script
│
├── vue-app/               # Frontend
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── views/         # Page views
│   │   ├── router/        # Vue Router
│   │   ├── services/      # API services
│   │   ├── store.js       # Reactive store
│   │   └── api.js         # Axios config
│   └── vite.config.js
│
└── docs/                  # Documentation
    ├── QUICK_START.md
    ├── REFACTORING_GUIDE.md
    ├── API_REFERENCE.md
    └── REFACTORING_SUMMARY.md
```

## 🐛 Troubleshooting

### Database Connection Error
```
❌ ERREUR DB: ER_ACCESS_DENIED_ERROR
```
→ Check `.env` credentials (DB_NAME, DB_PASS)

### Tables Not Created
→ Restart server with `npm start` (auto-sync enabled)

### Invalid Token
→ Login again to get new JWT token

### Empty Columns
→ Check browser console (F12) for API errors

## 🔄 Workflow

1. **Register** → Account + 4 default columns created
2. **Login** → JWT token stored in localStorage
3. **Load** → Fetch all columns/tasks from API
4. **Create** → Add tasks to columns
5. **Drag** → Move tasks, position saved to DB
6. **Update** → Toggle done, edit names, etc.
7. **Delete** → Remove tasks/columns (cascade)

## 🎉 What Changed (Refactoring)

### Before
- ❌ Raw SQL queries
- ❌ Local JSON store
- ❌ No data persistence
- ❌ Inconsistent structure

### After
- ✅ Sequelize ORM
- ✅ MySQL database
- ✅ Full CRUD API
- ✅ Frontend/backend sync
- ✅ JWT security
- ✅ Production-ready

## 📈 Future Enhancements

- [ ] Sequelize migrations
- [ ] Pagination
- [ ] Search & filters
- [ ] WebSocket sync
- [ ] File attachments
- [ ] Dark mode
- [ ] Analytics dashboard

## 👨‍💻 Development

### Run in Development Mode
```bash
# Backend (auto-restart with nodemon)
cd server
npm run dev

# Frontend (hot-reload)
cd vue-app
npm run dev
```

### Build for Production
```bash
cd vue-app
npm run build
# Output in dist/
```

## 📝 License

ISC

## 🙏 Acknowledgments

- Refactored with Sequelize ORM
- Vue.js for reactive frontend
- Express.js for robust backend

---

**Status:** ✅ Fully Refactored & Production Ready

**Last Updated:** December 9, 2025

*For detailed documentation, see the root directory*

