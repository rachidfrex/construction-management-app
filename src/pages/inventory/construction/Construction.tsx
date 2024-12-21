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
  HiOutlineRefresh
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

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
  const warehouses = ['Main Warehouse', 'Metal Storage', 'Tool Storage'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesWarehouse = selectedWarehouse === 'all' || material.warehouse === selectedWarehouse;
    return matchesSearch && matchesCategory && matchesWarehouse;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 mt-5 pt-16 p-6">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Inventory', path: '/inventory' },
            { label: 'Construction Materials' }
          ]} 
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Construction Materials</h1>
            <p className="text-gray-600 mt-1">
              Manage your construction materials inventory
            </p>
          </div>
          
          <div className="flex gap-2">
            <Link to="/inventory/construction/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <HiOutlinePlusCircle className="w-5 h-5" />
                Add Material
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
            >
              <HiOutlineDownload className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Export</span>
            </motion.button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Warehouses</option>
            {warehouses.map(warehouse => (
              <option key={warehouse} value={warehouse}>{warehouse}</option>
            ))}
          </select>
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                        {material.status}
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
                            Edit
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">{filteredMaterials.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === 1
                          ? "z-10 bg-green-50 border-green-500 text-green-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Construction;