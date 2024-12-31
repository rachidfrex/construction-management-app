import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const handleLogout = () => {
      try {
        // Clear all auth-related data from localStorage
        // localStorage.clear();
        // Or if you want to clear specific items:
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        
        showToast('success', t('auth.logoutSuccess'));
        setTimeout(() => navigate('/login'), 500);
      } catch (error) {
        showToast('error', t('auth.logoutError'));
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate, showToast, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4">
          <svg 
            className="animate-spin text-green-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">
          {t('auth.loggingOut')}
        </p>
      </motion.div>
    </div>
  );
};

export default Logout;
