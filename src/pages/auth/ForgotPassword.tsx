import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useToast } from '../../context/ToastContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { direction } = useTranslationContext();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('warning', t('auth.emailRequired'));
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('success', t('auth.resetLinkSent'));
      setEmail('');

      setTimeout(() => {
        navigate('/reset-password');
      }, 1500); 
    } catch (error) {
      showToast('error', t('common.errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className={`bg-white rounded-2xl shadow-xl p-8 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Back button */}
          <div className="mb-3">
            <Link
              to="/login"
              className="inline-flex items-center text-green-600 hover:text-green-800 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ x: direction === 'rtl' ? 4 : -4 }}
                className="flex items-center gap-2"
              >
                {direction === 'rtl' ? (
                  <IoArrowForward className="text-xl" />
                ) : (
                  <IoArrowBack className="text-xl" />
                )}
                <span className="text-sm font-medium">{t('auth.backToLogin')}</span>
              </motion.div>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.resetPassword')}</h1>
            <p className="text-gray-500 text-xs font-semibold mt-2">
              {t('auth.resetInstructions')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.enterEmail')}
                className="w-full border text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm bg-green-600  text-white rounded-lg py-2 px-4 hover:bg-green-700 transition duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
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
                  <span>{t('common.loading')}</span>
                </div>
              ) : (
                t('auth.resetPassword')
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;