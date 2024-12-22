// src/pages/inventory/Inventory.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCube, 
  HiOutlineBeaker,
  HiOutlineArrowSmRight,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlinePrinter
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

interface InventoryStats {
  construction: {
    totalProducts: number;
    lowStock: number;
    value: number;
    movements: number;
  };
  fertilizers: {
    totalProducts: number;
    expiringSoon: number;
    value: number;
    movements: number;
  };
}

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const stats: InventoryStats = {
    construction: {
      totalProducts: 156,
      lowStock: 12,
      value: 250000,
      movements: 45
    },
    fertilizers: {
      totalProducts: 89,
      expiringSoon: 8,
      value: 175000,
      movements: 32
    }
  };

  // Mock recent transactions
  const recentTransactions = [
    { 
      id: 1, 
      type: 'incoming',
      product: 'Cement',
      quantity: 500,
      unit: 'bags',
      date: '2024-01-20',
      supplier: 'ABC Suppliers',
      warehouse: 'Main Warehouse'
    },
    // Add more transactions...
  ];

  // Mock low stock alerts
  const lowStockAlerts = [
    {
      id: 1,
      product: 'Steel Bars',
      current: 80,
      minimum: 150,
      unit: 'tons',
      supplier: 'Steel Corp',
      lastOrder: '2024-01-10'
    },
    // Add more alerts...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 mt-5 pt-16 p-6">
        {/* Header Section with Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">
              Manage construction materials and fertilizers inventory
            </p>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlineDownload className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Export</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlinePrinter className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Print</span>
            </motion.button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="construction">Construction Materials</option>
              <option value="fertilizers">Fertilizers</option>
            </select>
            <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Construction Materials Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineCube className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Construction Materials</h2>
              </div>
              <Link to="/inventory/construction">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <HiOutlineArrowSmRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.construction.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{stats.construction.lowStock}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${stats.construction.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Recent Movements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.construction.movements}</p>
              </div>
            </div>
          </motion.div>

          {/* Fertilizers Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <HiOutlineBeaker className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Fertilizers</h2>
              </div>
              <Link to="/inventory/fertilizers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-green-600 hover:text-green-700"
                >
                  <HiOutlineArrowSmRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.fertilizers.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.fertilizers.expiringSoon}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${stats.fertilizers.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Recent Movements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.fertilizers.movements}</p>
              </div>
            </div>
          </motion.div>
        </div>
{/* Recent Transactions Table */}
<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <Link to="/inventory/transactions" className="text-sm text-green-600 hover:text-green-700">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier/Warehouse</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === 'incoming' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.quantity} {transaction.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.supplier || transaction.warehouse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
            <Link to="/inventory/low-stock" className="text-sm text-green-600 hover:text-green-700">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-red-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{alert.product}</h3>
                  <span className="text-red-600 text-sm">Critical</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Current: <span className="font-medium text-red-600">{alert.current}</span> {alert.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    Minimum: {alert.minimum} {alert.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    Last Order: {new Date(alert.lastOrder).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/inventory/order/${alert.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Place Order →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;