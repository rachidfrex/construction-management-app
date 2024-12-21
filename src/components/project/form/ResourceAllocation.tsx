// src/components/project/form/ResourceAllocation.tsx
import { motion } from 'framer-motion';
import { HiOutlineCube, HiOutlineExclamationCircle } from 'react-icons/hi';

interface Material {
  id: number;
  name: string;
  availableStock: number;
  unit: string;
}

interface ResourceAllocationProps {
  formData: {
    materials: {
      id: number;
      quantity: number;
      source: 'internal' | 'purchase';
    }[];
    materialSource: string;
  };
  onChange: (data: any) => void;
}

const availableMaterials: Material[] = [
  { id: 1, name: 'Cement', availableStock: 1000, unit: 'bags' },
  { id: 2, name: 'Iron', availableStock: 500, unit: 'tons' },
  { id: 3, name: 'Asphalt', availableStock: 2000, unit: 'tons' },
  { id: 4, name: 'Sand', availableStock: 3000, unit: 'cubic meters' },
];

const ResourceAllocation = ({ formData, onChange }: ResourceAllocationProps) => {
  const handleMaterialChange = (materialId: number, quantity: number) => {
    const material = availableMaterials.find(m => m.id === materialId);
    if (material && quantity > material.availableStock) {
      // Show warning about insufficient stock
      alert(`Warning: Only ${material.availableStock} ${material.unit} available in stock`);
    }
    
    const updatedMaterials = formData.materials.map(m => 
      m.id === materialId ? { ...m, quantity } : m
    );
    onChange({ ...formData, materials: updatedMaterials });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Material Source Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Material Source *
        </label>
        <div className="flex gap-4">
          {['internal', 'purchase'].map((source) => (
            <label key={source} className="flex items-center">
              <input
                type="radio"
                value={source}
                checked={formData.materialSource === source}
                onChange={(e) => onChange({ ...formData, materialSource: e.target.value })}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{source}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Required Materials *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableMaterials.map((material) => (
            <motion.div
              key={material.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HiOutlineCube className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{material.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Available: {material.availableStock} {material.unit}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max={material.availableStock}
                  value={formData.materials.find(m => m.id === material.id)?.quantity || 0}
                  onChange={(e) => handleMaterialChange(material.id, Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={`Quantity (${material.unit})`}
                />
                
                {(formData.materials.find(m => m.id === material.id)?.quantity ?? 0) > material.availableStock && (
                  <div className="flex items-center text-red-500">
                    <HiOutlineExclamationCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real-time Stock Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Material Status Summary</h3>
        <div className="space-y-2">
          {formData.materials.filter(m => m.quantity > 0).map((material) => {
            const materialInfo = availableMaterials.find(m => m.id === material.id);
            const isOverStock = material.quantity > (materialInfo?.availableStock || 0);
            
            return (
              <div key={material.id} className="flex items-center justify-between text-sm">
                <span>{materialInfo?.name}</span>
                <span className={isOverStock ? 'text-red-500' : 'text-green-500'}>
                  {material.quantity} / {materialInfo?.availableStock} {materialInfo?.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;