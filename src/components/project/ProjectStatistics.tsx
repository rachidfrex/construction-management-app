// src/components/project/ProjectStatistics.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineBan,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar
} from 'react-icons/hi';

interface Project {
  id: number;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
  budget: number;
  progress: number;
}

interface ProjectStatisticsProps {
  projects: Project[];
}

export const ProjectStatistics = ({ projects }: ProjectStatisticsProps) => {
  const { t } = useTranslation();

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    delayed: projects.filter(p => p.status === 'Delayed').length,
    canceled: projects.filter(p => p.status === 'Canceled').length,
    averageProgress: Math.round(
      projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length
    ),
    totalBudget: projects.reduce((acc, curr) => acc + curr.budget, 0),
  };

  const statCards = [
    {
      title: t('projects.statistics.total'),
      value: stats.total,
      icon: <HiOutlineChartBar className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('projects.statistics.inProgress'),
      value: stats.inProgress,
      icon: <HiOutlineClock className="w-5 h-5" />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: t('projects.statistics.completed'),
      value: stats.completed,
      icon: <HiOutlineClipboardCheck className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('projects.statistics.delayed'),
      value: stats.delayed,
      icon: <HiOutlineExclamation className="w-5 h-5" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: t('projects.statistics.canceled'),
      value: stats.canceled,
      icon: <HiOutlineBan className="w-5 h-5" />,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      title: t('projects.statistics.totalBudget'),
      value: `$${stats.totalBudget.toLocaleString()}`,
      icon: <HiOutlineCurrencyDollar className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
          
          {stat.title === t('projects.statistics.total') && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">{t('projects.statistics.averageProgress')}</span>
                <span className="font-medium text-gray-700">{stats.averageProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.averageProgress}%` }}
                  className={`h-1.5 rounded-full ${
                    stats.averageProgress >= 75 ? 'bg-green-500' :
                    stats.averageProgress >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStatistics;