// src/pages/dashboard/EditProject.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useToast } from '../../context/ToastContext';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import FormStepIndicator from '../../components/project/form/FormStepIndicator';
import GeneralInformation from '../../components/project/form/GeneralInformation';
import ResourceAllocation from '../../components/project/form/ResourceAllocation';
import ProjectScheduling from '../../components/project/form/ProjectScheduling';
import AdditionalDetails from '../../components/project/form/AdditionalDetails';

const steps = [
  { id: 1, title: 'General Info' },
  { id: 2, title: 'Resources' },
  { id: 3, title: 'Schedule' },
  { id: 4, title: 'Details' }
];

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
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
    materialSource: string;
    startDate: string;
    endDate: string;
    milestones: Milestone[];
    budget: string;
    description: string;
    team: string[];
    files: any[];
    phases: any[];
    materialLinks: any[];
  }
  
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
      files: [],
      phases: [],
      materialLinks: []
    });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Simulate API call to fetch project details
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock project data
        const projectData: ProjectData = {
          projectName: 'Construction Site A',
          clientName: 'ABC Corporation',
          projectType: 'Construction',
          materials: [
            { id: 1, quantity: 1000, source: "internal" as "internal" | "purchase" }
          ],
          materialSource: 'internal',
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          milestones: [
            { title: 'Foundation Work', date: '2024-02-01' }
          ],
          budget: '1500000',
          description: 'Main building construction project in downtown area',
          team: ['John Doe', 'Jane Smith'],
          files: [],
          phases: [],
          materialLinks: []
        };

        setFormData(projectData);
        setIsFetching(false);
      } catch (error) {
        showToast('error', 'Failed to fetch project details');
        navigate('/projects');
      }
    };

    fetchProject();
  }, [id, navigate, showToast]);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('success', 'Project updated successfully!');
      navigate('/projects');
    } catch (error) {
      showToast('error', 'Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={() => navigate('/projects')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <HiOutlineArrowLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
              <p className="text-gray-600 text-sm mt-1">Update your project details</p>
            </div>
          </div>

          <FormStepIndicator currentStep={currentStep} steps={steps} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <form onSubmit={handleUpdateProject} className="space-y-6">
              {currentStep === 1 && (
                <GeneralInformation
                  formData={formData}
                  onChange={setFormData}
                />
              )}
              {currentStep === 2 && (
                <ResourceAllocation
                  formData={formData}
                  onChange={setFormData}
                  onMaterialPhaseLink={(_materialId, _phaseId, _quantity) => {
                    // Handle material phase linking
                    console.log('Linking material:', _materialId, 'to phase:', _phaseId, 'with quantity:', _quantity);
                  }}
                />
              )}
              {currentStep === 3 && (
                <ProjectScheduling
                  formData={formData}
                  onChange={setFormData}
                />
              )}
              {currentStep === 4 && (
                <AdditionalDetails
                  formData={formData}
                  onChange={setFormData}
                />
              )}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={currentStep === 1 ? () => navigate('/projects') : handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {currentStep === 1 ? 'Cancel' : 'Previous'}
                </button>

                <button
                  type="button"
                  onClick={currentStep === steps.length ? handleUpdateProject : handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  {currentStep === steps.length ? (
                    isLoading ? (
                      <>
                        <svg 
                          className="animate-spin h-5 w-5 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Updating Project...</span>
                      </>
                    ) : (
                      'Update Project'
                    )
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EditProject;