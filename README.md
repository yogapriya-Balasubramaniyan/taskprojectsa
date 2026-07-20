# TaskFlow - Task Management Application

A responsive, lightweight Task Management Board application built using **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**.

**Live Demo URL**: [https://taskprojectsa.vercel.app/login](https://taskprojectsa.vercel.app/login)

---

## Key Features

1. **Authentication (UI-Only)**
   - Sign-In page validating email format and password matching.
   - Credentials pre-seeded dynamically in Local Storage on mount.
   - Protected route guards wrapping the dashboard and tasks workspaces.

2. **Dashboard Overview**
   - Live metrics summary counters detailing:
     - **Total Tasks**
     - **Completed Tasks**
     - **Pending Tasks**
     - **High Priority Tasks**

3. **Task CRUD Operations**
   - **Create / Edit**: Uses a dialog modal form with validation (Title and Due Date are mandatory).
   - **Delete**: Quick removal from the table list.
   - **Status Toggle**: Clean pill badge buttons ("Pending", "In Progress", "Completed") to directly update task state from the table row.

4. **Filter & Sort Toolbar**
   - **Search**: Dynamic case-insensitive search by task titles.
   - **Filters**: Filter tasks dynamically by Priority (Low, Medium, High) and Status (Pending, Completed).
   - **Sort**: Re-order task listings by Due Date, Priority (High -> Medium -> Low), and Title (Alphabetical).

5. **Data Persistence**
   - Automatically synchronizes all changes with `localStorage` to keep tasks persisted across browser page refreshes.

6. **Responsive Layout**
   - Adapts to Mobile, Tablet, and Desktop screen viewports.
   - Left-hand sidebar on desktop collapse-swaps to a top navbar on mobile.
   - Tables support horizontal scrolling (`overflow-x-auto`) to avoid squashed columns on narrow displays.

---

## Tech Stack

- **Framework**: React 19
- **Bundler & Tooling**: Vite 8, Rolldown, Oxlint
- **Styles**: Tailwind CSS v4
- **Routing**: React Router DOM v7

---

## Folder Structure

```text
src/
├── assets/          # Static assets (logos, icons)
├── components/      # Reusable UI components
│   ├── DashboardStats.jsx  # KPI metrics grids
│   ├── Layout.jsx          # Sidebar / Topbar navigation layout wrapper
│   └── TaskForm.jsx        # Create/edit task overlay form
├── context/         # Application state & context logic
│   ├── TaskContext.js      # Core context instantiation
│   └── TaskProvider.jsx    # React state & CRUD handlers
├── pages/           # Page layouts
│   ├── Dashboard.jsx       # Overview page displaying metrics
│   ├── Login.jsx           # Validation-driven sign-in page
│   └── TaskManager.jsx     # Master table view with search & controls
├── App.jsx          # Route paths & protected routes setup
├── index.css        # Tailwind imports & resets
└── main.jsx         # React mounting entrypoint
```

---

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your local machine (version 18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yogapriya-Balasubramaniyan/taskprojectsa.git
   ```
2. Navigate to the project directory:
   ```bash
   cd taskprojectsa
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting
To check for code formatting and standard rule conformance:
```bash
npm run lint
```

### Production Build
To create an optimized production build:
```bash
npm run build
```
The compiled static assets will be located in the `dist/` directory, ready for hosting.
