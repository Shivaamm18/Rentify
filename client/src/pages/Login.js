import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-page-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-nb shadow-heavy border border-page-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-text-main mb-2 tracking-tight">Login</h2>
          <div className="h-1 w-12 bg-primary mx-auto"></div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={onChange}
              className="input-field"
              placeholder="e.g. name@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-text-main">Password</label>
              <a href="#" className="text-xs text-secondary hover:underline">Forgot Password?</a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={onChange}
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="h-4 w-4 text-primary border-page-border rounded-sm focus:ring-primary" 
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-text-muted cursor-pointer">Remember me</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-page-border text-center">
          <p className="text-sm text-text-main">
            New to Rentify?{' '}
            <Link to="/register" className="text-secondary font-medium hover:underline">
              Sign up now
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-widest mb-4">Or continue with</p>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center py-2 px-4 border border-page-border rounded-nb hover:bg-page-bg transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4 mr-2" alt="Google" />
              <span className="text-sm text-text-main">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center py-2 px-4 border border-page-border rounded-nb hover:bg-page-bg transition-colors">
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4 mr-2" alt="LinkedIn" />
              <span className="text-sm text-text-main">LinkedIn</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
