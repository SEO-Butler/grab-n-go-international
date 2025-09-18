import React from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from './FloatingIcons';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const HeroSection = () => {
  const title = eventConfig.sections.hero.title;
  const isImage = typeof title === 'string' && /\.(png|jpe?g|gif|svg|webp)$/i.test(title);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500"
        animate={{
          background: eventConfig.sections.hero.backgroundGradients.concat([eventConfig.sections.hero.backgroundGradients[0]])
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-lg md:text-xl mb-4 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bon Voyage, Traveler! Your Passport to Flavor is Ready.
        </motion.p>

        {/* Title or Logo */}
        {isImage ? (
          <motion.img
            src={title}
            alt={eventConfig.branding?.name || 'Event logo'}
            className="mx-auto mb-6 w-[85%] max-w-[800px] h-auto drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        ) : (
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {eventConfig.sections.hero.title.split('\n').map((line, index) => (
              <span key={index}>
                {index === 0 ? line : <><br /><span className="text-yellow-300 font-light">{line}</span></>}
              </span>
            ))}
          </motion.h1>
        )}

        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {eventConfig.sections.hero.subtitle}
        </motion.p>

        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-2xl font-semibold">{eventConfig.sections.hero.date}</p>
          <p className="text-lg">{eventConfig.sections.hero.location}</p>
        </motion.div>

        <motion.button
          className="bg-yellow-400 text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.02, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            track('hero_cta_click', { button: eventConfig.sections.hero.ctaText });
            document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >{eventConfig.sections.hero.ctaText}</motion.button>
      </div>
    </section>
  );
};

export default HeroSection;