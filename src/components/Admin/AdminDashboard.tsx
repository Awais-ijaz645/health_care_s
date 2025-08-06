import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateAppointmentStatus, deleteAppointment } from '../../store/slices/appointmentSlice';
import { Check, X, Clock, Mail, Phone, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state: RootState) => state.appointments);

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const approvedAppointments = appointments.filter(apt => apt.status === 'approved');
  const rejectedAppointments = appointments.filter(apt => apt.status === 'rejected');

  const handleStatusUpdate = (id: string, status: 'approved' | 'rejected') => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAppointment(id));
  };

  const AppointmentCard = ({ appointment, showActions = false }: { appointment: any; showActions?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{appointment.patientName}</h3>
          <p className="text-cyan-400 font-medium">{appointment.service}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'approved' ? 'bg-green-500/20 text-green-300' :
            appointment.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{format(new Date(appointment.date), 'MMM dd, yyyy')} at {appointment.time}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span className="truncate">{appointment.patientEmail}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300 sm:col-span-1">
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>{appointment.patientPhone}</span>
        </div>
      </div>

      {appointment.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-400">
            <span className="font-medium">Notes:</span> {appointment.notes}
          </p>
        </div>
      )}

      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusUpdate(appointment.id, 'approved')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Approve</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Reject</span>
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(appointment.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl border border-amber-500/30 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-300 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-white">{pendingAppointments.length}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl border border-green-500/30 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-white">{approvedAppointments.length}</p>
            </div>
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl border border-red-500/30 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-300 text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-white">{rejectedAppointments.length}</p>
            </div>
            <X className="w-8 h-8 text-red-400" />
          </div>
        </motion.div>
      </div>

      {/* Pending Appointments */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Pending Appointments</h2>
        {pendingAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8 text-center"
          >
            <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No pending appointments</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Appointments */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Appointments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...approvedAppointments, ...rejectedAppointments]
            .slice(0, 4)
            .map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;