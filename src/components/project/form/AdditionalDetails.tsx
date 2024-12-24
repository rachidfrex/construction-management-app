import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';
import { 
  HiOutlineCurrencyDollar, 
  HiOutlineUsers, 
  HiOutlineDocumentText,
  HiOutlineUpload,
  HiOutlineX
} from 'react-icons/hi';
interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface AdditionalDetailsProps {
  formData: {
    budget: string;
    description: string;
    team: TeamMember[];
    files: { id: string; name: string }[]; // Keep only necessary file info
  };
  onChange: (data: any) => void;
}


const teamMembers = [
  { id: 1, name: 'Karim Alami', role: 'مدير المشروع' },
  { id: 2, name: 'Amina Benali', role: 'مهندس موقع' },
  { id: 3, name: 'Hassan El Fassi', role: 'مهندس معماري' },
  { id: 4, name: 'Fatima Zahra', role: 'مدير البناء' },
];

const AdditionalDetails = ({ formData, onChange }: AdditionalDetailsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Date.now().toString(), // Generate unique ID
        name: file.name // Store only the file name
      }));

      onChange({
        ...formData,
        files: [...(formData.files || []), ...newFiles]
      });
    }
  };

  const handleTeamSelection = (member: typeof teamMembers[0]) => {
    const isSelected = formData.team.some(t => t.id === member.id.toString());
    let newTeam;
    
    if (isSelected) {
      newTeam = formData.team.filter(t => t.id !== member.id.toString());
    } else {
      newTeam = [...formData.team, {
        id: member.id.toString(),
        name: member.name,
        role: member.role
      }];
    }
    
    onChange({ ...formData, team: newTeam });
  };


  const removeFile = (index: number) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index);
    onChange({ ...formData, files: updatedFiles });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.budget')} *
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => onChange({ ...formData, budget: e.target.value })}
            className={`w-full  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${direction === 'rtl' ? 'pr-10' : 'pl-10'}`}
            placeholder={t('projects.form.placeholders.budget')}
          />
          <HiOutlineCurrencyDollar className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
        </div>
      </div>

      {/* Team Selection */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.teamMembers')} *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.team.includes(member.id.toString())
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-500'
              }`}
              onClick={() => {
                const newTeam = formData.team.includes(member.id.toString())
                  ? formData.team.filter(id => id !== member.id.toString())
                  : [...formData.team, member.id.toString()];
                onChange({ ...formData, team: newTeam });
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <HiOutlineUsers className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.teamMembers')} *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.team.some(t => t.id === member.id.toString())
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-500'
              }`}
              onClick={() => handleTeamSelection(member)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <HiOutlineUsers className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Project Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.description')} *
        </label>
        <div className="relative">
          <textarea
            value={formData.description}
            onChange={(e) => onChange({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder={t('projects.form.placeholders.description')}
          />
          <HiOutlineDocumentText className={`absolute ${direction === 'rtl' ? 'left-3' : 'right-3'} top-3 text-gray-400 w-5 h-5`} />
        </div>
      </div>

      {/* File Attachments */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('projects.form.attachments')}
        </label>
        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors"
          >
            <HiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {t('projects.form.dropzone.text')}
            </p>
            <p className="text-xs text-gray-500">
              {t('projects.form.placeholders.attachments')}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
            />
          </div>

          {formData.files.length > 0 && (
            <div className="space-y-2">
              {formData.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('projects.form.attachments')}
      </label>
      <div className="space-y-4">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors"
        >
          <HiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {t('projects.form.dropzone.text')}
          </p>
          <p className="text-xs text-gray-500">
            {t('projects.form.placeholders.attachments')}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
          />
        </div>

        {/* File List */}
        {formData.files && formData.files.length > 0 && (
          <div className="space-y-2">
            {formData.files.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </motion.div>
  );
};

export default AdditionalDetails;