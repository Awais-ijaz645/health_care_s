import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  experience: number;
  rating: number;
  image: string;
  availability: {
    day: string;
    slots: string[];
  }[];
  diseases: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  date: string;
  time: string;
  service: string;
  disease?: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

interface AppointmentState {
  appointments: Appointment[];
  doctors: Doctor[];
  selectedDate: string | null;
  selectedTime: string | null;
  selectedDoctor: Doctor | null;
  isBookingModalOpen: boolean;
  isAdminView: boolean;
  isPatientView: boolean;
  isAdminAuthenticated: boolean;
  isPatientAuthenticated: boolean;
  currentPatientId: string | null;
  currentView: 'landing' | 'home' | 'calendar' | 'patients' | 'settings' | 'doctor' | 'booking' | 'admin-dashboard' | 'patient-dashboard';
  userType: 'admin' | 'patient' | null;
}

const initialState: AppointmentState = {
  appointments: [
    {
      id: '1',
      patientId: '1',
      doctorId: '1',
      patientName: 'John Doe',
      patientEmail: 'john@example.com',
      patientPhone: '+1234567890',
      doctorName: 'Dr. Sarah Johnson',
      date: '2025-01-10',
      time: '10:00',
      service: 'General Consultation',
      disease: 'Hypertension',
      notes: 'Regular checkup',
      status: 'approved',
      createdAt: '2025-01-08T10:00:00Z'
    },
    {
      id: '2',
      patientId: '2',
      doctorId: '2',
      patientName: 'Jane Smith',
      patientEmail: 'jane@example.com',
      patientPhone: '+1234567891',
      doctorName: 'Dr. Michael Chen',
      date: '2025-01-11',
      time: '14:30',
      service: 'Dental Cleaning',
      disease: 'Dental Caries',
      notes: 'Follow-up appointment',
      status: 'pending',
      createdAt: '2025-01-09T14:30:00Z'
    }
  ],
  doctors: [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      email: 'sarah.johnson@hospital.com',
      phone: '+1234567890',
      experience: 15,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      availability: [
        { day: 'Monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Tuesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Wednesday', slots: ['09:00', '10:00', '11:00'] },
        { day: 'Thursday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Friday', slots: ['09:00', '10:00', '11:00'] }
      ],
      diseases: ['Hypertension', 'Heart Disease', 'Arrhythmia', 'Chest Pain', 'High Cholesterol']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Dentist',
      email: 'michael.chen@hospital.com',
      phone: '+1234567891',
      experience: 12,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      availability: [
        { day: 'Monday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
        { day: 'Tuesday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
        { day: 'Wednesday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
        { day: 'Thursday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
        { day: 'Friday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] }
      ],
      diseases: ['Dental Caries', 'Gum Disease', 'Tooth Pain', 'Oral Hygiene', 'Root Canal']
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Dermatologist',
      email: 'emily.rodriguez@hospital.com',
      phone: '+1234567892',
      experience: 10,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1594824475317-d3c4b6c6b4f1?w=400',
      availability: [
        { day: 'Monday', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
        { day: 'Tuesday', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
        { day: 'Thursday', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
        { day: 'Friday', slots: ['10:00', '11:00', '14:00', '15:00'] }
      ],
      diseases: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer', 'Allergic Reactions']
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedic',
      email: 'james.wilson@hospital.com',
      phone: '+1234567893',
      experience: 18,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
      availability: [
        { day: 'Monday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
        { day: 'Wednesday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
        { day: 'Thursday', slots: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
        { day: 'Friday', slots: ['08:00', '09:00', '10:00'] }
      ],
      diseases: ['Fractures', 'Joint Pain', 'Arthritis', 'Sports Injuries', 'Back Pain']
    }
  ],
  selectedDate: null,
  selectedTime: null,
  selectedDoctor: null,
  isBookingModalOpen: false,
  isAdminView: false,
  isPatientView: false,
  isAdminAuthenticated: false,
  isPatientAuthenticated: false,
  currentPatientId: null,
  currentView: 'landing',
  userType: null,
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
    setSelectedDoctor: (state, action: PayloadAction<Doctor | null>) => {
      state.selectedDoctor = action.payload;
    },
    setBookingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isBookingModalOpen = action.payload;
    },
    setAdminView: (state, action: PayloadAction<boolean>) => {
      state.isAdminView = action.payload;
      if (action.payload) {
        state.isPatientView = false;
        state.userType = 'admin';
      }
    },
    setPatientView: (state, action: PayloadAction<boolean>) => {
      state.isPatientView = action.payload;
      if (action.payload) {
        state.isAdminView = false;
        state.userType = 'patient';
      }
    },
    setAdminAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAdminAuthenticated = action.payload;
      if (!action.payload) {
        state.isAdminView = false;
        state.userType = null;
      }
    },
    setPatientAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isPatientAuthenticated = action.payload;
      if (!action.payload) {
        state.isPatientView = false;
        state.currentPatientId = null;
        state.userType = null;
      }
    },
    setCurrentPatientId: (state, action: PayloadAction<string | null>) => {
      state.currentPatientId = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      // Legacy support - deprecated
      state.isAdminAuthenticated = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<'landing' | 'home' | 'calendar' | 'patients' | 'settings' | 'doctor' | 'booking' | 'admin-dashboard' | 'patient-dashboard'>) => {
      state.currentView = action.payload;
    },
    logout: (state) => {
      state.isAdminAuthenticated = false;
      state.isPatientAuthenticated = false;
      state.isAdminView = false;
      state.isPatientView = false;
      state.currentPatientId = null;
      state.userType = null;
      state.currentView = 'landing';
    },
    addDoctor: (state, action: PayloadAction<Omit<Doctor, 'id'>>) => {
      const newDoctor: Doctor = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.doctors.push(newDoctor);
    },
    updateDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex(doc => doc.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    deleteDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter(doc => doc.id !== action.payload);
    },
  },
});

export const {
  addAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  setSelectedDate,
  setSelectedTime,
  setSelectedDoctor,
  setBookingModalOpen,
  setAdminView,
  setPatientView,
  setAdminAuthenticated,
  setPatientAuthenticated,
  setCurrentPatientId,
  setAuthenticated,
  setCurrentView,
  logout,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;