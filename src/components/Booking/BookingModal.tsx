import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { X, Clock, Calendar, User, Check, AlertCircle } from 'lucide-react';
import { RootState } from '../../store';
import { setBookingModalOpen, addAppointment, setSelectedDate, setSelectedTime } from '../../store/slices/appointmentSlice';
import { useTheme } from '../../contexts/ThemeContext';

interface BookingFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  notes: string;
}

const BookingModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isBookingModalOpen, selectedDate, selectedTime } = useSelector((state: RootState) => state.appointments);
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BookingFormData>();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const services = [
    'General Consultation',
    'Dental Cleaning',
    'Eye Examination',
    'Blood Test',
    'X-Ray',
    'Physical Therapy',
    'Vaccination'
  ];

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(addAppointment({
        id: Date.now().toString(),
        patientId: Date.now().toString(),
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        date: selectedDate,
        time: selectedTime,
        service: data.service,
        notes: data.notes || '',
        status: 'pending'
      }));

      setShowSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        reset();
        dispatch(setBookingModalOpen(false));
        dispatch(setSelectedDate(null));
        dispatch(setSelectedTime(null));
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (isSubmitting) return; // Prevent closing during submission
    
    dispatch(setBookingModalOpen(false));
    dispatch(setSelectedDate(null));
    dispatch(setSelectedTime(null));
    reset();
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  const handleTimeSelect = (time: string) => {
    dispatch(setSelectedTime(time));
  };

  const formData = watch();
  const isFormValid = formData.patientName && formData.patientEmail && formData.patientPhone && formData.service && selectedDate && selectedTime;

  if (showSuccess) {
    return (
      <AnimatePresence>
        <Dialog as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isBookingModalOpen} onClose={() => {}} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-2xl border p-8 text-center shadow-2xl ${
                isDark 
                  ? 'bg-gray-900/90 backdrop-blur-lg border-green-500/30 shadow-green-500/20' 
                  : 'bg-white/90 backdrop-blur-lg border-green-200/50 shadow-green-500/20'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-green-500" />
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Appointment Booked!
              </h3>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Your appointment has been successfully scheduled and is pending approval.
              </p>
            </Dialog.Panel>
          </div>
        </Dialog>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isBookingModalOpen && (
        <Dialog as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isBookingModalOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-4xl rounded-2xl border shadow-2xl my-8 ${
                isDark 
                  ? 'bg-gray-900/90 backdrop-blur-lg border-cyan-500/30 shadow-cyan-500/20' 
                  : 'bg-white/90 backdrop-blur-lg border-blue-200/50 shadow-blue-500/20'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b ${
                isDark ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <Dialog.Title className={`text-2xl font-bold flex items-center space-x-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <Calendar className={`w-6 h-6 ${
                    isDark ? 'text-cyan-400' : 'text-blue-500'
                  }`} />
                  <span>Book Appointment</span>
                </Dialog.Title>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                  } disabled:opacity-50`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Date and Time Selection */}
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Select Date *
                      </label>
                      <div className={`rounded-xl p-4 border ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-700' 
                          : 'bg-gray-50/50 border-gray-200'
                      }`}>
                        <div className={`flex items-center space-x-2 ${
                          isDark ? 'text-cyan-400' : 'text-blue-500'
                        }`}>
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">
                            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'No date selected'}
                          </span>
                        </div>
                        {!selectedDate && (
                          <p className={`text-sm mt-2 flex items-center space-x-1 ${
                            isDark ? 'text-amber-400' : 'text-amber-600'
                          }`}>
                            <AlertCircle className="w-4 h-4" />
                            <span>Please select a date from the calendar first</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-3 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Select Time *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTimeSelect(time)}
                            disabled={!selectedDate}
                            className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                              selectedTime === time
                                ? isDark
                                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                                  : 'bg-blue-500/20 border-blue-500 text-blue-700'
                                : isDark
                                ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-500/50'
                                : 'bg-gray-50/50 border-gray-200 text-gray-700 hover:border-blue-500/50'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <Clock className="w-4 h-4 mx-auto mb-1" />
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Patient Information */}
                  <div className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <input
                          {...register('patientName', { required: 'Full name is required' })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                            isDark 
                              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                              : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                          } ${errors.patientName ? 'border-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.patientName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.patientName.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Address *
                      </label>
                      <input
                        {...register('patientEmail', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        } ${errors.patientEmail ? 'border-red-500' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.patientEmail && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.patientEmail.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone Number *
                      </label>
                      <input
                        {...register('patientPhone', { required: 'Phone number is required' })}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        } ${errors.patientPhone ? 'border-red-500' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.patientPhone && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.patientPhone.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Service *
                      </label>
                      <select
                        {...register('service', { required: 'Service is required' })}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                            : 'bg-white/50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        } ${errors.service ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.service.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Additional Notes
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${
                          isDark 
                            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20' 
                            : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        }`}
                        placeholder="Any additional information or special requirements"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className={`flex items-center justify-between pt-6 mt-8 border-t ${
                  isDark ? 'border-gray-700/50' : 'border-gray-200/50'
                }`}>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    * Required fields
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                      disabled={isSubmitting}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                      } disabled:opacity-50`}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: isFormValid && !isSubmitting ? 1.05 : 1 }}
                      whileTap={{ scale: isFormValid && !isSubmitting ? 0.95 : 1 }}
                      disabled={!isFormValid || isSubmitting}
                      className={`px-8 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center space-x-2 ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-cyan-500/25' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Booking...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Book Appointment</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;