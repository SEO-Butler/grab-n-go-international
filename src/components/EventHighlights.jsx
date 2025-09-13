import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { eventConfig } from '../config/event';
import { track } from '../lib/analytics';

const EventHighlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const highlights = eventConfig.sections.highlights;

  return (
    <section id="event-details" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What's On Board?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="group perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onViewportEnter={() => track('view_section', { section: 'highlights', item: highlight.title })}
            >
              <div className="relative w-full h-64 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-orange-300 transition-all duration-300">
                  <div className="text-6xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4 filter brightness-150">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{highlight.title}</h3>
                  <p className="text-white text-lg font-medium">{highlight.hoverText}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;