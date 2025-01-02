import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useTranslation } from 'react-i18next';   
import { useToast } from '../../context/ToastContext';
import { useTranslationContext } from '../../context/TranslationContext'; 
import { useNavigate } from 'react-router-dom'; 
import Breadcrumb from '../../components/ui/Breadcrumb';
import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineHome, 
  HiOutlineCalendar, 
  HiOutlineUserGroup, 
  HiOutlineCube ,
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineDocument,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineDocumentAdd,
  HiOutlineCloudUpload,
  HiOutlinePencil, 
  HiOutlinePlusCircle
} from 'react-icons/hi';

import { storage } from '../../mockData/db';


interface TeamMember {
  id: number;
  name: string;
  role: string;
}

interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  used: number;
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface Project {
  id: number;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
  type: string;
  team: TeamMember[];
  progress: number;
  budget: number;
  materialsUsed: number;
  materials: Material[];
  timeline: Milestone[];
  files?: { id: string; name: string; }[];
}
const ProjectDetails = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) {
          showToast('error', t('projects.messages.error.notFound'));
          navigate('/projects');
          return;
        }

        const projectData = storage.getProject(Number(id));
        if (!projectData) {
          showToast('error', t('projects.messages.error.notFound'));
          navigate('/projects');
          return;
        }
        
        setProject(projectData);
      } catch (error) {
        showToast('error', t('projects.messages.error.load'));
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate, showToast, t]);


  // const handleAddTeamMember = async (memberData: any) => {
  //   try {
  //     // Simulated API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     showToast('success', t('projects.messages.success.teamMemberAdded'));
  //     // Update project data locally
  //     setProject(prev => prev ? {
  //       ...prev,
  //       team: [...prev.team, memberData.name]
  //     } : null);
  //   } catch (error) {
  //     showToast('error', t('projects.messages.error.addTeamMember'));
  //   }
  // };



  // const handleAddMilestone = async (milestoneData: any) => {
  //   try {
  //     await fetchApi.post(`/projects/${id}/milestones`, milestoneData);
  //     toast.success(t('milestoneAdded'));
  //     // Refresh project data
  //   } catch (error) {
  //     toast.error(t('errorAddingMilestone'));
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const statusColors = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Canceled': 'bg-gray-100 text-gray-800'
  };
  const tabs = [
    { 
      id: 'overview', 
      label: t('projects.tabs.overview'),
      icon: <HiOutlineHome className="w-5 h-5" />
    },
    { 
      id: 'timeline', 
      label: t('projects.tabs.timeline'),
      icon: <HiOutlineCalendar className="w-5 h-5" />
    },
    { 
      id: 'team', 
      label: t('projects.tabs.team'),
      icon: <HiOutlineUserGroup className="w-5 h-5" />
    },
    { 
      id: 'materials', 
      label: t('projects.tabs.materials'),
      icon: <HiOutlineCube className="w-5 h-5" />
    },
    { 
      id: 'files', 
      label: t('projects.tabs.files'),
      icon: <HiOutlineDocument className="w-5 h-5" />
    }
  ];
  const handleEditMaterial = (materialId: number) => {
    // Implement edit functionality
    console.log('Edit material:', materialId);
  };
  
  const handleDeleteMaterial = (materialId: number) => {
    // Implement delete functionality
    console.log('Delete material:', materialId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar />
      <Header /> */}
      <main className={`transition-all duration-300 pt-16 mt-4 px-3 md:px-6  ${
        direction === 'rtl' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'
      }`}>
        <div className="mx-auto">
        <Breadcrumb 
          items={[
            { label: t('projects.title'), path: '/projects' },
            { label: project?.name || '' }
          ]} 
        />

          {/* Project Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project?.name}</h1>
              <p className="text-gray-600 mt-1">{t('projects.client')}: {project?.clientName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project?.status || 'In Progress']}`}>
              {t(`projects.status.${project?.status?.toLowerCase().replace(' ', '')}`)}
            </span>
          </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <HiOutlineClock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projects.duration')}</p>
                      <p className="font-semibold text-gray-900">
                        {project?.startDate && project?.endDate ? 
                          `${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}` 
                          : '-'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <HiOutlineCurrencyDollar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projects.budget')}</p>
                      <p className="font-semibold text-gray-900">${project?.budget?.toLocaleString() ?? 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <HiOutlineUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projects.teamSize')}</p>
                      <p className="font-semibold text-gray-900">{project?.team?.length || 0} {t('projects.members')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <HiOutlineCube className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projects.materialsUsed')}</p>
                      <p className="font-semibold text-gray-900">{project?.materialsUsed ?? 0} {t('projects.items')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{t('projects.progress')}</h2>
              <span className="text-sm font-medium text-gray-600">
                {project?.progress ?? 0}% {t('projects.complete')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project?.progress ?? 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-2.5 rounded-full ${
                  (project?.progress ?? 0) >= 90 ? 'bg-green-600' :
                  (project?.progress ?? 0) >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav 
              className="flex w-full"
              aria-label="Tabs"
            >
              <div className={`w-full flex md:justify-start  justify-around px-4 md:px-6 ${
                direction === 'rtl' 
                  ? 'md:space-x-8 md:space-x-reverse' 
                  : 'md:space-x-8'
              }`}>
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 py-4 px-1 border-b-2 font-medium text-sm relative ${
                      activeTab === tab.id
                        ? 'text-green-600 '
                        : 'border-transparent text-gray-500 hover:text-gray-700 '
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className="md:hidden">{tab.icon}</span>
                    <span className="hidden md:block whitespace-nowrap">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                        layoutId="activeTab"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('projects.details.description')}
                    </h3>
                    <p className="text-gray-600">{project?.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('projects.details.projectDetails')}
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'projects.details.type', value: project?.type ?? '-' },
                        { label: 'projects.details.client', value: project?.clientName ?? '-' },
                        { 
                          label: 'projects.details.startDate', 
                          value: project?.startDate ? new Date(project.startDate).toLocaleDateString() : '-'
                        },
                        { 
                          label: 'projects.details.endDate', 
                          value: project?.endDate ? new Date(project.endDate).toLocaleDateString() : '-'
                        }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 px-4 py-3 rounded-lg">
                          <dt className="text-sm font-medium text-gray-500">{t(item.label)}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      {t('projects.details.timeline')}
                    </h3>
                    <div className="space-y-8">
                      {project?.timeline?.map((milestone, index) => (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative flex items-start gap-6"
                        >
                          <div className="flex-none">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                              milestone.status === 'completed' ? 'bg-green-500' :
                              milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                            }`} />
                            {index < project.timeline.length - 1 && (
                              <div className="w-px h-16 bg-gray-200 mx-auto mt-2" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {new Date(milestone.date).toLocaleDateString()}
                            </p>
                            <h4 className="text-base font-medium text-gray-900 mt-1">
                              {milestone.title}
                            </h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {t('projects.details.teamMembers')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project?.team?.map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">
                              {member.name?.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              
{activeTab === 'materials' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {t('projects.details.materials')}
      </h3>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
      >
        <HiOutlinePlusCircle className="w-5 h-5" />
        {t('projects.materials.add')}
      </motion.button>
    </div>
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${
        direction === 'rtl' ? 'text-right' : 'text-left'
      }`}>
        <thead className="bg-gray-50">
          <tr>
            <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              direction === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              {t('projects.materials.name')}
            </th>
            <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              direction === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              {t('projects.materials.quantity')}
            </th>
            <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              direction === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              {t('projects.materials.status')}
            </th>
            <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              direction === 'rtl' ? 'text-right' : 'text-left'
            }`}>
              {t('projects.materials.usage')}
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {project?.materials?.map((material) => {
            const usagePercentage = material.quantity > 0 
              ? Math.round((material.used / material.quantity) * 100)
              : 0;
            
            const getStatus = (used: number, quantity: number) => {
              if (quantity === 0) return 'outofstock';
              const remaining = quantity - used;
              if (remaining <= 0) return 'outofstock';
              if (remaining < quantity * 0.2) return 'lowstock';
              return 'instock';
            };

            const status = getStatus(material.used, material.quantity);
            
            return (
              <tr key={material.id}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                  direction === 'rtl' ? 'text-right' : 'text-left'
                }`}>
                  {material.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                  direction === 'rtl' ? 'text-right' : 'text-left'
                }`}>
                  {material.quantity} {material.unit}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  direction === 'rtl' ? 'text-right' : 'text-left'
                }`}>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    status === 'instock' ? 'bg-green-100 text-green-800' : 
                    status === 'lowstock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(`inventory.status.${status}`)}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  direction === 'rtl' ? 'text-right' : 'text-left'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${usagePercentage}%` }}
                        className={`h-2 rounded-full ${
                          usagePercentage > 80 ? 'bg-red-500' :
                          usagePercentage > 50 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {usagePercentage}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
                      onClick={() => handleEditMaterial(material.id)}
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50"
                      onClick={() => handleDeleteMaterial(material.id)}
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            );
          })}
          {(!project?.materials || project?.materials?.length === 0) && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                {t('projects.materials.noMaterials')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
                {activeTab === 'files' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('projects.details.documents')}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      >
                        <HiOutlineCloudUpload className="w-5 h-5" />
                        {t('projects.form.uploadFiles')}
                      </motion.button>
                    </div>

                    {project?.files && project.files.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.files.map((file) => (
                          <motion.div
                          key={file.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white border border-gray-200 rounded-lg p-4 transition-shadow"
                        >
                          <div className="flex items-center justify-center gap-3">
                            {/* Icon Section */}
                            <div className="flex-shrink-0">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                {file.name.toLowerCase().endsWith('.pdf') ? (
                                  <HiOutlineDocumentText className="w-6 h-6 text-red-500" />
                                ) : file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
                                  <HiOutlinePhotograph className="w-6 h-6 text-blue-500" />
                                ) : file.name.toLowerCase().match(/\.(doc|docx)$/) ? (
                                  <HiOutlineDocument className="w-6 h-6 text-blue-600" />
                                ) : (
                                  <HiOutlineDocument className="w-6 h-6 text-gray-500" />
                                )}
                              </div>
                            </div>
                        
                            {/* Content Section */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(parseInt(file.id)).toLocaleDateString()}
                                  </p>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex-shrink-0 flex items-center gap-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                  >
                                    <HiOutlineDownload className="w-5 h-5" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                  >
                                    <HiOutlineTrash className="w-5 h-5" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <HiOutlineDocumentAdd className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          {t('projects.messages.noFiles')}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {t('projects.messages.uploadFiles')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
