import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

interface AppointmentState {
  appointments: Appointment[];
  selectedDate: string | null;
  selectedTime: string | null;
  isBookingModalOpen: boolean;
  isAdminView: boolean;
  currentView: 'calendar' | 'patients' | 'settings';
  currentView: 'calendar' | 'patients' | 'settings' | 'doctor';
}

const initialState: AppointmentState = {
  appointments: [
    {
      id: '1',
      patientId: '1',
      patientName: 'John Doe',
      patientEmail: 'john@example.com',
      patientPhone: '+1234567890',
      date: '2025-01-10',
      time: '10:00',
      service: 'General Consultation',
      notes: 'Regular checkup',
      status: 'approved',
      createdAt: '2025-01-08T10:00:00Z'
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Jane Smith',
      patientEmail: 'jane@example.com',
      patientPhone: '+1234567891',
      date: '2025-01-11',
      time: '14:30',
      service: 'Dental Cleaning',
      notes: 'Follow-up appointment',
      status: 'pending',
      createdAt: '2025-01-09T14:30:00Z'
    }
  ],
  selectedDate: null,
  selectedTime: null,
  isBookingModalOpen: false,
  isAdminView: false,
  currentView: 'calendar',
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Omit<Appointment, 'id' | 'createdAt'>>) => {
      const newAppointment: Appointment = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.appointments.push(newAppointment);
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: Appointment['status'] }>) => {
      const appointment = state.appointments.find(apt => apt.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },
    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload;
    },
    setBookingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isBookingModalOpen = action.payload;
    },
    setAdminView: (state, action: PayloadAction<boolean>) => {
      state.isAdminView = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<'calendar' | 'patients' | 'settings' | 'doctor'>) => {
      state.currentView = action.payload;
    },
  },
});

export const {
  addAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  setSelectedDate,
  setSelectedTime,
  setBookingModalOpen,
  setAdminView,
  setCurrentView,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;