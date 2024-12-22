// src/components/project/ProjectFilters.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  HiOutlineFilter, 
  HiOutlineX, 
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineTag
} from 'react-icons/hi';

interface FilterProps {
  filters: {
    status: string;
    type: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: FilterProps['filters']) => void;
}

export const ProjectFilters = ({ filters, onFilterChange }: FilterProps) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const direction = i18n.dir();

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const clearFilters = () => {
    onFilterChange({
      status: '',
      type: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <HiOutlineFilter className="w-5 h-5" />
          <span className="text-sm font-medium">
            {t('projects.filters.title')}
            {hasActiveFilters && (
              <span className={`px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full
                ${direction === 'rtl' ? 'mr-2' : 'ml-2'}
              `}>
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </span>
        </button>

        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <HiOutlineX className="w-4 h-4" />
            {t('projects.filters.clear')}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <HiOutlineTag className="w-4 h-4" />
                  {t('projects.filters.status')}
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('projects.filters.allStatuses')}</option>
                  <option value="In Progress">{t('projects.status.inprogress')}</option>
                  <option value="Completed">{t('projects.status.completed')}</option>
                  <option value="Delayed">{t('projects.status.delayed')}</option>
                  <option value="Canceled">{t('projects.status.canceled')}</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <HiOutlineOfficeBuilding className="w-4 h-4" />
                  {t('projects.filters.type')}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('projects.filters.allTypes')}</option>
                  <option value="Construction">{t('projects.types.construction')}</option>
                  <option value="Renovation">{t('projects.types.renovation')}</option>
                  <option value="Maintenance">{t('projects.types.maintenance')}</option>
                </select>
              </div>

              {/* Date Range Filters */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {t('projects.filters.startDate')}
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {t('projects.filters.endDate')}
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {filters.status && (
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      {t(`projects.status.${filters.status.toLowerCase().replace(' ', '')}`)}
                    </span>
                  )}
                  {filters.type && (
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      {t(`projects.types.${filters.type.toLowerCase()}`)}
                    </span>
                  )}
                  {filters.startDate && (
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      {t('projects.filters.from')}: {filters.startDate}
                    </span>
                  )}
                  {filters.endDate && (
                    <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      {t('projects.filters.to')}: {filters.endDate}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};