import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
          {change && (
            <p className={`text-sm mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
              {positive ? '↑' : '↓'} {change} from last month
            </p>
          )}
        </div>
        <div className="text-green-600">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;