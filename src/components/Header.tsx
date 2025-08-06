import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAdminView, setCurrentView } from '../store/slices/appointmentSlice';
import { Calendar, Users, Settings, Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAdminView, currentView } = useSelector((state: RootState) => state.appointments);

  const handleNavClick = (view: string) => {
    dispatch(setCurrentView(view));
    if (view === 'calendar') {
      dispatch(setAdminView(false));
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="relative z-20 bg-black/20 backdrop-blur-lg border-b border-cyan-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Stethoscope className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-30"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MediCare
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('calendar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'calendar' && !isAdminView
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25'
                  : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-800/50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Calendar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('patients')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'patients'
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25'
                  : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-800/50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Patients</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('settings')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'settings'
                  ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25'
                  : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-800/50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </motion.button>
          </nav>

          {/* Admin Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setAdminView(!isAdminView))}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              isAdminView
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
            }`}
          >
            {isAdminView ? 'Patient View' : 'Admin Panel'}
          </motion.button>
          
          {/* Doctor Schedule Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('doctor')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentView === 'doctor'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25'
            }`}
          >
            Doctor Schedule
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;