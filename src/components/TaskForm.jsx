import { useState, useEffect, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = ({ isOpen, onClose, taskToEdit }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } else
       {
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setStatus('Pending');
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim())
       {
          newErrors.title = 'Task title is required';
        }
    if (!dueDate)
       {
           newErrors.dueDate = 'Due date is required';
       }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate())
     {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        status,
      };

      if (taskToEdit) {
        updateTask({ ...taskToEdit, ...taskData });
      }
       else
         {
            addTask(taskData);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
   
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl
       bg-white p-6 shadow-xl border border-slate-100 transition-all">

        <h3 className="text-lg font-semibold text-slate-900 mb-4">

          {taskToEdit ? 'Edit Task' : 'Create New Task'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
           
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`block w-full rounded-lg border px-3 py-2 
                text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                 ${
                errors.title ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
              }`}
              placeholder="Title"
            />
            
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Task description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`block w-full rounded-lg border px-3 py-2 text-slate-900 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                   ${
                  errors.dueDate ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 
                bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {taskToEdit && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2
                 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2
               text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium
               text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 
               focus:ring-offset-2 cursor-pointer"
            >
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
