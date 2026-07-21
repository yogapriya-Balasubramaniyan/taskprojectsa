import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const [mail, setmail] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('userSession');

    if (!session) {
      navigate('/login');
    } 
    else
       {
          const parsedSession = JSON.parse(session);
          setmail(parsedSession.email);
       }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
           d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14  6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: 'Task Management',
      path: '/tasks',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" 
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
      
      
      <header className="flex h-16 items-center justify-between border-b 
      border-slate-205 bg-white px-4 md:hidden shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg
           bg-indigo-600 text-white font-bold text-base">
            T
          </div>
          <span className="font-bold text-slate-900">TaskFlow</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-lg px-2.5 py-1.5 text-xs font-semibold
             ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `rounded-lg px-2.5 py-1.5 text-xs font-semibold
             ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'
              }`
            }
          >
            Tasks
          </NavLink>
          <button
            onClick={handleLogout}
            className="rounded-lg p-1.5 text-slate-500 hover:text-slate-805"
            title="Log Out"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

     
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex shrink-0">
      
        <div className="flex items-center gap-2.5 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg 
          bg-indigo-600 text-white font-bold text-lg">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            TaskFlow
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors 
              ${
                  isActive
                    ? 'bg-indigo-50/70 text-indigo-600'
                    : 'text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>


        <div className="border-t border-slate-100 pt-4 mt-auto">
          <div className="mb-4 px-3">
            <span className="block text-xs text-slate-400">Logged in as</span>
            <span className="block truncate text-sm font-medium text-slate-700" title={mail}>
              {mail}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2.5
             text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-650 
             transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

     
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;
