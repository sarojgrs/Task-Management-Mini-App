# Task Management Mini App

A full-stack task management mini application built with React, TypeScript, Node.js (Express), Prisma, and SQLite.  
Users can submit tasks, assign them, and track their progress using a simple and clean interface.

---

## ⚙️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js (Express) + TypeScript
- **ORM**: Prisma
- **Database**: SQLite
- **UI Library**: Material UI

---

## 🚀 Features

### ✅ Task Submission

- Submit a new task with title, description, and submitter
- Task numbers are auto-generated (e.g., `TSK001`)
- `POST /tasks`

### 📄 Task List

- View all submitted tasks
- Each task displays:
  - Task number
  - Title
  - Assignee (if assigned)
  - Status (`TO DO`, `IN PROGRESS`, `DONE`)
- `GET /tasks`

### 👤 Task Assignment

- Assign tasks to users stored in the database
- Upon assignment, task status is updated to `IN PROGRESS`
- `PUT /tasks/:id/assign`

### 👤 Task Status Update

- Manually update the status of an existing task
- Allowed transitions:
-                    IN PROGRESS → DONE
-                    IN PROGRESS → TO DO
- `PATCH /tasks/:id/status`

---

## 👥 Submitters and Assignees

- Users (submitters and assignees) are **stored in the database**
- Currently, the application **does not have a UI/portal to add users**
- Users are added via seed scripts or managed through backend logic

---

## 🧪 Setup & Development

### 1. Install Dependencies

```bash
yarn install
```

### 2. User shell script to setup all at once and you can ignore below

```bash
  sh setup_bash.sh
```

### \*\*\*\*\***\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***\*\*\*\*\*\*\*

### If you want to know the manual process then go through below steps..

## Note: Run Prisma Commands(below) before going through all the steps

### 2. Build Frontend and Backend (TypeScript)

```bash
yarn build

Note: After transpilation, check if the Backend folder exists in the dist directory. If it does not, run the below command explicitly to generate.

tsc -b
```

### 3. Run Express Backend Server

```bash
node dist/backend/server.js
```

### 4. Run Frontend (Vite Dev Server)

```bash
yarn dev
```

---

## 🗃️ Prisma Commands

> Make sure you run these in order to prepare and seed your SQLite database.

### Generate Prisma Client

```bash
yarn db:generate
```

### Push Prisma Schema to DB

```bash
yarn db:push
```

### Run Migrations

```bash
yarn db:migrate   (since: migration files are already there you can skip this)
```

### Seed the Database

```bash
yarn db:seed
```

### Open Prisma Studio To See The Tables and It's Data Visually

```bash
yarn db:studio
```

---

## 📁 Project Structure

```bash
src/backend         → Express backend (API & DB access)
src/backend/prisma  → Prisma schema, migrations, and seed scripts
src/frontend        → React + Vite UI
```

---

## 📁 Project default URL(S)

```bash
Backend         → http://localhost:3006/api
Frontend        → http://localhost:5173
```

---

## 📝 Notes

- Clean, minimal full-stack app built for demonstration and extension
- Focuses on functionality, best practices, and modularity
- Easily extendable with user management, filters, or authentication

- DATABASE_URL is in .env
- Path to customize api url in frontend if necessary '/src/client/api/config.ts'

---

## 🚧 Potential Enhancements

- Add user management UI
- Add authentication and roles
- Pagination and filtering on task list
- Add tags/comments or file uploads for tasks

---
