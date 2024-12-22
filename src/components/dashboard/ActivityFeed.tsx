// src/components/dashboard/ActivityFeed.tsx
import { motion } from 'framer-motion';
import { 
  HiOutlineRefresh,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineArrowSmRight 
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'project' | 'inventory' | 'report' | 'team';
  link: string;
}

const ActivityFeed = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  const activities: Activity[] = [
    { 
      id: 1, 
      user: t('activity.users.johnDoe'),
      action: t('activity.actions.createdProject'),
      target: t('activity.targets.constructionA'),
      time: '2h',
      type: 'project',
      link: '/projects/1'
    },
    { 
      id: 2, 
      user: t('activity.users.janeSmith'),
      action: t('activity.actions.updatedInventory'),
      target: t('activity.targets.steelBars'),
      time: '4h',
      type: 'inventory',
      link: '/inventory'
    },
    // ... more activities
    // {
    //   id: 5,
    //   user: t('activity.users.johnDoe'),
    //   action: t('activity.actions.createdReport'),
    //   target: t('activity.targets.monthlyReport'),
    //   time: '1d',
    //   type: 'report',
    //   link: '/reports'
    // },
    // {
    //   id: 6,
    //   user: t('activity.users.janeSmith'),
    //   action: t('activity.actions.addedToTeam'),
    //   target: t('activity.targets.johnDoe'),
    //   time: '1d',
    //   type: 'team',
    //   link: '/team'
    // }
  ];

  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'project':
        return 'bg-green-100 text-green-600';
      case 'inventory':
        return 'bg-blue-100 text-blue-600';
      case 'report':
        return 'bg-purple-100 text-purple-600';
      case 'team':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {t('activity.recentActivity')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-2"
        >
          <HiOutlineRefresh className="w-5 h-5" />
          {t('activity.refresh')}
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(activity.type)}`}>
              <span className="text-sm font-medium">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-900">
                  <span className="font-medium hover:text-green-600 cursor-pointer">
                    {activity.user}
                  </span>{' '}
                  {activity.action}{' '}
                  <Link to={activity.link}>
                    <span className="font-medium text-green-600 hover:text-green-700">
                      {activity.target}
                    </span>
                  </Link>
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <HiOutlineClock className="w-4 h-4" />
                  {activity.time}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link to="/activities" className="block mt-6">
        <motion.button
          whileHover={{ x: direction === 'rtl' ? -4 : 4 }}
          className="w-full flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 py-2"
        >
          {t('activity.viewAll')}
          <HiOutlineArrowSmRight className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ActivityFeed;