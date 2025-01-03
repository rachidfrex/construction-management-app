// src/components/ui/LanguageSwitcher.tsx
import { motion } from 'framer-motion';
import { HiTranslate } from 'react-icons/hi';
import { GB, FR, MA } from 'country-flag-icons/react/3x2';
import { useTranslationContext } from '../../context/TranslationContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useTranslationContext();

  const languages = [
    { 
      code: 'en', 
      label: 'English', 
      flag: <GB className="w-[18px]  h-full rounded-sm " title="English" /> 
    },
    { 
      code: 'fr', 
      label: 'Français', 
      flag: <FR className="w-[18px] h-full  rounded-sm " title="Français" /> 
    },

    { 
      code: 'ar', 
      label: 'العربية', 
      flag: <MA className="w-[18px]  h-full  rounded-sm" title="العربية" /> 
    }
  ];

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 transition-colors"
      >
        <HiTranslate className="w-5 h-full transition-colors" />
        <span className="text-sm  h-full">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </motion.button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ x: 4 }}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-50 transition-colors ${
              language === lang.code ? 'text-green-600 font-medium' : 'text-gray-700'
            }`}
          >
            {lang.flag}
            <span className='font-arabic'>{lang.label}</span>
            {language === lang.code && (
              <motion.div
                layoutId="activeLang"
                className="w-1.5 h-full rounded-full bg-green-600 ml-auto"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;