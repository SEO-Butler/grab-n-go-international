import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { eventConfig } from '../config/event';

const { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone } = FiIcons;

const Footer = () => {
  const contact = eventConfig.sections.contact;

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: '#' },
    { icon: FiInstagram, label: 'Instagram', href: '#' },
    { icon: FiTwitter, label: 'Twitter', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contact Us</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <SafeIcon icon={FiMail} className="text-yellow-400" />
                <span>{contact.email}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <SafeIcon icon={FiPhone} className="text-yellow-400" />
                <span>{contact.phone}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 mt-4">{contact.socialHandle}</p>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Legal</h3>
            <div className="space-y-2">
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Terms & Conditions
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Refund Policy
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">
            Event details subject to change. Offer valid only during the Grab & Go Event on October 4th, 2025.
          </p>
          <p className="text-gray-400">
            © 2025 Grab 'n Go International. All rights reserved.
          </p>
          
          <motion.div
            className="mt-6 text-yellow-400"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <p className="text-sm">✈️ See you at the terminal! ✈️</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;