// src/components/project/form/ResourceAllocation.tsx
import { motion } from 'framer-motion';
import { HiOutlineCube } from 'react-icons/hi';
import { useToast } from '../../../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';

interface Material {
  id: number;
  name: string;
  availableStock: number;
  unit: string;
  minimumStock: number;
  reorderPoint: number;
  
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
  onMaterialPhaseLink: (materialId: number, phaseId: number, quantity: number) => void;

}

const availableMaterials: Material[] = [
  { 
    id: 1, 
    name: 'Cement', 
    availableStock: 1000, 
    unit: 'bags',
    minimumStock: 100,
    reorderPoint: 200
  },
  { 
    id: 2, 
    name: 'Concrete Blocks', 
    availableStock: 5000, 
    unit: 'pieces',
    minimumStock: 500,
    reorderPoint: 1000
  },
  { 
    id: 3, 
    name: 'Steel Bars', 
    availableStock: 2000, 
    unit: 'tons',
    minimumStock: 200,
    reorderPoint: 400
  }
  // add one moew 
  
];

const ResourceAllocation: React.FC<ResourceAllocationProps> = ({ formData, onChange }) => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { direction } = useTranslationContext();

  const handleMaterialChange = (materialId: number, quantity: number) => {
    const material = availableMaterials.find(m => m.id === materialId);
    
    if (!material) {
      showToast('error', t('materials.errors.notFound'));
      return;
    }

    if (quantity < 0) {
      showToast('warning', t('materials.errors.negativeQuantity'));
      return;
    }

    if (quantity > material.availableStock) {
      showToast('warning', t('materials.errors.insufficientStock', {
        stock: material.availableStock,
        unit: material.unit
      }));
      quantity = material.availableStock;
    }

    const existingMaterial = formData.materials.find(m => m.id === materialId);
    let updatedMaterials;

    if (existingMaterial) {
      updatedMaterials = formData.materials.map(m => 
        m.id === materialId ? { ...m, quantity } : m
      );
    } else {
      updatedMaterials = [
        ...formData.materials,
        { 
          // id: materialId, 
          // quantity, 
          // source: formData.materialSource as 'internal' | 'purchase' 
          id: materialId,
          name: material.name,
          quantity: quantity,
          unit: material.unit,
          used: 0
        }
      ];
    }

    onChange({ ...formData, materials: updatedMaterials });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
    >
      {/* Material Source Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {t('materials.source.label')} *
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
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {t(`materials.source.${source}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {t('materials.selection.label')} *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableMaterials.map((material) => (
            <motion.div
              key={material.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg bg-white hover:shadow-md transition-all ${
                formData.materials.find(m => m.id === material.id) 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HiOutlineCube className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{material.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {t('materials.available')}: {material.availableStock} {material.unit}
                </div>
              </div>

              <input
                type="number"
                min="0"
                max={material.availableStock}
                value={formData.materials.find(m => m.id === material.id)?.quantity ?? 0}
                onChange={(e) => handleMaterialChange(material.id, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('materials.quantity', { unit: material.unit })}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Material Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {t('materials.summary.title')}
        </h3>
        <div className="space-y-2">
          {formData.materials.length > 0 ? (
            formData.materials.map((material) => {
              const materialInfo = availableMaterials.find(m => m.id === material.id);
              if (!materialInfo) return null;
              
              const isOverStock = material.quantity > materialInfo.availableStock;
              
              return (
                <div key={material.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{materialInfo.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={isOverStock ? 'text-red-500' : 'text-green-500'}>
                      {material.quantity} / {materialInfo.availableStock} {materialInfo.unit}
                    </span>
                    {isOverStock && (
                      <span className="text-red-500 text-xs">
                        {t('materials.errors.insufficient')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">{t('materials.noSelection')}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceAllocation;