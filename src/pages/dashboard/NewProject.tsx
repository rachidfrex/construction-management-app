import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import FormStepIndicator from '../../components/project/form/FormStepIndicator';
import GeneralInformation from '../../components/project/form/GeneralInformation';
import ResourceAllocation from '../../components/project/form/ResourceAllocation';
import ProjectScheduling from '../../components/project/form/ProjectScheduling';
import AdditionalDetails from '../../components/project/form/AdditionalDetails';

interface Phase {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  dependencies: string[];
  progress: number;
  materials: {
    materialId: number;
    quantity: number;
  }[];
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  phase: string;
  reminder: boolean;
}

interface MaterialLink {
  id: number;
  materialId: number;
  phaseId: number;
  quantity: number;
  consumptionRate: number;
  estimatedDeliveryDate?: string;
  source: 'internal' | 'purchase';
  status: 'pending' | 'allocated' | 'consumed';
}

interface EnhancedMilestone extends Milestone {
  dependencies: number[];
  notificationDays: number;
  priority: 'low' | 'medium' | 'high';
  description: string;
  attachments: string[];
  status: 'pending' | 'in-progress' | 'completed';
  assignees: string[];
  completed: boolean;
}

const steps = [
  { id: 1, title: 'General Info' },
  { id: 2, title: 'Resources' },
  { id: 3, title: 'Schedule' },
  { id: 4, title: 'Details' }
];

const NewProject = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    projectType: '',
    materials: [] as { id: number; quantity: number; source: 'internal' | 'purchase' }[],
    materialSource: 'internal',
    startDate: '',
    endDate: '',
    milestones: [] as EnhancedMilestone[],
    budget: '',
    description: '',
    team: [] as string[],
    files: [] as File[],
    phases: [] as Phase[],
    materialLinks: [] as MaterialLink[],
  });

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.projectName) errors.push('Project name is required');
    if (!formData.projectType) errors.push('Project type is required');
    if (formData.materials.length === 0) errors.push('At least one material is required');
    if (!formData.startDate || !formData.endDate) errors.push('Project dates are required');
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.push('End date must be after start date');
    }
    if (!formData.budget) errors.push('Budget is required');
    if (formData.team.length === 0) errors.push('At least one team member is required');
    if (!formData.description) errors.push('Project description is required');

    formData.milestones.forEach(milestone => {
      if (new Date(milestone.date) < new Date(formData.startDate) ||
          new Date(milestone.date) > new Date(formData.endDate)) {
        errors.push(`Milestone "${milestone.title}" date must be within project duration`);
      }
    });

    return errors;
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

  const handleMaterialPhaseLink = (materialId: number, phaseId: number, quantity: number) => {
    const newMaterialLinks = [...formData.materialLinks];
    const existingLinkIndex = newMaterialLinks.findIndex(
      link => link.materialId === materialId && link.phaseId === phaseId
    );

    if (existingLinkIndex >= 0) {
      newMaterialLinks[existingLinkIndex].quantity = quantity;
    } else {
      newMaterialLinks.push({
        id: newMaterialLinks.length + 1,
        materialId,
        phaseId,
        quantity,
        consumptionRate: 0,
        source: formData.materialSource as 'internal' | 'purchase',
        status: 'pending'
      });
    }

    setFormData(prev => ({
      ...prev,
      materialLinks: newMaterialLinks
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => showToast('warning', error));
      return;
    }

    setIsLoading(true);
    try {
      // Create phases from milestones
      const projectPhases: Phase[] = formData.milestones.map((milestone, index) => ({
        id: index + 1,
        name: milestone.phase,
        startDate: milestone.date,
        endDate: formData.endDate,
        dependencies: [],
        progress: 0,
        materials: []
      }));

      // Update formData with the final data
      const finalProjectData = {
        ...formData,
        phases: projectPhases,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Project Data:', finalProjectData);
      showToast('success', 'Project created successfully!');
      navigate('/projects');
    } catch (error) {
      showToast('error', 'Failed to create project');
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
            <p className="text-gray-600 text-sm mt-1">Add a new construction project to your portfolio</p>
          </div>

          <FormStepIndicator currentStep={currentStep} steps={steps} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  onMaterialPhaseLink={handleMaterialPhaseLink}
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
                  disabled={isLoading}
                  onClick={currentStep === 1 ? () => navigate('/projects') : handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {currentStep === 1 ? 'Cancel' : 'Previous'}
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={currentStep === steps.length ? handleSubmit : handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
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
                        <span>Creating Project...</span>
                      </>
                    ) : (
                      'Create Project'
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

export default NewProject;