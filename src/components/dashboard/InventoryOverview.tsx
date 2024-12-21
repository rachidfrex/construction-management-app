// // src/components/dashboard/InventoryOverview.tsx
// const InventoryOverview = () => {
//     const lowStockItems = [
//       { id: 1, name: 'Cement', current: 50, minimum: 100 },
//       { id: 2, name: 'Steel Bars', current: 75, minimum: 150 },
//       { id: 3, name: 'Paint', current: 20, minimum: 50 }
//     ];
  
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-xl shadow-sm p-6"
//       >
//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Low Stock Alerts</h2>
//         <div className="space-y-4">
//           {lowStockItems.map(item => (
//             <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
//               <div>
//                 <h3 className="font-medium text-gray-900">{item.name}</h3>
//                 <p className="text-sm text-red-600">Current stock: {item.current}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-500">Minimum required</p>
//                 <p className="font-medium text-gray-900">{item.minimum}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

// src/components/dashboard/InventoryOverview.tsx
import { motion } from 'framer-motion';
import { HiOutlineCube } from 'react-icons/hi';

interface InventoryItem {
  id: number;
  name: string;
  current: number;
  minimum: number;
}

const InventoryOverview = () => {
  const lowStockItems: InventoryItem[] = [
    { id: 1, name: 'Cement', current: 50, minimum: 100 },
    { id: 2, name: 'Steel Bars', current: 75, minimum: 150 },
    { id: 3, name: 'Paint', current: 20, minimum: 50 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-2"
        >
          <HiOutlineCube className="w-5 h-5" />
          View Inventory
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {lowStockItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <HiOutlineCube className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-red-600">Current stock: {item.current}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Minimum required</p>
              <p className="font-medium text-gray-900">{item.minimum}</p>
              <div className="mt-2 w-32">
                <div className="h-2 bg-red-100 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.current / item.minimum) * 100}%` }}
                    className="h-2 bg-red-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InventoryOverview;