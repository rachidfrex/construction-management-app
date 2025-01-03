import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// react icon HiOutlineCalendar

import { HiOutlineCalendar } from 'react-icons/hi';

interface ProjectSchedulingProps {
  formData: {
    startDate: string;
    endDate: string;
    milestones: Array<{
      id: number;
      title: string;
      date: string;
      phase: string;
      reminder: boolean;
    }>;
  };
  onChange: (data: any) => void;
}

const ProjectScheduling = ({ formData, onChange }: ProjectSchedulingProps) => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      {/* Project Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('projects.form.startDate')} *
          </label>
          <DatePicker
            selected={formData.startDate ? new Date(formData.startDate) : null}
            onChange={(date) => onChange({ ...formData, startDate: date?.toISOString() })}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholderText={t('projects.form.placeholders.startDate')}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('projects.form.endDate')} *
          </label>
          <DatePicker
            selected={formData.endDate ? new Date(formData.endDate) : null}
            onChange={(date) => onChange({ ...formData, endDate: date?.toISOString() })}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholderText={t('projects.form.placeholders.endDate')}
            minDate={formData.startDate ? new Date(formData.startDate) : null}
          />
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('projects.form.milestones')}
          </label>
          <button
            type="button"
            onClick={() => onChange({
              ...formData,
              milestones: [
                ...(formData.milestones || []),
                { id: Date.now(), title: '', date: '', phase: '', reminder: false }
              ]
            })}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {t('projects.form.addMilestone')}
          </button>
        </div>

        <div className="space-y-4">
        {formData.milestones?.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => {
                    const newMilestones = [...formData.milestones];
                    newMilestones[index] = { ...milestone, title: e.target.value };
                    onChange({ ...formData, milestones: newMilestones });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('projects.form.placeholders.milestoneTitle')}
                />

                <DatePicker
                  selected={milestone.date ? new Date(milestone.date) : null}
                  onChange={(date) => {
                    const newMilestones = [...formData.milestones];
                    newMilestones[index] = { ...milestone, date: date?.toISOString() };
                    onChange({ ...formData, milestones: newMilestones });
                  }}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholderText={t('projects.form.placeholders.milestoneDate')}
                  minDate={new Date(formData.startDate)}
                  maxDate={new Date(formData.endDate)}
                />

                <button
                  type="button"
                  onClick={() => {
                    const newMilestones = formData.milestones.filter((_, i) => i !== index);
                    onChange({ ...formData, milestones: newMilestones });
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {t('common.delete')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectScheduling;