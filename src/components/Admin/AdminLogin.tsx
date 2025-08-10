import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setAdminAuthenticated, setAdminView, setCurrentView } from '../../store/slices/appointmentSlice';
import { Lock, Eye, EyeOff, Shield, AlertCircle, ArrowLeft, Home } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASSWORD = 'ad123';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      dispatch(setAdminAuthenticated(true));
      dispatch(setCurrentView('admin-dashboard'));
      setIsLoading(false);
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    dispatch(setAdminView(false));
    dispatch(setCurrentView('home'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-blue-400/20"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Shield size={40} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-cyan-400/20"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Home size={35} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back Button */}
        <motion.button
          onClick={handleBackToHome}
          className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </motion.button>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex justify-center mb-4"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-300">Enter your admin password to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm flex items-center space-x-2"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Shield size={20} />
                  <span>Access Admin Panel</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-1">
                  Secure Access
                </h4>
                <p className="text-xs text-gray-300">
                  This area is restricted to authorized administrators only. All access attempts are logged for security purposes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Demo Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-400">
              Demo Password: <span className="font-mono bg-blue-500/20 px-2 py-1 rounded text-blue-300">ad123</span>
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-2 text-xs"
          >
            <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-200 border border-blue-400/30">
              👥 User Management
            </span>
            <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-200 border border-cyan-400/30">
              📊 Analytics
            </span>
            <span className="bg-green-500/20 px-3 py-1 rounded-full text-green-200 border border-green-400/30">
              ⚙️ System Settings
            </span>
          </motion.div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-center text-gray-400 text-sm"
        >
          <div className="flex justify-center items-center space-x-2">
            <Shield size={16} />
            <span>Secure admin authentication</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
