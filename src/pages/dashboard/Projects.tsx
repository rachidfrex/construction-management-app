import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineDownload,
  HiOutlineFilter,
  HiDotsVertical,
  HiOutlineSearch,
  HiOutlineCurrencyDollar
} from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

// Project status types
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
const projects: Project[] = [
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
  {
    id: 3,
    name: "Maintenance Project C",
    description: "Annual maintenance of residential complex",
    clientName: "Smith Properties",
    startDate: "2024-03-10",
    endDate: "2024-03-30",
    status: "Delayed",
    type: "Maintenance",
    team: ["Mike Wilson", "Sarah Brown"],
    progress: 75,
    budget: 50000,
    materialsUsed: 5
  },
  {
    id: 4,
    name: "Construction Site D",
    description: "New shopping mall construction project",
    clientName: "Mall Developers LLC",
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    status: "In Progress",
    type: "Construction",
    team: ["David Lee", "Emma White"],
    progress: 30,
    budget: 2000000,
    materialsUsed: 15
  },
  {
    id: 5,
    name: "Renovation Project E",
    description: "Historic building restoration project",
    clientName: "City Council",
    startDate: "2024-05-15",
    endDate: "2024-08-30",
    status: "Canceled",
    type: "Renovation",
    team: ["Olivia Brown", "James Green"],
    progress: 0,
    budget: 100000,
    materialsUsed: 0
  }
];

// Statistics Component
const ProjectStatistics = () => {
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    delayed: projects.filter(p => p.status === 'Delayed').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      ))}
    </div>
  );
};

// Filter Component
const ProjectFilters = ({ 
  onFilterChange 
}: { 
  onFilterChange: (filters: any) => void 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
        <option value="">All Statuses</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Delayed">Delayed</option>
        <option value="Canceled">Canceled</option>
      </select>

      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
        <option value="">All Types</option>
        <option value="Construction">Construction</option>
        <option value="Renovation">Renovation</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <input 
        type="date" 
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        placeholder="Start Date"
      />
      
      <input 
        type="date" 
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        placeholder="End Date"
      />
    </div>
  );
};

// Project Card Component with Enhanced Features
const ProjectCard = ({ project }: { project: Project }) => {
  const statusColors = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Delayed': 'bg-red-100 text-red-800',
    'Canceled': 'bg-gray-100 text-gray-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">Client: {project.clientName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <HiDotsVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineCalendar className="w-4 h-4 mr-2" />
          <span>{new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineClock className="w-4 h-4 mr-2" />
          <span>{new Date(project.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineCurrencyDollar className="w-4 h-4 mr-2" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineUsers className="w-4 h-4 mr-2" />
          <span>{project.team.length} Members</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600">Progress</span>
        <span className="text-xs font-semibold text-gray-600">{project.progress}%</span>
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.team.some(member => member.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and monitor your construction projects</p>
          </div>
          
          <div className="flex gap-2">
            <Link to='/projects/new'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <HiOutlinePlus className="w-5 h-5" />
                New Project
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <HiOutlineDownload className="w-5 h-5" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Statistics Summary */}
        <ProjectStatistics />

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <HiOutlineFilter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          <ProjectFilters onFilterChange={() => {}} />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Pagination */}
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

        {/* No Projects Found */}
        {currentProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Projects;