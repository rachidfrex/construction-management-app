import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { useTranslationContext } from '../../context/TranslationContext'; 
import { useTranslation } from 'react-i18next';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import FormStepIndicator from '../../components/project/form/FormStepIndicator';
import GeneralInformation from '../../components/project/form/GeneralInformation';
import ResourceAllocation from '../../components/project/form/ResourceAllocation';
import ProjectScheduling from '../../components/project/form/ProjectScheduling';
import AdditionalDetails from '../../components/project/form/AdditionalDetails';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { storage } from '../../mockData/db';
// import { storage } from '../../mockData/db';

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
  { id: 1, title: 'projects.form.steps.general' },
  { id: 2, title: 'projects.form.steps.resources' },
  { id: 3, title: 'projects.form.steps.schedule' },
  { id: 4, title: 'projects.form.steps.details' }
];

interface TeamMember {
  id: string;
  name: string;
  specialty: string;
}

interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  used: number;
}

interface FormData {
  projectName: string;
  clientName: string;
  projectType: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: string;
  team: TeamMember[];
  materials: Material[];
  files?: { name: string; type: string }[];
  milestones: Array<{  // Add this
    id: number;
    title: string;
    date: string;
    phase: string;
    reminder: boolean;
  }>;
}
// interface FormData {
//   projectName: string;
//   clientName: string;
//   projectType: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   budget: string;
//   team: TeamMember[];
//   materials: Material[];
//   files?: { name: string; type: string }[];
// }

const NewProject = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    clientName: '',
    projectType: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    team: [],
    materials: [],
    milestones: [],
    files: []

  });
  const handleAddTeamMember = (member: { name: string; specialty: string }) => {
    setFormData(prev => ({
      ...prev,
      team: [
        ...prev.team,
        {
          id: Date.now().toString(),
          name: member.name,
          specialty: member.specialty
        }
      ]
    }));
  };
  // const handleAddMaterial = (material: { name: string; quantity: number; unit: string }) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     materials: [
  //       ...prev.materials,
  //       {
  //         id: Date.now().toString(),
  //         ...material
  //       }
  //     ]
  //   }));
  // };
  const handleAddMaterial = (materialData: { id: number; quantity: number }) => {
    // Get material details from the availableMaterials array
    const materialInfo = availableMaterials.find(m => m.id === materialData.id);
    
    if (!materialInfo) return;
  
    setFormData(prev => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          id: materialData.id,
          name: materialInfo.name, // Get name from availableMaterials
          quantity: materialData.quantity,
          unit: materialInfo.unit, // Get unit from availableMaterials
          used: 0 // Initialize used to 0
        }
      ]
    }));
  };
  const handleAddFile = (file: File) => {
    setFormData(prev => ({
      ...prev,
      files: [
        ...prev.files,
        {
          name: file.name,
          type: file.type
        }
      ]
    }));
  };
  // const validateForm = () => {
  //   const errors: string[] = [];
    
  //   if (!formData.projectName) errors.push('Project name is required');
  //   if (!formData.projectType) errors.push('Project type is required');
  //   if (formData.materials.length === 0) errors.push('At least one material is required');
  //   if (!formData.startDate || !formData.endDate) errors.push('Project dates are required');
  //   if (new Date(formData.startDate) >= new Date(formData.endDate)) {
  //     errors.push('End date must be after start date');
  //   }
  //   if (!formData.budget) errors.push('Budget is required');
  //   if (formData.team.length === 0) errors.push('At least one team member is required');
  //   if (!formData.description) errors.push('Project description is required');

  //   formData.milestones.forEach(milestone => {
  //     if (new Date(milestone.date) < new Date(formData.startDate) ||
  //         new Date(milestone.date) > new Date(formData.endDate)) {
  //       errors.push(`Milestone "${milestone.title}" date must be within project duration`);
  //     }
  //   });

  //   return errors;
  // };
  // const validateStep = (step: number): boolean => {
  //   const errors: string[] = [];

  //   switch (step) {
  //     case 1:
  //       if (!formData.projectName) errors.push(t('projects.validation.nameRequired'));
  //       if (!formData.projectType) errors.push(t('projects.validation.typeRequired'));
  //       if (!formData.clientName) errors.push(t('projects.validation.clientRequired'));
  //       break;
  //     case 2:
  //       if (formData.materials.length === 0) errors.push(t('projects.validation.materialsRequired'));
  //       if (formData.team.length === 0) errors.push(t('projects.validation.teamRequired'));
  //       break;
  //     case 3:
  //       if (!formData.startDate || !formData.endDate) errors.push(t('projects.validation.datesRequired'));
  //       if (new Date(formData.startDate) >= new Date(formData.endDate)) {
  //         errors.push(t('projects.validation.invalidDates'));
  //       }
  //       break;
  //     case 4:
  //       if (!formData.budget) errors.push(t('projects.validation.budgetRequired'));
  //       if (!formData.description) errors.push(t('projects.validation.descriptionRequired'));
  //       break;
  //   }

  //   if (errors.length > 0) {
  //     errors.forEach(error => showToast('warning', error));
  //     return false;
  //   }
  //   return true;
  // };

