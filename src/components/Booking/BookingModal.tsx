import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { X, Clock, Calendar, User } from 'lucide-react';
import { RootState } from '../../store';
import { setBookingModalOpen, addAppointment, setSelectedDate, setSelectedTime } from '../../store/slices/appointmentSlice';

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
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

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

  const onSubmit = (data: BookingFormData) => {
    if (selectedDate && selectedTime) {
      dispatch(addAppointment({
        patientId: Date.now().toString(),
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        date: selectedDate,
        time: selectedTime,
        service: data.service,
        notes: data.notes,
        status: 'pending'
      }));

      reset();
      dispatch(setBookingModalOpen(false));
      dispatch(setSelectedDate(null));
      dispatch(setSelectedTime(null));
    }
  };

  const closeModal = () => {
    dispatch(setBookingModalOpen(false));
    dispatch(setSelectedDate(null));
    dispatch(setSelectedTime(null));
    reset();
  };

  return (
    <AnimatePresence>
      {isBookingModalOpen && (
        <Dialog as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isBookingModalOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <Dialog.Title className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                  <span>Book Appointment</span>
                </Dialog.Title>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Selected Date
                    </label>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="flex items-center space-x-2 text-cyan-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">{selectedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => (
                        <motion.button
                          key={time}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => dispatch(setSelectedTime(time))}
                          className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    <span>Patient Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('patientName', { required: 'Name is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter patient name"
                      />
                      {errors.patientName && (
                        <p className="text-red-400 text-sm mt-1">{errors.patientName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('patientEmail', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter email address"
                      />
                      {errors.patientEmail && (
                        <p className="text-red-400 text-sm mt-1">{errors.patientEmail.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register('patientPhone', { required: 'Phone number is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter phone number"
                      />
                      {errors.patientPhone && (
                        <p className="text-red-400 text-sm mt-1">{errors.patientPhone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service *
                      </label>
                      <select
                        {...register('service', { required: 'Service is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={3}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                      placeholder="Any additional information or special requirements"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700/50">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedTime}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Book Appointment
                  </motion.button>
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