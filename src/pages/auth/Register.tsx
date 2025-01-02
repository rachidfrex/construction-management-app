import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';
import  LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import { HiCheck, HiX } from 'react-icons/hi';
const Register = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      showToast('warning', t('auth.allFieldsRequired'));
      return;
    }

    if (formData.password.length < 6) {
      showToast('warning', t('auth.passwordLength'));
      return;
    }

    if (!formData.email.includes('@')) {
      showToast('warning', t('auth.invalidEmail'));
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('success', t('auth.registerSuccess'));
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      showToast('error', t('auth.registerError'));
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordStrength = (password: string) => {
    const checks = [
      { 
        title: t('auth.passwordChecks.length'), 
        passed: password.length >= 8 
      },
      { 
        title: t('auth.passwordChecks.number'), 
        passed: /\d/.test(password) 
      },
      { 
        title: t('auth.passwordChecks.lower'), 
        passed: /[a-z]/.test(password) 
      },
      { 
        title: t('auth.passwordChecks.upper'), 
        passed: /[A-Z]/.test(password) 
      },
      { 
        title: t('auth.passwordChecks.special'), 
        passed: /[!@#$%^&*]/.test(password) 
      }
    ];
  
    const score = checks.filter(check => check.passed).length;
    
    return {
      strength: 
        score <= 2 ? 'weak' : 
        score <= 3 ? 'medium' :
        score <= 4 ? 'good' :
        'strong',
      score: (score / checks.length) * 100,
      checks
    };
  };
  const passwordStrength = checkPasswordStrength(formData.password);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className=' bg-white rounded-lg  absolute top-4 right-4 shadow-sm '>
          <LanguageSwitcher  />
        </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className={`bg-white rounded-2xl shadow-xl p-8 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t('auth.createAccount')}</h1>
            <p className="text-gray-500 text-xs font-semibold mt-2">{t('auth.startJourney')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.fullName')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('auth.enterFullName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('auth.enterEmail')}
              />
            </div>
          {/* password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
            <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('auth.createPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${
                      direction === 'rtl' ? 'left-3' : 'right-3'
                    }`}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
              </div>
              </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3 , 4].map((index) => (
                          <motion.div
                            key={index}
                            className="h-2 flex-1 rounded-full"
                            style={{
                              backgroundColor: index <= (passwordStrength.score / 100) * 3 
                                ? passwordStrength.strength === 'weak' 
                                  ? '#ef4444' 
                                  : passwordStrength.strength === 'medium'
                                    ? '#eab308'
                                    : '#22c55e'
                                : '#e5e7eb'
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          />
                        ))}
                      </div>
                      
                    </div>

                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {passwordStrength.checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            {check.passed ? (
                              <HiCheck className="w-4 h-4 text-green-500" />
                            ) : (
                              <HiX className="w-4 h-4 text-gray-300" />
                            )}
                          </motion.div>
                          <span className={`text-xs ${check.passed ? 'text-gray-700' : 'text-gray-400'}`}>
                            {check.title}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t('common.loading')}</span>
                </div>
              ) : (
                t('auth.register')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.signInWith')}</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <img 
                  src="https://www.svgrepo.com/show/475656/google-color.svg" 
                  alt="Google" 
                  className={`h-5 w-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} 
                />
                <span className="text-sm font-medium text-gray-700" dir="ltr">Google</span>
              </button>
            </div>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-center text-xs text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              {t('auth.login')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;