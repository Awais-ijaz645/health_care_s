import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deletePatient, setSelectedPatient, setPatientModalOpen } from '../../store/slices/patientSlice';
import { User, Mail, Phone, Calendar, Edit, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import PatientModal from './PatientModal';

const PatientList: React.FC = () => {
  const dispatch = useDispatch();
  const { patients } = useSelector((state: RootState) => state.patients);
  const { appointments } = useSelector((state: RootState) => state.appointments);

  const handleEdit = (patient: any) => {
    dispatch(setSelectedPatient(patient));
    dispatch(setPatientModalOpen(true));
  };

  const handleDelete = (patientId: string) => {
    dispatch(deletePatient(patientId));
  };

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId);
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Patient Management</h2>
          <p className="text-gray-400">Manage patient records and medical history</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            dispatch(setSelectedPatient(null));
            dispatch(setPatientModalOpen(true));
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Patient</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient, index) => {
          const patientAppointments = getPatientAppointments(patient.id);
          
          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Avatar and Name */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                  <p className="text-sm text-gray-400">
                    Age: {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Joined {format(new Date(patient.createdAt), 'MMM yyyy')}</span>
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Medical History</h4>
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.slice(0, 3).map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                  {patient.medicalHistory.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                      +{patient.medicalHistory.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Appointment Stats */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Appointments</span>
                  <span className="text-cyan-400 font-medium">{patientAppointments.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Upcoming</span>
                  <span className="text-green-400 font-medium">
                    {patientAppointments.filter(apt => apt.status === 'approved' && new Date(apt.date) >= new Date()).length}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(patient)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(patient.id)}
                  className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {patients.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-12 text-center"
        >
          <User className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Patients Yet</h3>
          <p className="text-gray-400 mb-6">Start building your patient database by adding the first patient record</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              dispatch(setSelectedPatient(null));
              dispatch(setPatientModalOpen(true));
            }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
          >
            Add First Patient
          </motion.button>
        </motion.div>
      )}
    </div>
      <PatientModal />
    </>
  );
};

export default PatientList;