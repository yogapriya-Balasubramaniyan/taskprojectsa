import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import DashboardStats from '../components/DashboardStats';

const Dashboard = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <div className="mb-6">
               <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard TaskFlow
        </h2>
       
      </div>

     
      <section className="mb-8">
                     <DashboardStats tasks={tasks} />
      </section>

    
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h3 className="text-base font-semibold text-slate-905 mb-2">
        
        
          Welcome to TaskFlow
                               </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Use the side navigation to browse your tasks, 
          
          
          edit existing work items, or create new ones under the 
          
          <strong>Task Management</strong> view.
        </p>
      </section>
    </main>
  );
};

export default Dashboard;
