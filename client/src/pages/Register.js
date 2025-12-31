import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { HiUser, HiMail, HiLockClosed, HiPhone, HiUserGroup, HiArrowRight } from 'react-icons/hi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, role, phone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register(name, email, password, role, phone);
    
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message || 'Registration failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Link to="/" className="text-center block">
          <span className="text-3xl font-extrabold text-primary-600 tracking-tight">Rentify</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl"
      >
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
            {/* Full Name */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="col-span-1">
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiPhone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 sm:text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'tenant' })}
                  className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all ${
                    role === 'tenant' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <HiUserGroup className="w-5 h-5 mr-2" />
                  <span className="font-bold">Rent a Home</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'owner' })}
                  className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all ${
                    role === 'owner' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <HiHome className="w-5 h-5 mr-2" />
                  <span className="font-bold">List my Property</span>
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength="6"
                  value={password}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-span-1">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength="6"
                  value={confirmPassword}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-200 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <HiArrowRight className="w-5 h-5 mr-2" />
                )}
                <span>{loading ? 'Creating account...' : 'Create free account'}</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 underline">Terms of Service</a> and{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
