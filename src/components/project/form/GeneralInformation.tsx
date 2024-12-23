// src/components/project/form/GeneralInformation.tsx
import { motion } from 'framer-motion';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineUser, 
  HiOutlineBriefcase,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

interface GeneralInformationProps {
  formData: {
    projectName: string;
    clientName: string;
    projectType: string;
    budget: string;
    description: string;
  };
  onChange: (data: any) => void;
}

const GeneralInformation = ({ formData, onChange }: GeneralInformationProps) => {
  const { t } = useTranslation();
  
  const projectTypes = [
    'Construction',
    'Renovation',
    'Maintenance'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.projectName')} *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => onChange({ ...formData, projectName: e.target.value })}
            placeholder={t('projects.form.placeholders.projectName')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Client Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.clientName')} *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => onChange({ ...formData, clientName: e.target.value })}
            placeholder={t('projects.form.placeholders.clientName')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.projectType')} *
        </label>
        <div className="relative">
          <select
            value={formData.projectType}
            onChange={(e) => onChange({ ...formData, projectType: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="">{t('projects.form.placeholders.selectType')}</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {t(`projects.types.${type.toLowerCase()}`)}
              </option>
            ))}
          </select>
          <HiOutlineBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Budget */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.budget')} *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => onChange({ ...formData, budget: e.target.value })}
            placeholder={t('projects.form.placeholders.budget')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <HiOutlineCurrencyDollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div> */}

      {/* Description */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.description')} *
        </label>
        <div className="relative">
          <textarea
            value={formData.description}
            onChange={(e) => onChange({ ...formData, description: e.target.value })}
            placeholder={t('projects.form.placeholders.description')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div> */}
    </motion.div>
  );
};

export default GeneralInformation;