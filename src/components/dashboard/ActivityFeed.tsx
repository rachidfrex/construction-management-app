// // src/components/dashboard/ActivityFeed.tsx
// const ActivityFeed = () => {
//     const activities = [
//       { id: 1, user: 'John Doe', action: 'created new project', target: 'Construction Site A', time: '2 hours ago' },
//       { id: 2, user: 'Jane Smith', action: 'updated inventory', target: 'Steel Bars', time: '4 hours ago' },
//       { id: 3, user: 'Mike Johnson', action: 'generated report', target: 'Monthly Sales', time: '5 hours ago' }
//     ];
  
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-xl shadow-sm p-6"
//       >
//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
//         <div className="space-y-4">
//           {activities.map(activity => (
//             <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                 <span className="text-green-600 font-medium">{activity.user[0]}</span>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-900">
//                   <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };
  

// src/components/dashboard/ActivityFeed.tsx
import { motion } from 'framer-motion';
import { HiOutlineRefresh } from 'react-icons/hi';

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    { id: 1, user: 'John Doe', action: 'created new project', target: 'Construction Site A', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'updated inventory', target: 'Steel Bars', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'generated report', target: 'Monthly Sales', time: '5 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'completed milestone', target: 'Foundation Work', time: '6 hours ago' },
    { id: 5, user: 'David Brown', action: 'added new team member', target: 'Project Alpha', time: '8 hours ago' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-2"
        >
          <HiOutlineRefresh className="w-5 h-5" />
          Refresh
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-medium text-sm">{activity.user.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium hover:text-green-600 cursor-pointer">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium hover:text-green-600 cursor-pointer">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 py-2 rounded-lg hover:bg-gray-50"
      >
        View All Activities
      </motion.button>
    </motion.div>
  );
};

export default ActivityFeed;