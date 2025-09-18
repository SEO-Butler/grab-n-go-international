import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TicketBookingForm from './TicketBookingForm';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const TicketSection = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const tickets = eventConfig.sections.tickets.plans.map(plan => ({
    type: plan.name,
    price: `N$${plan.advance}.00`,
    gatePrice: `N$${plan.gate}.00`,
    features: plan.features,
    popular: plan.popular
  }));

  if (showBookingForm) {
    return (
      <section id="tickets" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setShowBookingForm(false)}
              className="text-orange-500 hover:text-orange-600 font-medium mb-4 inline-flex items-center"
            >
              ← Back to Ticket Options
            </button>
          </motion.div>
          <TicketBookingForm />
        </div>
      </section>
    );
  }

  return (
    <section id="tickets" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Flight to Flavor
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Secure your spot on this culinary journey! Tickets are limited, so book now.
          </p>
          
          {/* Pricing Alert */}
          <motion.div
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full shadow-lg mb-8"
            animate={{
              boxShadow: [
                "0 4px 6px rgba(0,0,0,0.1)",
                "0 8px 15px rgba(0,0,0,0.2)",
                "0 4px 6px rgba(0,0,0,0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-bold">🔥 SAVE N$30! Advance Booking vs Gate Price</span>
          </motion.div>

          {/* Boarding Pass Animation */}
          <motion.div
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg"
            animate={{
              boxShadow: [
                "0 4px 6px rgba(0,0,0,0.1)",
                "0 8px 15px rgba(0,0,0,0.2)",
                "0 4px 6px rgba(0,0,0,0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono">FLIGHT: GRAB & GO ✈️ BOARDING NOW</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tickets.map((ticket, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 ${
                ticket.popular ? 'border-yellow-400' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              {ticket.popular && (
                <motion.div
                  className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-2 rounded-bl-2xl font-bold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  👑 MOST POPULAR
                </motion.div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {ticket.type}
                </h3>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    {ticket.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="line-through">Gate Price: {ticket.gatePrice}</span>
                    <span className="text-green-600 font-semibold ml-2">
                      Save N${parseInt(ticket.gatePrice.replace('N$', '')) - parseInt(ticket.price.replace('N$', ''))}!
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {ticket.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => {
                    track('open_booking', { ticketType: ticket.type });
                    setShowBookingForm(true);
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    ticket.popular
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  BOOK THIS TICKET
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Place your order, we will call them to make free delivery around Windhoek.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto rounded-r-lg">
            <p className="text-yellow-800 font-semibold">
              ⚠️ Limited seats available! Gate prices are N$30 higher than advance booking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TicketSection;