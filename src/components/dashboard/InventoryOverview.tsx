import { motion } from 'framer-motion';
import { 
  HiOutlineCube, 
  HiOutlineExclamation, 
  HiOutlineTrendingUp, 
  HiOutlineCash,
  HiOutlineShoppingCart,
  HiOutlineArrowSmRight
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';

interface InventoryMetric {
  id: number;
  name: string;
  current: number;
  minimum: number;
  unit: string;
  value: number;
  reorderPoint: number;
  lastRestockDate: string;
  supplier: string;
  monthlyUsage: number;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const InventoryOverview = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  
  const inventoryMetrics: InventoryMetric[] = [
    {
      id: 1,
      name: t('inventory.items.cement'),
      current: 150,
      minimum: 100,
      unit: t('inventory.units.bags'),
      value: 7500,
      reorderPoint: 120,
      lastRestockDate: '2024-01-15',
      supplier: 'ABC Suppliers',
      monthlyUsage: 200,
      category: 'Basic Materials',
      status: 'In Stock'
    },
    {
      id: 2,
      name: t('inventory.items.steel'),
      current: 80,
      minimum: 150,
      unit: t('inventory.units.tons'),
      value: 12000,
      reorderPoint: 100,
      lastRestockDate: '2024-01-10',
      supplier: 'Steel Corp',
      monthlyUsage: 120,
      category: 'Metals',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: t('inventory.items.paint'),
      current: 45,
      minimum: 50,
      unit: t('inventory.units.gallons'),
      value: 2250,
      reorderPoint: 60,
      lastRestockDate: '2024-01-20',
      supplier: 'Paint Pro',
      monthlyUsage: 75,
      category: 'Finishing',
      status: 'Out of Stock'
    }
  ];

  const totalInventoryValue = inventoryMetrics.reduce((sum, item) => sum + item.value, 0);
  const criticalItems = inventoryMetrics.filter(item => item.current < item.minimum);
  const needsReorder = inventoryMetrics.filter(item => item.current <= item.reorderPoint);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header with Title and Action */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{t('inventory.overview')}</h2>
        <Link to="/inventory">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
          >
            {t('common.viewAll')}
            <HiOutlineArrowSmRight className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </motion.button>
        </Link>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <HiOutlineCash className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{t('inventory.metrics.totalValue')}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">${totalInventoryValue.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{t('inventory.metrics.currentStock')}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <HiOutlineExclamation className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{t('inventory.metrics.criticalItems')}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">{criticalItems.length}</p>
            <p className="text-xs text-gray-500 mt-1">{t('inventory.metrics.belowMinimum')}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <HiOutlineShoppingCart className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{t('inventory.metrics.reorderNeeded')}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">{needsReorder.length}</p>
            <p className="text-xs text-gray-500 mt-1">{t('inventory.metrics.itemsToReorder')}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HiOutlineTrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{t('inventory.metrics.usageTrend')}</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">+12%</p>
            <p className="text-xs text-gray-500 mt-1">{t('inventory.metrics.monthlyConsumption')}</p>
          </motion.div>
        </div>

      {/* Critical Items Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('inventory.criticalItems')}</h2>
          <Link to="/inventory/critical">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
            >
              {t('inventory.viewCritical')}
              <HiOutlineArrowSmRight className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </motion.button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.item')}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.currentStock')}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.monthlyUsage')}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.supplier')}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.status')}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('inventory.table.lastRestock')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200">
              {criticalItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <HiOutlineCube className={`w-5 h-5 ${
                        item.status === 'In Stock' ? 'text-green-500' :
                        item.status === 'Low Stock' ? 'text-yellow-500' : 'text-red-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-red-600 font-medium">
                      {item.current} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">
                      {item.monthlyUsage} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{item.supplier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-gray-600">
                      {new Date(item.lastRestockDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs  font-medium rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Out of Stock' ? 'bg-red-100 text-red-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {t(`inventory.status.${item.status.toLowerCase().replace(' ', '')}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default InventoryOverview;