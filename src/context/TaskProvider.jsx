import { useState, useEffect } from 'react';
import TaskContext from './TaskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const hasSeeded = localStorage.getItem('tasks_seeded_v2');
    if (!hasSeeded) {
      const initialTasks = [
        {
          id: '1',
          title: 'Site Visit',
          description: 'Visit the construction site to inspect the ongoing work and discuss daily progress with the supervisor.',
          dueDate: '2026-07-20',
          priority: 'High',
          status: 'Pending',
        },
        {
          id: '2',
          title: 'Material Inspection',
          description: 'Check the quality and quantity of cement, steel, bricks, and other materials delivered to the site.',
          dueDate: '2026-07-21',
          priority: 'High',
          status: 'Pending',
        },
        {
          id: '3',
          title: 'Safety Inspection',
          description: 'Ensure all workers are wearing PPE and following site safety regulations.',
          dueDate: '2026-07-22',
          priority: 'High',
          status: 'Pending',
        },
        {
          id: '4',
          title: 'Foundation Work Review',
          description: 'Inspect the foundation work and verify it matches the approved engineering drawings.',
          dueDate: '2026-07-23',
          priority: 'Medium',
          status: 'Pending',
        },
        {
          id: '5',
          title: 'Client Site Meeting',
          description: 'Meet the client on-site to review project progress and discuss upcoming milestones.',
          dueDate: '2026-07-24',
          priority: 'High',
          status: 'Completed',
        },
        {
          id: '6',
          title: 'Electrical Installation Check',
          description: 'Inspect electrical wiring installation and ensure compliance with safety standards.',
          dueDate: '2026-07-25',
          priority: 'Medium',
          status: 'Pending',
        },
        {
          id: '7',
          title: 'Plumbing Inspection',
          description: 'Verify plumbing pipelines and water connections before wall finishing work begins.',
          dueDate: '2026-07-26',
          priority: 'Medium',
          status: 'Pending',
        },
        {
          id: '8',
          title: 'Daily Progress Report',
          description: 'Prepare and submit the daily site progress report with completed work and pending activities.',
          dueDate: '2026-07-20',
          priority: 'Low',
          status: 'Completed',
        },
        {
          id: '9',
          title: 'Equipment Maintenance',
          description: 'Inspect construction equipment and schedule maintenance for any faulty machinery.',
          dueDate: '2026-07-27',
          priority: 'Low',
          status: 'Pending',
        },
        {
          id: '10',
          title: 'Final Site Inspection',
          description: 'Conduct the final inspection before project handover and prepare the completion checklist.',
          dueDate: '2026-07-30',
          priority: 'High',
          status: 'Pending',
        }
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      localStorage.setItem('tasks_seeded_v2', 'true');
      return initialTasks;
    }

    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
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
