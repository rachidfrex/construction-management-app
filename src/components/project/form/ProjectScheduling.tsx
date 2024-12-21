// src/components/project/form/ProjectScheduling.tsx
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlinePlusCircle, HiOutlineTrash } from 'react-icons/hi';

interface Milestone {
  id: number;
  title: string;
  date: string;
  phase: string;
  reminder: boolean;
}

interface ProjectSchedulingProps {
  formData: {
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };
  onChange: (data: any) => void;
}

const projectPhases = [
  'Foundation',
  'Structure',
  'Finishing',
  'Electrical',
  'Plumbing',
  'Interior'
];

const ProjectScheduling = ({ formData, onChange }: ProjectSchedulingProps) => {
  const addMilestone = () => {
    const newMilestone = {
      id: formData.milestones.length + 1,
      title: '',
      date: '',
      phase: 'Foundation',
      reminder: false
    };
    onChange({
      ...formData,
      milestones: [...formData.milestones, newMilestone]
    });
  };

  const removeMilestone = (id: number) => {
    onChange({
      ...formData,
      milestones: formData.milestones.filter(m => m.id !== id)
    });
  };

  const updateMilestone = (id: number, field: string, value: string | boolean) => {
    onChange({
      ...formData,
      milestones: formData.milestones.map(m => 
        m.id === id ? { ...m, [field]: value } : m
      )
    });
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

      {/* Milestones Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Milestones
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addMilestone}
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <HiOutlinePlusCircle className="w-5 h-5" />
            <span>Add Milestone</span>
          </motion.button>
        </div>

        <div className="space-y-4">
          {formData.milestones.map((milestone) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                    placeholder="Milestone title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <select
                    value={milestone.phase}
                    onChange={(e) => updateMilestone(milestone.id, 'phase', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {projectPhases.map(phase => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <input
                    type="date"
                    value={milestone.date}
                    onChange={(e) => updateMilestone(milestone.id, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={milestone.reminder}
                      onChange={(e) => updateMilestone(milestone.id, 'reminder', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">Set reminder</span>
                  </label>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectScheduling;