import React from 'react';

const DashboardStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const highPriority = tasks.filter((t) => t.priority === 'High').length;

  const stats = [
    { name: 'Total Tasks', value: total, color: 'bg-slate-100 text-slate-800' },
    { name: 'Completed Tasks', value: completed, color: 'bg-green-50 text-green-700 border-green-100' },
    { name: 'Pending Tasks', value: pending, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { name: 'High Priority', value: highPriority, color: 'bg-red-50 text-red-700 border-red-100' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={`flex flex-col justify-between p-4 rounded-xl border border-slate-200/60 shadow-xs ${stat.color}`}
        >
          <span className="text-xs font-medium tracking-wide uppercase opacity-85">
            {stat.name}
          </span>
          <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
