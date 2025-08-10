import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RootState } from '../../store';
import { setSelectedDate, setBookingModalOpen } from '../../store/slices/appointmentSlice';
import { useTheme } from '../../contexts/ThemeContext';
import { format } from 'date-fns';
import { Calendar, Plus, Clock, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const CalendarView: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const { isDark } = useTheme();
  const calendarRef = useRef<FullCalendar>(null);

  const events = appointments.map(apt => ({
    id: apt.id,
    title: `${apt.patientName} - ${apt.service}`,
    start: `${apt.date}T${apt.time}`,
    backgroundColor: apt.status === 'approved' 
      ? isDark ? '#06b6d4' : '#0ea5e9'
      : apt.status === 'pending' 
        ? isDark ? '#f59e0b' : '#f97316'
        : isDark ? '#ef4444' : '#f87171',
    borderColor: apt.status === 'approved' 
      ? isDark ? '#0891b2' : '#0284c7'
      : apt.status === 'pending' 
        ? isDark ? '#d97706' : '#ea580c'
        : isDark ? '#dc2626' : '#ef4444',
    textColor: '#ffffff',
  }));

  const handleDateClick = (info: any) => {
    const selectedDate = format(new Date(info.date), 'yyyy-MM-dd');
    dispatch(setSelectedDate(selectedDate));
    dispatch(setBookingModalOpen(true));
  };

  const stats = {
    total: appointments.length,
    approved: appointments.filter(apt => apt.status === 'approved').length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    rejected: appointments.filter(apt => apt.status === 'rejected').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className={`text-3xl font-bold flex items-center space-x-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <Calendar className={`w-8 h-8 ${
              isDark ? 'text-cyan-400' : 'text-blue-500'
            }`} />
            <span>Appointment Calendar</span>
          </h2>
          <p className={`mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-800'
          }`}>
            Click on any date to book a new appointment
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(setBookingModalOpen(true))}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-cyan-500/25' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>Book Appointment</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark 
              ? 'bg-black/30 backdrop-blur-lg border-gray-700/50 hover:shadow-lg hover:shadow-cyan-500/10' 
              : 'bg-white/70 backdrop-blur-lg border-gray-200/50 hover:shadow-lg hover:shadow-blue-500/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Users className={`w-8 h-8 ${
              isDark ? 'text-cyan-400' : 'text-blue-500'
            }`} />
            <div>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.total}
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-800'
              }`}>
                Total
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark 
              ? 'bg-black/30 backdrop-blur-lg border-gray-700/50 hover:shadow-lg hover:shadow-green-500/10' 
              : 'bg-white/70 backdrop-blur-lg border-gray-200/50 hover:shadow-lg hover:shadow-green-500/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.approved}
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-800'
              }`}>
                Approved
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark 
              ? 'bg-black/30 backdrop-blur-lg border-gray-700/50 hover:shadow-lg hover:shadow-yellow-500/10' 
              : 'bg-white/70 backdrop-blur-lg border-gray-200/50 hover:shadow-lg hover:shadow-yellow-500/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.pending}
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-800'
              }`}>
                Pending
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className={`p-4 rounded-xl border transition-all duration-300 ${
            isDark 
              ? 'bg-black/30 backdrop-blur-lg border-gray-700/50 hover:shadow-lg hover:shadow-red-500/10' 
              : 'bg-white/70 backdrop-blur-lg border-gray-200/50 hover:shadow-lg hover:shadow-red-500/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <XCircle className="w-8 h-8 text-red-400" />
            <div>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.rejected}
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-800'
              }`}>
                Rejected
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
          isDark 
            ? 'bg-black/30 backdrop-blur-lg border-cyan-500/30 shadow-cyan-500/10' 
            : 'bg-white/70 backdrop-blur-lg border-blue-500/30 shadow-blue-500/10'
        }`}
      >
        <div className="calendar-container">
          <style jsx global>{`
            .fc-theme-standard .fc-scrollgrid {
              border: 1px solid ${isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.3)'} !important;
            }
            .fc-theme-standard td, .fc-theme-standard th {
              border: 1px solid ${isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)'} !important;
            }
            .fc-col-header-cell {
              background: ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'} !important;
              color: ${isDark ? '#e5e7eb' : '#374151'} !important;
              font-weight: 600 !important;
            }
            .fc-daygrid-day {
              background: ${isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'} !important;
            }
            .fc-daygrid-day:hover {
              background: ${isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.1)'} !important;
              cursor: pointer !important;
            }
            .fc-daygrid-day-number {
              color: ${isDark ? '#e5e7eb' : '#374151'} !important;
              font-weight: 500 !important;
            }
            .fc-button {
              background: ${isDark 
                ? 'linear-gradient(45deg, #06b6d4, #3b82f6)' 
                : 'linear-gradient(45deg, #3b82f6, #6366f1)'} !important;
              border: none !important;
              border-radius: 8px !important;
              font-weight: 600 !important;
              transition: all 0.3s ease !important;
            }
            .fc-button:hover {
              background: ${isDark 
                ? 'linear-gradient(45deg, #0891b2, #2563eb)' 
                : 'linear-gradient(45deg, #2563eb, #4f46e5)'} !important;
              transform: translateY(-1px) !important;
            }
            .fc-button:disabled {
              background: rgba(75, 85, 99, 0.5) !important;
            }
            .fc-toolbar-title {
              color: ${isDark ? '#ffffff' : '#111827'} !important;
              font-weight: bold !important;
            }
            .fc-event {
              border-radius: 6px !important;
              font-weight: 500 !important;
              font-size: 0.875rem !important;
              transition: all 0.2s ease !important;
            }
            .fc-event:hover {
              transform: scale(1.02) !important;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            }
            .fc-today {
              background: ${isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.1)'} !important;
            }
            .fc-day-today .fc-daygrid-day-number {
              background: ${isDark ? '#06b6d4' : '#3b82f6'} !important;
              color: white !important;
              border-radius: 50% !important;
              width: 24px !important;
              height: 24px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
          `}</style>

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            events={events}
            dateClick={handleDateClick}
            height="auto"
            aspectRatio={1.8}
            eventDisplay="block"
            dayMaxEvents={3}
            moreLinkClick="popover"
            eventClassNames="cursor-pointer"
            eventMouseEnter={(info) => {
              info.el.style.zIndex = '1000';
            }}
            eventMouseLeave={(info) => {
              info.el.style.zIndex = 'auto';
            }}
          />
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-wrap gap-6 text-sm"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className={`w-4 h-4 rounded shadow-lg ${
              isDark ? 'bg-cyan-500 shadow-cyan-500/50' : 'bg-blue-500 shadow-blue-500/50'
            }`}></div>
            <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
              Approved
            </span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-4 h-4 bg-amber-500 rounded shadow-lg shadow-amber-500/50"></div>
            <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
              Pending
            </span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-4 h-4 bg-red-500 rounded shadow-lg shadow-red-500/50"></div>
            <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
              Rejected
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarView;