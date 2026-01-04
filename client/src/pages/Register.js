import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

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

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <div className="min-h-[calc(100vh-64px)] bg-page-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white p-8 rounded-nb shadow-heavy border border-page-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-text-main mb-2 tracking-tight">Create Account</h2>
          <div className="h-1 w-12 bg-primary mx-auto"></div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-text-main mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={onChange}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-text-main mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={onChange}
                className="input-field"
                placeholder="name@example.com"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-text-main mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={onChange}
                className="input-field"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-text-main mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                value={password}
                onChange={onChange}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-text-main mb-1.5">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                minLength="6"
                value={confirmPassword}
                onChange={onChange}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-3">I am looking to:</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="tenant"
                  checked={role === 'tenant'}
                  onChange={onChange}
                  className="sr-only peer"
                />
                <div className="p-3 text-center border border-page-border rounded-nb peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                  Rent / Buy
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  checked={role === 'owner'}
                  onChange={onChange}
                  className="sr-only peer"
                />
                <div className="p-3 text-center border border-page-border rounded-nb peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                  Sell / Rent Out
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 mt-4"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-page-border text-center">
          <p className="text-sm text-text-main">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <p className="mt-6 text-[11px] text-text-muted text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="underline">Terms and Conditions</a> &{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
