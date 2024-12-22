// src/context/TranslationContext.tsx
import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationContextType {
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
  direction: 'ltr' | 'rtl';
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    document.documentElement.lang = lang; // Add this line
  };

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, []);

  return (
    <TranslationContext.Provider 
      value={{ 
        language: i18n.language, 
        changeLanguage,
        direction 
      }}
    >
      <div dir={direction}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};