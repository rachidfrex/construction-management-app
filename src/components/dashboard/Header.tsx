import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { 
  HiOutlineSearch, 
  HiOutlineBell, 
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationContext } from '../../context/TranslationContext';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  path: string;
  icon: JSX.Element;
  label: string;
}

const Header = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of search and profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileMenuItems: MenuItem[] = [
    { path: '/profile', icon: <HiOutlineUser />, label: t('header.profile') },
    { path: '/settings', icon: <HiOutlineCog />, label: t('header.settings') },
    { path: '/help', icon: <HiOutlineQuestionMarkCircle />, label: t('header.help') },
    { path: '/logout', icon: <HiOutlineLogout />, label: t('header.logout') }
  ];

  return (
    <header className={`h-16 bg-white shadow-sm fixed top-0 z-30 transition-all duration-300 ease-in-out
      ${direction === 'rtl' 
        ? 'lg:right-64 right-0' 
        : 'lg:left-64 left-0'} 
      left-0 right-0`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <h2 className="text-xl md:block hidden font-semibold text-gray-800">{t('header.dashboard')}</h2>
        </div>
  
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative">
            <div className="relative">
              <input
                type="text"
                placeholder={t('header.search')}
                className={`w-64 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
              <HiOutlineSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
            </div>
          </div>
  
          {/* Mobile Search */}
          <div className="md:hidden relative" ref={searchRef}>
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 top-1/2 -translate-y-1/2"
                  style={{ 
                    [direction === 'rtl' ? 'right' : 'left']: '-1rem',
                    width: 'calc(100vw - 8rem)'
                  }}
                >
                  <input
                    type="text"
                    placeholder={t('header.search')}
                    className={`w-full py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                    autoFocus
                  />
                  <HiOutlineSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                    direction === 'rtl' ? 'right-3' : 'left-3'
                  }`} />
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
  
          <div className={`flex items-center ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
            <LanguageSwitcher />
            
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <HiOutlineBell className="w-6 h-6 text-gray-600" />
                {notifications > 0 && (
                  <span className={`absolute top-0 transform -translate-y-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                    direction === 'rtl' ? 'left-0 -translate-x-1' : 'right-0 translate-x-1'
                  }`}>
                    {notifications}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
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
                    className={`absolute mt-2 w-56  bg-white rounded-lg shadow-lg py-2 border border-gray-100 ${
                      direction === 'rtl' ? 'left-0': 'right-0' 
                    }`}

                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{t('header.userName')}</p>
                      <p className="text-sm text-gray-500 truncate">{t('header.userEmail')}</p>
                    </div>
                    <div className="py-2">
                      {profileMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <span className="text-gray-500">{item.icon}</span>
                          <span className={`${direction === 'rtl' ? 'mr-3' : 'ml-3'}`}>
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;