import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const TaskManager = () => {
  const { tasks, deleteTask, toggleTaskStatus } = useContext(TaskContext);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-700 bg-red-50 border-red-100';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'Low':
        return 'text-sky-700 bg-sky-50 border-sky-100';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const priorityWeights = { High: 3, Medium: 2, Low: 1 };

  // Filter and Sort Logic
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        return priorityWeights[b.priority] - priorityWeights[a.priority];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Title Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Task Management
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Create, update, delete, and filter your work schedule.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          className="inline-flex items-center self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Toolbar controls */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Search + Filter Selects */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-1 md:items-center md:max-w-3xl">
            
            {/* Search */}
            <div className="relative md:w-64">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>

        </div>
      </section>

      {/* Task List Table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        {filteredAndSortedTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-550">
                  <th scope="col" className="px-6 py-4">Task Details</th>
                  <th scope="col" className="px-6 py-4 w-40">Due Date</th>
                  <th scope="col" className="px-6 py-4 w-32">Priority</th>
                  <th scope="col" className="px-6 py-4 w-36">Status</th>
                  <th scope="col" className="px-6 py-4 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {filteredAndSortedTasks.map((task) => {
                  const isCompleted = task.status === 'Completed';
                  return (
                    <tr 
                      key={task.id} 
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isCompleted ? 'bg-slate-50/30' : ''
                      }`}
                    >
                      {/* Title & Description cell */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          <span className={isCompleted ? 'line-through text-slate-400 font-normal' : ''}>
                            {task.title}
                          </span>
                        </div>
                        {task.description && (
                          <div className={`mt-1 max-w-lg text-xs leading-relaxed break-words whitespace-pre-wrap ${
                            isCompleted ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {task.description}
                          </div>
                        )}
                      </td>

                      {/* Due date cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {formatDate(task.dueDate)}
                      </td>

                      {/* Priority cell */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>

                      {/* Status Button Toggle (No Checkbox) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer shadow-3xs ${
                            isCompleted
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100/80 hover:border-green-300'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/80 hover:border-amber-300'
                          }`}
                        >
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {task.status}
                        </button>
                      </td>

                      {/* Actions cell */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditClick(task)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Edit Task"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-650 transition-colors cursor-pointer"
                            title="Delete Task"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">No tasks found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try modifying your search query, clearing filters, or add a brand new task.
            </p>
            <button
              onClick={handleCreateClick}
              className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Create a Task
            </button>
          </div>
        )}
      </section>

      {/* Task Creation/Editing Overlay Modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </main>
  );
};

export default TaskManager;
