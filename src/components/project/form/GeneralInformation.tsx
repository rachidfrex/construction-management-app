// src/components/project/form/GeneralInformation.tsx
import { motion } from 'framer-motion';
import { HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineBriefcase } from 'react-icons/hi';

interface GeneralInformationProps {
  formData: {
    projectName: string;
    clientName: string;
    projectType: string;
  };
  onChange: (data: any) => void;
}

const GeneralInformation = ({ formData, onChange }: GeneralInformationProps) => {
  const projectTypes = [
    'Construction',
    'Renovation',
    'Maintenance',
    'External Market Project'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Name *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => onChange({ ...formData, projectName: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Example: Construction of School Building"
          />
          <HiOutlineOfficeBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => onChange({ ...formData, clientName: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter client name"
          />
          <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Type *
        </label>
        <div className="relative">
          <select
            value={formData.projectType}
            onChange={(e) => onChange({ ...formData, projectType: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <HiOutlineBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default GeneralInformation;