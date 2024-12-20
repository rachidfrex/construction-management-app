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

interface MenuItem {
  path: string;
  icon: JSX.Element;
  label: string;
}

const profileMenuItems: MenuItem[] = [
  { path: '/profile', icon: <HiOutlineUser />, label: 'Profile' },
  { path: '/settings', icon: <HiOutlineCog />, label: 'Settings' },
  { path: '/help', icon: <HiOutlineQuestionMarkCircle />, label: 'Help' },
  { path: '/logout', icon: <HiOutlineLogout />, label: 'Logout' },
];

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className={`h-16 bg-white shadow-sm fixed top-0 z-30 transition-all duration-300 ease-in-out
      right-0 left-0 lg:left-64`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800 lg:ml-0 ml-12">Dashboard</h2>
        </div>
        

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden relative">
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  style={{ zIndex: 1000 }}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <HiOutlineSearch className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <HiOutlineSearch className="w-6 h-6 text-gray-600" />
                </motion.button>
              )}
            </AnimatePresence>
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