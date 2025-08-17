import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminView, setPatientView, setCurrentView } from '../store/slices/appointmentSlice';
import type { RootState } from '../store';
import { 
  Heart, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Stethoscope
} from 'lucide-react';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const currentView = useSelector((s: RootState) => s.appointments.currentView);

  // Motion variants for nice staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  // Only include links that exist in the app views
  const quickLinks: { name: string; id: string; onClick: () => void }[] = [
    { name: 'Home', id: 'home', onClick: () => dispatch(setCurrentView('home')) },
    { name: 'Book Appointment', id: 'booking', onClick: () => dispatch(setCurrentView('booking')) },
    { name: 'Calendar', id: 'calendar', onClick: () => dispatch(setCurrentView('calendar')) },
    { name: 'Patients', id: 'patients', onClick: () => dispatch(setCurrentView('patients')) },
    { name: 'Doctors', id: 'doctor', onClick: () => dispatch(setCurrentView('doctor')) },
    { name: 'Patient Portal', id: 'patient-dashboard', onClick: () => { dispatch(setPatientView(true)); dispatch(setAdminView(false)); dispatch(setCurrentView('patient-dashboard')); } },
    { name: 'Admin Panel', id: 'admin', onClick: () => { dispatch(setAdminView(true)); dispatch(setPatientView(false)); } },
  ];

  // Ensure current page link appears first for context-awareness
  const sortedQuickLinks = [
    ...quickLinks.filter(l => l.id === currentView),
    ...quickLinks.filter(l => l.id !== currentView),
  ];

  const features = [
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Comprehensive healthcare management',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'HIPAA compliant data protection',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
    },
  ];

  return (
    <footer className={`relative mt-20 ${
      isDark 
        ? 'bg-gradient-to-t from-black via-gray-900 to-transparent' 
        : 'bg-gradient-to-t from-gray-100 via-white to-transparent'
    }`}>
      {/* Decorative top border */}
      <div className={`h-px w-full ${
        isDark 
          ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
      }`} />
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`text-center p-6 rounded-xl ${
                isDark 
                  ? 'bg-black/20 backdrop-blur-lg border border-gray-700/50' 
                  : 'bg-white/50 backdrop-blur-lg border border-gray-200/50'
              } hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-500 to-purple-500' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500'
              } group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="relative">
                <Stethoscope className={`w-8 h-8 ${
                  isDark ? 'text-cyan-400' : 'text-blue-500'
                }`} />
                <div className={`absolute inset-0 blur-md opacity-30 ${
                  isDark ? 'bg-cyan-400' : 'bg-blue-500'
                }`}></div>
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r ${
                isDark 
                  ? 'from-cyan-400 to-purple-400' 
                  : 'from-blue-500 to-indigo-500'
              } bg-clip-text text-transparent`}>
                MediCare
              </span>
            </motion.div>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              Advanced healthcare management system providing comprehensive patient care and medical record management.
            </p>
            {/* Social icons removed until real URLs are available */}
          </div>

          {/* Quick Links (only working modules) */}
          <div className="lg:col-span-1">
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <motion.ul 
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {sortedQuickLinks.map((link) => {
                const isActive = link.id === currentView;
                return (
                  <motion.li key={link.name} variants={itemVariants}>
                    <motion.button
                      onClick={link.onClick}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? (isDark ? 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30' : 'bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/30')
                          : (isDark ? 'text-gray-400 hover:text-cyan-300 hover:bg-white/5' : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50')
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? (isDark ? 'bg-cyan-400' : 'bg-blue-500') : (isDark ? 'bg-gray-600' : 'bg-gray-300')} `}></span>
                      {link.name}
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-8 mb-8 lg:mb-0`}>
            <motion.div 
              className="grid grid-cols-1 gap-3 items-stretch"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                variants={itemVariants}
                className="glass-card flex items-center gap-3 px-4 py-3 h-14 w-full"
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  isDark 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-blue-500/20 text-blue-500'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <span className={`font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>Call Us:</span>
                  <span className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>+1 (555) 123-4567</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                variants={itemVariants}
                className="glass-card flex items-center gap-3 px-4 py-3 h-14 w-full"
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  isDark 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : 'bg-indigo-500/20 text-indigo-500'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <span className={`font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Us:</span>
                  <span className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>support@medicare.com</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                variants={itemVariants}
                className="glass-card flex items-center gap-3 px-4 py-3 h-14 w-full"
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                  isDark 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <span className={`font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>Visit Us:</span>
                  <span className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>123 Healthcare Ave, Medical City</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              &copy; 2024 MediCare. All rights reserved. Built with &hearts; for better healthcare.
            </p>
            {/* Removed placeholder policy links until real pages are added */}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute bottom-0 left-1/4 w-32 h-32 ${
          isDark ? 'bg-cyan-500/5' : 'bg-blue-500/5'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-0 right-1/4 w-40 h-40 ${
          isDark ? 'bg-purple-500/5' : 'bg-indigo-500/5'
        } rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>
    </footer>
  );
};

export default Footer;
