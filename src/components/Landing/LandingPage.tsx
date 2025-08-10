import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setAdminView, setPatientView, setCurrentView } from '../../store/slices/appointmentSlice';
import { Users, Shield, Heart, Activity, Calendar, Stethoscope } from 'lucide-react';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();

  const handlePatientView = () => {
    dispatch(setPatientView(true));
    dispatch(setCurrentView('patient-dashboard'));
  };

  const handleAdminView = () => {
    dispatch(setAdminView(true));
    dispatch(setCurrentView('admin-dashboard'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
          <Activity size={35} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/3 text-pink-400/20"
          animate={{
            y: [-15, 15, -15],
            rotate: [0, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Stethoscope size={45} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/3 text-green-400/20"
          animate={{
            y: [15, -15, 15],
            rotate: [-360, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Calendar size={38} />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            HealthCare
          </h1>
          
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Advanced Healthcare Management System with Modern Technology
          </motion.p>
          
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
              🏥 Patient Management
            </span>
            <span className="bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
              📅 Appointment Scheduling
            </span>
            <span className="bg-pink-500/20 px-4 py-2 rounded-full border border-pink-500/30">
              👨‍⚕️ Doctor Portal
            </span>
          </motion.div>
        </motion.div>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
        >
          {/* Patient View Button */}
          <motion.button
            onClick={handlePatientView}
            className="group relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              rotateX: 5
            }}
            whileTap={{ scale: 0.98 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 sm:p-12 transition-all duration-500 group-hover:border-purple-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
              {/* 3D Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  Patient Portal
                </h2>
                
                <p className="text-gray-300 text-lg mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  Book appointments, view medical records, and manage your healthcare journey
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="bg-purple-500/30 px-3 py-1 rounded-full text-purple-200 border border-purple-400/30">
                    📋 Medical Records
                  </span>
                  <span className="bg-pink-500/30 px-3 py-1 rounded-full text-pink-200 border border-pink-400/30">
                    📅 Book Appointments
                  </span>
                  <span className="bg-blue-500/30 px-3 py-1 rounded-full text-blue-200 border border-blue-400/30">
                    💊 Prescriptions
                  </span>
                </div>
                
                <motion.div
                  className="mt-8 text-purple-300 font-semibold text-lg"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Enter as Patient →
                </motion.div>
              </div>
            </div>
          </motion.button>

          {/* Admin View Button */}
          <motion.button
            onClick={handleAdminView}
            className="group relative overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              rotateY: -5,
              rotateX: 5
            }}
            whileTap={{ scale: 0.98 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 sm:p-12 transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/25">
              {/* 3D Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{
                    rotateY: [360, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  Admin Portal
                </h2>
                
                <p className="text-gray-300 text-lg mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  Manage patients, doctors, appointments, and system settings
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="bg-blue-500/30 px-3 py-1 rounded-full text-blue-200 border border-blue-400/30">
                    👥 User Management
                  </span>
                  <span className="bg-cyan-500/30 px-3 py-1 rounded-full text-cyan-200 border border-cyan-400/30">
                    📊 Analytics
                  </span>
                  <span className="bg-green-500/30 px-3 py-1 rounded-full text-green-200 border border-green-400/30">
                    ⚙️ System Settings
                  </span>
                </div>
                
                <motion.div
                  className="mt-8 text-blue-300 font-semibold text-lg"
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Enter as Admin →
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 text-center text-gray-400"
        >
          <p className="text-sm">
            Secure • Reliable • Modern Healthcare Management
          </p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs">System Online</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
