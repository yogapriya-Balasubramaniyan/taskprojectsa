# Interview Speaking Script: Project Walkthrough

This script is designed for you to read or speak naturally during your technical interview. It is structured to sound human, professional, and conversational.

---

## 1. Intro & Project Overview (1-2 minutes)
> Use this when they say: *"Tell me about your project"* or *"Walk me through what you built."*

**What to say:**
*   "Sure! I built **TaskFlow**, which is a responsive Task Management Board application using **React 19**, **Vite**, and **Tailwind CSS v4**."
*   "The key goal was to create a clean, minimalist, and highly responsive interface with zero external dependencies besides routing. I structured it as a Single Page Application using **React Router v7**."
*   "It features:
    1.  An **Admin Login portal** that validates credentials against profiles stored in Local Storage.
    2.  A **Dashboard** displaying live dynamic task metrics.
    3.  A **Task Management workspace** where users can perform complete CRUD actions, search, filter, and sort tasks."
*   "To make the data persistent across page refreshes, I wired the entire task list to automatically synchronize with the browser's **Local Storage**."

---

## 2. Walkthrough: Component Architecture (1-2 minutes)
> Use this when they ask: *"How did you structure your components?"* or *"What is your folder setup?"*

**What to say:**
*   "I wanted a highly modular and readable file structure, so I organized the code into distinct folders under `src`:"
*   "For **State Management**, I used React's Context API. To avoid Vite’s fast-refresh compile warnings, I split it into a pure JS file `TaskContext.js` to initialize the context, and a `TaskProvider.jsx` file to house the state logic."
*   "For **Routing**, I configured a nested layout route in `App.jsx`. The `/dashboard` and `/tasks` views are wrapped inside a main `<Layout>` component, which renders a sidebar on desktop screens and shifts to a top header on mobile screens. The child pages render inside the layout using React Router's `<Outlet />`."
*   "I also created a `<ProtectedRoute>` component that wraps these views, redirecting any unauthenticated users back to the Login page."

---

## 3. Explaining React Hooks & State Logic (2-3 minutes)
> Use this when they ask: *"How does state management work?"* or *"Why did you use these hooks?"*

**What to say:**
*   "Inside the `TaskProvider`, I used a **lazy state initializer function** inside `useState` to load the task data. This is a small performance optimization: since reading from `localStorage` is a synchronous, blocking I/O operation, wrapping it in a callback ensures it only runs once on the initial mount, not on every re-render."
*   "I also added a seeding check on mount: if the user opens the application for the first time, it automatically force-seeds a default list of 10 site visit tasks into local storage so the application is immediately ready to view."
*   "To maintain state immutability, all CRUD handlers (`addTask`, `updateTask`, `deleteTask`, `toggleTaskStatus`) use functional updates. I used array methods like `.map()` to toggle status or edit tasks, and `.filter()` to delete tasks, ensuring we never mutate state directly."
*   "To persist the data, I set up a `useEffect` hook that listens to the `tasks` state. Whenever tasks change, it serializes the new task list back to `localStorage`."

---

## 4. Explaining Search, Filter, and Sort (1-2 minutes)
> Use this when they ask: *"How do your filter and sort features work?"*

**What to say:**
*   "In the `TaskManager` page, I calculated the active list by chaining `.filter()` and `.sort()` on the tasks array. This uses **derived state** during the render cycle, which is a React best practice because it prevents sync issues and avoids double-renders."
*   "First, I filter by title using a case-insensitive search with `.toLowerCase().includes()`, and then filter by selected priority and status."
*   "After filtering, I run the sort algorithm:
    *   For **Due Dates**, I compare timestamps by parsing the ISO strings into date objects.
    *   For **Priority**, I mapped the priorities to custom weights: High is 3, Medium is 2, Low is 1. This allows me to perform simple subtraction (`b - a`) to sort High priority tasks to the top."

---

## 5. UI/UX & Responsive Layout Decisions (1-2 minutes)
> Use this when they ask: *"Why did you choose this layout?"* or *"How is it responsive?"*

**What to say:**
*   "I wanted a clean, flat table layout rather than card grids to keep it looking clean and professional."
*   "Instead of standard checkboxes, I implemented interactive pill buttons for the status field. The user can see at a glance if a task is 'Completed' or 'Pending' and click it to toggle its state instantly."
*   "For mobile responsiveness, the statistics cards grid shifts dynamically from 4 columns on desktop to 2 columns on mobile. The table is wrapped in an `overflow-x-auto` container, which lets mobile users scroll horizontally without stretching or squishing the columns."
*   "Finally, to prevent Vercel from throwing `404 Not Found` errors when reloading the page on sub-routes, I added a `vercel.json` rewrite rule to route all requests back to `index.html`, allowing the client-side router to handle it."
