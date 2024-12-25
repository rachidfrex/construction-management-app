// src/pages/inventory/Inventory.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCube, 
  HiOutlineBeaker,
  HiOutlineArrowSmRight,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlinePlusCircle,
  HiOutlineChartBar,
  HiOutlineExclamation,
  HiOutlineRefresh,
  HiOutlineAdjustments
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';
import { useToast } from '../../context/ToastContext';

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
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('7days');

  const quickLinks = {
    construction: [
      { title: t('inventory.quickLinks.manage'), path: '/inventory/construction/manage' },
      { title: t('inventory.quickLinks.orders'), path: '/inventory/construction/orders' },
      { title: t('inventory.quickLinks.reports'), path: '/inventory/construction/reports' },
    ],
    fertilizers: [
      { title: t('inventory.quickLinks.manage'), path: '/inventory/fertilizers/manage' },
      { title: t('inventory.quickLinks.orders'), path: '/inventory/fertilizers/orders' },
      { title: t('inventory.quickLinks.reports'), path: '/inventory/fertilizers/reports' },
    ]
  };

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

  useEffect(() => {
    const fetchInventoryData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data would be fetched here
        setIsLoading(false);
      } catch (error) {
        showToast('error', 'Failed to fetch inventory data');
        setIsLoading(false);
      }
    };

    fetchInventoryData();
  }, [showToast]);

  const handleExport = () => {
    showToast('info', 'Preparing export...');
    // Export logic here
  };

  const handlePrint = () => {
    showToast('info', 'Preparing print view...');
    // Print logic here
  };

  const handleRefresh = async () => {
    showToast('info', 'Refreshing inventory data...');
    // Refresh logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 pt-16 p-3 md:p-6 md:mt-6 ${
        direction === 'rtl' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'
      }`}>
        {/* Update text content with translations */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Header content */}
          </div>
        </motion.div>

        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('inventory.title')}</h1>
            <p className="text-gray-600 mt-1">{t('inventory.subtitle')}</p>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlineRefresh className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{t('common.refresh')}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlineDownload className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{t('common.export')}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlinePrinter className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{t('common.print')}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder={t('inventory.searchPlaceholder')}
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
              <option value="all">{t('inventory.filters.allCategories')}</option>
              <option value="construction">{t('inventory.filters.construction')}</option>
              <option value="fertilizers">{t('inventory.filters.fertilizers')}</option>
            </select>
            <HiOutlineFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="name">{t('inventory.sort.name')}</option>
              <option value="quantity">{t('inventory.sort.quantity')}</option>
              <option value="value">{t('inventory.sort.value')}</option>
            </select>
            <HiOutlineAdjustments className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="7days">{t('inventory.timeRange.week')}</option>
              <option value="30days">{t('inventory.timeRange.month')}</option>
              <option value="90days">{t('inventory.timeRange.quarter')}</option>
            </select>
            <HiOutlineChartBar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Construction Materials Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HiOutlineCube className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{t('inventory.filters.construction')}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.totalProducts')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.construction.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.lowStock')}</p>
                <p className="text-2xl font-bold text-red-600">{stats.construction.lowStock}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.totalValue')}</p>
                <p className="text-2xl font-bold text-gray-900">${stats.construction.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.recentMovements')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.construction.movements}</p>
              </div>
            </div>
            {/* Quick Links Section */}
            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap gap-2">
                {quickLinks.construction.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`text-sm px-3 py-1.5 rounded-full ${
                      direction === 'rtl' ? 'ml-2' : 'mr-2'
                    } ${
                      index === 0 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors duration-200`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fertilizers Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <HiOutlineBeaker className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{t('inventory.filters.fertilizers')}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.totalProducts')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.fertilizers.totalProducts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.expiringSoon')}</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.fertilizers.expiringSoon}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.totalValue')}</p>
                <p className="text-2xl font-bold text-gray-900">${stats.fertilizers.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('inventory.statistics.recentMovements')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.fertilizers.movements}</p>
              </div>
            </div>
            {/* Quick Links Section */}
            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap gap-2">
                {quickLinks.fertilizers.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`text-sm px-3 py-1.5 rounded-full ${
                      direction === 'rtl' ? 'ml-2' : 'mr-2'
                    } ${
                      index === 0 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors duration-200`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Recent Transactions Table with RTL Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('inventory.transactions.title')}</h2>
            <Link to="/inventory/transactions" className="text-sm text-green-600 hover:text-green-700">
              {t('inventory.transactions.viewAll')}
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y divide-gray-200 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              <thead className="bg-gray-50">
                <tr>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {t('inventory.transactions.type')}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {t('inventory.transactions.product')}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {t('inventory.transactions.quantity')}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {t('inventory.transactions.date')}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    direction === 'rtl' ? 'text-right' : 'text-left'
                  }`}>
                    {t('inventory.transactions.supplierWarehouse')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className={`px-6 py-4 whitespace-nowrap ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === 'incoming' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'incoming' ? t('inventory.transactions.incoming') : t('inventory.transactions.outgoing')}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {transaction.product}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {transaction.quantity} {transaction.unit}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {transaction.supplier || transaction.warehouse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Enhanced Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('inventory.lowStock.title')}</h2>
            <Link to="/inventory/low-stock" className="text-sm text-green-600 hover:text-green-700">
              {t('inventory.lowStock.viewAll')}
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
                  <span className="text-red-600 text-sm">{t('inventory.lowStock.critical')}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {t('inventory.lowStock.current')}: <span className="font-medium text-red-600">{alert.current}</span> {alert.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('inventory.lowStock.minimum')}: {alert.minimum} {alert.unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('inventory.lowStock.lastOrder')}: {new Date(alert.lastOrder).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/inventory/order/${alert.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {t('inventory.lowStock.placeOrder')} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* New Feature: Quick Actions Floating Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
          onClick={() => showToast('info', t('inventory.quickActions.comingSoon'))}
        >
          <HiOutlinePlusCircle className="w-6 h-6" />
        </motion.button>

      </main>
    </div>
  );
};

export default Inventory;