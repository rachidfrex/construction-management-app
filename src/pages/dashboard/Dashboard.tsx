import { useState, useEffect } from 'react';
import { HiCube, HiCurrencyDollar, HiDocumentText, HiUserGroup ,HiOutlineArrowSmRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import StatCard from '../../components/dashboard/StatCard';
import ProjectsOverview from '../../components/dashboard/ProjectsOverview';
import InventoryOverview from '../../components/dashboard/InventoryOverview';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';


const Dashboard = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [stats, setStats] = useState({
    products: { value: 2420, change: 12 },
    sales: { value: 45280, change: 8 },
    projects: { value: 12, change: 2 },
    team: { value: 48, change: 5 }
  });

  // Simulate API call to fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        products: { value: 2420, change: 12 },
        sales: { value: 3474747, change: 8 },
        projects: { value: 12, change: 2 },
        team: { value: 48, change: 5 }
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="">
      
      <main className={`transition-all duration-300 mt-5 md:mt-12 ease-in-out pt-16 p-3 sm:p-6 ${
      direction === 'rtl' 
        ? 'mr-0 lg:mr-64 ' 
        : 'ml-0 lg:ml-64 '
    }
    `}>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 text-xs font-semibold mt-2">
            {t('dashboard.welcome')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title={t('dashboard.statistics.totalProducts')}
            value={stats.products.value.toLocaleString()}
            icon={<HiCube className="w-8 h-8" />}
            change={`${stats.products.change}%`}
            positive={stats.products.change > 0}
          />
          <StatCard
            title={t('dashboard.statistics.totalSales')}
            value={`$${stats.sales.value.toLocaleString()}`}
            icon={<HiCurrencyDollar className="w-8 h-8" />}
            change={`${stats.sales.change}%`}
            positive={stats.sales.change > 0}
          />
          <StatCard
            title={t('dashboard.statistics.activeProjects')}
            value={stats.projects.value.toString()}
            icon={<HiDocumentText className="w-8 h-8" />}
            change={`${stats.projects.change}`}
            positive={stats.projects.change > 0}
          />
          <StatCard
            title={t('dashboard.statistics.teamMembers')}
            value={stats.team.value.toString()}
            icon={<HiUserGroup className="w-8 h-8" />}
            change={`${stats.team.change}`}
            positive={stats.team.change > 0}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects and Inventory Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects Overview */}
            <ProjectsOverview />

            {/* Inventory Overview */}
            <InventoryOverview />

            {/* Monthly Revenue Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.monthlyRevenue')}</h2>
                  <select 
                    className={`px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <option value="7">{t('dashboard.lastSevenDays')}</option>
                    <option value="30">{t('dashboard.lastThirtyDays')}</option>
                    <option value="90">{t('dashboard.lastNinetyDays')}</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <p className="text-sm">{t('dashboard.chartPlaceholder')}</p>
                </div>
              </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <ActivityFeed />

           
           {/* Quick Tasks bax l3oduan yb9aw */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-3 md:p-6 "
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('dashboard.quickTasks')}</h2>
              <div className=" flex flex-col gap-3  ">
                <Link to="/projects/new">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <HiDocumentText className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t('dashboard.createNewProject')}</span>
                  </motion.button>
                </Link>

                <Link to="/inventory">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <HiCube className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t('dashboard.updateInventory')}</span>
                  </motion.button>
                </Link>

                <Link to="/reports/generate">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <HiDocumentText className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t('dashboard.generateReport')}</span>
                  </motion.button>
                </Link>

                <Link to="/tasks">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-green-600">{t('dashboard.viewAllTasks')}</span>
                    <HiOutlineArrowSmRight className={`w-5 h-5 text-green-600 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;