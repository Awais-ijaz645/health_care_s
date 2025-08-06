import { configureStore } from '@reduxjs/toolkit';
import appointmentSlice from './slices/appointmentSlice';
import patientSlice from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentSlice,
    patients: patientSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;