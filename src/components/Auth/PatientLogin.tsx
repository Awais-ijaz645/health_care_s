import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setPatientAuthenticated, setCurrentPatientId, setCurrentView, setPatientView } from '../../store/slices/appointmentSlice';
import { Users, ArrowLeft, Eye, EyeOff, Shield, Heart } from 'lucide-react';

const PatientLogin: React.FC = () => {
  const dispatch = useDispatch();
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo patient credentials
  const validPatients = [
    { id: 'PAT001', password: 'patient123' },
    { id: 'PAT002', password: 'patient456' },
    { id: 'PAT003', password: 'patient789' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validPatient = validPatients.find(
      p => p.id === patientId && p.password === password
    );

    if (validPatient) {
      dispatch(setCurrentPatientId(patientId));
      dispatch(setPatientAuthenticated(true));
      dispatch(setCurrentView('patient-dashboard'));
    } else {
      setError('Invalid Patient ID or Password');
    }

    setIsLoading(false);
  };

  const handleBackToHome = () => {
    dispatch(setPatientView(false));
    dispatch(setCurrentView('home'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-purple-400/20"
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
          <Heart size={40} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-blue-400/20"
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
          <Shield size={35} />
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
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl"
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
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Patient Login</h1>
            <p className="text-gray-300">Access your healthcare portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Patient ID Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Patient ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your Patient ID (e.g., PAT001)"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
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
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login to Patient Portal'
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <h3 className="text-sm font-semibold text-blue-300 mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-xs text-gray-300">
              <div>Patient ID: PAT001, Password: patient123</div>
              <div>Patient ID: PAT002, Password: patient456</div>
              <div>Patient ID: PAT003, Password: patient789</div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-2 text-xs"
          >
            <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-200 border border-purple-400/30">
              📋 Medical Records
            </span>
            <span className="bg-pink-500/20 px-3 py-1 rounded-full text-pink-200 border border-pink-400/30">
              📅 Appointments
            </span>
            <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-200 border border-blue-400/30">
              💊 Prescriptions
            </span>
          </motion.div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 text-center text-gray-400 text-sm"
        >
          <div className="flex justify-center items-center space-x-2">
            <Shield size={16} />
            <span>Your data is encrypted and secure</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientLogin;
