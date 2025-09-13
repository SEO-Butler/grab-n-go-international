import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const FinalCTA = () => {
  const finalCta = eventConfig.sections.finalCta;

  return (
    <section className="py-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {finalCta.title}
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {finalCta.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-white text-black px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors duration-200 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => {
                track('final_cta_click', { button: finalCta.button });
                document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {finalCta.button}
            </motion.button>

            <motion.div
              className="text-white/80 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {finalCta.features.map((feature, index) => (
                <p key={index}>{feature}</p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-8 bg-black/20 rounded-xl p-4 inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white font-semibold">
              {finalCta.offer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;