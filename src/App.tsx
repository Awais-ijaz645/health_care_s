import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Layout from './components/Layout';
import CalendarView from './components/Calendar/CalendarView';
import AdminDashboard from './components/Admin/AdminDashboard';
import PatientList from './components/Patients/PatientList';
import SettingsPanel from './components/Settings/SettingsPanel';
import DoctorSchedule from './components/Doctor/DoctorSchedule';
import BookingModal from './components/Booking/BookingModal';

const AppContent: React.FC = () => {
  const { isAdminView, currentView } = useSelector((state: RootState) => state.appointments);

  const renderCurrentView = () => {
    if (isAdminView) {
      return <AdminDashboard />;
    }

    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'patients':
        return <PatientList />;
      case 'settings':
        return <SettingsPanel />;
      case 'doctor':
        return <DoctorSchedule />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </div>
      <BookingModal />
    </Layout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;