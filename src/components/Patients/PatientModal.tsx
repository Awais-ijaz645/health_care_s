import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { X, User, Mail, Phone, Calendar, MapPin, AlertCircle, Plus } from 'lucide-react';
import { RootState } from '../../store';
import { setPatientModalOpen, addPatient, updatePatient, setSelectedPatient } from '../../store/slices/patientSlice';

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
}

const PatientModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isPatientModalOpen, selectedPatient } = useSelector((state: RootState) => state.patients);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<PatientFormData>();

  useEffect(() => {
    if (selectedPatient) {
      setValue('name', selectedPatient.name);
      setValue('email', selectedPatient.email);
      setValue('phone', selectedPatient.phone);
      setValue('dateOfBirth', selectedPatient.dateOfBirth);
      setValue('address', selectedPatient.address);
      setValue('emergencyContact', selectedPatient.emergencyContact);
      setValue('medicalHistory', selectedPatient.medicalHistory.join(', '));
    } else {
      reset();
    }
  }, [selectedPatient, setValue, reset]);

  const onSubmit = (data: PatientFormData) => {
    const patientData = {
      ...data,
      medicalHistory: data.medicalHistory.split(',').map(item => item.trim()).filter(item => item),
    };

    if (selectedPatient) {
      dispatch(updatePatient({
        ...selectedPatient,
        ...patientData,
      }));
    } else {
      dispatch(addPatient(patientData));
    }

    closeModal();
  };

  const closeModal = () => {
    dispatch(setPatientModalOpen(false));
    dispatch(setSelectedPatient(null));
    reset();
  };

  return (
    <AnimatePresence>
      {isPatientModalOpen && (
        <Dialog as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} open={isPatientModalOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <Dialog.Title className="text-2xl font-bold text-white flex items-center space-x-2">
                  <User className="w-6 h-6 text-cyan-400" />
                  <span>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</span>
                </Dialog.Title>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    <span>Personal Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        {...register('dateOfBirth', { required: 'Date of birth is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>Contact Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone', { required: 'Phone number is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Address *
                      </label>
                      <input
                        {...register('address', { required: 'Address is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter full address"
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emergency Contact *
                      </label>
                      <input
                        {...register('emergencyContact', { required: 'Emergency contact is required' })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Enter emergency contact"
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-400 text-sm mt-1">{errors.emergencyContact.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-cyan-400" />
                    <span>Medical Information</span>
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Medical History
                    </label>
                    <textarea
                      {...register('medicalHistory')}
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                      placeholder="Enter medical conditions separated by commas (e.g., Hypertension, Diabetes, Allergies)"
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      Separate multiple conditions with commas
                    </p>
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
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    {selectedPatient ? 'Update Patient' : 'Add Patient'}
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

export default PatientModal;