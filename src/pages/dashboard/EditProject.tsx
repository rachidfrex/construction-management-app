import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { 
    HiOutlineSave,
    HiOutlineOfficeBuilding,
    HiOutlineUser,
    HiOutlineCalendar,
    HiOutlineCurrencyDollar,
    HiOutlineTrash,
    HiOutlinePlusCircle,
    HiOutlineDocumentText,
    HiOutlineCloudUpload,
    HiOutlineX,
    HiOutlineCube,
    HiOutlineUserGroup
} from 'react-icons/hi';

// Move interfaces outside component
interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

interface Material {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface Milestone {
    title: string;
    date: string;
}

interface ProjectData {
    projectName: string;
    clientName: string;
    projectType: string;
    materials: Material[];
    materialSource: 'internal' | 'purchase';
    startDate: string;
    endDate: string;
    milestones: Milestone[];
    budget: string;
    description: string;
    team: string[];
    files: File[];
}

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
    type?: string;
    prefix?: string;
}

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    
    // Move useState hooks inside component
    const [teamMembers] = useState<TeamMember[]>([
        { id: '1', name: 'John Doe', role: 'Project Manager', avatar: 'JD' },
        { id: '2', name: 'Sarah Smith', role: 'Site Engineer', avatar: 'SS' },
        { id: '3', name: 'Mike Johnson', role: 'Architect', avatar: 'MJ' },
        { id: '4', name: 'Emma Wilson', role: 'Construction Manager', avatar: 'EW' },
    ]);
    
    const [materials] = useState<Material[]>([
        { id: 1, name: 'Cement', quantity: 500, unit: 'bags', status: 'In Stock' },
        { id: 2, name: 'Steel', quantity: 200, unit: 'tons', status: 'Low Stock' },
        { id: 3, name: 'Bricks', quantity: 1000, unit: 'pieces', status: 'In Stock' },
        { id: 4, name: 'Sand', quantity: 50, unit: 'cubic meters', status: 'Out of Stock' },
    ]);

    const [formData, setFormData] = useState<ProjectData>({
        projectName: '',
        clientName: '',
        projectType: '',
        materials: [],
        materialSource: 'internal',
        startDate: '',
        endDate: '',
        milestones: [],
        budget: '',
        description: '',
        team: [],
        files: []
    });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsFetching(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const projectData: ProjectData = {
          projectName: 'Construction Site A',
          clientName: 'ABC Corporation',
          projectType: 'Construction',
          materials: [{ id: 1, quantity: 1000, source: "internal" as "internal" | "purchase" }],
          materialSource: 'internal',
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          milestones: [{ title: 'Foundation Work', date: '2024-02-01' }],
          budget: '1500000',
          description: 'Main building construction project in downtown area',
          team: ['John Doe', 'Jane Smith'],
          files: []
        };

        setFormData(projectData);
      } catch (error) {
        showToast('error', 'Failed to fetch project details');
        navigate('/projects');
      } finally {
        setIsFetching(false);
      }
    };

    fetchProject();
  }, [id, navigate, showToast]);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('success', 'Project updated successfully!');
      navigate('/projects');
    } catch (error) {
      showToast('error', 'Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="lg:ml-64 mt-5 pt-16 p-6">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 mt-5 pt-16 p-6 ">
        <div className=" mx-auto">
          {/* Header with Navigation */}
          <div className="flex  items-start md:items-center   md:justify-between  ">
            <div className="flex justify-center   items-center ">
       
              
                <Breadcrumb 
                  items={[
                    { label: 'Projects', path: '/projects' },
                    { label: formData.projectName, path: `/projects/${id}` },
                    { label: 'Edit' }
                  ]} 
                />
            
            </div>

            <>
                 {/* Desktop Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateProject}
                    disabled={isLoading}
                    className="hidden md:flex items-center gap-2 px-6 py-2 mb-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Saving Changes...</span>
                    </div>
                    ) : (
                    <>
                        <HiOutlineSave className="w-5 h-5" />
                        <span>Save Changes</span>
                    </>
                    )}
                </motion.button>

                {/* Mobile Floating Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpdateProject}
                    disabled={isLoading}
                    className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                    style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    {isLoading ? (
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    ) : (
                    <HiOutlineSave className="w-6 h-6" />
                    )}
                </motion.button>
                </>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">General Information</h2>
                <div className="space-y-6">
                  <Input
                    label="Project Name"
                    value={formData.projectName}
                    onChange={(value) => setFormData({ ...formData, projectName: value })}
                    icon={<HiOutlineOfficeBuilding />}
                  />
                  <Input
                    label="Client Name"
                    value={formData.clientName}
                    onChange={(value) => setFormData({ ...formData, clientName: value })}
                    icon={<HiOutlineUser />}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Start Date"
                      type="date"
                      value={formData.startDate}
                      onChange={(value) => setFormData({ ...formData, startDate: value })}
                      icon={<HiOutlineCalendar />}
                    />
                    <Input
                      label="End Date"
                      type="date"
                      value={formData.endDate}
                      onChange={(value) => setFormData({ ...formData, endDate: value })}
                      icon={<HiOutlineCalendar />}
                    />
                  </div>
                  <Input
                    label="Budget"
                    value={formData.budget}
                    onChange={(value) => setFormData({ ...formData, budget: value })}
                    
                    prefix="$"
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Description</h2>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter project description..."
                />
              </motion.div>

              {/* Materials */}
              <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-6"
                    >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Materials</h2>
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                        >
                        <HiOutlinePlusCircle className="w-5 h-5" />
                        Add Material
                        </motion.button>
                    </div>
                    <div className="space-y-4">
                        {materials.map((material) => (
                        <motion.div
                            key={material.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <HiOutlineCube className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{material.name}</h3>
                                <p className="text-sm text-gray-500">
                                {material.quantity} {material.unit}
                                </p>
                            </div>
                            </div>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            material.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                            material.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                            }`}>
                            {material.status}
                            </span>
                        </motion.div>
                        ))}
                    </div>
                    </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Team Members */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
                >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                    <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                    Add Member
                    </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">{member.avatar}</span>
                        </div>
                        <div>
                            <h3 className=" text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className=" text-xs text-gray-500">{member.role}</p>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                </div>
                </motion.div>

              {/* Files & Documents */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
                >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Files & Documents</h2>
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div className="text-center">
                        <HiOutlineCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                            Upload Files
                        </motion.button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                        or drag and drop files here
                        </p>
                    </div>
                    </div>
                    
                    {/* Sample uploaded files */}
                    <div className="space-y-3">
                    {['Project_Plan.pdf', 'Budget_Sheet.xlsx', 'Site_Photos.zip'].map((file, index) => (
                        <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                        <div className="flex items-center gap-3">
                            <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-700">{file}</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <HiOutlineX className="w-5 h-5" />
                        </motion.button>
                        </motion.div>
                    ))}
                    </div>
                </div>
                </motion.div>
              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 rounded-xl p-6"
              >
                <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                  <span>Delete Project</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Input Component
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: string;
  prefix?: string;
}

const Input = ({ label, value, onChange, icon, type = 'text', prefix }: InputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      {prefix && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
          {prefix}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${icon ? 'pl-10' : ''} ${prefix ? 'pl-7' : ''} pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
      />
    </div>
  </div>
);

export default EditProject;