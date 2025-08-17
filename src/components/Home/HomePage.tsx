import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Settings, 
  Stethoscope, 
  Heart, 
  Shield, 
  Clock,
  Star,
  Award,
  Activity
} from 'lucide-react';
import { setCurrentView } from '../../store/slices/appointmentSlice';
import { useTheme } from '../../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Ripple helper for click effects
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'ripple-span';
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    button.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  const features = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule appointments with our expert doctors',
      color: 'primary',
      action: () => dispatch(setCurrentView('booking'))
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Manage patient records and medical history',
      color: 'secondary',
      action: () => dispatch(setCurrentView('patients'))
    },
    {
      icon: Stethoscope,
      title: 'Doctor Schedules',
      description: 'View available doctors and their timings',
      color: 'accent',
      action: () => dispatch(setCurrentView('doctor'))
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Customize your healthcare experience',
      color: 'warning',
      action: () => dispatch(setCurrentView('settings'))
    }
  ];

  const stats = [
    { icon: UserCheck, label: 'Patients Served', value: '10,000+', color: 'success' },
    { icon: Stethoscope, label: 'Expert Doctors', value: '50+', color: 'primary' },
    { icon: Clock, label: 'Years Experience', value: '25+', color: 'secondary' },
    { icon: Award, label: 'Success Rate', value: '98%', color: 'accent' }
  ];

  const specialties = [
    { name: 'Cardiology', icon: Heart, patients: '2,500+' },
    { name: 'Dentistry', icon: Shield, patients: '3,200+' },
    { name: 'Dermatology', icon: Activity, patients: '1,800+' },
    { name: 'Orthopedics', icon: Award, patients: '2,100+' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated blobs */}
      <motion.section 
        className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0a0f1f] via-[#12122b] to-[#0a0f1f] dark:from-gray-950 dark:via-[#0b0b1a] dark:to-gray-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient radial glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-gradient-radial from-purple-600/25 via-fuchsia-500/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[45rem] h-[45rem] bg-gradient-radial from-cyan-500/25 via-teal-500/10 to-transparent blur-3xl" />
        </div>
        {/* Floating blurry blobs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-16 right-10 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full"
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="animated-gradient-text text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]"
              variants={itemVariants}
            >
              HealthCare Plus
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your comprehensive healthcare management system. Book appointments, manage records, and connect with expert doctors.
            </motion.p>

            {/* Neon chips for portals */}
            <motion.div className="flex flex-wrap justify-center gap-3 mb-10" variants={itemVariants}>
              <span className="glass-chip inline-flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-xs">Patient Portal</span>
              </span>
              <span className="glass-chip inline-flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-xs">Admin Panel</span>
              </span>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={(e) => { createRipple(e); dispatch(setCurrentView('booking')); }}
                className="btn-3d btn-3d-gradient ripple-container lift-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Appointment
              </motion.button>
              
              <motion.button
                onClick={(e) => { createRipple(e); dispatch(setCurrentView('doctor')); }}
                className="btn-3d btn-3d-teal ripple-container lift-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View Doctors
              </motion.button>
            </motion.div>

            {/* Glass stats quick strip */}
            <motion.div 
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-4 text-center"
                  variants={itemVariants}
                >
                  <div className={`mx-auto mb-2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-${s.color}-500 to-${s.color}-600 shadow-glow`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-gray-900 dark:text-white font-bold text-xl">{s.value}</div>
                  <div className="text-gray-700 dark:text-gray-200/80 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section - glass cards */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-transparent dark:to-transparent"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="animated-gradient-text text-4xl font-extrabold mb-4">Our Services</h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">Comprehensive healthcare solutions at your fingertips</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative glass-card p-8 cursor-pointer overflow-hidden`}
                variants={itemVariants}
                onClick={feature.action}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 blur-xl`} />
                
                <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl mb-6 shadow-glow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="relative text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="relative text-gray-700 dark:text-gray-200/90">
                  {feature.description}
                </p>

                <div className={`relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-${feature.color}-500/50 to-transparent`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Specialties Section - glass tiles */}
      <motion.section 
        className="py-20 bg-white dark:bg-transparent"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="animated-gradient-text text-4xl font-extrabold mb-4">Medical Specialties</h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">Expert care across multiple specializations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 hover:shadow-glow-lg group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg shadow-glow">
                    <specialty.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {specialty.name}
                </h3>
                
                <p className="text-sm text-gray-700 dark:text-gray-200/90">
                  {specialty.patients} patients treated
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Floating Action Button */}
      <motion.button
        onClick={(e) => { createRipple(e); dispatch(setCurrentView('booking')); }}
        className="fixed bottom-36 right-6 sm:bottom-32 md:bottom-28 lg:bottom-24 z-40 btn-3d btn-3d-pink ripple-container rounded-full w-14 h-14 lift-hover"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Quick Book"
        title="Quick Book"
      >
        <Calendar className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};

export default HomePage;
