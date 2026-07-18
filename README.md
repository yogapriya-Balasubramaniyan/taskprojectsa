# TaskFlow - Task Management Application

A responsive, lightweight Task Management Board application built using React 19, Vite, Tailwind CSS v4, and React Router v7.

## Key Features

1. **Authentication (UI-Only)**
   - Login page validating email format and password length (minimum 6 characters).
   - Keeps session state persisted in `localStorage`.
   - Protects the dashboard route from unauthenticated access.

2. **Dashboard Metrics**
   - High-level KPI counters tracking:
     - **Total Tasks**
     - **Completed Tasks**
     - **Pending Tasks**
     - **High Priority Tasks**

3. **Task CRUD Operations**
   - **Create / Edit**: Uses a dialog modal form with validation (Title and Due Date are mandatory).
   - **Delete**: Remove a task with one click.
   - **Status Toggle**: Interactive checkbox on each task card to toggle between Completed and Pending.

4. **Task Toolbar Controls**
   - **Search**: Filter tasks dynamically by typing any match in the task title.
   - **Filter**: Narrow down tasks by Priority (Low, Medium, High) and Status (Pending, Completed).
   - **Sort**: Re-order lists by Due Date (closest first), Priority (High -> Medium -> Low), and Title (Alphabetical).

5. **Data Persistence**
   - Synchronizes state changes with `localStorage` so that task lists remain persisted across browser refreshes.

6. **Responsive Layout**
   - Clean, minimal grid design that scales automatically across desktop, tablet, and mobile displays.

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
├── assets/          # Project assets
├── components/      # Reusable UI widgets
│   ├── DashboardStats.jsx  # KPI metrics section
│   ├── TaskCard.jsx        # Individual task item card
│   └── TaskForm.jsx        # Create/edit task overlay form
├── context/         # Application state & logic
│   ├── TaskContext.js      # Main context creation
│   └── TaskProvider.jsx    # React state & CRUD handlers
├── pages/           # Page layouts
│   ├── Dashboard.jsx       # Main task tracking view
│   └── Login.jsx           # Validation-driven sign-in page
├── App.jsx          # Route paths & protected routes setup
├── index.css        # Tailwind imports & resets
└── main.jsx         # React mounting entrypoint
```

---

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your local machine (version 18+ recommended).

### Installation
1. Clone the repository or open the project folder.
2. Install dependencies:
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
