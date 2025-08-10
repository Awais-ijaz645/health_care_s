import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout, setCurrentView } from '../../store/slices/appointmentSlice';
import { 
  Calendar, 
  FileText, 
  Heart, 
  Activity, 
  Clock, 
  User, 
  LogOut, 
  Phone, 
  Mail, 
  MapPin,
  Pill,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPatientId, appointments, doctors } = useSelector((state: RootState) => state.appointments);

  // Mock patient data based on currentPatientId
  const patientData = {
    PAT001: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      dateOfBirth: '1990-05-15',
      bloodType: 'A+',
      emergencyContact: 'Jane Doe - +1 (555) 987-6543',
      medicalHistory: [
        { condition: 'Hypertension', diagnosed: '2020-03-15', status: 'Active' },
        { condition: 'Diabetes Type 2', diagnosed: '2021-07-22', status: 'Managed' },
        { condition: 'Allergic to Penicillin', diagnosed: '2018-01-10', status: 'Active' }
      ],
      prescriptions: [
        { medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Sarah Johnson' },
        { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Sarah Johnson' },
        { medication: 'Aspirin', dosage: '81mg', frequency: 'Once daily', prescribedBy: 'Dr. Sarah Johnson' }
      ],
      vitals: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '180 lbs',
        height: '5\'10"',
        lastUpdated: '2025-01-08'
      }
    },
    PAT002: {
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, City, State 12345',
      dateOfBirth: '1985-09-22',
      bloodType: 'O-',
      emergencyContact: 'Mike Smith - +1 (555) 876-5432',
      medicalHistory: [
        { condition: 'Asthma', diagnosed: '2019-11-08', status: 'Active' },
        { condition: 'Seasonal Allergies', diagnosed: '2020-04-12', status: 'Active' }
      ],
      prescriptions: [
        { medication: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', prescribedBy: 'Dr. Michael Chen' },
        { medication: 'Claritin', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Emily Rodriguez' }
      ],
      vitals: {
        bloodPressure: '120/80',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '140 lbs',
        height: '5\'6"',
        lastUpdated: '2025-01-07'
      }
    },
    PAT003: {
      name: 'Michael Johnson',
      email: 'michael.johnson@email.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, City, State 12345',
      dateOfBirth: '1978-12-03',
      bloodType: 'B+',
      emergencyContact: 'Sarah Johnson - +1 (555) 765-4321',
      medicalHistory: [
        { condition: 'Arthritis', diagnosed: '2022-02-14', status: 'Active' },
        { condition: 'High Cholesterol', diagnosed: '2021-09-30', status: 'Managed' }
      ],
      prescriptions: [
        { medication: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', prescribedBy: 'Dr. James Wilson' },
        { medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', prescribedBy: 'Dr. Sarah Johnson' }
      ],
      vitals: {
        bloodPressure: '125/82',
        heartRate: '75 bpm',
        temperature: '98.7°F',
        weight: '195 lbs',
        height: '6\'1"',
        lastUpdated: '2025-01-06'
      }
    }
  };

  const currentPatient = patientData[currentPatientId as keyof typeof patientData];
  const patientAppointments = appointments.filter(apt => apt.patientId === currentPatientId);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBookAppointment = () => {
    dispatch(setCurrentView('booking'));
  };

  const handleViewCalendar = () => {
    dispatch(setCurrentView('calendar'));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  if (!currentPatient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">Patient Portal</h1>
                <p className="text-gray-300">Welcome back, {currentPatient.name}</p>
              </div>
            </div>
            
            <motion.button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-xl border border-red-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.button
            onClick={handleBookAppointment}
            className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 hover:border-purple-400/50 transition-all duration-300"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Book Appointment</h3>
                <p className="text-gray-300 text-sm">Schedule with a doctor</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={handleViewCalendar}
            className="group bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 hover:border-blue-400/50 transition-all duration-300"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">View Calendar</h3>
                <p className="text-gray-300 text-sm">See all appointments</p>
              </div>
            </div>
          </motion.button>

          <motion.div
            className="group bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6"
            whileHover={{ scale: 1.02, rotateY: 5 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Health Status</h3>
                <p className="text-gray-300 text-sm">All systems normal</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">{currentPatient.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">{currentPatient.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">{currentPatient.address}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <p className="text-xs text-purple-300">Blood Type</p>
                    <p className="text-white font-semibold">{currentPatient.bloodType}</p>
                  </div>
                  <div className="bg-pink-500/20 p-3 rounded-xl">
                    <p className="text-xs text-pink-300">DOB</p>
                    <p className="text-white font-semibold">{currentPatient.dateOfBirth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Latest Vitals
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <p className="text-xs text-green-300">Blood Pressure</p>
                  <p className="text-white font-semibold">{currentPatient.vitals.bloodPressure}</p>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-xl">
                  <p className="text-xs text-emerald-300">Heart Rate</p>
                  <p className="text-white font-semibold">{currentPatient.vitals.heartRate}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <p className="text-xs text-blue-300">Weight</p>
                  <p className="text-white font-semibold">{currentPatient.vitals.weight}</p>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded-xl">
                  <p className="text-xs text-cyan-300">Temperature</p>
                  <p className="text-white font-semibold">{currentPatient.vitals.temperature}</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-3">
                Last updated: {currentPatient.vitals.lastUpdated}
              </p>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Appointments
              </h2>
              
              <div className="space-y-4">
                {patientAppointments.length > 0 ? (
                  patientAppointments.slice(0, 3).map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      className="bg-white/5 border border-blue-500/20 rounded-xl p-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">{appointment.doctorName}</h3>
                          <p className="text-gray-300 text-sm">{appointment.service}</p>
                          <p className="text-blue-300 text-sm">{appointment.date} at {appointment.time}</p>
                        </div>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="capitalize">{appointment.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-400">No appointments scheduled</p>
                    <button
                      onClick={handleBookAppointment}
                      className="mt-3 text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                      Book your first appointment
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Medical History */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Medical History
              </h2>
              
              <div className="space-y-3">
                {currentPatient.medicalHistory.map((condition, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-orange-500/20 rounded-xl p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{condition.condition}</h3>
                        <p className="text-gray-300 text-sm">Diagnosed: {condition.diagnosed}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        condition.status === 'Active' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                          : 'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Prescriptions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="bg-gradient-to-br from-teal-600/20 to-green-600/20 backdrop-blur-xl border border-teal-500/30 rounded-3xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Current Prescriptions
              </h2>
              
              <div className="space-y-3">
                {currentPatient.prescriptions.map((prescription, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-teal-500/20 rounded-xl p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-semibold">{prescription.medication}</h3>
                        <p className="text-gray-300 text-sm">{prescription.dosage} - {prescription.frequency}</p>
                        <p className="text-teal-300 text-xs">Prescribed by {prescription.prescribedBy}</p>
                      </div>
                      <Stethoscope className="w-5 h-5 text-teal-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
