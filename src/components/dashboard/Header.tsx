import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineSearch, 
  HiOutlineBell, 
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3); // Example notification count

  const profileMenuItems = [
    {
      icon: <HiOutlineUser className="w-5 h-5" />,
      label: 'My Profile',
      path: '/profile'
    },
    {
      icon: <HiOutlineCog className="w-5 h-5" />,
      label: 'Settings',
      path: '/settings/system'
    },
    {
      icon: <HiOutlineQuestionMarkCircle className="w-5 h-5" />,
      label: 'Help & Support',
      path: '/support'
    },
    {
      icon: <HiOutlineLogout className="w-5 h-5" />,
      label: 'Logout',
      path: '/login'
    }
  ];

  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <HiOutlineBell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.button>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-medium text-sm">RB</span>
              </div>
            </motion.button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Rachid Bouhaya</p>
                    <p className="text-sm text-gray-500 truncate">rachid@gmail.com</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {profileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="text-gray-500">{item.icon}</span>
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;