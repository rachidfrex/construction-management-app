import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlinePhotograph, 
  HiOutlineUpload,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../../context/TranslationContext';
import { useToast } from '../../../context/ToastContext';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import Breadcrumb from '../../../components/ui/Breadcrumb';

interface MaterialForm {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  warehouse: string;
  minimumStock: number;
  description: string;
  image?: File;
}

const AddConstruction = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<MaterialForm>({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    price: 0,
    supplier: '',
    warehouse: '',
    minimumStock: 0,
    description: '',
  });

  const categories = [
    'Basic Materials',
    'Metals',
    'Wood',
    'Concrete',
    'Tools',
    'Electrical',
    'Plumbing'
  ];

  const units = [
    { value: 'bags', label: t('inventory.units.bags') },
    { value: 'tons', label: t('inventory.units.tons') },
    { value: 'pieces', label: t('inventory.units.pieces') },
    { value: 'meters', label: t('inventory.units.meters') },
  ];

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', t('inventory.messages.success.materialAdded'));
      navigate('/inventory/construction/manage');
    } catch (error) {
      showToast('error', t('inventory.messages.error.addMaterial'));
    } finally {
      setIsLoading(false);
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
            { label: t('inventory.construction.title'), path: '/inventory/construction/manage' },
            { label: t('inventory.construction.addMaterial') }
          ]} 
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-semibold text-gray-900">
                {t('inventory.construction.addMaterial')}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section - Improved styling */}
              <div 
                className="flex flex-col items-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer"
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: undefined }))}
                      className="absolute -top-2 -right-2 p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                        <span>{t('inventory.construction.uploadImage')}</span>
                        <input type="file" className="sr-only" accept="image/*" onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setFormData(prev => ({ ...prev, image: e.target.files![0] }));
                          }
                        }} />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">{t('inventory.construction.dragDrop')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Information - Improved input styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.material')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                    placeholder={t('inventory.placeholders.materialName')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.category')}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors"
                    required
                  >
                    <option value="">{t('inventory.filters.allCategories')}</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity, Unit, and Price Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.transactions.quantity')}
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))
                    }
                    min="0"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.unit')}
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors"
                    required
                  >
                    <option value="">{t('inventory.selectUnit')}</option>
                    {units.map(unit => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.price')}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))
                      }
                      className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.supplier')}
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.table.warehouse')}
                  </label>
                  <input
                    type="text"
                    value={formData.warehouse}
                    onChange={(e) => setFormData(prev => ({ ...prev, warehouse: e.target.value }))
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('inventory.minimumStock')}
                  </label>
                  <input
                    type="number"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, minimumStock: Number(e.target.value) }))
                    }
                    min="0"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t('inventory.description')}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))
                  }
                  rows={4}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder={t('inventory.placeholders.description')}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={() => navigate('/inventory/construction/manage')}
                  className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <HiOutlineUpload className="animate-spin h-4 w-4" />
                      <span>{t('common.saving')}</span>
                    </>
                  ) : t('common.save')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AddConstruction;
