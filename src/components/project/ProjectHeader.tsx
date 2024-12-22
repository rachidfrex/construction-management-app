// src/components/project/ProjectHeader.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HiOutlinePlus,
  HiOutlineDownload,
  HiOutlineUpload,
  HiOutlineRefresh
} from 'react-icons/hi';

export const ProjectHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 mt-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section - Title and Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">{t('projects.title')}</h1>
          <p className="text-gray-600 text-xs font-semibold mt-2">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* New Project Button */}
          <Link to="/projects/new">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <HiOutlinePlus className="w-5 h-5" />
              <span className="text-sm font-medium">{t('projects.newProject')}</span>
            </motion.button>
          </Link>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            <HiOutlineDownload className="w-5 h-5" />
            <span className="text-sm font-medium">{t('projects.actions.export')}</span>
          </motion.button>

          {/* Import Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            <HiOutlineUpload className="w-5 h-5" />
            <span className="text-sm font-medium">{t('projects.actions.import')}</span>
          </motion.button>

          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            title={t('common.refresh')}
          >
            <HiOutlineRefresh className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Optional: Description or additional content */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">{t('projects.quickAccess')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('projects.quickAccessDescription')}</p>
          </div>
          <div className="flex gap-2">
            <Link 
              to="/projects?status=in-progress" 
              className="text-sm text-green-600 hover:text-green-700"
            >
              {t('projects.status.inprogress')}
            </Link>
            <Link 
              to="/projects?status=delayed" 
              className="text-sm text-red-600 hover:text-red-700"
            >
              {t('projects.status.delayed')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;