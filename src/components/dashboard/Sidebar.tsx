// src/components/dashboard/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
    HiHome, 
    HiClipboardList, 
    HiShoppingCart, 
    HiDocumentText,
    HiUserGroup,
    HiCog,
    HiBell,
    HiLogout,
    HiMenu,
    HiX,
    HiOutlineCube
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';

const Sidebar = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { 
      title: t('sidebar.main'),
      items: [
        { path: '/dashboard', icon: <HiHome className="w-5 h-5" />, title: t('sidebar.dashboard') },
        { path: '/projects', icon: <HiDocumentText className="w-5 h-5" />, title: t('sidebar.projects') }
      ]
    },
    {
      title: t('sidebar.management'),
      items: [
        { path: '/inventory', icon: <HiOutlineCube className="w-5 h-5" />, title: t('sidebar.inventory') },
        { path: '/sales', icon: <HiShoppingCart className="w-5 h-5" />, title: t('sidebar.sales') }
      ]
    },
    {
      title: t('sidebar.system'),
      items: [
        { path: '/users', icon: <HiUserGroup className="w-5 h-5" />, title: t('sidebar.users') },
        { path: '/notifications', icon: <HiBell className="w-5 h-5" />, title: t('sidebar.notifications') },
        { path: '/settings', icon: <HiCog className="w-5 h-5" />, title: t('sidebar.settings') }
      ]
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden fixed top-4 z-40 p-2 rounded-lg bg-white shadow-lg ${
          direction === 'rtl' ? 'right-4' : 'left-4'
        }`}
      >
        {isSidebarOpen ? (
          <HiX className="w-6 h-6 text-gray-600" />
        ) : (
          <HiMenu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={`fixed top-0 h-screen w-64 bg-white shadow-xl z-40 transition-all duration-300 ease-in-out
          ${direction === 'rtl' ? 'right-0' : 'left-0'}
          ${isSidebarOpen 
            ? 'translate-x-0' 
            : direction === 'rtl' 
              ? 'translate-x-full' 
              : '-translate-x-full'
          } 
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 text-transparent bg-clip-text">
              {t('common.appName')}
            </h1>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto py-6 px-4">
          {menuItems.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                {group.title}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
                        ${isActive 
                          ? 'bg-green-50 text-green-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}
                      >
                        {item.icon}
                      </motion.div>
                      <span className={`font-medium text-sm ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                        {item.title}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-green-600 ml-auto"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="border-t border-gray-100 p-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <HiLogout className="w-5 h-5 text-gray-400" />
            <span className={`font-medium text-sm ${direction === 'rtl' ? 'font-arabic' : ''}`}>
              {t('common.logout')}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;