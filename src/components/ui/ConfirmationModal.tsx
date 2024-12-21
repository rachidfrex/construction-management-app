import { motion, AnimatePresence } from 'framer-motion';
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

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}: ConfirmationModalProps) => {
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
        <>
          
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed  inset-0  bg-black bg-opacity-50 z-40"
                />

                {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${colors[type].bgIcon} ${colors[type].icon}`}>
                  {icons[type]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {cancelText}
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
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;