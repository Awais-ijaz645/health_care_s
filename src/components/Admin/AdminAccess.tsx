import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAdminAuthenticated } from '../../store/slices/appointmentSlice';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import { Shield, Lock, Activity, Eye } from 'lucide-react';

const AdminAccess: React.FC = () => {
  const dispatch = useDispatch();
  const { isAdminAuthenticated } = useSelector((state: RootState) => state.appointments);
  const [showAccess, setShowAccess] = useState(false);

  // Check if accessing via special admin URL parameter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adminAccess = urlParams.get('admin');
    if (adminAccess === 'true') {
      setShowAccess(true);
    }
  }, []);

  // If admin is authenticated, show dashboard
  if (isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  // If not accessing via admin URL, show access denied
  if (!showAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-full mx-auto mb-8 w-24 h-24 flex items-center justify-center"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Lock className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Access Restricted</h1>
          <p className="text-gray-300 text-lg mb-8">This area is for authorized personnel only</p>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-red-400" />
              <span className="text-red-300 font-semibold">Security Notice</span>
            </div>
            <p className="text-gray-300 text-sm">
              If you are an administrator, please use the proper access method to reach this area.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show admin login if accessing via admin URL
  return <AdminLogin />;
};

export default AdminAccess;
