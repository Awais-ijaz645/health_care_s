import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Heart, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Stethoscope
} from 'lucide-react';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  const footerLinks = {
    services: [
      { name: 'Patient Management', href: '#' },
      { name: 'Appointment Booking', href: '#' },
      { name: 'Medical Records', href: '#' },
      { name: 'Doctor Scheduling', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const features = [
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Comprehensive healthcare management',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'HIPAA compliant data protection',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
    },
  ];

  return (
    <footer className={`relative mt-20 ${
      isDark 
        ? 'bg-gradient-to-t from-black via-gray-900 to-transparent' 
        : 'bg-gradient-to-t from-gray-100 via-white to-transparent'
    }`}>
      {/* Decorative top border */}
      <div className={`h-px w-full ${
        isDark 
          ? 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
      }`} />
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`text-center p-6 rounded-xl ${
                isDark 
                  ? 'bg-black/20 backdrop-blur-lg border border-gray-700/50' 
                  : 'bg-white/50 backdrop-blur-lg border border-gray-200/50'
              } hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-br from-cyan-500 to-purple-500' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500'
              } group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="relative">
                <Stethoscope className={`w-8 h-8 ${
                  isDark ? 'text-cyan-400' : 'text-blue-500'
                }`} />
                <div className={`absolute inset-0 blur-md opacity-30 ${
                  isDark ? 'bg-cyan-400' : 'bg-blue-500'
                }`}></div>
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r ${
                isDark 
                  ? 'from-cyan-400 to-purple-400' 
                  : 'from-blue-500 to-indigo-500'
              } bg-clip-text text-transparent`}>
                MediCare
              </span>
            </motion.div>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              Advanced healthcare management system providing comprehensive patient care and medical record management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gray-800/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400' 
                      : 'bg-gray-100 hover:bg-blue-500/20 text-gray-600 hover:text-blue-500'
                  } transition-all duration-300`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className={`${
                        isDark 
                          ? 'text-gray-400 hover:text-cyan-400' 
                          : 'text-gray-800 hover:text-blue-500'
                      } transition-colors duration-300 flex items-center group`}
                    >
                      <span className={`w-0 h-px ${
                        isDark ? 'bg-cyan-400' : 'bg-blue-500'
                      } group-hover:w-4 transition-all duration-300 mr-2`}></span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className={`border-t ${
          isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        } pt-8 mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'bg-blue-500/20 text-blue-500'
              }`}>
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Call Us
                </p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                  +1 (555) 123-4567
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-indigo-500/20 text-indigo-500'
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Email Us
                </p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                  support@medicare.com
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-green-500/20 text-green-500'
              }`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Visit Us
                </p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                  123 Healthcare Ave, Medical City
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${
          isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        } pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              &copy; 2024 MediCare. All rights reserved. Built with &hearts; for better healthcare.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className={`${
                  isDark 
                    ? 'text-gray-400 hover:text-cyan-400' 
                    : 'text-gray-800 hover:text-blue-500'
                } transition-colors duration-300`}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className={`${
                  isDark 
                    ? 'text-gray-400 hover:text-cyan-400' 
                    : 'text-gray-800 hover:text-blue-500'
                } transition-colors duration-300`}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className={`${
                  isDark 
                    ? 'text-gray-400 hover:text-cyan-400' 
                    : 'text-gray-800 hover:text-blue-500'
                } transition-colors duration-300`}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute bottom-0 left-1/4 w-32 h-32 ${
          isDark ? 'bg-cyan-500/5' : 'bg-blue-500/5'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-0 right-1/4 w-40 h-40 ${
          isDark ? 'bg-purple-500/5' : 'bg-indigo-500/5'
        } rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>
    </footer>
  );
};

export default Footer;
