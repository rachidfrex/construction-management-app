// src/pages/inventory/construction/Construction.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlinePlusCircle,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlineCube,
  HiOutlineExclamation,
  HiOutlineRefresh,
  HiOutlineChartBar,
  HiOutlineAdjustments,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import Breadcrumb from '../../../components/ui/Breadcrumb';

interface Fertilizer {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  warehouse: string;
  minimumStock: number;
  lastRestockDate: string;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const Fertilizers = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for fertilizers
  const fertilizers: Fertilizer[] = [
    {
      id: 1,
      name: 'NPK 15-15-15',
      type: 'Chemical',
      quantity: 500,
      unit: 'bags',
      price: 45,
      supplier: 'AgriChem Inc',
      warehouse: 'Main Storage',
      minimumStock: 100,
      lastRestockDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Organic Compost',
      type: 'Organic',
      quantity: 30,
      unit: 'tons',
      price: 200,
      supplier: 'Green Farms',
      warehouse: 'Organic Storage',
      minimumStock: 20,
      lastRestockDate: '2024-01-10',
      expiryDate: '2024-06-10',
      status: 'Low Stock'
    },
  ];

  const types = ['Chemical', 'Organic', 'Mineral', 'Biofertilizer'];
  const warehouses = ['Main Storage', 'Organic Storage', 'Chemical Storage'];
  const suppliers = ['AgriChem Inc', 'Green Farms', 'Bio Solutions', 'Farm Tech'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  const filteredMaterials = fertilizers.filter(fertilizer => {
    const matchesSearch = fertilizer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fertilizer.type === selectedCategory;
    const matchesWarehouse = selectedWarehouse === 'all' || fertilizer.warehouse === selectedWarehouse;
    return matchesSearch && matchesCategory && matchesWarehouse;
  });

  const handleBulkAction = (action: string) => {
    if (selectedMaterials.length === 0) {
      // Show toast or alert
      return;
    }
    // Handle bulk actions like delete, update, etc.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 pt-16 mt-4 px-3 md:px-6  ${
        direction === 'rtl' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'
      }`}>
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: t('inventory.title'), path: '/inventory' },
            { label: t('inventory.fertilizers.title') }
          ]} 
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('inventory.fertilizers.title')}</h1>
            <p className="text-gray-600 text-sm mt-1">{t('inventory.fertilizers.subtitle')}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* View Toggle */}
            <div className="flex rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 t rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <HiOutlineViewGrid className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <HiOutlineViewList className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <Link to="/inventory/fertilizers/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <HiOutlinePlusCircle className="w-5 h-5" />
                {t('inventory.fertilizers.addFertilizer')}
              </motion.button>
            </Link>
            
            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2  text-sm bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlineDownload className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{t('common.export')}</span>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={t('inventory.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-sm py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 ${
                  direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
              <HiOutlineSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full text-sm py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 ${
                  direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              >
                <option value="all">{t('inventory.filters.allCategories')}</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <HiOutlineFilter className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
            </div>

            {/* Supplier Filter */}
            <div className="relative">
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className={`w-full text-sm py-1  border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 ${
                  direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              >
                <option value="all">{t('inventory.filters.allSuppliers')}</option>
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
              <HiOutlineFilter className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full text-sm py-1  border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 ${
                  direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              >
                <option value="all">{t('inventory.filters.allStatuses')}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {t(`inventory.status.${status.toLowerCase().replace(' ', '')}`)}
                  </option>
                ))}
              </select>
              <HiOutlineAdjustments className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${
                direction === 'rtl' ? 'right-3' : 'left-3'
              }`} />
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('inventory.priceRange.min')}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 text-sm py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder={t('inventory.priceRange.max')}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fertilizers Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMaterials.map((fertilizer) => (
              <FertilizerCard 
                key={fertilizer.id} 
                fertilizer={fertilizer} 
                t={t} 
                direction={direction}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className={`min-w-full divide-y divide-gray-200 ${
                direction === 'rtl' ? 'text-right' : 'text-left'
              }`}>
                <thead className="bg-gray-50">
                  <tr>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.item')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.type')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.stock')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.value')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.warehouse')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.status')}
                    </th>
                    <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      {t('inventory.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMaterials.map((fertilizer) => (
                    <tr key={fertilizer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <HiOutlineCube className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{fertilizer.name}</p>
                            <p className="text-sm text-gray-500">{fertilizer.supplier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fertilizer.type}
                      </td>
                
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {fertilizer.quantity} {fertilizer.unit}
                          </span>
                          {fertilizer.quantity <= fertilizer.minimumStock && (
                            <HiOutlineExclamation className="w-5 h-5 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          ${(fertilizer.quantity * fertilizer.price).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fertilizer.warehouse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          fertilizer.status === 'In Stock' 
                            ? 'bg-green-100 text-green-800'
                            : fertilizer.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {t(`inventory.status.${fertilizer.status.toLowerCase().replace(' ', '')}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Link to={`/inventory/fertilizers/edit/${fertilizer.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {t('common.edit')}
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            {t('common.delete')}
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bulk Action Bar - Shows when items are selected */}
        {selectedMaterials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedMaterials.length} {t('inventory.bulkActions.selected')}
              </span>
              <button
                onClick={() => handleBulkAction('delete')}
                className="text-sm text-red-600 hover:text-red-700"
              >
                {t('inventory.bulkActions.deleteSelected')}
              </button>
              <button
                onClick={() => handleBulkAction('update')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t('inventory.bulkActions.editSelected')}
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

// FertilizerCard component
const FertilizerCard = ({ fertilizer, t, direction }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-sm p-4 ${
        direction === 'rtl' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Fertilizer card content */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <HiOutlineCube className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{fertilizer.name}</h3>
            <p className="text-sm text-gray-500">{fertilizer.type}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">{t('inventory.transactions.quantity')}</span>
          <span className="text-sm font-medium">{fertilizer.quantity} {fertilizer.unit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">{t('inventory.metrics.totalValue')}</span>
          <span className="text-sm font-medium">${(fertilizer.quantity * fertilizer.price).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            fertilizer.status === 'In Stock' ? 'bg-green-100 text-green-800' :
            fertilizer.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {t(`inventory.status.${fertilizer.status.toLowerCase().replace(' ', '')}`)}
          </span>
          <Link
            to={`/inventory/fertilizers/edit/${fertilizer.id}`}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {t('common.edit')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Fertilizers;