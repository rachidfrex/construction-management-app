import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiOutlinePlus,
  HiOutlineCalendar,
  // HiOutlineUsers,
  HiOutlineClock,
  // HiOutlineCheckCircle,
  HiDotsVertical 
} from 'react-icons/hi';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

// Project status types
type ProjectStatus = 'In Progress' | 'Completed' | 'On Hold' | 'Delayed';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  team: string[];
  progress: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Construction Site A",
    description: "Main building construction project in downtown area",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "In Progress",
    team: ["John Doe", "Jane Smith", "Bob Wilson"],
    progress: 45
  },
  {
    id: 2,
    name: "Renovation Project B",
    description: "Office building renovation and modernization",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    status: "On Hold",
    team: ["Alice Johnson", "Charlie Brown"],
    progress: 30
  },
  // Add more projects as needed
];

const ProjectCard = ({ project }: { project: Project }) => {
  const statusColors = {
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'On Hold': 'bg-yellow-100 text-yellow-800',
    'Delayed': 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <HiDotsVertical className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineCalendar className="w-4 h-4 mr-2" />
          <span>{new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <HiOutlineClock className="w-4 h-4 mr-2" />
          <span>{new Date(project.endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {project.team.map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
              title={member}
            >
              <span className="text-xs font-medium">{member.charAt(0)}</span>
            </div>
          ))}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold text-gray-600">
            Progress
          </div>
          <div className="text-xs font-semibold text-gray-600">
            {project.progress}%
          </div>
        </div>
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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="lg:ml-64 mt-5 pt-16 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and monitor your construction projects</p>
          </div>
          <Link to='/projects/new' >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <HiOutlinePlus className="w-5 h-5" />
            New Project
          </motion.button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;