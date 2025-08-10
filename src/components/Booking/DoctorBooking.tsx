import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Calendar, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Stethoscope,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { RootState } from '../../store';
import { setSelectedDoctor, setSelectedDate, setSelectedTime, addAppointment } from '../../store/slices/appointmentSlice';
import { useTheme } from '../../contexts/ThemeContext';

const DoctorBooking: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { doctors, selectedDoctor, selectedDate, selectedTime } = useSelector((state: RootState) => state.appointments);
  
  const [step, setStep] = useState(1); // 1: Select Doctor, 2: Select Date/Time, 3: Patient Details, 4: Confirmation
  const [selectedDisease, setSelectedDisease] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleDoctorSelect = (doctor: any) => {
    dispatch(setSelectedDoctor(doctor));
    setStep(2);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    dispatch(setSelectedDate(date));
    dispatch(setSelectedTime(time));
    setStep(3);
  };

  const handleBookingSubmit = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const appointment = {
        patientId: Date.now().toString(),
        doctorId: selectedDoctor.id,
        patientName: patientDetails.name,
        patientEmail: patientDetails.email,
        patientPhone: patientDetails.phone,
        doctorName: selectedDoctor.name,
        date: selectedDate,
        time: selectedTime,
        service: selectedDoctor.specialization,
        disease: selectedDisease,
        notes: patientDetails.notes,
        status: 'pending' as const
      };
      
      dispatch(addAppointment(appointment));
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        dispatch(setSelectedDoctor(null));
        dispatch(setSelectedDate(null));
        dispatch(setSelectedTime(null));
        setPatientDetails({ name: '', email: '', phone: '', notes: '' });
        setSelectedDisease('');
      }, 3000);
    }
  };

  const getAvailableSlots = (day: string) => {
    if (!selectedDoctor) return [];
    const daySchedule = selectedDoctor.availability.find((avail: any) => avail.day === day);
    return daySchedule ? daySchedule.slots : [];
  };

  const getDayName = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (showSuccess) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-success-50 to-primary-50 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl text-center max-w-md mx-4">
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Appointment Booked!
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Your appointment with {selectedDoctor?.name} has been successfully scheduled for {selectedDate} at {selectedTime}.
          </motion.p>
          
          <motion.div
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            You will receive a confirmation email shortly.
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
                    step > stepNum ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {step === 1 && 'Select Doctor'}
                {step === 2 && 'Choose Date & Time'}
                {step === 3 && 'Patient Details'}
                {step === 4 && 'Confirmation'}
              </h2>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 cursor-pointer group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="relative mb-6">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold">
                        {doctor.specialization}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Award className="w-4 h-4 mr-2" />
                          <span className="text-sm">{doctor.experience} years exp.</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {doctor.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{doctor.phone}</span>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{doctor.email}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specializes in:</h4>
                      <div className="flex flex-wrap gap-2">
                        {doctor.diseases.slice(0, 3).map((disease, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {disease}
                          </span>
                        ))}
                        {doctor.diseases.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{doctor.diseases.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Select Doctor
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && selectedDoctor && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Book with {selectedDoctor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Select your preferred date and time
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Available Dates */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Dates</h4>
                    <div className="space-y-3">
                      {getNextWeekDates().map((date) => {
                        const dayName = getDayName(date);
                        const slots = getAvailableSlots(dayName);
                        const isAvailable = slots.length > 0;
                        
                        return (
                          <motion.div
                            key={date}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              selectedDate === date
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : isAvailable
                                ? 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-400'
                                : 'border-gray-100 dark:border-gray-700 opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => isAvailable && dispatch(setSelectedDate(date))}
                            whileHover={isAvailable ? { scale: 1.02 } : {}}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {new Date(date).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {isAvailable ? `${slots.length} slots available` : 'No slots available'}
                                </p>
                              </div>
                              {selectedDate === date && (
                                <Check className="w-6 h-6 text-primary-500" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Times */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Times</h4>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {getAvailableSlots(getDayName(selectedDate)).map((time) => (
                          <motion.button
                            key={time}
                            className={`p-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                              selectedTime === time
                                ? 'border-primary-500 bg-primary-500 text-white shadow-lg'
                                : 'border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-primary-300 dark:hover:border-primary-400'
                            }`}
                            onClick={() => dispatch(setSelectedTime(time))}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        Please select a date first
                      </p>
                    )}
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <motion.div 
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={() => setStep(3)}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                    >
                      Continue to Patient Details
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Patient Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please provide your details for the appointment
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={patientDetails.email}
                      onChange={(e) => setPatientDetails({...patientDetails, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={patientDetails.phone}
                      onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Health Concern
                    </label>
                    <select
                      value={selectedDisease}
                      onChange={(e) => setSelectedDisease(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                    >
                      <option value="">Select your health concern</option>
                      {selectedDoctor?.diseases.map((disease) => (
                        <option key={disease} value={disease}>{disease}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={patientDetails.notes}
                      onChange={(e) => setPatientDetails({...patientDetails, notes: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                      placeholder="Any additional information or symptoms..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setStep(4)}
                    disabled={!patientDetails.name || !patientDetails.email || !patientDetails.phone}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center disabled:cursor-not-allowed"
                  >
                    Review Booking
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Confirm Your Appointment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please review your booking details
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={selectedDoctor?.image} 
                        alt={selectedDoctor?.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {selectedDoctor?.name}
                        </h4>
                        <p className="text-primary-600 dark:text-primary-400">
                          {selectedDoctor?.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(selectedDate!).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-300">Time</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Patient Details</h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Name:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{patientDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Email:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{patientDetails.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{patientDetails.phone}</span>
                      </div>
                      {selectedDisease && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Health Concern:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{selectedDisease}</span>
                        </div>
                      )}
                      {patientDetails.notes && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-300">Notes:</span>
                          <p className="font-semibold text-gray-900 dark:text-white mt-1">{patientDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => setStep(3)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300"
                  >
                    Back to Edit
                  </button>
                  <motion.button
                    onClick={handleBookingSubmit}
                    className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Booking
                    <Check className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorBooking;
