// src/components/dashboard/InventoryOverview.tsx
import { motion } from 'framer-motion';
import { 
  HiOutlineCube, 
  HiOutlineExclamation, 
  HiOutlineTrendingUp, 
  HiOutlineCash,
  HiOutlineShoppingCart
} from 'react-icons/hi';

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
}

const InventoryOverview = () => {
  const inventoryMetrics: InventoryMetric[] = [
    {
      id: 1,
      name: 'Cement',
      current: 150,
      minimum: 100,
      unit: 'bags',
      value: 7500,
      reorderPoint: 120,
      lastRestockDate: '2024-01-15',
      supplier: 'ABC Suppliers',
      monthlyUsage: 200
    },
    {
      id: 2,
      name: 'Steel Bars',
      current: 80,
      minimum: 150,
      unit: 'tons',
      value: 12000,
      reorderPoint: 100,
      lastRestockDate: '2024-01-10',
      supplier: 'Steel Corp',
      monthlyUsage: 120
    },
    {
      id: 3,
      name: 'Paint',
      current: 45,
      minimum: 50,
      unit: 'gallons',
      value: 2250,
      reorderPoint: 60,
      lastRestockDate: '2024-01-20',
      supplier: 'Paint Pro',
      monthlyUsage: 75
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
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiOutlineCash className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Value</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalInventoryValue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Current inventory value</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <HiOutlineExclamation className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Critical Items</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{criticalItems.length}</p>
          <p className="text-sm text-gray-500 mt-2">Below minimum stock</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <HiOutlineShoppingCart className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Reorder Needed</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{needsReorder.length}</p>
          <p className="text-sm text-gray-500 mt-2">Items to reorder</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiOutlineTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Usage Trend</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">+12%</p>
          <p className="text-sm text-gray-500 mt-2">Monthly consumption</p>
        </motion.div>
      </div>

      {/* Critical Items Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Critical Items Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restock</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criticalItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <HiOutlineCube className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-red-600 font-medium">
                      {item.current} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {item.monthlyUsage} {item.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.supplier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {new Date(item.lastRestockDate).toLocaleDateString()}
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