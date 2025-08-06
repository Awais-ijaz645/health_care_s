import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  CalendarDays
} from 'lucide-react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

const DoctorSchedule: React.FC = () => {
  const { appointments } = useSelector((state: RootState) => state.appointments);

  // Get today's appointments
  const todayAppointments = appointments.filter(apt => 
    isToday(parseISO(apt.date)) && apt.status === 'approved'
  ).sort((a, b) => a.time.localeCompare(b.time));

  // Get tomorrow's appointments
  const tomorrowAppointments = appointments.filter(apt => 
    isTomorrow(parseISO(apt.date)) && apt.status === 'approved'
  ).sort((a, b) => a.time.localeCompare(b.time));

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = parseISO(apt.date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return aptDate >= today && aptDate <= nextWeek && apt.status === 'approved';
  }).sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
  });

  // Statistics
  const stats = {
    total: appointments.length,
    approved: appointments.filter(apt => apt.status === 'approved').length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    today: todayAppointments.length,
  };

  const AppointmentCard = ({ appointment, showDate = false }: { appointment: any, showDate?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/20 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white">{appointment.patientName}</h4>
            <p className="text-sm text-cyan-400">{appointment.service}</p>
          </div>
        </div>
        <div className="text-right">
          {showDate && (
            <p className="text-sm text-gray-400 mb-1">
              {format(parseISO(appointment.date), 'MMM dd')}
            </p>
          )}
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{appointment.time}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <Phone className="w-3 h-3" />
          <span>{appointment.patientPhone}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Mail className="w-3 h-3" />
          <span className="truncate">{appointment.patientEmail}</span>
        </div>
      </div>
      
      {appointment.notes && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-sm text-gray-300">
            <span className="font-medium">Notes:</span> {appointment.notes}
          </p>
        </div>
      )}
    </motion.div>
  );

  const StatCard = ({ icon: Icon, title, value, color, delay }: { 
    icon: any, 
    title: string, 
    value: number, 
    color: string,
    delay: number 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${color} backdrop-blur-lg rounded-xl border border-opacity-30 p-6 shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Doctor's Schedule</h2>
        <p className="text-gray-400">Manage your daily appointments and patient schedule</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CalendarDays}
          title="Total Appointments"
          value={stats.total}
          color="from-blue-500/20 to-cyan-500/20 border-blue-500"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle}
          title="Approved"
          value={stats.approved}
          color="from-green-500/20 to-emerald-500/20 border-green-500"
          delay={0.2}
        />
        <StatCard
          icon={AlertCircle}
          title="Pending"
          value={stats.pending}
          color="from-amber-500/20 to-orange-500/20 border-amber-500"
          delay={0.3}
        />
        <StatCard
          icon={TrendingUp}
          title="Today"
          value={stats.today}
          color="from-purple-500/20 to-pink-500/20 border-purple-500"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Today's Schedule</h3>
              <p className="text-sm text-gray-400">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="space-y-4">
            {todayAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No appointments scheduled for today</p>
              </div>
            ) : (
              todayAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            )}
          </div>
        </motion.div>

        {/* Tomorrow's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Tomorrow's Schedule</h3>
              <p className="text-sm text-gray-400">
                {format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'EEEE, MMMM dd, yyyy')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {tomorrowAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No appointments scheduled for tomorrow</p>
              </div>
            ) : (
              tomorrowAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Upcoming Appointments (Next 7 Days)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No upcoming appointments in the next 7 days</p>
            </div>
          ) : (
            upcomingAppointments.slice(0, 6).map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} showDate={true} />
            ))
          )}
        </div>

        {upcomingAppointments.length > 6 && (
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              And {upcomingAppointments.length - 6} more appointments...
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorSchedule;