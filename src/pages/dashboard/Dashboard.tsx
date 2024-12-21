// import { HiCube, HiCurrencyDollar, HiDocumentText, HiUserGroup } from 'react-icons/hi';
// import Sidebar from '../../components/dashboard/Sidebar';
// import Header from '../../components/dashboard/Header';
// import StatCard from '../../components/dashboard/StatCard';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       <Sidebar />
//       <Header />
 
//       <main className="lg:ml-64 mt-5 pt-16 p-6 transition-all duration-300 ease-in-out " >
//         <div className="mb-6">
//           <h1 className=" text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 font-semibold text-sm">Welcome back, here's what's happening today.</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <StatCard
//             title="Total Products"
//             value="2,420"
//             icon={<HiCube className="w-8 h-8" />}
//             change="12%"
//             positive={true}
//           />
//           <StatCard
//             title="Total Sales"
//             value="$45,280"
//             icon={<HiCurrencyDollar className="w-8 h-8" />}
//             change="8%"
//             positive={true}
//           />
//           <StatCard
//             title="Active Projects"
//             value="12"
//             icon={<HiDocumentText className="w-8 h-8" />}
//             change="2"
//             positive={true}
//           />
//           <StatCard
//             title="Team Members"
//             value="48"
//             icon={<HiUserGroup className="w-8 h-8" />}
//             change="5"
//             positive={true}
//           />
//         </div>

//         {/* Additional dashboard content can be added here */}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import { HiCube, HiCurrencyDollar, HiDocumentText, HiUserGroup } from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import StatCard from '../../components/dashboard/StatCard';
import ProjectsOverview from '../../components/dashboard/ProjectsOverview';
import InventoryOverview from '../../components/dashboard/InventoryOverview';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Sidebar />
      <Header />
 
      <main className="lg:ml-64 mt-5 pt-16 p-6 transition-all duration-300 ease-in-out">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 font-semibold text-sm">
            Welcome back, here's what's happening today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Products"
            value="2,420"
            icon={<HiCube className="w-8 h-8" />}
            change="12%"
            positive={true}
          />
          <StatCard
            title="Total Sales"
            value="$45,280"
            icon={<HiCurrencyDollar className="w-8 h-8" />}
            change="8%"
            positive={true}
          />
          <StatCard
            title="Active Projects"
            value="12"
            icon={<HiDocumentText className="w-8 h-8" />}
            change="2"
            positive={true}
          />
          <StatCard
            title="Team Members"
            value="48"
            icon={<HiUserGroup className="w-8 h-8" />}
            change="5"
            positive={true}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center text-gray-500">
                {/* Add your chart component here */}
                <p>Chart placeholder</p>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <ActivityFeed />

            {/* Quick Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Tasks</h2>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <HiDocumentText className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Create New Project</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HiCube className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Update Inventory</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <HiUserGroup className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Manage Team</span>
                </motion.button>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">System Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-medium text-gray-900">75%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-2 bg-green-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="font-medium text-gray-900">45%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      className="h-2 bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;