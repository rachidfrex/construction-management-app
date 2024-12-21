// // src/pages/dashboard/EditProject.tsx
// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useToast } from '../../context/ToastContext';
// import Sidebar from '../../components/dashboard/Sidebar';
// import Header from '../../components/dashboard/Header';
// import FormStepIndicator from '../../components/project/form/FormStepIndicator';
// import GeneralInformation from '../../components/project/form/GeneralInformation';
// import ResourceAllocation from '../../components/project/form/ResourceAllocation';
// import ProjectScheduling from '../../components/project/form/ProjectScheduling';
// import AdditionalDetails from '../../components/project/form/AdditionalDetails';
// import Breadcrumb from '../../components/ui/Breadcrumb';

// const steps = [
//   { id: 1, title: 'General Info' },
//   { id: 2, title: 'Resources' },
//   { id: 3, title: 'Schedule' },
//   { id: 4, title: 'Details' }
// ];

// const EditProject = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { showToast } = useToast();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   interface Material {
//     id: number;
//     quantity: number;
//     source: "internal" | "purchase";
//     phaseId?: number;
//     consumptionRate?: number;
//   }
  
//   interface Milestone {
//     title: string;
//     date: string;
//   }
  
//   interface ProjectData {
//     projectName: string;
//     clientName: string;
//     projectType: string;
//     materials: Material[];
//     materialSource: string;
//     startDate: string;
//     endDate: string;
//     milestones: Milestone[];
//     budget: string;
//     description: string;
//     team: string[];
//     files: any[];
//     phases: any[];
//     materialLinks: any[];
//   }
  
//   const [formData, setFormData] = useState<ProjectData>({
//       projectName: '',
//       clientName: '',
//       projectType: '',
//       materials: [],
//       materialSource: 'internal',
//       startDate: '',
//       endDate: '',
//       milestones: [],
//       budget: '',
//       description: '',
//       team: [],
//       files: [],
//       phases: [],
//       materialLinks: []
//     });

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         // Simulate API call to fetch project details
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Mock project data
//         const projectData: ProjectData = {
//           projectName: 'Construction Site A',
//           clientName: 'ABC Corporation',
//           projectType: 'Construction',
//           materials: [
//             { id: 1, quantity: 1000, source: "internal" as "internal" | "purchase" }
//           ],
//           materialSource: 'internal',
//           startDate: '2024-01-15',
//           endDate: '2024-06-30',
//           milestones: [
//             { title: 'Foundation Work', date: '2024-02-01' }
//           ],
//           budget: '1500000',
//           description: 'Main building construction project in downtown area',
//           team: ['John Doe', 'Jane Smith'],
//           files: [],
//           phases: [],
//           materialLinks: []
//         };

//         setFormData(projectData);
//         setIsFetching(false);
//       } catch (error) {
//         showToast('error', 'Failed to fetch project details');
//         navigate('/projects');
//       }
//     };

//     fetchProject();
//   }, [id, navigate, showToast]);

//   const handleUpdateProject = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       showToast('success', 'Project updated successfully!');
//       navigate('/projects');
//     } catch (error) {
//       showToast('error', 'Failed to update project');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Sidebar />
//         <Header />
//         <main className="lg:ml-64 mt-5 pt-16 p-6">
//           <div className="flex items-center justify-center h-[60vh]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-gray-50">
//       <Sidebar />
//       <Header />
//       <main className="lg:ml-64 mt-5 pt-16 p-6">
//         <div className="max-w-4xl mx-auto">
//           <Breadcrumb 
//             items={[
//               { label: 'Projects', path: '/projects' },
//               { label: formData.projectName || '', path: `/projects/${id}` },
//               { label: 'Edit' }
//             ]} 
//           />

//           <FormStepIndicator currentStep={currentStep} steps={steps} />

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-lg shadow-sm p-6"
//           >
//             <form onSubmit={handleUpdateProject} className="space-y-6">
//               {currentStep === 1 && (
//                 <GeneralInformation
//                   formData={formData}
//                   onChange={setFormData}
//                 />
//               )}
//               {currentStep === 2 && (
//                 <ResourceAllocation
//                   formData={formData}
//                   onChange={setFormData}
//                   onMaterialPhaseLink={(_materialId, _phaseId, _quantity) => {
//                     // Handle material phase linking
//                     console.log('Linking material:', _materialId, 'to phase:', _phaseId, 'with quantity:', _quantity);
//                   }}
//                 />
//               )}
//               {currentStep === 3 && (
//                 <ProjectScheduling
//                   formData={formData}
//                   onChange={setFormData}
//                 />
//               )}
//               {currentStep === 4 && (
//                 <AdditionalDetails
//                   formData={formData}
//                   onChange={setFormData}
//                 />
//               )}

//               <div className="flex justify-between pt-6">
//                 <button
//                   type="button"
//                   onClick={currentStep === 1 ? () => navigate('/projects') : handlePrevious}
//                   className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   {currentStep === 1 ? 'Cancel' : 'Previous'}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={currentStep === steps.length ? handleUpdateProject : handleNext}
//                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                 >
//                   {currentStep === steps.length ? (
//                     isLoading ? (
//                       <>
//                         <svg 
//                           className="animate-spin h-5 w-5 text-white" 
//                           xmlns="http://www.w3.org/2000/svg" 
//                           fill="none" 
//                           viewBox="0 0 24 24"
//                         >
//                           <circle 
//                             className="opacity-25" 
//                             cx="12" 
//                             cy="12" 
//                             r="10" 
//                             stroke="currentColor" 
//                             strokeWidth="4"
//                           />
//                           <path 
//                             className="opacity-75" 
//                             fill="currentColor" 
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           />
//                         </svg>
//                         <span>Updating Project...</span>
//                       </>
//                     ) : (
//                       'Update Project'
//                     )
//                   ) : (
//                     'Next'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EditProject;
// src/pages/dashboard/EditProject.tsx
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
  HiOutlinePlusCircle
} from 'react-icons/hi';

interface Material {
  id: number;
  quantity: number;
  source: "internal" | "purchase";
  phaseId?: number;
  consumptionRate?: number;
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

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
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
          <div className="flex items-center  justify-between  ">
            <div className="flex items-center ">
       
              
                <Breadcrumb 
                  items={[
                    { label: 'Projects', path: '/projects' },
                    { label: formData.projectName, path: `/projects/${id}` },
                    { label: 'Edit' }
                  ]} 
                />
            
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdateProject}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
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
                    icon={<HiOutlineCurrencyDollar />}
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
                {/* Add materials list here */}
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
                {/* Add team members list here */}
              </motion.div>

              {/* Files & Documents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Files & Documents</h2>
                {/* Add file upload and list here */}
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