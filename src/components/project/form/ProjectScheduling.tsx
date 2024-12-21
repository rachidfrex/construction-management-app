import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlinePlusCircle, HiOutlineTrash } from 'react-icons/hi';

interface ProjectSchedulingProps {
  formData: {
    startDate: string;
    endDate: string;
    milestones: Array<{
      title: string;
      date: string;
    }>;
  };
  onChange: (data: any) => void;
}

const ProjectScheduling = ({ formData, onChange }: ProjectSchedulingProps) => {
  const addMilestone = () => {
    onChange({
      ...formData,
      milestones: [...formData.milestones, { title: '', date: '' }]
    });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    onChange({ ...formData, milestones: newMilestones });
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const newMilestones = formData.milestones.map((milestone, i) => {
      if (i === index) {
        return { ...milestone, [field]: value };
      }
      return milestone;
    });
    onChange({ ...formData, milestones: newMilestones });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Project Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => onChange({ ...formData, startDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <HiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => onChange({ ...formData, endDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <HiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Project Milestones</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addMilestone}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
          >
            <HiOutlinePlusCircle className="w-5 h-5" />
            Add Milestone
          </motion.button>
        </div>

        <div className="space-y-4">
          {formData.milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                  placeholder="Milestone title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={milestone.date}
                  onChange={(e) => updateMilestone(index, 'date', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectScheduling;