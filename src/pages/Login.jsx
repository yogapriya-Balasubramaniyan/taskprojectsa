import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const existing = localStorage.getItem('adminCredentials');
    if (!existing) {
      localStorage.setItem(
        'adminCredentials',
        JSON.stringify({ email: 'admin@example.com', password: 'password123' })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve stored admin credentials
    const adminStr = localStorage.getItem('adminCredentials');
    const admin = adminStr 
      ? JSON.parse(adminStr) 
      : { email: 'admin@example.com', password: 'password123' };

    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      if (email !== admin.email || password !== admin.password) {
        newErrors.form = 'Invalid admin email or password';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('userSession', JSON.stringify({ email, isLoggedIn: true }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Log In
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="rounded-lg bg-red-50 p-3 border border-red-150 text-sm text-red-700">
              {errors.form}
            </div>
          )}

          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
                }`}
                placeholder="Enter Email Id"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-lg border px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  errors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
                }`}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3.5 border border-slate-200 text-xs text-slate-550 leading-relaxed">
            <span className="font-semibold text-slate-750 block mb-0.5">Stored Admin Info:</span>
            Email: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">admin@example.com</code><br/>
            Password: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">password123</code>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
