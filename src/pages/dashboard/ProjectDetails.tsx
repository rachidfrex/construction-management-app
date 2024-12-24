import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';   
import { useToast } from '../../context/ToastContext';
import { useTranslationContext } from '../../context/TranslationContext'; 
import { useNavigate } from 'react-router-dom'; 
import Breadcrumb from '../../components/ui/Breadcrumb';
import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlinePlusCircle,
  HiOutlineDocumentText,
  HiOutlineDownload
} from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import { storage } from '../../mockData/db';

interface Project {
  id: number;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
  type: string;
  team: {
    id: string;
    name: string;
    role: string;
  }[];
  progress: number;
  budget: number;
  materialsUsed: number;
  tasks: {
    id: number;
    title: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
  }[];
  materials: {
    id: number;
    name: string;
    quantity: string;
    status: string;
    usage: string;
  }[];
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


  const handleAddTeamMember = async (memberData: any) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', t('projects.messages.success.teamMemberAdded'));
      // Update project data locally
      setProject(prev => prev ? {
        ...prev,
        team: [...prev.team, memberData.name]
      } : null);
    } catch (error) {
      showToast('error', t('projects.messages.error.addTeamMember'));
    }
  };

  const handleAddMaterial = async (materialData: any) => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', t('projects.messages.success.materialAdded'));
      // Update project data locally
      setProject(prev => prev ? {
        ...prev,
        materials: [...prev.materials, materialData]
      } : null);
    } catch (error) {
      showToast('error', t('projects.messages.error.addMaterial'));
    }
  };

  const handleAddMilestone = async (milestoneData: any) => {
    try {
      await fetchApi.post(`/projects/${id}/milestones`, milestoneData);
      toast.success(t('milestoneAdded'));
      // Refresh project data
    } catch (error) {
      toast.error(t('errorAddingMilestone'));
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 pt-16 mt-5 p-6 ${
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
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project?.status || 'In Progress']}`}>
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
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
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
                      <p className="font-semibold text-gray-900">${project.budget.toLocaleString()}</p>
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
                      <p className="font-semibold text-gray-900">{project.team.length} {t('projects.members')}</p>
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
                      <p className="font-semibold text-gray-900">{project.materialsUsed} {t('projects.items')}</p>
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
                {project.progress}% {t('projects.complete')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-2.5 rounded-full ${
                  project.progress >= 90 ? 'bg-green-600' :
                  project.progress >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {['overview', 'timeline', 'team', 'materials'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {t(tab)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('description')}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('projectDetails')}</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{t('projectType')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.type}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{t('client')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.clientName}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{t('startDate')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(project.startDate).toLocaleDateString()}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">{t('endDate')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(project.endDate).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <div className="relative">
                    {/* Timeline Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">{t('projectTimeline')}</h3>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        {t('addMilestone')}
                      </motion.button>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-8">
                      {project.tasks.map((milestone, index) => (
                        <div key={index} className="relative flex items-start gap-6">
                          <div className="flex-none">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                              milestone.status === 'completed' ? 'bg-green-500' :
                              milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                            }`} />
                            {index < project.tasks.length - 1 && <div className="w-px h-16 bg-gray-200 mx-auto mt-2" />}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                            <h4 className="text-base font-medium text-gray-900 mt-1">{milestone.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{t('teamMembers')}</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      onClick={() => handleAddTeamMember({ /* member data */ })}
                    >
                      <HiOutlinePlusCircle className="w-5 h-5" />
                      {t('addMember')}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.team.map((member, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">
                              {member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{member}</h4>
                            <p className="text-xs text-gray-500">{t('projectMember')}</p>
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
                    <h3 className="text-lg font-semibold text-gray-900">{t('projectMaterials')}</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                      onClick={() => handleAddMaterial({ /* material data */ })}
                    >
                      <HiOutlinePlusCircle className="w-5 h-5" />
                      {t('addMaterial')}
                    </motion.button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('material')}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('quantity')}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('usage')}</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project.materials.map((material, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                material.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {material.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: material.usage }}
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button className="text-gray-400 hover:text-gray-600">
                                <HiDotsVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
