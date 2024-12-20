import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
  HiX
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';


const menuItems = [
  { 
    title: 'Main',
    items: [
      { path: '/dashboard', icon: <HiHome className="w-5 h-5" />, title: 'Dashboard' },
      { path: '/projects', icon: <HiDocumentText className="w-5 h-5" />, title: 'Projects' }
    ]
  },
  {
    title: 'Management',
    items: [
      { path: '/inventory/products', icon: <HiClipboardList className="w-5 h-5" />, title: 'Inventory' },
      { path: '/sales/invoices', icon: <HiShoppingCart className="w-5 h-5" />, title: 'Sales' }
    ]
  },
  {
    title: 'System',
    items: [
      { path: '/users', icon: <HiUserGroup className="w-5 h-5" />, title: 'Users' },
      { path: '/notifications', icon: <HiBell className="w-5 h-5" />, title: 'Notifications' },
      { path: '/settings/system', icon: <HiCog className="w-5 h-5" />, title: 'Settings' }
    ]
  }
];

const Sidebar = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <>
        {/* Mobile Menu Button */}
        <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isSidebarOpen ? (
          <HiX className="w-6 h-6 text-gray-600" />
        ) : (
          <HiMenu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay - only visible on mobile when sidebar is open */}
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
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -100 + '%',
        }}
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-xl z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
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
                Bouhaja Sarl
              </h1>
            </motion.div>
          </div>
  
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
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
                        <span className="font-medium text-sm">{item.title}</span>
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
              <span className="font-medium text-sm">Logout</span>
            </motion.button>
          </div>
        </motion.div>
      </>
    );
  };

export default Sidebar;