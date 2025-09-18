import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const { FiUser, FiPhone, FiMapPin, FiCreditCard, FiCheck, FiAlertCircle } = FiIcons;

const bookingEndpoint = (import.meta.env.VITE_FORM_ENDPOINT || '').trim();

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

  const isConfigured = Boolean(bookingEndpoint);

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

    if (!isConfigured) {
      setSubmitError('Booking endpoint missing. Set VITE_FORM_ENDPOINT in your .env file to enable submissions.');
      return;
    }

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
        quantity: parseInt(formData.quantity, 10),
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
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        origin: window.location.origin
      }
    };

    try {
      const response = await fetch(bookingEndpoint, {
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

      let result = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (parseError) {
          if (import.meta.env.DEV) {
            console.warn('Booking endpoint returned non-JSON payload:', parseError);
          }
        }
      }

      if (import.meta.env.DEV) {
        console.log('Form submitted successfully:', result || {});
      }

      track('submit_booking_success', {
        ticketType: formData.ticketType,
        quantity: formData.quantity,
        total: calculateTotal()
      });

      setIsSubmitting(false);
      setShowSuccess(true);
      setSubmitError('');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error);
      }

      track('submit_booking_error', {
        error: error.message,
        ticketType: formData.ticketType,
        quantity: formData.quantity
      });

      setIsSubmitting(false);
      const isCors = error instanceof TypeError && error.message === 'Failed to fetch';
      const message = isCors
        ? `Unable to reach ${bookingEndpoint}. The browser blocked the request (likely CORS). Allow ${window.location.origin} on the booking service or proxy the request through your hosting platform.`
        : `Failed to submit booking: ${error.message}`;
      setSubmitError(message);
    }
  };

  if (!isConfigured) {
    return (
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking endpoint not configured</h2>
        <p className="text-gray-600 mb-4">
          Define <code className="font-mono">VITE_FORM_ENDPOINT</code> in your environment configuration so submissions can reach your webhook or API handler.
        </p>
        <p className="text-gray-500 text-sm">
          Example: <code className="font-mono">VITE_FORM_ENDPOINT=https://your-domain.com/api/bookings</code>
        </p>
        {submitError && (
          <p className="text-red-600 text-sm mt-4">{submitError}</p>
        )}
      </motion.div>
    );
  }

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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Boarding Pass Confirmed! ??</h2>
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Reserve Your Boarding Pass
        </motion.h2>
        <p className="text-lg text-white/80">
          Secure your entry to Grab 'n Go International in just a few steps.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <SafeIcon icon={FiUser} className="text-orange-500" /> Passenger Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-600">First Name</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                placeholder="Jane"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-600">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                placeholder="Doe"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <SafeIcon icon={FiPhone} className="text-orange-500" />
              Cellphone Number
            </span>
            <input
              type="tel"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleInputChange}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
              placeholder="+264 81 234 5678"
            />
          </label>
        </div>

        {/* Ticket Selection */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <SafeIcon icon={FiCreditCard} className="text-orange-500" /> Boarding Options
          </h3>

          <label className="block">
            <span className="text-sm text-gray-600">Ticket Type</span>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
            >
              {ticketPlans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} — N${plan.advance}.00 advance / N${plan.gate}.00 gate
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Number of Tickets</span>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
            />
          </label>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Total Fare</h4>
            <p className="text-3xl font-bold text-orange-500">N${calculateTotal()}</p>
            <p className="text-sm text-green-600 mt-1">
              You save N${(ticketPrices[formData.ticketType].gate - ticketPrices[formData.ticketType].advance) * formData.quantity} compared to gate price
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <SafeIcon icon={FiMapPin} className="text-orange-500" /> Delivery Details
          </h3>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="useMapLocation"
              checked={formData.useMapLocation}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            <span className="text-sm text-gray-700">Use Google Maps location instead of manual address</span>
          </label>

          {formData.useMapLocation ? (
            <label className="block">
              <span className="text-sm text-gray-600">Google Maps Location Link</span>
              <input
                type="url"
                name="mapLocation"
                value={formData.mapLocation}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                placeholder="https://maps.google.com/..."
              />
            </label>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm text-gray-600">Address Line 1</span>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="Street Address"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Address Line 2</span>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="Apartment, suite, etc."
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Address Line 3</span>
                <input
                  type="text"
                  name="addressLine3"
                  value={formData.addressLine3}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                  placeholder="City / Region"
                />
              </label>
            </div>
          )}
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <SafeIcon icon={FiAlertCircle} className="mt-1 text-red-500" />
              <div>
                <p className="font-semibold">We couldn't complete your booking</p>
                <p>{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="lg:col-span-2 flex flex-col md:flex-row items-center md:justify-between gap-4">
          <p className="text-sm text-gray-500">
            ?? Secure booking • ?? Digital tickets • ?? Instant confirmation
          </p>
          <motion.button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Confirm Booking'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TicketBookingForm;
