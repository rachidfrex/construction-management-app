import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../context/TranslationContext';
import { HiOutlineSearch } from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import { ProjectHeader } from '../../components/project/ProjectHeader';
import { ProjectStatistics } from '../../components/project/ProjectStatistics';
import { ProjectFilters } from '../../components/project/ProjectFilters';
import { ProjectCard } from '../../components/project/ProjectCard';

// Define project types
type ProjectStatus = 'In Progress' | 'Completed' | 'Delayed' | 'Canceled';
type ProjectType = 'Construction' | 'Renovation' | 'Maintenance';

interface Project {
  id: number;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  type: ProjectType;
  team: string[];
  progress: number;
  budget: number;
  materialsUsed: number;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: 1,
    name: "Construction Site A",
    description: "Main building construction project in downtown area",
    clientName: "ABC Corporation",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "In Progress",
    type: "Construction",
    team: ["John Doe", "Jane Smith", "Bob Wilson"],
    progress: 45,
    budget: 1500000,
    materialsUsed: 25
  },
  {
    id: 2,
    name: "Renovation Project B",
    description: "Office building renovation and modernization",
    clientName: "XYZ Inc.",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    status: "Completed",
    type: "Renovation",
    team: ["Alice Johnson", "Charlie Brown"],
    progress: 100,
    budget: 750000,
    materialsUsed: 10
  },
  // Add more mock projects as needed
];

const Projects = () => {
  const { t } = useTranslation();
  const { direction } = useTranslationContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    startDate: '',
    endDate: ''
  });
  const itemsPerPage = 6;

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.some(member => member.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesType = !filters.type || project.type === filters.type;
    
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(project.endDate);
    const filterStart = filters.startDate ? new Date(filters.startDate) : null;
    const filterEnd = filters.endDate ? new Date(filters.endDate) : null;

    const matchesDateRange = 
      (!filterStart || projectStart >= filterStart) &&
      (!filterEnd || projectEnd <= filterEnd);

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className={`transition-all duration-300 pt-16 p-6 ${
        direction === 'rtl' ? 'mr-0 lg:mr-64' : 'ml-0 lg:ml-64'
      }`}>
        
        <ProjectHeader />
        <ProjectStatistics projects={mockProjects} />

        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t('projects.filters.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <ProjectFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    currentPage === index + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {currentProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">{t('projects.noResults')}</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Projects;