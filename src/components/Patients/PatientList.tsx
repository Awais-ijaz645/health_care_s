import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deletePatient, setSelectedPatient, setPatientModalOpen } from '../../store/slices/patientSlice';
import { useTheme } from '../../contexts/ThemeContext';
import { User, Mail, Phone, Calendar, Edit, Trash2, Plus, Heart, Activity, Clock } from 'lucide-react';
import { format } from 'date-fns';
import PatientModal from './PatientModal';

const PatientList: React.FC = () => {
  const dispatch = useDispatch();
  const { patients } = useSelector((state: RootState) => state.patients);
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const { isDark } = useTheme();

  const handleEdit = (patient: any) => {
    dispatch(setSelectedPatient(patient));
    dispatch(setPatientModalOpen(true));
  };

  const handleDelete = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      dispatch(deletePatient(patientId));
    }
  };

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div 
          variants={cardVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Patient Management
            </h2>
            <p className={`mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-800'
            }`}>
              Manage patient records and medical history
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <div className="flex items-center space-x-1">
                <User className={`w-4 h-4 ${
                  isDark ? 'text-cyan-400' : 'text-blue-500'
                }`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                  {patients.length} Total Patients
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className={`w-4 h-4 ${
                  isDark ? 'text-green-400' : 'text-green-500'
                }`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                  {appointments.filter(apt => apt.status === 'approved').length} Active Appointments
                </span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              dispatch(setSelectedPatient(null));
              dispatch(setPatientModalOpen(true));
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-cyan-500/25' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Patient</span>
          </motion.button>
        </motion.div>

        {/* Patients Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {patients.map((patient, index) => {
            const patientAppointments = getPatientAppointments(patient.id);
            const upcomingAppointments = patientAppointments.filter(
              apt => apt.status === 'approved' && new Date(apt.date) >= new Date()
            );
            
            return (
              <motion.div
                key={patient.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={`group relative rounded-2xl p-6 shadow-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-black/30 backdrop-blur-lg border border-gray-700/50 hover:shadow-2xl hover:shadow-cyan-500/10' 
                    : 'bg-white/70 backdrop-blur-lg border border-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10'
                }`}
              >
                {/* Status Indicator */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                  upcomingAppointments.length > 0 
                    ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                    : 'bg-gray-400'
                } animate-pulse`} />

                {/* Avatar and Name */}
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                      isDark 
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-500' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                    }`}
                  >
                    <User className="w-7 h-7 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {patient.name}
                    </h3>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-800'
                    }`}>
                      Age: {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 mb-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-sm group/item"
                  >
                    <Mail className={`w-4 h-4 ${
                      isDark ? 'text-cyan-400' : 'text-blue-500'
                    } group-hover/item:scale-110 transition-transform`} />
                    <span className={`truncate ${
                      isDark ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      {patient.email}
                    </span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-sm group/item"
                  >
                    <Phone className={`w-4 h-4 ${
                      isDark ? 'text-green-400' : 'text-green-500'
                    } group-hover/item:scale-110 transition-transform`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                      {patient.phone}
                    </span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-sm group/item"
                  >
                    <Calendar className={`w-4 h-4 ${
                      isDark ? 'text-purple-400' : 'text-purple-500'
                    } group-hover/item:scale-110 transition-transform`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                      Joined {format(new Date(patient.createdAt), 'MMM yyyy')}
                    </span>
                  </motion.div>
                </div>

                {/* Medical History */}
                <div className="mb-4">
                  <h4 className={`text-sm font-medium mb-2 flex items-center space-x-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-800'
                  }`}>
                    <Heart className="w-4 h-4" />
                    <span>Medical History</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.slice(0, 3).map((condition, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          isDark 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                            : 'bg-purple-100 text-purple-800 border border-purple-200'
                        }`}
                      >
                        {condition}
                      </motion.span>
                    ))}
                    {patient.medicalHistory.length > 3 && (
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        isDark 
                          ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        +{patient.medicalHistory.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Appointment Stats */}
                <div className={`mb-6 p-3 rounded-xl ${
                  isDark 
                    ? 'bg-gray-800/30 border border-gray-700/30' 
                    : 'bg-gray-50/50 border border-gray-200/30'
                }`}>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        isDark ? 'text-cyan-400' : 'text-blue-500'
                      }`}>
                        {patientAppointments.length}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                        Total
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        {upcomingAppointments.length}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                        Upcoming
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(patient)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                      isDark 
                        ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-600/30' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-200'
                    }`}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(patient.id)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      isDark 
                        ? 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/30' 
                        : 'bg-red-100 hover:bg-red-200 text-red-800 border border-red-200'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {patients.length === 0 && (
          <motion.div
            variants={cardVariants}
            className={`rounded-2xl p-12 text-center ${
              isDark 
                ? 'bg-black/30 backdrop-blur-lg border border-gray-700/50' 
                : 'bg-white/50 backdrop-blur-lg border border-gray-200/50'
            }`}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <User className={`w-20 h-20 mx-auto mb-4 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
            </motion.div>
            <h3 className={`text-2xl font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No Patients Yet
            </h3>
            <p className={`mb-8 max-w-md mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-800'
            }`}>
              Start building your patient database by adding the first patient record. 
              You can manage their medical history, appointments, and contact information.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                dispatch(setSelectedPatient(null));
                dispatch(setPatientModalOpen(true));
              }}
              className={`px-8 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
              }`}
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add First Patient
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      <PatientModal />
    </>
  );
};

export default PatientList;