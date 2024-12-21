// src/pages/dashboard/NewProject.tsx
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

type Milestone = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  phase: string;
  reminder: boolean;
};

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
    milestones: [] as Milestone[],
    budget: '',
    description: '',
    team: [] as string[],
    files: [] as File[],
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.projectName || 
        !formData.projectType || 
        !formData.startDate || 
        !formData.endDate || 
        !formData.budget || 
        formData.team.length === 0) {
      showToast('warning', 'Please fill in all required fields');
      return;
    }
  

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('success', 'Project created successfully!');
      navigate('/projects');
    } catch (error) {
      showToast('error', 'Failed to create project');
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

              {/* Navigation Buttons */}
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
                  onClick={currentStep === steps.length ? handleSubmit : handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {currentStep === steps.length ? 'Create Project' : 'Next'}
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