import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  createdAt: string;
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  isPatientModalOpen: boolean;
}

const initialState: PatientState = {
  patients: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      dateOfBirth: '1990-05-15',
      address: '123 Main St, City, State 12345',
      emergencyContact: '+1234567899',
      medicalHistory: ['Hypertension', 'Diabetes Type 2'],
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      dateOfBirth: '1985-08-22',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: '+1234567898',
      medicalHistory: ['Allergies (Penicillin)'],
      createdAt: '2024-01-02T10:00:00Z'
    }
  ],
  selectedPatient: null,
  isPatientModalOpen: false,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Omit<Patient, 'id' | 'createdAt'>>) => {
      const newPatient: Patient = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.patients.push(newPatient);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    },
    setSelectedPatient: (state, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload;
    },
    setPatientModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPatientModalOpen = action.payload;
    },
  },
});

export const {
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  setPatientModalOpen,
} = patientSlice.actions;

export default patientSlice.reducer;