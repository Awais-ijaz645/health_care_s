import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateAppointmentStatus, deleteAppointment, setAdminAuthenticated, setAdminView, setCurrentView } from '../../store/slices/appointmentSlice';
import { useTheme } from '../../contexts/ThemeContext';
import SettingsPanel from '../Settings/SettingsPanel';
import { 
  Check, 
  X, 
  Clock, 
  Mail, 
  Phone, 
  Trash2, 
  Shield, 
  Users, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Activity,
  TrendingUp,
  UserCheck,
  Stethoscope,
  LogOut,
  Sun,
  Moon,
  Filter,
  Search,
  Star,
  Award,
  Settings,
  Home
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments, doctors } = useSelector((state: RootState) => state.appointments);
  const { patients } = useSelector((state: RootState) => state.patients);
  const { isDark, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'doctors' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const approvedAppointments = appointments.filter(apt => apt.status === 'approved');
  const rejectedAppointments = appointments.filter(apt => apt.status === 'rejected');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (id: string, status: 'approved' | 'rejected' | 'completed') => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      dispatch(deleteAppointment(id));
    }
  };

  const handleLogout = () => {
    dispatch(setAdminAuthenticated(false));
    dispatch(setAdminView(false));
    dispatch(setCurrentView('home'));
  };

  const stats = [
    {
      title: 'Total Appointments',
      value: appointments.length,
      change: '+12%',
      icon: Calendar,
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Pending Reviews',
      value: pendingAppointments.length,
      change: '-5%',
      icon: Clock,
      color: 'warning',
      trend: 'down'
    },
    {
      title: 'Active Patients',
      value: patients.length,
      change: '+8%',
      icon: Users,
      color: 'success',
      trend: 'up'
    },
    {
      title: 'Available Doctors',
      value: doctors.length,
      change: '0%',
      icon: Stethoscope,
      color: 'secondary',
      trend: 'stable'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'settings', label: 'Settings', icon: Settings }
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

  const AppointmentCard = ({ appointment, showActions = false }: { appointment: any; showActions?: boolean }) => {
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2, scale: 1.01 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {doctor && (
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {appointment.patientName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dr. {appointment.doctorName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {appointment.service}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {appointment.date}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {appointment.time}
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
              appointment.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
              appointment.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
            }`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 text-primary-500" />
            <span>{appointment.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Phone className="w-4 h-4 text-secondary-500" />
            <span>{appointment.phone}</span>
          </div>
        </div>

        {appointment.notes && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Notes:</strong> {appointment.notes}
            </p>
          </div>
        )}

        {showActions && appointment.status === 'pending' && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusUpdate(appointment.id, 'approved')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Approve</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Reject</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDelete(appointment.id)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 px-4 py-2 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 overflow-x-auto pb-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    layoutId="activeAdminTab"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsPanel />
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-8"
            >
              {/* Stats Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${
                        stat.color === 'primary' ? 'from-blue-500 to-blue-600' :
                        stat.color === 'warning' ? 'from-yellow-500 to-orange-500' :
                        stat.color === 'success' ? 'from-green-500 to-emerald-500' :
                        'from-purple-500 to-indigo-500'
                      }`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        stat.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                        stat.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                        'text-gray-600 dark:text-gray-400'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Appointments */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-yellow-500" />
                    <span>Pending Appointments</span>
                  </h2>
                  <motion.button
                    onClick={() => setActiveTab('appointments')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    View All
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pendingAppointments.slice(0, 4).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} showActions={true} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointments Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} showActions={true} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'patients' && (
            <motion.div
              key="patients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-green-500" />
                <span>Patient Management</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {patient.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Age: {patient.age}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-secondary-500" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-accent-500" />
                        <span>{patient.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Appointments: </span>
                        <span className="text-primary-600 dark:text-primary-400">
                          {appointments.filter(apt => apt.patientName === patient.name).length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'doctors' && (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Stethoscope className="w-6 h-6 text-blue-500" />
                <span>Medical Staff</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {doctor.name}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {doctor.specialization}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.rating}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">• {doctor.experience} years</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-secondary-500" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-accent-500" />
                        <span>{doctor.email}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specializes in:</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctor.diseases.slice(0, 3).map((disease: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {disease}
                          </span>
                        ))}
                        {doctor.diseases.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{doctor.diseases.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Appointments: </span>
                        <span className="text-primary-600 dark:text-primary-400">
                          {appointments.filter(apt => apt.doctorId === doctor.id).length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;