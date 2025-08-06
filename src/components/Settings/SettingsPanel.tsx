import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  Settings, 
  Bell, 
  Clock, 
  Mail, 
  Shield, 
  Palette, 
  Database,
  User,
  Calendar,
  Save,
  RefreshCw
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = React.useState({
    notifications: {
      emailReminders: true,
      smsReminders: false,
      appointmentConfirmations: true,
      systemAlerts: true,
    },
    scheduling: {
      workingHours: {
        start: '09:00',
        end: '17:00',
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      appointmentDuration: 30,
      bufferTime: 15,
    },
    clinic: {
      name: 'MediCare Clinic',
      address: '123 Healthcare Ave, Medical City, MC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@medicare-clinic.com',
      website: 'www.medicare-clinic.com',
    },
    system: {
      autoApproval: false,
      requirePatientVerification: true,
      allowOnlinePayments: true,
      maintenanceMode: false,
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (category: string, subCategory: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subCategory]: {
          ...(prev[category as keyof typeof prev] as any)[subCategory],
          [key]: value
        }
      }
    }));
  };

  const handleArraySettingChange = (category: string, key: string, item: string, checked: boolean) => {
    setSettings(prev => {
      const currentArray = (prev[category as keyof typeof prev] as any)[key] as string[];
      const newArray = checked 
        ? [...currentArray, item]
        : currentArray.filter(i => i !== item);
      
      return {
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [key]: newArray
        }
      };
    });
  };

  const saveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings);
    // Show success notification
  };

  const resetSettings = () => {
    // Reset to default values
    setSettings({
      notifications: {
        emailReminders: true,
        smsReminders: false,
        appointmentConfirmations: true,
        systemAlerts: true,
      },
      scheduling: {
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        appointmentDuration: 30,
        bufferTime: 15,
      },
      clinic: {
        name: 'MediCare Clinic',
        address: '123 Healthcare Ave, Medical City, MC 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@medicare-clinic.com',
        website: 'www.medicare-clinic.com',
      },
      system: {
        autoApproval: false,
        requirePatientVerification: true,
        allowOnlinePayments: true,
        maintenanceMode: false,
      }
    });
  };

  const SettingCard = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-xl"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const Toggle = ({ checked, onChange, label }: { checked: boolean, onChange: (checked: boolean) => void, label: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-cyan-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-gray-400">Configure your clinic management system</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveSettings}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Information */}
        <SettingCard icon={User} title="Clinic Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Clinic Name</label>
              <input
                type="text"
                value={settings.clinic.name}
                onChange={(e) => handleSettingChange('clinic', 'name', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <textarea
                value={settings.clinic.address}
                onChange={(e) => handleSettingChange('clinic', 'address', e.target.value)}
                rows={2}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  value={settings.clinic.phone}
                  onChange={(e) => handleSettingChange('clinic', 'phone', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.clinic.email}
                  onChange={(e) => handleSettingChange('clinic', 'email', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard icon={Bell} title="Notifications">
          <div className="space-y-2">
            <Toggle
              checked={settings.notifications.emailReminders}
              onChange={(checked) => handleSettingChange('notifications', 'emailReminders', checked)}
              label="Email Reminders"
            />
            <Toggle
              checked={settings.notifications.smsReminders}
              onChange={(checked) => handleSettingChange('notifications', 'smsReminders', checked)}
              label="SMS Reminders"
            />
            <Toggle
              checked={settings.notifications.appointmentConfirmations}
              onChange={(checked) => handleSettingChange('notifications', 'appointmentConfirmations', checked)}
              label="Appointment Confirmations"
            />
            <Toggle
              checked={settings.notifications.systemAlerts}
              onChange={(checked) => handleSettingChange('notifications', 'systemAlerts', checked)}
              label="System Alerts"
            />
          </div>
        </SettingCard>

        {/* Scheduling */}
        <SettingCard icon={Clock} title="Scheduling">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                <input
                  type="time"
                  value={settings.scheduling.workingHours.start}
                  onChange={(e) => handleNestedSettingChange('scheduling', 'workingHours', 'start', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                <input
                  type="time"
                  value={settings.scheduling.workingHours.end}
                  onChange={(e) => handleNestedSettingChange('scheduling', 'workingHours', 'end', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Working Days</label>
              <div className="grid grid-cols-2 gap-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.scheduling.workingDays.includes(day)}
                      onChange={(e) => handleArraySettingChange('scheduling', 'workingDays', day, e.target.checked)}
                      className="rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500/20"
                    />
                    <span className="text-gray-300 capitalize">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Appointment Duration (min)</label>
                <input
                  type="number"
                  value={settings.scheduling.appointmentDuration}
                  onChange={(e) => handleSettingChange('scheduling', 'appointmentDuration', parseInt(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Buffer Time (min)</label>
                <input
                  type="number"
                  value={settings.scheduling.bufferTime}
                  onChange={(e) => handleSettingChange('scheduling', 'bufferTime', parseInt(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </SettingCard>

        {/* System Settings */}
        <SettingCard icon={Shield} title="System Settings">
          <div className="space-y-2">
            <Toggle
              checked={settings.system.autoApproval}
              onChange={(checked) => handleSettingChange('system', 'autoApproval', checked)}
              label="Auto-approve Appointments"
            />
            <Toggle
              checked={settings.system.requirePatientVerification}
              onChange={(checked) => handleSettingChange('system', 'requirePatientVerification', checked)}
              label="Require Patient Verification"
            />
            <Toggle
              checked={settings.system.allowOnlinePayments}
              onChange={(checked) => handleSettingChange('system', 'allowOnlinePayments', checked)}
              label="Allow Online Payments"
            />
            <Toggle
              checked={settings.system.maintenanceMode}
              onChange={(checked) => handleSettingChange('system', 'maintenanceMode', checked)}
              label="Maintenance Mode"
            />
          </div>
        </SettingCard>
      </div>
    </div>
  );
};

export default SettingsPanel;