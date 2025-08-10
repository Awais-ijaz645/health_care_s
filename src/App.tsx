import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import CalendarView from './components/Calendar/CalendarView';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import PatientLogin from './components/Auth/PatientLogin';
import PatientDashboard from './components/Patient/PatientDashboard';
import PatientList from './components/Patients/PatientList';
import SettingsPanel from './components/Settings/SettingsPanel';
import DoctorSchedule from './components/Doctor/DoctorSchedule';
import DoctorBooking from './components/Booking/DoctorBooking';
import BookingModal from './components/Booking/BookingModal';

const AppContent: React.FC = () => {
  const { 
    isAdminView, 
    isPatientView, 
    isAdminAuthenticated, 
    isPatientAuthenticated, 
    currentView 
  } = useSelector((state: RootState) => state.appointments);

  // Admin authentication flow
  if (isAdminView && !isAdminAuthenticated) {
    return <AdminLogin />;
  }

  // Patient authentication flow
  if (isPatientView && !isPatientAuthenticated) {
    return <PatientLogin />;
  }

  // Admin Dashboard - authenticated admin
  if (isAdminView && isAdminAuthenticated) {
    return (
      <>
        <AdminDashboard />
        <BookingModal />
      </>
    );
  }

  // Patient Dashboard - authenticated patient
  if (isPatientView && isPatientAuthenticated && currentView === 'patient-dashboard') {
    return (
      <>
        <PatientDashboard />
        <BookingModal />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'calendar':
        return <CalendarView />;
      case 'patients':
        return <PatientList />;
      case 'settings':
        return <SettingsPanel />;
      case 'doctor':
        return <DoctorSchedule />;
      case 'booking':
        return <DoctorBooking />;
      case 'patient-dashboard':
        return isPatientAuthenticated ? <PatientDashboard /> : <PatientLogin />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderCurrentView()}
          </div>
        </motion.div>
      </AnimatePresence>
      <BookingModal />
    </Layout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;