// src/components/dashboard/ProjectsOverview.tsx
import { motion } from 'framer-motion';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProjectsOverview = () => {
  const recentProjects = [
    { id: 1, name: 'Construction Site A', progress: 75, status: 'In Progress' },
    { id: 2, name: 'Renovation Project B', progress: 45, status: 'Delayed' },
    { id: 3, name: 'Maintenance Work C', progress: 90, status: 'In Progress' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <Link to="/projects/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
          >
            <HiOutlinePlusCircle className="w-5 h-5" />
            New Project
          </motion.button>
        </Link>
      </div>
      <div className="space-y-4">
        {recentProjects.map(project => (
          <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                project.status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>{project.status}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsOverview;