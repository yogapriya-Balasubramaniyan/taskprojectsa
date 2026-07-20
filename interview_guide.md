# Candidate Interview Preparation Guide: TaskFlow

This document contains a comprehensive explanation of every folder, file, line of code, logical condition, state hook, and CSS layout technique used in the **TaskFlow** application. Use this guide to prepare for your technical interview and explain your implementation choices confidently.

---

## 1. Project Directory Structure

```text
taskdashboardproject/
├── public/
│   └── favicon.svg         # Tab icon
│   └── icons.svg           # Scalable SVG icons sheet
├── src/
│   ├── assets/             # Static images
│   ├── components/
│   │   ├── DashboardStats.jsx  # Dynamic KPI metrics cards
│   │   ├── Layout.jsx          # Desktop sidebar / Mobile header navigation wrapper
│   │   └── TaskForm.jsx        # Reusable Add/Edit task modal dialog
│   ├── context/
│   │   ├── TaskContext.js      # Creates the React context object
│   │   └── TaskProvider.jsx    # Core state manager containing CRUD functions
│   ├── pages/
│   │   ├── Dashboard.jsx       # Overview page displaying metrics and charts
│   │   ├── Login.jsx           # Validation-driven Sign-In page
│   │   └── TaskManager.jsx     # Master table workspace with search, filter, and sort
│   ├── App.jsx             # Client-side router &Protected route definitions
│   ├── index.css           # Tailwind v4 import directives
│   └── main.jsx            # Application mount entrypoint
├── index.html              # HTML document template
├── package.json            # Scripts & dependency definitions
├── vercel.json             # Single Page Application routing rewrite rules
└── README.md               # User guide and project details
```

---

## 2. Authentication Flow & Logic (`src/pages/Login.jsx`)

### Key Concepts
*   **State Management**: Local inputs for `email`, `password`, and `errors` are stored in React component states.
*   **Local Storage Pre-seeding**: During the initial loading of the page (`useEffect`), the app writes a default admin profile (`admin@example.com` / `password123`) to `localStorage` under the key `'adminCredentials'` if not already present.
*   **Validation**: Uses standard JS regex pattern-matching to check email structure: `/\S+@\S+\.\S+/.test(email)`.
*   **Redirection**: Compares inputs against `localStorage.getItem('adminCredentials')`. If correct, it writes a `userSession` token to storage and redirects the user to `/dashboard` using `navigate('/dashboard')`.

---

## 3. Router Configurations & Protected Routes (`src/App.jsx`)

### Key Concepts
*   **`TaskProvider` Integration**: Wraps the entire `<BrowserRouter>` so that task lists, addition hooks, and deletion hooks are accessible to all pages.
*   **Protected Route Wrapper**:
    ```javascript
    const ProtectedRoute = ({ children }) => {
      const session = localStorage.getItem('userSession');
      return session ? children : <Navigate to="/login" replace />;
    };
    ```
    If `userSession` is missing in `localStorage`, it redirects visitors back to the `/login` path. The `replace` prop overwrites the current history entry, preventing browser history back-button redirect loops.
*   **Nested Routing Outlet**:
    The routes for `/dashboard` and `/tasks` are nested inside the `/` layout route:
    ```jsx
    <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="tasks" element={<TaskManager />} />
    </Route>
    ```
    This layout forces the left-hand navigation sidebar to stay mounted on the screen, while only the right-side container updates as routes change.

---

## 4. Navigation & Layout Wrapper (`src/components/Layout.jsx`)

### Key Concepts
*   **Desktop Sidebar Grid**: Renders a fixed-width left panel (`w-64`) on screens larger than `768px` (using `hidden md:flex`).
*   **Mobile Top Header Navigation**: Hides the sidebar and renders a horizontal bar on small screens (using `flex md:hidden`).
*   **Dynamic Route Highlighting**: Uses React Router's `<NavLink>` component, which passes an `isActive` boolean parameter to its class function. If active, it applies highlighting classes: `bg-indigo-50 text-indigo-600`.
*   **Log Out**: Clears the `'userSession'` token from storage and routes the user back to `/login`.

