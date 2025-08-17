import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAdminView, setPatientView, setCurrentView, setAdminAuthenticated, setPatientAuthenticated } from '../store/slices/appointmentSlice';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Calendar, 
  Users, 
  Settings, 
  Stethoscope, 
  Sun, 
  Moon, 
  Menu, 
  X,
  UserCheck,
  Activity,
  Home,
  BookOpen,
  Shield,
  LogOut,
  Heart,
  User
} from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAdminView, isPatientView, isAdminAuthenticated, isPatientAuthenticated, currentView } = useSelector((state: RootState) => state.appointments);
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (view: string) => {
    if (view === 'admin') {
      dispatch(setAdminView(true));
      dispatch(setPatientView(false));
    } else if (view === 'patient-dashboard') {
      dispatch(setPatientView(true));
      dispatch(setAdminView(false));
      dispatch(setCurrentView('patient-dashboard'));
    } else {
      dispatch(setCurrentView(view as any));
      dispatch(setAdminView(false));
      dispatch(setPatientView(false));
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(setAdminAuthenticated(false));
    dispatch(setPatientAuthenticated(false));
    dispatch(setAdminView(false));
    dispatch(setPatientView(false));
    dispatch(setCurrentView('home'));
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      description: 'Welcome page',
      color: 'primary'
    },
    { 
      id: 'booking', 
      label: 'Book Appointment', 
      icon: BookOpen, 
      description: 'Schedule with doctors',
      color: 'secondary'
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: Calendar, 
      description: 'View appointments',
      color: 'accent'
    },
    { 
      id: 'patients', 
      label: 'Patients', 
      icon: Users, 
      description: 'Manage patients',
      color: 'success'
    },
    { 
      id: 'doctor', 
      label: 'Doctors', 
      icon: Stethoscope, 
      description: 'Doctor schedules',
      color: 'warning'
    }
  ];

  const specialNavItems = [
    { 
      id: 'patient-dashboard', 
      label: 'Patient Portal', 
      icon: Heart, 
      description: 'Patient dashboard',
      color: 'from-pink-500 to-rose-500',
      gradient: 'from-pink-400 to-rose-400'
    },
    { 
      id: 'admin', 
      label: 'Admin Panel', 
      icon: Shield, 
      description: 'Admin dashboard',
      color: 'from-purple-500 to-indigo-500',
      gradient: 'from-purple-400 to-indigo-400'
    }
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'backdrop-blur-2xl bg-white/10 dark:bg-gray-900/30 border-white/10 shadow-glow'
          : 'backdrop-blur-md bg-transparent border-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center gap-3"
          >
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 w-12 h-12 rounded-xl shadow-lg flex items-center justify-center shrink-0"
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div className="leading-tight">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                HealthCare+
              </h1>
              <p className="text-sm text-gray-800 dark:text-gray-400">Modern Healthcare Management</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Regular Navigation Items */}
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ 
                      rotate: 15,
                      scale: 1.1 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]" />
                  </motion.div>
                  <span className="text-sm">{item.label}</span>
                </div>
                
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </motion.button>
            ))}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * navItems.length }}
              whileHover={{ 
                scale: 1.1,
                rotate: 15
              }}
              whileTap={{ scale: 0.9 }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 rounded-xl -z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.button>

            {/* Special Portal Buttons - Modern hover effects */}
            <div className="flex items-center space-x-2 ml-2 xl:ml-6 pl-2 xl:pl-6 border-l border-gray-300 dark:border-gray-600">
              {specialNavItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative group px-3 xl:px-6 py-2 xl:py-3 rounded-xl xl:rounded-2xl transition-all duration-500 overflow-hidden bg-gradient-to-r ${item.color} ${
                    (item.id === 'patient-dashboard' && (isPatientView || currentView === 'patient-dashboard')) ||
                    (item.id === 'admin' && isAdminView)
                      ? 'shadow-2xl scale-105'
                      : 'hover:shadow-xl'
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.3
                  }}
                >
                  {/* Modern glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl xl:rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r ${item.color}`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative flex items-center space-x-2 xl:space-x-3 text-white">
                    <motion.div
                      className="p-1 xl:p-2 bg-white/20 rounded-lg xl:rounded-xl backdrop-blur-sm"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{
                        scale: 1.3,
                        rotate: 15
                      }}
                    >
                      <item.icon className="w-4 xl:w-5 h-4 xl:h-5" />
                    </motion.div>
                    <div className="text-left hidden lg:block">
                      <div className="font-bold text-xs xl:text-sm">{item.label}</div>
                      <div className="text-xs opacity-80 hidden xl:block">{item.description}</div>
                    </div>
                  </div>

                  {/* Floating particles effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [-10, -20, -10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 xl:space-x-4">
            {/* Logout Button */}
            {(isAdminAuthenticated || isPatientAuthenticated) && (
              <motion.button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 px-3 py-2 rounded-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            )}

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              whileHover={{ 
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-3">
              {/* Regular Navigation Items */}
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 10
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className={`p-3 rounded-xl ${
                      currentView === item.id 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20'
                    }`}
                    whileHover={{
                      scale: 1.2,
                      rotate: 10
                    }}
                  >
                    <item.icon className={`w-5 h-5 ${
                      currentView === item.id 
                        ? 'text-white' 
                        : 'text-primary-600 dark:text-primary-400'
                    } transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]`} />
                  </motion.div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-sm opacity-70">{item.description}</div>
                  </div>
                  {currentView === item.id && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Mobile Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-primary-100 hover:to-secondary-100 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-300 mt-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * (navItems.length + 1) }}
                whileHover={{ 
                  scale: 1.02,
                  x: 10
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-500 dark:to-purple-500"
                  whileHover={{
                    scale: 1.2,
                    rotate: 15
                  }}
                >
                  <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-white" />
                    ) : (
                      <Moon className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </motion.div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </div>
                  <div className="text-sm opacity-70 text-gray-600 dark:text-gray-400">
                    {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  </div>
                </div>
              </motion.button>

              {/* Mobile Portal Buttons */}
              <div className="pt-2 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs uppercase tracking-wider mb-2 text-gray-900 dark:text-gray-400">Portals</div>
                <div className="space-y-3">
                  {specialNavItems.map((item, index) => (
                    <motion.button
                      key={`mobile-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full relative overflow-hidden rounded-xl p-4 text-left text-white shadow-lg bg-gradient-to-r ${item.color}`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * (index + 1) }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-sm opacity-90">{item.description}</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white/80" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Logout */}
              {(isAdminAuthenticated || isPatientAuthenticated) && (
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 transition-all duration-300 mt-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * (navItems.length + specialNavItems.length + 2) }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 10
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600"
                    whileHover={{
                      scale: 1.2,
                      rotate: 10
                    }}
                  >
                    <LogOut className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Logout</div>
                    <div className="text-sm opacity-70">Exit current session</div>
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;