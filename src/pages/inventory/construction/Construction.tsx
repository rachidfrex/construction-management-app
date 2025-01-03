// src/pages/inventory/construction/Construction.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlinePlusCircle,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineCube,
  HiOutlineExclamation,
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

interface ConstructionMaterial {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  warehouse: string;
  minimumStock: number;
  lastRestockDate: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const Construction = () => {
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

  // Mock data
  const materials: ConstructionMaterial[] = [
    {
      id: 1,
      name: 'Cement',
      category: 'Basic Materials',
      quantity: 500,
      unit: 'bags',
      price: 15,
      supplier: 'ABC Suppliers',
      warehouse: 'Main Warehouse',
      minimumStock: 100,
      lastRestockDate: '2024-01-15',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Steel Bars',
      category: 'Metals',
      quantity: 50,
      unit: 'tons',
      price: 800,
      supplier: 'Steel Corp',
      warehouse: 'Metal Storage',
      minimumStock: 75,
      lastRestockDate: '2024-01-10',
      status: 'Low Stock'
    },
    // Add more materials...
  ];

  const categories = ['Basic Materials', 'Metals', 'Wood', 'Concrete', 'Tools'];
  // const warehouses = ['Main Warehouse', 'Metal Storage', 'Tool Storage'];
  const suppliers = ['ABC Suppliers', 'Steel Corp', 'Wood Inc', 'Cement Pro'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesWarehouse = selectedWarehouse === 'all' || material.warehouse === selectedWarehouse;
    return matchesSearch && matchesCategory && matchesWarehouse;
  });

  const handleBulkAction = (action: 'delete' | 'update') => {
    if (selectedMaterials.length === 0) {
      // Show toast or alert
      return;
    }
    // Handle bulk actions based on the action type
    switch (action) {
      case 'delete':
        // Handle delete action
        break;
      case 'update':
        // Handle update action
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 mt-5 md:mt-12 ease-in-out pt-16 p-3 sm:p-6 ${
        direction === 'rtl' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'
      }`}>
        <Breadcrumb 
          items={[
            { label: t('inventory.title'), path: '/inventory' },
            { label: t('inventory.construction.title') }
          ]} 
        />

        {/* Header Section - Adjusted Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('inventory.construction.title')}</h1>
            <p className="text-gray-600 text-xs font-semibold mt-2">{t('inventory.construction.subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <HiOutlineViewGrid className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <HiOutlineViewList className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white rounded-lg hover:bg-gray-50 border border-gray-200"
            >
              <HiOutlineDownload className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{t('common.export')}</span>
            </motion.button>

            <Link to="/inventory/construction/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <HiOutlinePlusCircle className="w-4 h-4" />
                {t('inventory.construction.addMaterial')}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Enhanced Filters Section - Adjusted Sizing */}
        <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <HiOutlineSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
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

        {/* Materials Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMaterials.map((material) => (
              <MaterialCard 
                key={material.id} 
                material={material} 
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
                      {t('inventory.table.category')}
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
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <HiOutlineCube className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{material.name}</p>
                            <p className="text-sm text-gray-500">{material.supplier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.category}
                      </td>
                
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {material.quantity} {material.unit}
                          </span>
                          {material.quantity <= material.minimumStock && (
                            <HiOutlineExclamation className="w-5 h-5 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          ${(material.quantity * material.price).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.warehouse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          material.status === 'In Stock' 
                            ? 'bg-green-100 text-green-800'
                            : material.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {t(`inventory.status.${material.status.toLowerCase().replace(' ', '')}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Link to={`/inventory/construction/edit/${material.id}`}>
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

// MaterialCard component with translations and RTL support
interface MaterialCardProps {
  material: ConstructionMaterial;
  t: (key: string) => string;
  direction?: string;
}

const MaterialCard = ({ material, t }: MaterialCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <HiOutlineCube className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{material.name}</h3>
          <p className="text-xs text-gray-500">{material.category}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t('inventory.transactions.quantity')}</span>
          <span className="font-medium">{material.quantity} {material.unit}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t('inventory.metrics.totalValue')}</span>
          <span className="font-medium">${(material.quantity * material.price).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          material.status === 'In Stock' ? 'bg-green-100 text-green-800' :
          material.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {t(`inventory.status.${material.status.toLowerCase().replace(' ', '')}`)}
        </span>
        <Link
          to={`/inventory/construction/edit/${material.id}`}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          {t('common.edit')}
        </Link>
      </div>
    </motion.div>
  );
};

export default Construction;