---

## 5. Global State & Persisted CRUD Operations (`src/context/`)

To prevent Fast Refresh compile warnings in Vite, state logic is split into:
1. `TaskContext.js`: Instantiates the context object.
2. `TaskProvider.jsx`: Houses the actual state container and hooks.

### TaskProvider.jsx
*   **Lazy State Initialization**:
    ```javascript
    const [tasks, setTasks] = useState(() => {
      const hasSeeded = localStorage.getItem('tasks_seeded_v2');
      if (!hasSeeded) {
        localStorage.setItem('tasks', JSON.stringify(initialTasks));
        localStorage.setItem('tasks_seeded_v2', 'true');
        return initialTasks;
      }
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    });
    ```
    *Why?* Reading from disk storage (`localStorage`) is a synchronous, blocking operation. Wrapping it inside a callback ensures this read only runs once when the component initially mounts, rather than on every single re-render.
*   **State Updaters (Immutability)**:
    *   **`addTask`**: Creates a shallow copy of the parameters, assigns a unique timestamp ID (`Date.now().toString()`), and prepends the new item using `[newTask, ...prevTasks]`.
    *   **`updateTask`**: Maps over previous tasks. If a task matches the target ID, it replaces it; otherwise, it returns the original reference.
    *   **`deleteTask`**: Filters out the matching task ID using `.filter()`.
    *   **`toggleTaskStatus`**: Maps tasks and toggles the `status` string between `'Completed'` and `'Pending'`.

---

## 6. Dashboard Calculations (`src/pages/Dashboard.jsx`)

### Key Concepts
*   **Derived State**: KPI counters (Total, Completed, Pending, and High Priority counts) are calculated dynamically during the rendering process using array operations (`tasks.filter().length`). 
    *Why?* Calculating statistics on-the-fly avoids syncing issues and cuts out double-render cycles that occur when keeping counts in separate React state values.
*   **Responsive Grid**: The KPI cards use a dynamic CSS grid layout: `grid grid-cols-2 gap-4 sm:grid-cols-4`. On mobile screens, it renders in a 2x2 grid (`grid-cols-2`). On tablet and larger viewports, it shifts to a single row containing 4 columns (`sm:grid-cols-4`).

---

## 7. Task Management Workspace (`src/pages/TaskManager.jsx`)

### Search, Filters & Sorting Logic
The visible tasks list is dynamically computed by chaining `.filter()` and `.sort()` array methods:

1.  **Filtering**:
    *   **Search Input**: Performs case-insensitive substring matching against titles using `.toLowerCase().includes(search.toLowerCase())`.
    *   **Priority/Status**: Filters matching values or passes all if select values equal `'All'`.
2.  **Sorting**:
    *   **Due Date**: Converts the stored ISO strings into JS `Date` objects and performs subtraction: `new Date(a.dueDate) - new Date(b.dueDate)`.
    *   **Priority**: Uses custom sorting weights (`{ High: 3, Medium: 2, Low: 1 }`) to rank priority items in descending order (`b - a`).
    *   **Title**: Standard alphabetized string sorting via `localeCompare`.

### Mobile Layout & UI Decisions
*   **No Checkboxes (Clickable Button Badges)**:
    Instead of using standard checkboxes, each row has a pill badge (e.g. green for Completed, amber for Pending/In Progress). Clicking the badge directly toggles the status.
*   **Horizontal Overflow Scroll**:
    The tables are wrapped inside a `div` with class `overflow-x-auto`. This prevents the columns from getting squished on narrow viewports, allowing mobile users to swipe horizontally to view all fields.

---

## 8. Reusable Dialog Modal (`src/components/TaskForm.jsx`)

### Key Concepts
*   **Dual Mode Form**: Uses a `useEffect` hook to check if `taskedit` is passed. If present, the state variables are initialized with that task's details. If `taskedit` is null, fields are reset to blank defaults.
*   **Inline Validations**: Title and Due Date are marked as mandatory. If blank on submit, inline error messages are displayed and save callbacks are halted.
