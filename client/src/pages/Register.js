import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { HiUser, HiMail, HiLockClosed, HiPhone, HiUserGroup, HiArrowRight, HiHome, HiCheckCircle, HiStar } from 'react-icons/hi';

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
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Branding & Trust */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center p-20 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Modern Living"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="inline-flex items-center space-x-3 mb-12 group">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary-500/30">
              <HiHome className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tight">Rentify.</span>
          </Link>
          
          <h1 className="text-5xl font-black mb-10 leading-tight">Start your journey to a <span className="text-primary-400 italic">dream home</span> today.</h1>
          
          <div className="space-y-6">
            {[
              { title: "Direct Connect", desc: "No middleman. Talk directly to owners." },
              { title: "Smart Matching", desc: "AI-powered suggestions based on your lifestyle." },
              { title: "Zero Stress", desc: "Digital verification and secure payments." }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                <HiCheckCircle className="text-primary-400 w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-xl mb-1">{item.title}</h4>
                  <p className="text-slate-400 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-slate-900 shadow-xl" alt="user" />
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <HiStar key={i} className="w-4 h-4" />)}
              </div>
              <p className="text-sm font-bold text-slate-300 tracking-wide">Joined by 50,000+ users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Multi-step-like Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Join Rentify</h2>
            <p className="text-slate-500 font-bold">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            {/* Account Type Selection */}
            <div className="p-2 bg-slate-200/50 rounded-2xl flex">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'tenant' })}
                className={`flex-1 flex items-center justify-center py-3 rounded-xl transition-all font-black text-sm space-x-2 ${
                  role === 'tenant' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <HiUserGroup className="w-5 h-5" />
                <span>I'm a Tenant</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'owner' })}
                className={`flex-1 flex items-center justify-center py-3 rounded-xl transition-all font-black text-sm space-x-2 ${
                  role === 'owner' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <HiHome className="w-5 h-5" />
                <span>I'm an Owner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Full Name</label>
                <div className="relative group">
                  <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={onChange}
                    className="input-field pl-12 h-14 font-bold"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
                <div className="relative group">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={onChange}
                    className="input-field pl-12 h-14 font-bold text-sm"
                    placeholder="name@mail.com"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Phone Number</label>
                <div className="relative group">
                  <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={onChange}
                    className="input-field pl-12 h-14 font-bold text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Password</label>
                <div className="relative group">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength="6"
                    value={password}
                    onChange={onChange}
                    className="input-field pl-12 h-14 font-bold text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Confirm Password</label>
                <div className="relative group">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength="6"
                    value={confirmPassword}
                    onChange={onChange}
                    className="input-field pl-12 h-14 font-bold text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-16 flex items-center justify-center space-x-3 text-lg mt-4 shadow-xl"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create My Account</span>
                  <HiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-bold text-slate-400 leading-relaxed px-10">
            By clicking "Create My Account", you agree to our{' '}
            <a href="#" className="text-slate-600 hover:text-primary-600 underline">Terms of Service</a> and{' '}
            <a href="#" className="text-slate-600 hover:text-primary-600 underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
