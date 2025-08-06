import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RootState } from '../../store';
import { setSelectedDate, setBookingModalOpen } from '../../store/slices/appointmentSlice';
import { format } from 'date-fns';

const CalendarView: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const calendarRef = useRef<FullCalendar>(null);

  const events = appointments.map(apt => ({
    id: apt.id,
    title: `${apt.patientName} - ${apt.service}`,
    start: `${apt.date}T${apt.time}`,
    backgroundColor: apt.status === 'approved' ? '#06b6d4' : apt.status === 'pending' ? '#f59e0b' : '#ef4444',
    borderColor: apt.status === 'approved' ? '#0891b2' : apt.status === 'pending' ? '#d97706' : '#dc2626',
    textColor: '#ffffff',
  }));

  const handleDateClick = (info: any) => {
    const selectedDate = format(new Date(info.date), 'yyyy-MM-dd');
    dispatch(setSelectedDate(selectedDate));
    dispatch(setBookingModalOpen(true));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/30 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Appointment Calendar</h2>
        <p className="text-gray-400">Click on any date to book a new appointment</p>
      </div>

      <div className="calendar-container">
        <style jsx global>{`
          .fc-theme-standard .fc-scrollgrid {
            border: 1px solid rgba(6, 182, 212, 0.3) !important;
          }
          .fc-theme-standard td, .fc-theme-standard th {
            border: 1px solid rgba(6, 182, 212, 0.2) !important;
          }
          .fc-col-header-cell {
            background: rgba(0, 0, 0, 0.3) !important;
            color: #e5e7eb !important;
            font-weight: 600 !important;
          }
          .fc-daygrid-day {
            background: rgba(0, 0, 0, 0.1) !important;
          }
          .fc-daygrid-day:hover {
            background: rgba(6, 182, 212, 0.1) !important;
          }
          .fc-daygrid-day-number {
            color: #e5e7eb !important;
            font-weight: 500 !important;
          }
          .fc-button {
            background: linear-gradient(45deg, #06b6d4, #3b82f6) !important;
            border: none !important;
            border-radius: 8px !important;
            font-weight: 600 !important;
          }
          .fc-button:hover {
            background: linear-gradient(45deg, #0891b2, #2563eb) !important;
          }
          .fc-button:disabled {
            background: rgba(75, 85, 99, 0.5) !important;
          }
          .fc-toolbar-title {
            color: #ffffff !important;
            font-weight: bold !important;
          }
          .fc-event {
            border-radius: 6px !important;
            font-weight: 500 !important;
            font-size: 0.875rem !important;
          }
          .fc-event:hover {
            transform: scale(1.02) !important;
            transition: transform 0.2s ease !important;
          }
          .fc-today {
            background: rgba(6, 182, 212, 0.1) !important;
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
        />
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-500 rounded"></div>
          <span className="text-gray-300">Approved</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span className="text-gray-300">Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-300">Rejected</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarView;