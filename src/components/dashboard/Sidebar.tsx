import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiClipboardList, 
  HiShoppingCart, 
  HiDocumentText,
  HiUserGroup,
  HiCog,
  HiBell
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/dashboard', icon: <HiHome className="w-6 h-6" />, title: 'Dashboard' },
  { path: '/inventory/products', icon: <HiClipboardList className="w-6 h-6" />, title: 'Inventory' },
  { path: '/sales/invoices', icon: <HiShoppingCart className="w-6 h-6" />, title: 'Sales' },
  { path: '/projects', icon: <HiDocumentText className="w-6 h-6" />, title: 'Projects' },
  { path: '/users', icon: <HiUserGroup className="w-6 h-6" />, title: 'Users' },
  { path: '/notifications', icon: <HiBell className="w-6 h-6" />, title: 'Notifications' },
  { path: '/settings/system', icon: <HiCog className="w-6 h-6" />, title: 'Settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-semibold text-green-600"> Bouhaja Sarl</h1>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors ${
              location.pathname === item.path ? 'bg-green-50 text-green-600' : ''
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;