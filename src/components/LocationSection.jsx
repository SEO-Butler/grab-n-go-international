import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { mapsSearchUrl, mapsDirectionsUrl } from '../utils/maps';
import { track } from '../lib/analytics';

const LocationSection = () => {
  const location = eventConfig.sections.location;
  const { coords } = location;

  const googleMapsUrl = mapsSearchUrl(coords.lat, coords.lng);
  const directionsUrl = mapsDirectionsUrl(coords.lat, coords.lng);

  return (
    <section id="contact" className="py-20" style={{backgroundColor: '#ffffff'}}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#b14724'}}>
            {location.title}
          </h2>
          <p className="text-xl" style={{color: '#193818'}}>
            Head to {location.description} for your adventure!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div 
                className="h-80 relative flex items-center justify-center"
                style={{background: 'linear-gradient(135deg, #b14724 0%, #193818 100%)'}}
              >
                {/* Interactive Map Link */}
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center text-white hover:bg-black/20 transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => track('maps_click', { type: 'location_view', coords })}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      📍
                    </motion.div>
                    <p className="text-xl font-semibold">El Campo Location</p>
                    <p className="text-sm opacity-90 mb-2">Click to view in Google Maps</p>
                    <div className="bg-black/20 rounded-lg px-3 py-1 text-xs font-mono">
                      {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                    </div>
                  </div>
                </motion.a>

                {/* Animated Pin Drop */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ y: -100, scale: 0 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-4 h-4 rounded-full animate-pulse" style={{backgroundColor: '#f7931d'}}></div>
                </motion.div>

                {/* Ripple Effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 3, opacity: [0, 0.5, 0] }}
                  transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                >
                  <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'rgba(247, 147, 29, 0.3)'}}></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#b14724'}}>Event Details</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(177, 71, 36, 0.1)'}}>
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#b14724'}}>Location</p>
                    <p style={{color: '#193818'}}>{location.description}</p>
                    <p className="text-xs font-mono" style={{color: '#10300f'}}>
                      {coords.lat}, {coords.lng}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(25, 56, 24, 0.1)'}}>
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#b14724'}}>Boarding Time</p>
                    <p style={{color: '#193818'}}>{location.eventTime}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(177, 71, 36, 0.15)'}}>
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#b14724'}}>Date</p>
                    <p style={{color: '#193818'}}>{location.eventDate}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(16, 48, 15, 0.1)'}}>
                    <span className="text-2xl">🚗</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#b14724'}}>Parking</p>
                    <p style={{color: '#193818'}}>{location.parkingInfo}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="rounded-2xl p-6 text-center"
              style={{background: 'linear-gradient(135deg, #b14724 0%, #193818 100%)'}}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-xl font-bold text-white mb-2">Need Directions?</h4>
              <p className="text-white/90 mb-4">Get turn-by-turn directions to the venue</p>
              <div className="flex gap-3 justify-center">
                <motion.a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full font-semibold transition-colors"
                  style={{backgroundColor: '#10300f', color: 'white'}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => track('maps_directions_click', { coords })}
                >
                  Get Directions
                </motion.a>
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  style={{color: '#b14724'}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => track('maps_click', { type: 'view_on_map', coords })}
                >
                  View on Map
                </motion.a>
              </div>
            </motion.div>

            {/* Additional Location Info */}
            <motion.div
              className="p-4 rounded-r-lg"
              style={{
                backgroundColor: 'rgba(177, 71, 36, 0.05)',
                borderLeft: '4px solid #b14724'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-2" style={{color: '#b14724'}}>📍 Exact Coordinates</h4>
              <p className="text-sm" style={{color: '#193818'}}>
                Latitude: {coords.lat}<br />
                Longitude: {coords.lng}
              </p>
              <p className="text-xs mt-2" style={{color: '#10300f'}}>
                Perfect for GPS navigation and ride-sharing apps
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;