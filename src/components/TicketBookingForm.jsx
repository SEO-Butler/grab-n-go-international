import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const { FiUser, FiPhone, FiMapPin, FiCreditCard, FiCheck, FiAlertCircle } = FiIcons;

const TicketBookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellphone: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    useMapLocation: false,
    mapLocation: '',
    ticketType: 'general',
    quantity: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const ticketPlans = eventConfig.sections.tickets.plans;
  const ticketPrices = Object.fromEntries(
    ticketPlans.map(plan => [plan.id, {
      advance: plan.advance,
      gate: plan.gate,
      name: plan.name
    }])
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return ticketPrices[formData.ticketType].advance * formData.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    track('submit_booking_start', { ticketType: formData.ticketType, quantity: formData.quantity });

    // Prepare the JSON payload
    const payload = {
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        cellphone: formData.cellphone
      },
      addressInfo: formData.useMapLocation ? {
        type: 'googleMapsPin',
        mapLocation: formData.mapLocation
      } : {
        type: 'traditional',
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        addressLine3: formData.addressLine3
      },
      ticketInfo: {
        ticketType: formData.ticketType,
        ticketTypeName: ticketPrices[formData.ticketType].name,
        quantity: parseInt(formData.quantity),
        pricePerTicket: ticketPrices[formData.ticketType].advance,
        totalAmount: calculateTotal(),
        gatePrice: ticketPrices[formData.ticketType].gate,
        savings: (ticketPrices[formData.ticketType].gate - ticketPrices[formData.ticketType].advance) * formData.quantity
      },
      eventInfo: {
        eventName: "Grab 'n Go International",
        eventDate: "October 4th, 2025",
        eventLocation: "El Campo Nursery & Recreational Park",
        eventTime: "11:00 AM"
      },
      submissionInfo: {
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    try {
      const response = await fetch('https://n8n-iit-u51337.vm.elestio.app/webhook-test/e60f9b4d-e9c4-4c0c-9fac-6c2aa7d3b161', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      track('submit_booking_success', {
        ticketType: formData.ticketType,
        quantity: formData.quantity,
        total: calculateTotal()
      });

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);

      track('submit_booking_error', {
        error: error.message,
        ticketType: formData.ticketType,
        quantity: formData.quantity
      });

      setIsSubmitting(false);
      setSubmitError(`Failed to submit booking: ${error.message}`);
    }
  };

  if (showSuccess) {
    return (
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <SafeIcon icon={FiCheck} className="w-10 h-10 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Boarding Pass Confirmed! ✈️</h2>
        <p className="text-gray-600 mb-6">
          Your ticket has been booked successfully. Check your email for your digital boarding pass.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
          <div className="text-left space-y-2 text-sm">
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Ticket:</strong> {ticketPrices[formData.ticketType].name}</p>
            <p><strong>Quantity:</strong> {formData.quantity}</p>
            <p><strong>Total:</strong> N${calculateTotal()}</p>
          </div>
        </div>
        <motion.button
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200"
          onClick={() => {
            setShowSuccess(false);
            setFormData({
              firstName: '',
              lastName: '',
              cellphone: '',
              addressLine1: '',
              addressLine2: '',
              addressLine3: '',
              useMapLocation: false,
              mapLocation: '',
              ticketType: 'general',
              quantity: 1
            });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Another Ticket
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-8 text-white text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎫 Book Your Flight to Flavor
        </motion.h2>
        <p className="text-lg opacity-90">Secure your spot at Grab 'n Go International</p>
      </div>

      {/* Pricing Banner */}
      <motion.div 
        className="bg-yellow-400 p-4 text-center text-black font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>🔥 Early Bird Special: N$120 (Save N$30 vs Gate Price N$150)</p>
      </motion.div>

      {/* Error Message */}
      {submitError && (
        <motion.div
          className="bg-red-50 border-l-4 border-red-400 p-4 m-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center">
            <SafeIcon icon={FiAlertCircle} className="text-red-400 mr-2" />
            <p className="text-red-700">{submitError}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Ticket Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <SafeIcon icon={FiCreditCard} className="mr-2" />
            Select Your Ticket
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ticketPrices).map(([key, ticket]) => (
              <motion.label
                key={key}
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  formData.ticketType === key 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="ticketType"
                  value={key}
                  checked={formData.ticketType === key}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800">{ticket.name}</h4>
                  <div className="text-2xl font-bold text-orange-500 mt-2">
                    N${ticket.advance}
                  </div>
                  <p className="text-sm text-gray-500">
                    Gate Price: N${ticket.gate}
                  </p>
                </div>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Quantity Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Tickets
          </label>
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            required
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} Ticket{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <SafeIcon icon={FiUser} className="mr-2" />
            Passenger Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <SafeIcon icon={FiPhone} className="mr-2" />
            Contact Information
          </h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cellphone Number *
            </label>
            <input
              type="tel"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleInputChange}
              placeholder="+264 XX XXX XXXX"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <SafeIcon icon={FiMapPin} className="mr-2" />
            Address Information
          </h3>
          
          {/* Address Type Toggle */}
          <div className="mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="useMapLocation"
                checked={formData.useMapLocation}
                onChange={handleInputChange}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">
                Use Google Maps Location Pin instead of address
              </span>
            </label>
          </div>

          {!formData.useMapLocation ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Street address, P.O. box, company name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  required={!formData.useMapLocation}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address Line 3
                </label>
                <input
                  type="text"
                  name="addressLine3"
                  value={formData.addressLine3}
                  onChange={handleInputChange}
                  placeholder="City, Region, Postal Code"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google Maps Location Pin *
              </label>
              <input
                type="url"
                name="mapLocation"
                value={formData.mapLocation}
                onChange={handleInputChange}
                placeholder="Paste your Google Maps location link here"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                required={formData.useMapLocation}
              />
              <p className="text-sm text-gray-500 mt-2">
                📍 Share your location from Google Maps and paste the link here
              </p>
            </div>
          )}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{ticketPrices[formData.ticketType].name}</span>
              <span>N${ticketPrices[formData.ticketType].advance}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{formData.quantity}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-500">N${calculateTotal()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You save N${(ticketPrices[formData.ticketType].gate - ticketPrices[formData.ticketType].advance) * formData.quantity} vs gate price
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white py-4 rounded-xl text-xl font-bold hover:from-orange-500 hover:via-red-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Your Booking...</span>
            </div>
          ) : (
            `🎫 Book Now - Pay N$${calculateTotal()}`
          )}
        </motion.button>

        <motion.p 
          className="text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          🔒 Secure booking • 📱 Digital tickets • ✈️ Instant confirmation
        </motion.p>
      </form>
    </motion.div>
  );
};

export default TicketBookingForm;