const validateStep = (step: number): boolean => {
const errors: string[] = [];
  
switch (step) {
  case 1:
    if (!formData.projectName.trim()) errors.push(t('projects.validation.nameRequired'));
    if (!formData.projectType) errors.push(t('projects.validation.typeRequired'));
    if (!formData.clientName.trim()) errors.push(t('projects.validation.clientRequired'));
    break;
    
  case 2:
    if (formData.materials.length === 0) errors.push(t('projects.validation.materialsRequired'));
    break;
    
  case 3:
    if (!formData.startDate || !formData.endDate) errors.push(t('projects.validation.datesRequired'));
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.push(t('projects.validation.invalidDates'));
    }
    // Add milestone validation here
    formData.milestones.forEach(milestone => {
      if (new Date(milestone.date) < new Date(formData.startDate) ||
          new Date(milestone.date) > new Date(formData.endDate)) {
        errors.push(t('projects.validation.milestoneDateRange'));
      }
    });
    break;
    
  case 4:
    if (formData.team.length === 0) errors.push(t('projects.validation.teamRequired'));
    if (!formData.budget) errors.push(t('projects.validation.budgetRequired'));
    if (!formData.description) errors.push(t('projects.validation.descriptionRequired'));
    break;
}

if (errors.length > 0) {
  errors.forEach(error => showToast('warning', error));
  return false;
}
return true;
};
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    } else {
      let canProceed = true;
      for (let i = currentStep; i < step; i++) {
        if (!validateStep(i)) {
          canProceed = false;
          break;
        }
      }
      if (canProceed) {
        setCurrentStep(step);
      }
    }
  };
  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const validationErrors = validateForm();
  //   if (validationErrors.length > 0) {
  //     validationErrors.forEach(error => showToast('warning', error));
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     // Create phases from milestones
  //     const projectPhases: Phase[] = formData.milestones.map((milestone, index) => ({
  //       id: index + 1,
  //       name: milestone.phase,
  //       startDate: milestone.date,
  //       endDate: formData.endDate,
  //       dependencies: [],
  //       progress: 0,
  //       materials: []
  //     }));

  //     // Update formData with the final data
  //     const finalProjectData = {
  //       ...formData,
  //       phases: projectPhases,
  //     };

  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     console.log('Project Data:', finalProjectData);
  //     showToast('success', 'Project created successfully!');
  //     navigate('/projects');
  //   } catch (error) {
  //     showToast('error', 'Failed to create project');
  //     console.error('Error creating project:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    if (!validateStep(currentStep)) return;
  
    setIsLoading(true);
    try {
      const projectData = {
        name: formData.projectName,
        description: formData.description,
        clientName: formData.clientName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: 'In Progress' as const,
        type: formData.projectType,
        progress: 0,
        budget: parseFloat(formData.budget),
        materialsUsed: 0,
        team: formData.team.map(member => ({
          id: member.id,
          name: member.name,
          role: member.role
        })),
        // Add materials array
        materials: formData.materials.map(material => ({
          id: material.id,
          name: material.name,
          quantity: material.quantity,
          unit: material.unit,
          used: 0 // Initialize used amount to 0
        })),
        files: formData.files?.map(file => ({
          id: Date.now().toString(),
          name: file.name,
          type: file.type
        })) || [],
        timeline: formData.milestones.map(milestone => ({
          id: milestone.id,
          title: milestone.title,
          date: milestone.date,
          status: 'pending'
        }))
      };
  
      await storage.createProject(projectData);
      showToast('success', t('projects.messages.success.created'));
      setTimeout(() => navigate('/projects'), 500);
    } catch (error) {
      showToast('error', t('projects.messages.error.create'));
    } finally {
      setIsLoading(false);
    }
  };
  const getDefaultMaterialName = (id: number): string => {
    const materialNames: Record<number, string> = {
      1: "Cement",
      2: "Steel",
      3: "Bricks"
      // Add more materials as needed
    };
    return materialNames[id] || "Unknown Material";
  };
  
  const getDefaultUnit = (id: number): string => {
    const materialUnits: Record<number, string> = {
      1: "bags",
      2: "tons",
      3: "pieces"
      // Add more units as needed
    };
    return materialUnits[id] || "units";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className={`transition-all duration-300 pt-16 mt-5 p-6 ${
        direction === 'rtl' 
          ? 'mr-0 lg:mr-64' 
          : 'ml-0 lg:ml-64'
      }`}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumb 
            items={[
              { label: t('projects.title'), path: '/projects' },
              { label: t('projects.newProject') }
            ]} 
          />

          {/* <FormStepIndicator 
            currentStep={currentStep} 
            steps={steps.map(step => ({ ...step, title: t(step.title) }))}
            onStepClick={handleStepClick}
          /> */}
          <FormStepIndicator 
            currentStep={currentStep} 
            steps={steps.map(step => ({ 
              id: step.id, 
              title: t(step.title),
              isCompleted: step.id < currentStep,
              isCurrent: step.id === currentStep
            }))}
            onStepClick={handleStepClick}
          />

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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  disabled={isLoading}
                  onClick={currentStep === 1 ? () => navigate('/projects') : handlePrevious}
                  className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {currentStep === 1 ? t('common.cancel') : t('common.previous')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type={currentStep === steps.length ? 'submit' : 'button'}
                  disabled={isLoading}
                  onClick={currentStep === steps.length ? undefined : handleNext}
                  className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {currentStep === steps.length ? (
                    isLoading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t('common.creating')}</span>
                      </div>
                    ) : (
                      t('projects.create')
                    )
                  ) : (
                    t('common.next')
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NewProject;