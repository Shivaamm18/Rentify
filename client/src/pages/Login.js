import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiArrowRight, HiShieldCheck, HiStar, HiHome } from 'react-icons/hi';

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
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-600 overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
            alt="Real Estate"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-white max-w-lg">
          <Link to="/" className="inline-flex items-center space-x-3 mb-12 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <HiHome className="text-primary-600 w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tight">Rentify.</span>
          </Link>
          
          <h1 className="text-5xl font-black mb-8 leading-tight">Your gateway to a <br />better lifestyle.</h1>
          
          <div className="space-y-8">
            {[
              { icon: <HiShieldCheck />, text: "100% Verified properties only" },
              { icon: <HiStar />, text: "India's highest rated rental platform" },
              { icon: <HiLockClosed />, text: "Secure digital rental agreements" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="font-bold text-lg text-primary-50 tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-bold">
              New to Rentify?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
              <div className="relative group">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="input-field pl-12 h-14 font-bold"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                <a href="#" className="text-xs font-black text-primary-600 hover:text-primary-700">Forgot Password?</a>
              </div>
              <div className="relative group">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors text-xl" />
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={onChange}
                  className="input-field pl-12 h-14 font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 py-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer" 
              />
              <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-14 flex items-center justify-center space-x-3 text-lg"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <HiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Social login visual only */}
          <div className="mt-12 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 relative">
              <span className="bg-slate-50 px-4 relative z-10">Or continue with</span>
              <span className="absolute left-0 top-1/2 w-full h-[1px] bg-slate-200 z-0"></span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-3 h-12 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-700">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-3 h-12 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-700">
                <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-5 h-5" alt="LinkedIn" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
