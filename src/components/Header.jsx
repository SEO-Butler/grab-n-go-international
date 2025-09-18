import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { track } from '../lib/analytics';

const { FiMenu, FiX } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);

  // Define explicit anchor targets that exist on the page
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Event Details', id: 'event-details' },
    { label: 'Food Stalls', id: 'food-stalls' },
    { label: 'Tickets', id: 'tickets' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToId = (id) => {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const headerEl = document.getElementById('site-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: targetTop > 0 ? targetTop : 0,
        behavior: 'smooth'
      });
    });
  };

  useEffect(() => {
    if (!isMenuOpen && pendingTarget) {
      scrollToId(pendingTarget);
      setPendingTarget(null);
    }
  }, [isMenuOpen, pendingTarget]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isMenuOpen) {
      // Focus the first menu item when menu opens
      const firstMenuItem = document.querySelector('[data-mobile-menu-item]');
      firstMenuItem?.focus();
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    track('menu_toggle', { opened: !isMenuOpen });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    track('menu_click', { item: item.label });
    setPendingTarget(item.id);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      scrollToId(item.id);
      setPendingTarget(null);
    }
  };

  return (
    <motion.header
      id="site-header"
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/images/Grab n Go logo -t.png"
              alt="Grab 'n Go International Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-900 to-orange-500 bg-clip-text text-transparent" style={{background: 'linear-gradient(to right, #f7931d, #773232, #f7931d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Grab 'n Go
              </h1>
              <p className="text-sm text-gray-600">International</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={handleMenuToggle}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <SafeIcon
              icon={isMenuOpen ? FiX : FiMenu}
              className="w-6 h-6 text-gray-700"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.nav
          id="mobile-menu"
          className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-orange-500 font-medium focus:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-2 py-1"
                onClick={(e) => handleNavClick(e, item)}
                data-mobile-menu-item={index === 0 ? true : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;

