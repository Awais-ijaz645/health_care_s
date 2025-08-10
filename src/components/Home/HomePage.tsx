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
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              HealthCare Plus
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Your comprehensive healthcare management system. Book appointments, manage records, and connect with expert doctors.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => dispatch(setCurrentView('booking'))}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Appointment
              </motion.button>
              
              <motion.button
                onClick={() => dispatch(setCurrentView('doctor'))}
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Doctors
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300">
              Comprehensive healthcare solutions at your fingertips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden`}
                variants={itemVariants}
                onClick={feature.action}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/5 to-${feature.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-800 dark:text-gray-300">
                  {feature.description}
                </p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300">
              Our commitment to excellence in healthcare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-full mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                
                <p className="text-gray-800 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Specialties Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300">
              Expert care across multiple specializations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <specialty.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center text-yellow-500">
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
                
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  {specialty.patients} patients treated
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
