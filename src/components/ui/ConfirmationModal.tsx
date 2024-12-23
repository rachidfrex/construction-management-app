import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';
import { 
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle 
} from 'react-icons/hi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'modals.common.confirm',
  cancelText = 'modals.common.cancel',
  type = 'danger'
}) => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  const colors = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-600',
      bgIcon: 'bg-red-100',
    },
    warning: {
      button: 'bg-yellow-600 hover:bg-yellow-700',
      icon: 'text-yellow-600',
      bgIcon: 'bg-yellow-100',
    },
    info: {
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-600',
      bgIcon: 'bg-green-100',
    },
  };

  const icons = {
    danger: <HiOutlineExclamation className="h-6 w-6" />,
    warning: <HiOutlineExclamationCircle className="h-6 w-6" />,
    info: <HiOutlineInformationCircle className="h-6 w-6" />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all w-full max-w-md mx-auto ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              <div className="p-6">
                <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2.5 rounded-full ${colors[type].bgIcon} ${colors[type].icon}`}>
                    {icons[type]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{t(title)}</h3>
                    <p className="mt-1 text-sm text-gray-500">{t(message)}</p>
                  </div>
                </div>

                <div className={`mt-6 flex gap-3 ${direction === 'rtl' ? 'justify-start' : 'justify-end'}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {t(cancelText)}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${colors[type].button}`}
                  >
                    {t(confirmText)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;