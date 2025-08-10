import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';
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
  RefreshCw,
  Building,
  Phone,
  Globe,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const { isDark } = useTheme();
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

  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

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

  const saveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Saving settings:', settings);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
        isDark 
          ? 'bg-black/30 backdrop-blur-lg border-gray-700/50 hover:shadow-2xl hover:shadow-cyan-500/10' 
          : 'bg-white/70 backdrop-blur-lg border-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10'
      }`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-3 rounded-xl ${
            isDark 
              ? 'bg-cyan-500/20 border border-cyan-500/30' 
              : 'bg-blue-500/20 border border-blue-500/30'
          }`}
        >
          <Icon className={`w-6 h-6 ${
            isDark ? 'text-cyan-400' : 'text-blue-500'
          }`} />
        </motion.div>
        <h3 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );

  const Toggle = ({ checked, onChange, label }: { checked: boolean, onChange: (checked: boolean) => void, label: string }) => (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-opacity-50 transition-all"
    >
      <span className={`font-medium ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          checked 
            ? isDark 
              ? 'bg-cyan-500 focus:ring-cyan-500' 
              : 'bg-blue-500 focus:ring-blue-500'
            : isDark 
              ? 'bg-gray-600 focus:ring-gray-500' 
              : 'bg-gray-300 focus:ring-gray-400'
        }`}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
        />
      </motion.button>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className={`text-3xl font-bold flex items-center space-x-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <Settings className={`w-8 h-8 ${
              isDark ? 'text-cyan-400' : 'text-blue-500'
            }`} />
            <span>Settings</span>
          </h2>
          <p className={`mt-1 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Configure your healthcare system preferences
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSettings}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 border border-gray-600/50' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveSettings}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-medium shadow-lg transition-all duration-300 ${
              saveSuccess
                ? 'bg-green-500 text-white'
                : isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
            } ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
            ) : saveSuccess ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Notification Settings */}
        <motion.div variants={itemVariants}>
          <SettingCard icon={Bell} title="Notification Settings">
            <div className="space-y-1">
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
        </motion.div>

        {/* Clinic Information */}
        <motion.div variants={itemVariants}>
          <SettingCard icon={Building} title="Clinic Information">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={settings.clinic.name}
                  onChange={(e) => handleSettingChange('clinic', 'name', e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                      : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Address
                </label>
                <textarea
                  value={settings.clinic.address}
                  onChange={(e) => handleSettingChange('clinic', 'address', e.target.value)}
                  rows={3}
                  className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 resize-none ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                      : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.clinic.phone}
                    onChange={(e) => handleSettingChange('clinic', 'phone', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.clinic.email}
                    onChange={(e) => handleSettingChange('clinic', 'email', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
              </div>
            </div>
          </SettingCard>
        </motion.div>

        {/* Scheduling Settings */}
        <motion.div variants={itemVariants}>
          <SettingCard icon={Clock} title="Scheduling Settings">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings.scheduling.workingHours.start}
                    onChange={(e) => handleNestedSettingChange('scheduling', 'workingHours', 'start', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings.scheduling.workingHours.end}
                    onChange={(e) => handleNestedSettingChange('scheduling', 'workingHours', 'end', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Working Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <motion.label 
                      key={day} 
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all ${
                        settings.scheduling.workingDays.includes(day)
                          ? isDark 
                            ? 'bg-cyan-500/20 border border-cyan-500/30' 
                            : 'bg-blue-500/20 border border-blue-500/30'
                          : isDark 
                            ? 'bg-gray-800/30 border border-gray-700/30 hover:bg-gray-800/50' 
                            : 'bg-gray-100/30 border border-gray-200/30 hover:bg-gray-100/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={settings.scheduling.workingDays.includes(day)}
                        onChange={(e) => handleArraySettingChange('scheduling', 'workingDays', day, e.target.checked)}
                        className={`rounded border-2 focus:ring-2 focus:ring-offset-2 ${
                          isDark 
                            ? 'border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500/20' 
                            : 'border-gray-300 bg-white text-blue-500 focus:ring-blue-500/20'
                        }`}
                      />
                      <span className={`text-sm font-medium capitalize ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {day.slice(0, 3)}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Appointment Duration (min)
                  </label>
                  <input
                    type="number"
                    value={settings.scheduling.appointmentDuration}
                    onChange={(e) => handleSettingChange('scheduling', 'appointmentDuration', parseInt(e.target.value))}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Buffer Time (min)
                  </label>
                  <input
                    type="number"
                    value={settings.scheduling.bufferTime}
                    onChange={(e) => handleSettingChange('scheduling', 'bufferTime', parseInt(e.target.value))}
                    className={`w-full border rounded-xl px-4 py-3 transition-all focus:ring-2 focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20' 
                        : 'bg-white/50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
              </div>
            </div>
          </SettingCard>
        </motion.div>

        {/* System Settings */}
        <motion.div variants={itemVariants}>
          <SettingCard icon={Shield} title="System Settings">
            <div className="space-y-1">
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
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-opacity-50 transition-all"
              >
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Maintenance Mode
                  </span>
                  {settings.system.maintenanceMode && (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSettingChange('system', 'maintenanceMode', !settings.system.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    settings.system.maintenanceMode 
                      ? 'bg-amber-500 focus:ring-amber-500'
                      : isDark 
                        ? 'bg-gray-600 focus:ring-gray-500' 
                        : 'bg-gray-300 focus:ring-gray-400'
                  }`}
                >
                  <motion.span
                    animate={{ x: settings.system.maintenanceMode ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                  />
                </motion.button>
              </motion.div>
            </div>
          </SettingCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPanel;