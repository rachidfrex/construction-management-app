import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiChevronRight,
  HiDotsVertical,
  HiOutlinePlusCircle
} from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

interface Project {
  id: number;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
  type: string;
  team: string[];
  progress: number;
  budget: number;
  materialsUsed: number;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch project details
    const fetchProject = async () => {
      // Mock data - replace with actual API call
      const mockProject: Project = {
        id: Number(id),
        name: "Construction Site A",
        description: "Main building construction project in downtown area with modern amenities and sustainable features.",
        clientName: "ABC Corporation",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        status: "In Progress",
        type: "Construction",
        team: ["John Doe", "Jane Smith", "Bob Wilson"],
        progress: 45,
        budget: 1500000,
        materialsUsed: 25
      };
      setProject(mockProject);
    };

    fetchProject();
  }, [id]);

  const statusColors = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Canceled': 'bg-gray-100 text-gray-800'
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Projects</span>
            <HiChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{project.name}</span>
          </div>

          {/* Project Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-1">Client: {project.clientName}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                {project.status}
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
                    <p className="text-sm text-gray-600">Timeline</p>
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
                    <p className="text-sm text-gray-600">Budget</p>
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
                    <p className="text-sm text-gray-600">Team Members</p>
                    <p className="font-semibold text-gray-900">{project.team.length} Members</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <HiOutlineCube className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Materials Used</p>
                    <p className="font-semibold text-gray-900">{project.materialsUsed} Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Project Progress</h2>
              <span className="text-sm font-medium text-gray-600">{project.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-green-600 h-2.5 rounded-full"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'timeline'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'team'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Team
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'materials'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Materials
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Details</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Project Type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.type}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Client</dt>
                        <dd className="mt-1 text-sm text-gray-900">{project.clientName}</dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(project.startDate).toLocaleDateString()}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <dt className="text-sm font-medium text-gray-500">End Date</dt>
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
                        <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                        >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        Add Milestone
                        </motion.button>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-8">
                        {[
                        { date: '2024-01-15', title: 'Project Started', status: 'completed' },
                        { date: '2024-02-01', title: 'Foundation Work', status: 'completed' },
                        { date: '2024-03-15', title: 'Structure Development', status: 'in-progress' },
                        { date: '2024-05-01', title: 'Interior Work', status: 'pending' },
                        ].map((milestone, index) => (
                        <div key={index} className="relative flex items-start gap-6">
                            <div className="flex-none">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                            }`} />
                            {index < 3 && <div className="w-px h-16 bg-gray-200 mx-auto mt-2" />}
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
                    <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        Add Member
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
                            <p className="text-xs text-gray-500">Project Member</p>
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
                    <h3 className="text-lg font-semibold text-gray-900">Project Materials</h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        Add Material
                    </motion.button>
                    </div>

                    <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {[
                            { name: 'Cement', quantity: '500 bags', status: 'In Stock', usage: '60%' },
                            { name: 'Steel', quantity: '200 tons', status: 'Low Stock', usage: '75%' },
                            { name: 'Bricks', quantity: '10000 pcs', status: 'In Stock', usage: '45%' },
                        ].map((material, index) => (
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