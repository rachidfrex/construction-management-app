import { motion } from 'framer-motion';
import { 
  HiOutlinePlusCircle, 
  HiOutlineCalendar, 
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineArrowSmRight
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';

interface Project {
  id: number;
  name: string;
  progress: number;
  status: 'In Progress' | 'Delayed' | 'Completed';
  dueDate: string;
  teamSize: number;
  tasks: number;
  completedTasks: number;
}

const ProjectsOverview = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  const recentProjects: Project[] = [
    { 
      id: 1, 
      name: t('projects.sampleData.projectA'),
      progress: 75, 
      status: 'In Progress',
      dueDate: '2024-03-15',
      teamSize: 8,
      tasks: 24,
      completedTasks: 18
    },
    { 
      id: 2, 
      name: t('projects.sampleData.projectB'),
      progress: 45, 
      status: 'Delayed',
      dueDate: '2024-04-01',
      teamSize: 5,
      tasks: 16,
      completedTasks: 7
    },
    { 
      id: 3, 
      name: t('projects.sampleData.projectC'),
      progress: 90, 
      status: 'In Progress',
      dueDate: '2024-02-28',
      teamSize: 6,
      tasks: 20,
      completedTasks: 18
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-green-100 text-green-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-3 md:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{t('projects.recentProjects')}</h2>
        <Link to="/projects/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
          >
            <HiOutlinePlusCircle className="w-5 h-5" />
            {t('projects.newProject')}
          </motion.button>
        </Link>
      </div>

      <div className="grid gap-4">
        {recentProjects.map(project => (
          <motion.div 
            key={project.id}
           
            className="p-4  rounded-lg border-2 border-gray-100  transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <HiOutlineCalendar className="w-4 h-4" />
                        <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiOutlineUsers className="w-4 h-4" />
                        <span>{project.teamSize} {t('projects.members')}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {t(`projects.status.${project.status.toLowerCase().replace(' ', '')}`)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('projects.progress')}</span>
                    <span className="font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      className={`h-2 rounded-full ${
                        project.progress >= 90 ? 'bg-green-500' :
                        project.progress >= 50 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between items-end gap-2 sm:gap-4">
                <div className="text-sm text-gray-500">
                  <div>{t('projects.tasks')}</div>
                  <div className="font-medium text-gray-900">{project.completedTasks}/{project.tasks}</div>
                </div>
                <Link to={`/projects/${project.id}`}>
                  <motion.button
                    whileHover={{ x: direction === 'rtl' ? -4 : 4 }}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                  >
                    {t('projects.viewDetails')}
                    <HiOutlineArrowSmRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link to="/projects" className="block mt-6">
        <motion.button
          whileHover={{ x: direction === 'rtl' ? -4 : 4 }}
          className="w-full text-center text-sm text-green-600 hover:text-green-700 py-2"
        >
          {t('common.viewAll')}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ProjectsOverview;