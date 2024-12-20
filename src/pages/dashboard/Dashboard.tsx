import { HiCube, HiCurrencyDollar, HiDocumentText, HiUserGroup } from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import StatCard from '../../components/dashboard/StatCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="ml-64 mt-5 pt-16 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 font-semibold text-sm">Welcome back, here's what's happening today.</p>
        </div>

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

        {/* Additional dashboard content can be added here */}
      </main>
    </div>
  );
};

export default Dashboard;