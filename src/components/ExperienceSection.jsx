import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ExperienceSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section id="food-stalls" ref={ref} className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          y,
          opacity,
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Fasten Your Seatbelt – It's Going to Be a 
            <span className="text-yellow-400"> Delicious Ride!</span>
          </h2>
          
          <motion.p
            className="text-lg md:text-xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Imagine checking in at a bustling international terminal... but instead of luggage, 
            you're collecting flavors! At Grab 'n Go International, we transform El Campo into 
            a global food festival. Wander through our curated food stalls, each representing 
            a different destination. Satisfy your cravings with authentic cuisine, then shop 
            for unique finds at our duty-free zone.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            All while enjoying an energetic soundtrack that sets the perfect mood. This isn't 
            just eating; it's an unforgettable adventure for your taste buds.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;