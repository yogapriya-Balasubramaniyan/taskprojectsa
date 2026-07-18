import { useState, useEffect } from 'react';
import TaskContext from './TaskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: '1',
        title: 'Complete React Dashboard Assessment',
        description: 'Implement Login, Dashboard, Task CRUD, Search, Filter, and Sorting capabilities with Tailwind CSS.',
        dueDate: '2026-07-22',
        priority: 'High',
        status: 'Pending',
      },
      {
        id: '2',
        title: 'Review Project Guidelines',
        description: 'Make sure code styling uses ES6+ arrow functions and Tailwind v4. Avoid AI-like boilerplates.',
        dueDate: '2026-07-19',
        priority: 'Medium',
        status: 'Completed',
      },
      {
        id: '3',
        title: 'Test Responsiveness',
        description: 'Check layout behavior on mobile viewport, tablet, and desktop.',
        dueDate: '2026-07-20',
        priority: 'Low',
        status: 'Pending',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      status: 'Pending',
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
